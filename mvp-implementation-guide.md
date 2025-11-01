# InOrbyt MVP Technical Implementation Guide
## Pre-Conference Build - Exact Specifications

---

## MVP Scope & Boundaries

### ✅ What's Included
- **Discord-first integration** (Patreon, YouTube, Substack follow same pattern)
- **Creator onboarding** with Discord OAuth
- **Fan join flow** via creator links
- **Engagement-based rewards** (automatic)
- **Perk system** with automatic unlock
- **Non-transferable tokens** (reward-only)
- **Anti-abuse measures** (deduplication, rate limiting)

### ❌ What's NOT in MVP
- Token trading or transfers
- Fiat purchase or checkout
- Staking or liquidity
- External marketplaces
- Cross-creator token exchange
- Freelancer marketplace

---

## Implementation Tickets

### Ticket 1: Creator Onboarding & Platform Connection

#### Goal
Allow creators to connect Discord, authenticate ownership, and enable reward automation.

#### Implementation Tasks

**1. Discord OAuth Implementation**
```
POST /api/creator/discord/connect
- OAuth 2.0 flow with Discord
- Store: creator_id, discord_user_id, guild_id, tokens
- Verify server ownership
- Return connection status
```

**2. Creator Profile Creation**
```
- Auto-generate creator_slug from Discord server name
- Create creator join link: inorbyt.io/c/{creator_slug}
- Store in creators table
```

**3. Automatic Token Minting**
```
- Mint creator's reward token on Base (non-transferable)
- Store token contract address in creator_tokens table
- Set default_welcome_reward (e.g., 10 tokens)
```

**4. Endpoints**
```typescript
GET /api/creator/{id}/discord/status
Response: {
  connected: boolean,
  guild_id: string,
  guild_name: string,
  join_link: string
}

POST /api/creator/{id}/discord/connect
Body: { discord_code: string }
Response: {
  success: boolean,
  join_link: string,
  creator_id: string
}

POST /api/creator/{id}/discord/disconnect
Response: { success: boolean }
```

**5. Database Schema**
```sql
creators (
  id UUID PRIMARY KEY,
  creator_slug VARCHAR UNIQUE,
  discord_user_id VARCHAR,
  default_welcome_reward INTEGER DEFAULT 10,
  created_at TIMESTAMP
)

creator_discord_integrations (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  discord_user_id VARCHAR,
  guild_id VARCHAR,
  access_token VARCHAR,
  refresh_token VARCHAR,
  connected_at TIMESTAMP
)

creator_tokens (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  token_name VARCHAR,
  token_symbol VARCHAR,
  contract_address VARCHAR,
  non_transferable BOOLEAN DEFAULT true,
  minted_at TIMESTAMP
)
```

---

### Ticket 2: Fan Join & Linking Flow

#### Goal
When a fan joins from Discord or creator link, create InOrbyt identity, link to creator, and issue starter tokens.

#### Implementation Tasks

**1. Fan Sign-In Flow**
```
1. Fan clicks creator link: inorbyt.io/c/{creator_slug}
2. Privy wallet creation (automatic, no user action)
3. Discord OAuth for fan account
4. Link: privy_user_id ↔ discord_user_id ↔ creator_id
```

**2. Welcome Reward Logic**
```typescript
POST /api/fan/join
Body: {
  creator_slug: string,
  discord_code: string
}

Logic:
1. Get creator by slug
2. Get or create user via Privy
3. Link Discord account
4. Check fan_creator_links for existing record
5. If none exists:
   - Create fan_creator_links record
   - Issue default_welcome_reward tokens
6. If exists: skip welcome reward
7. Return: { success: true, tokens_earned: 10 }
```

**3. Database Schema**
```sql
users (
  id UUID PRIMARY KEY,
  privy_user_id VARCHAR UNIQUE,
  created_at TIMESTAMP
)

linked_platform_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  platform VARCHAR, -- 'discord'
  platform_user_id VARCHAR,
  platform_username VARCHAR,
  linked_at TIMESTAMP,
  UNIQUE(user_id, platform, platform_user_id)
)

fan_creator_links (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  creator_id UUID REFERENCES creators(id),
  welcome_reward_issued BOOLEAN DEFAULT false,
  total_tokens_earned INTEGER DEFAULT 0,
  linked_at TIMESTAMP,
  UNIQUE(user_id, creator_id)
)
```

