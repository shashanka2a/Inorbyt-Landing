# InOrbyt MVP User Flow Guide
## The Reward Layer for the Creator Economy - Discord-First MVP

---

## What is InOrbyt MVP?

**InOrbyt** connects your Discord community with a simple reward system. Creators reward fans for engagement, and fans unlock perks automatically as they earn tokens. **No trading, no marketplace, no complexity** — just connection, verification, reward, and unlock.

### MVP Scope
- **Platform**: Discord (first, with others to follow)
- **Tokens**: Non-transferable reward tokens only
- **Purpose**: Engagement rewards that unlock perks
- **No Trading**: Tokens cannot be bought, sold, or transferred
- **Simple**: Automatic rewards based on Discord activity

---

## How It Works (MVP Flow)

### For Creators: "I want to reward my Discord community"

#### Step 1: Connect Discord (5 minutes)
1. Click **"Connect Discord"** in your dashboard
2. Authenticate with Discord OAuth
3. Confirm you own the Discord server
4. Your creator profile is created automatically

**What happens:**
- ✅ Your Discord server is linked to your creator account
- ✅ Your reward token is automatically created (non-transferable)
- ✅ You get a unique join link: `inorbyt.io/c/your-creator-name`
- ✅ Default welcome reward is set (e.g., 10 tokens for new members)

#### Step 2: Set Up Rewards (2 minutes)
1. Go to **Reward Settings** in your dashboard
2. Configure automatic rewards:
   - **Welcome Reward**: Tokens for joining (default: 10)
   - **Role Assignment**: Tokens for earning Discord roles
   - **Message Activity**: Tokens for active participation
   - **Event Participation**: Tokens for special events

#### Step 3: Create Perks (5 minutes)
1. Go to **Perks** in your dashboard
2. Add perks with unlock thresholds:
   - **Example**: "Exclusive Role" at 50 tokens
   - **Example**: "Early Access Channel" at 100 tokens
   - **Example**: "Special Badge" at 200 tokens
3. Perks unlock automatically when fans reach thresholds

#### Step 4: Share Your Link (30 seconds)
1. Share your creator link: `inorbyt.io/c/your-creator-name`
2. Post it in your Discord server
3. Fans click to join and automatically get rewarded

**That's it!** Rewards happen automatically as fans engage with your Discord.

---

### For Fans: "I want to earn rewards from creators I support"

#### Step 1: Join via Creator Link (2 minutes)
1. Click a creator's join link (e.g., `inorbyt.io/c/sarah-chen`)
2. Sign in with your Discord account
3. Your wallet is created automatically (no crypto knowledge needed!)
4. Confirm you want to link your Discord account

**What happens:**
- ✅ Your Discord account is linked to InOrbyt
- ✅ Your wallet is created (automatically, no setup needed)
- ✅ You receive welcome reward tokens (if first time joining this creator)
- ✅ You see confirmation: "You've joined [Creator]! You earned 10 tokens."

#### Step 2: Engage and Earn (Automatic)
As you participate in the Discord server:
- **Joining**: Automatic welcome reward
- **Earning Roles**: Automatic tokens when assigned roles
- **Active Messaging**: Automatic tokens for participation
- **Special Events**: Automatic tokens for event participation

**No action needed!** Rewards appear automatically in your wallet.

#### Step 3: Unlock Perks (Automatic)
When your token balance reaches perk thresholds:
- **At 50 tokens**: Exclusive role unlocks automatically
- **At 100 tokens**: Early access channel unlocks automatically
- **At 200 tokens**: Special badge unlocks automatically

**You'll see notifications** when perks unlock!

#### Step 4: Track Your Progress
- View your token balance for each creator
- See which perks you've unlocked
- Check your progress toward next perk
- View reward history

---

## Key Features (MVP)

### ✅ What's Included

#### For Creators
- **Discord OAuth Connection**: Secure authentication
- **Automatic Token Creation**: One-click token setup
- **Engagement-Based Rewards**: Automatic reward distribution
- **Perk System**: Create unlockable rewards
- **Creator Dashboard**: Track fan engagement and rewards
- **Join Link Generation**: Easy fan onboarding

#### For Fans
- **Discord Sign-In**: Simple authentication
- **Automatic Wallet Creation**: No crypto setup required
- **Welcome Rewards**: Tokens for joining creator communities
- **Engagement Rewards**: Automatic tokens for Discord activity
- **Perk Unlocking**: Automatic access when thresholds are met
- **Fan Dashboard**: Track balances and unlocked perks

### ❌ What's NOT in MVP

- **No Token Trading**: Tokens cannot be bought, sold, or transferred
- **No Marketplace**: No token exchange or trading platform
- **No Fiat Payments**: Cannot purchase tokens with credit cards
- **No Freelancer System**: MVP focuses on creator-fan rewards only
- **No Other Platforms**: Discord only (Patreon, YouTube, Substack coming later)

---

## Detailed User Flows

### Creator Onboarding Flow

```
1. Creator visits inorbyt.io
   ↓
2. Clicks "Join Early Access" → "I'm a Creator"
   ↓
3. Connects Discord account (OAuth)
   ↓
4. Confirms Discord server ownership
   ↓
5. Creator profile created automatically
   ↓
6. Reward token auto-minted (non-transferable)
   ↓
7. Creator gets join link: inorbyt.io/c/creator-slug
   ↓
8. Creator sets reward rules and perks
   ↓
9. Shares link with Discord community
```

### Fan Join Flow