**4. UI Confirmation**
```
Show: "You've joined [Creator]! You earned 10 tokens."
Redirect to fan dashboard with balance display
```

---

### Ticket 3: Engagement Rewards

#### Goal
Reward verified fan activity automatically based on Discord events.

#### Implementation Tasks

**1. Discord Event Capture**
```
Events to capture:
- Guild member join
- Role assignment/removal
- Message sent (with rate limiting)
- Voice channel join
- Special events (configurable)
```

**2. Event Verification**
```typescript
POST /api/rewards/issue
Body: {
  creator_id: UUID,
  user_id: UUID,
  event_type: string, -- 'role_assignment', 'message', 'join'
  external_event_id: string, -- Discord event ID
  guild_id: string,
  metadata: JSON
}

Logic:
1. Verify event authenticity via Discord API
2. Check deduplication: rewards.external_event_id
3. If already processed: return { duplicate: true }
4. Get creator reward rules
5. Apply reward amount based on event_type
6. Check rate limits (e.g., max 100 tokens/day per fan per creator)
7. Mint tokens on Base
8. Log reward in rewards table
9. Update fan_creator_links.total_tokens_earned
10. Check perk unlock thresholds
```

**3. Reward Rules Configuration**
```sql
creator_reward_rules (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  event_type VARCHAR, -- 'join', 'role_assignment', 'message', etc.
  reward_amount INTEGER,
  rate_limit_per_day INTEGER,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP
)

rewards (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  user_id UUID REFERENCES users(id),
  event_type VARCHAR,
  external_event_id VARCHAR UNIQUE, -- Discord event ID for deduplication
  reward_amount INTEGER,
  token_contract_address VARCHAR,
  transaction_hash VARCHAR,
  issued_at TIMESTAMP,
  UNIQUE(creator_id, user_id, external_event_id)
)
```

**4. Anti-Abuse Measures**
```typescript
// Deduplication
- Check rewards.external_event_id before issuing
- Prevent duplicate rewards for same Discord event

// Rate Limiting
- Max rewards per fan per creator per day
- Configurable per creator in reward_rules

// Verification
- All events verified via Discord API before reward
- Guild membership verified
- Event authenticity checked
```

---

### Ticket 4: Perk Creation & Unlock Logic

#### Goal
Let creators define perks and deliver them automatically when fans hit token thresholds.

#### Implementation Tasks

**1. Perk Creation UI**
```
Creator Dashboard → Perks → Add Perk

Form Fields:
- perk_name: string
- description: string
- required_amount: integer (token threshold)
- delivery_type: enum ('discord_role', 'link', 'code')
- payload: JSON (varies by delivery_type)
  - discord_role: { role_id: string }
  - link: { url: string, expires_in: integer }
  - code: { code_type: string, uses: integer }
```

**2. Perk Unlock Logic**
```typescript
// Triggered after reward issuance
async function checkPerkUnlocks(userId, creatorId) {
  const fanLink = await getFanCreatorLink(userId, creatorId);
  const perks = await getCreatorPerks(creatorId);
  const unlockedPerks = await getUnlockedPerks(userId, creatorId);
  
  for (const perk of perks) {
    if (fanLink.total_tokens_earned >= perk.required_amount) {
      if (!unlockedPerks.includes(perk.id)) {
        await unlockPerk(userId, creatorId, perk);
      }
    }
  }
}

async function unlockPerk(userId, creatorId, perk) {
  switch (perk.delivery_type) {
    case 'discord_role':
      await assignDiscordRole(userId, perk.payload.role_id);
      break;
    case 'link':
      const link = generateUniqueLink(perk.payload.url);
      await storePerkLink(userId, perk.id, link);
      break;
    case 'code':
      const code = generateCode(perk.payload.code_type);
      await storePerkCode(userId, perk.id, code);
      break;
  }
  
  await createUnlockRecord(userId, creatorId, perk.id);
  await sendNotification(userId, perk);
}
```

**3. Database Schema**
```sql
perks (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  perk_name VARCHAR,
  description TEXT,
  required_amount INTEGER,
  delivery_type VARCHAR, -- 'discord_role', 'link', 'code'
  payload JSONB,
  created_at TIMESTAMP
)

perk_unlocks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  creator_id UUID REFERENCES creators(id),
  perk_id UUID REFERENCES perks(id),
  unlocked_at TIMESTAMP,
  delivery_data JSONB, -- stores link/code/role info
  UNIQUE(user_id, perk_id)
)
```

**4. Endpoints**
```typescript
GET /api/creator/{id}/perks
Response: Array<{
  id: UUID,
  perk_name: string,
  description: string,
  required_amount: number,
  delivery_type: string,
  payload: object
}>

POST /api/creator/{id}/perks
Body: {
  perk_name: string,
  description: string,
  required_amount: number,
  delivery_type: 'discord_role' | 'link' | 'code',
  payload: object
}

GET /api/fan/{id}/perks?creator_id={creator_id}
Response: Array<{
  perk_id: UUID,
  perk_name: string,
  description: string,
  required_amount: number,
  current_balance: number,
  unlocked: boolean,
  unlocked_at: timestamp | null,
  delivery_data: object | null
}>
```

---

### Ticket 5: Shared Logic for All Platforms

#### Goal
The same data model and endpoints apply to future integrations. Only event verification adapters differ.

#### Implementation Pattern

**Platform Adapter Interface**
```typescript
interface PlatformAdapter {
  connect(userId: string, authCode: string): Promise<ConnectionResult>;
  verifyEvent(eventId: string, creatorId: string): Promise<boolean>;
  deliverPerk(userId: string, perk: Perk): Promise<void>;
  getEvents(guildId: string, timeRange: TimeRange): Promise<Event[]>;
}

// Discord Implementation
class DiscordAdapter implements PlatformAdapter {
  // Discord-specific OAuth and API calls
}

// Future: PatreonAdapter, YouTubeAdapter, SubstackAdapter
// All use same interface, different implementations
```

**Event Verification Pattern**
```typescript
async function verifyEvent(
  platform: string,
  eventId: string,
  creatorId: string
): Promise<boolean> {
  const adapter = getAdapter(platform);
  return adapter.verifyEvent(eventId, creatorId);
}
```

---

## Complete Database Schema

### Core Tables
```sql
-- Users
users (
  id UUID PRIMARY KEY,
  privy_user_id VARCHAR UNIQUE,
  created_at TIMESTAMP
);

-- Platform Accounts
linked_platform_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  platform VARCHAR, -- 'discord', 'patreon', 'youtube', 'substack'
  platform_user_id VARCHAR,
  platform_username VARCHAR,
  access_token VARCHAR,
  refresh_token VARCHAR,
  linked_at TIMESTAMP,
  UNIQUE(user_id, platform, platform_user_id)
);

-- Creators
creators (
  id UUID PRIMARY KEY,
  creator_slug VARCHAR UNIQUE,
  default_welcome_reward INTEGER DEFAULT 10,
  created_at TIMESTAMP
);

-- Creator Platform Integrations
creator_discord_integrations (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  discord_user_id VARCHAR,
  guild_id VARCHAR,
  access_token VARCHAR,
  refresh_token VARCHAR,
  connected_at TIMESTAMP,
  UNIQUE(creator_id, guild_id)
);

-- Creator Tokens
creator_tokens (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  token_name VARCHAR,
  token_symbol VARCHAR,
  contract_address VARCHAR,
  non_transferable BOOLEAN DEFAULT true,
  minted_at TIMESTAMP,
  UNIQUE(creator_id)
);

-- Fan-Creator Links
fan_creator_links (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  creator_id UUID REFERENCES creators(id),
  welcome_reward_issued BOOLEAN DEFAULT false,
  total_tokens_earned INTEGER DEFAULT 0,
  last_reward_at TIMESTAMP,
  linked_at TIMESTAMP,
  UNIQUE(user_id, creator_id)
);

-- Reward Rules
creator_reward_rules (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  event_type VARCHAR, -- 'join', 'role_assignment', 'message', etc.
  reward_amount INTEGER,
  rate_limit_per_day INTEGER,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP
);

-- Rewards
rewards (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  user_id UUID REFERENCES users(id),
  event_type VARCHAR,
  external_event_id VARCHAR, -- Platform event ID for deduplication
  reward_amount INTEGER,
  token_contract_address VARCHAR,
  transaction_hash VARCHAR,
  issued_at TIMESTAMP,
  UNIQUE(creator_id, user_id, external_event_id)
);

-- Perks
perks (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  perk_name VARCHAR,
  description TEXT,
  required_amount INTEGER,
  delivery_type VARCHAR, -- 'discord_role', 'link', 'code'
  payload JSONB,
  created_at TIMESTAMP
);

-- Perk Unlocks
perk_unlocks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  creator_id UUID REFERENCES creators(id),
  perk_id UUID REFERENCES perks(id),
  unlocked_at TIMESTAMP,
  delivery_data JSONB, -- stores link/code/role info
  UNIQUE(user_id, perk_id)
);
```