```
1. Fan clicks creator link: inorbyt.io/c/creator-slug
   ↓
2. Signs in with Discord (Privy creates wallet automatically)
   ↓
3. Confirms account linking
   ↓
4. System checks: Is this fan new to this creator?
   ↓
5. YES → Issues welcome reward (e.g., 10 tokens)
   ↓
6. NO → Skips welcome reward (already received)
   ↓
7. Shows confirmation: "You've joined [Creator]! Earned 10 tokens."
   ↓
8. Fan dashboard opens with token balance
```

### Engagement Reward Flow

```
1. Fan engages in Discord (role assignment, message, event)
   ↓
2. Discord event captured by InOrbyt
   ↓
3. System verifies event authenticity via Discord API
   ↓
4. Checks if reward already given (deduplication)
   ↓
5. Applies creator's reward rules
   ↓
6. Issues tokens automatically
   ↓
7. Updates fan balance
   ↓
8. Checks perk thresholds
   ↓
9. If threshold met → Unlocks perk automatically
```

### Perk Unlock Flow

```
1. Fan token balance reaches perk threshold (e.g., 50 tokens)
   ↓
2. System detects threshold reached
   ↓
3. Checks if perk already unlocked
   ↓
4. If not unlocked:
   ↓
5. For Discord role perk → Calls Discord API to assign role
   ↓
6. For link perk → Generates unique access link
   ↓
7. For code perk → Generates unique redemption code
   ↓
8. Sends notification to fan
   ↓
9. Updates dashboard to show unlocked perk
```

---

## MVP Technical Details

### Platform Integration
- **Discord OAuth 2.0**: Secure authentication
- **Discord API**: Event capture and role assignment
- **Base Blockchain**: Token minting (non-transferable)
- **Privy Wallet**: Automatic wallet creation for fans

### Data Model
- **Creators**: Discord server ownership, reward rules
- **Fans**: Discord account linkage, token balances per creator
- **Rewards**: Event-based reward tracking
- **Perks**: Unlock thresholds and delivery methods
- **Anti-Abuse**: Deduplication, rate limiting

### Security Features
- **Event Verification**: All rewards verified via Discord API
- **Deduplication**: Prevents duplicate rewards for same event
- **Rate Limiting**: Prevents reward spam
- **Unique Verification**: One reward per fan per creator per event

---

## Example Scenarios

### Scenario 1: New Creator Setup
**Sarah** wants to reward her Discord community of 500 members.

1. Sarah connects Discord → Gets join link
2. Shares link in her Discord server
3. Sets up automatic rewards:
   - 10 tokens for joining
   - 5 tokens for active messaging
   - 20 tokens for earning "Super Fan" role
4. Creates perks:
   - Exclusive role at 50 tokens
   - Early access channel at 100 tokens

**Result**: Fans automatically earn rewards as they engage, and perks unlock automatically.

### Scenario 2: Fan Joins Creator Community
**Mike** clicks Sarah's join link from Discord.

1. Mike signs in with Discord
2. Wallet created automatically (he doesn't see any crypto complexity)
3. Receives 10 welcome tokens
4. Sees dashboard: "You've joined Sarah! 10 tokens earned."
5. As Mike engages in Discord, tokens accumulate automatically
6. At 50 tokens, he automatically gets the exclusive role

**Result**: Mike feels recognized without any technical complexity.

### Scenario 3: Engagement Reward
**Emma** has been active in Sarah's Discord for a week.

1. Emma earns "Super Fan" role in Discord
2. InOrbyt detects role assignment event
3. Verifies event with Discord API
4. Checks: Has Emma received reward for this event? No.
5. Issues 20 tokens automatically
6. Emma's balance: 10 (welcome) + 45 (messages) + 20 (role) = 75 tokens
7. System checks: 75 tokens = perk unlocked! (50 token perk)
8. Discord role assigned automatically
9. Emma gets notification: "You unlocked Exclusive Role!"

**Result**: Seamless reward and perk unlocking with zero fan effort.

---

## Common Questions (MVP)

### "Can I buy or sell tokens?"
**No.** MVP tokens are reward-only and non-transferable. They're earned through engagement and used to unlock perks.

### "When will Patreon/YouTube/Substack be available?"
**Coming soon.** MVP starts with Discord. Other platforms follow the same structure once Discord is proven.

### "What if I'm not technical?"
**Perfect!** InOrbyt handles everything. You just connect Discord and share your link. Rewards happen automatically.

### "How do fans get wallets?"
**Automatically.** When fans sign in with Discord, Privy creates a wallet behind the scenes. Fans never see crypto complexity.

### "What prevents abuse?"
- Event verification via Discord API
- Deduplication per event
- Rate limiting per fan per creator
- One reward per unique event

### "Can fans transfer tokens to each other?"
**No.** MVP tokens are non-transferable. They're specific to each creator-fan relationship.

---

## Success Metrics (MVP)

### For Creators
- **Community Engagement**: Increased Discord activity
- **Fan Retention**: More active, rewarded fans
- **Perk Unlocks**: Fans reaching milestones
- **Automation**: Less manual work, more engagement

### For Fans
- **Token Balance Growth**: Steady accumulation from engagement
- **Perks Unlocked**: Access to exclusive content/roles
- **Recognition**: Feeling valued for participation
- **Easy Experience**: No technical barriers

---

## Ready to Start?

### For Creators
1. Visit **inorbyt.io**
2. Click **"Join Early Access"**
3. Connect your Discord server
4. Share your creator link
5. Watch rewards happen automatically

### For Fans
1. Click a creator's join link
2. Sign in with Discord
3. Start engaging in Discord
4. Watch tokens accumulate
5. See perks unlock automatically

---

**Remember:** MVP is simple by design. Connect Discord, share link, reward engagement, unlock perks. That's it.

*The future of the creator economy isn't about trading—it's about participation and recognition.*