---

## Smart Contract Requirements

### Token Contract (Base)
```solidity
// Non-transferable creator reward token
contract CreatorToken {
  mapping(address => uint256) public balances;
  address public creator;
  bool public transferable = false; // Always false for MVP
  
  function mint(address to, uint256 amount) external;
  function burn(address from, uint256 amount) external;
  // No transfer function - tokens are non-transferable
}
```

### Requirements
- **Non-transferable**: Tokens cannot be sent between wallets
- **Platform-controlled**: Only InOrbyt platform can mint/burn
- **Per-creator tokens**: Each creator has their own token contract
- **One balance per fan**: Fans can hold tokens from multiple creators separately

---

## API Endpoints Summary

### Creator Endpoints
```
GET    /api/creator/{id}/discord/status
POST   /api/creator/{id}/discord/connect
POST   /api/creator/{id}/discord/disconnect
GET    /api/creator/{id}/perks
POST   /api/creator/{id}/perks
GET    /api/creator/{id}/rewards/rules
POST   /api/creator/{id}/rewards/rules
GET    /api/creator/{id}/stats
```

### Fan Endpoints
```
POST   /api/fan/join
GET    /api/fan/{id}/balance?creator_id={creator_id}
GET    /api/fan/{id}/perks?creator_id={creator_id}
GET    /api/fan/{id}/rewards?creator_id={creator_id}
```

### Reward Endpoints
```
POST   /api/rewards/issue
GET    /api/rewards/{id}
```

---

## Testing Checklist

### Creator Flow
- [ ] Discord OAuth connection works
- [ ] Creator profile created with slug
- [ ] Join link generated correctly
- [ ] Token auto-minted on Base
- [ ] Welcome reward configured
- [ ] Perks can be created
- [ ] Reward rules can be configured

### Fan Flow
- [ ] Creator link redirects correctly
- [ ] Privy wallet created automatically
- [ ] Discord sign-in works
- [ ] Welcome reward issued (first time only)
- [ ] Fan dashboard shows balance
- [ ] No duplicate welcome rewards

### Engagement Rewards
- [ ] Discord events captured correctly
- [ ] Events verified via Discord API
- [ ] Deduplication prevents duplicates
- [ ] Rate limiting works
- [ ] Tokens minted on Base
- [ ] Balance updates correctly

### Perk System
- [ ] Perks unlock at correct thresholds
- [ ] Discord roles assigned automatically
- [ ] Links generated and stored
- [ ] Codes generated and stored
- [ ] Notifications sent on unlock
- [ ] Dashboard shows unlocked perks

---

## Security Considerations

1. **OAuth Security**: Proper token storage and refresh
2. **Event Verification**: All events verified via platform APIs
3. **Deduplication**: Prevents reward spam
4. **Rate Limiting**: Protects against abuse
5. **Wallet Security**: Privy handles all wallet operations
6. **Access Control**: Creators can only manage their own data

---

## Deployment Checklist

### Pre-Deployment
- [ ] All endpoints implemented and tested
- [ ] Database schema migrated
- [ ] Smart contracts deployed to Base
- [ ] Discord OAuth app configured
- [ ] Privy integration complete
- [ ] Error handling in place
- [ ] Logging configured

### Post-Deployment
- [ ] Monitor reward issuance
- [ ] Track perk unlock rates
- [ ] Monitor for abuse patterns
- [ ] Collect user feedback
- [ ] Measure engagement metrics

---

*This document represents the exact MVP scope for the conference build. All features outside this scope are deferred to post-MVP releases.*
