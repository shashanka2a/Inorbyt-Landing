'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Gift, 
  TrendingUp,
  Award,
  Users,
  Sparkles,
  CheckCircle,
  Lock,
  MessageSquare,
  Clock,
  ExternalLink,
  Copy
} from 'lucide-react';

interface CreatorBalance {
  creatorId: string;
  creatorName: string;
  balance: number;
}

interface UnlockedPerk {
  id: string;
  perkName: string;
  description: string;
  unlockedAt: Date;
  deliveryType: 'discord_role' | 'link' | 'code';
  payload?: string;
  creatorName?: string;
}

interface PendingPerk {
  id: string;
  perkName: string;
  description: string;
  threshold: number;
  currentProgress: number;
}

interface RecentReward {
  id: string;
  creatorName: string;
  amount: number;
  eventType: 'join' | 'message' | 'role' | 'event';
  timestamp: Date;
}

export function FanDashboard() {
  const [discordConnected] = useState(false); // Simulate Discord connection status
  const [balances] = useState<CreatorBalance[]>([
    { creatorId: '1', creatorName: 'Sarah Chen', balance: 75 },
    { creatorId: '2', creatorName: 'Leo Visuals', balance: 45 },
    { creatorId: '3', creatorName: 'Nova Writes', balance: 120 }
  ]);

  const [unlockedPerks] = useState<UnlockedPerk[]>([
    {
      id: '1',
      perkName: 'Exclusive Role',
      description: 'Special Discord role',
      unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      deliveryType: 'discord_role',
      creatorName: 'Sarah Chen'
    },
    {
      id: '2',
      perkName: 'VIP Channel Access',
      description: 'Early access to new content',
      unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      deliveryType: 'link',
      payload: 'https://example.com/vip-access',
      creatorName: 'Leo Visuals'
    },
    {
      id: '3',
      perkName: 'Premium Discount Code',
      description: '20% off premium subscription',
      unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      deliveryType: 'code',
      payload: 'PREMIUM20',
      creatorName: 'Nova Writes'
    }
  ]);

  const [pendingPerks] = useState<PendingPerk[]>([
    {
      id: '3',
      perkName: 'Founder Badge',
      description: 'Limited edition badge',
      threshold: 200,
      currentProgress: 120
    },
    {
      id: '4',
      perkName: 'Private AMA',
      description: 'Exclusive Q&A session',
      threshold: 150,
      currentProgress: 75
    }
  ]);

  const [recentRewards] = useState<RecentReward[]>([
    {
      id: '1',
      creatorName: 'Sarah Chen',
      amount: 5,
      eventType: 'message',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      creatorName: 'Leo Visuals',
      amount: 20,
      eventType: 'role',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      creatorName: 'Sarah Chen',
      amount: 10,
      eventType: 'join',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  const totalBalance = balances.reduce((sum, b) => sum + b.balance, 0);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'join': return 'Joined';
      case 'message': return 'Message';
      case 'role': return 'Role Earned';
      case 'event': return 'Event';
      default: return type;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'join':
        return <Users className="w-4 h-4 text-purple-400" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'role':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'event':
        return <Sparkles className="w-4 h-4 text-orange-400" />;
      default:
        return <Gift className="w-4 h-4 text-green-400" />;
    }
  };

  const handleClaimPerk = (perk: UnlockedPerk) => {
    if (perk.deliveryType === 'link' && perk.payload) {
      window.open(perk.payload, '_blank');
    } else if (perk.deliveryType === 'code' && perk.payload) {
      navigator.clipboard.writeText(perk.payload);
      // Could show a toast notification here
      alert(`Code "${perk.payload}" copied to clipboard!`);
    }
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-lora text-[#f9f4e1] text-2xl md:text-3xl font-semibold">Fan Dashboard</h1>
        <p className="text-[#f9f4e1]/70 mt-1 text-sm md:text-base">Track your rewards and unlocked perks</p>
      </div>

      {/* Connect Discord CTA */}
      {!discordConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#f9f4e1] font-semibold mb-1">Connect Discord to Earn Rewards</h3>
              <p className="text-[#f9f4e1]/70 text-sm">Link your Discord account to start earning automatic rewards</p>
            </div>
            <Link
              href="/connect/discord"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
            >
              Connect Discord
            </Link>
          </div>
        </motion.div>
      )}

      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#f9f4e1]/70 text-sm">Total Token Balance</p>
            <h2 className="text-[#f9f4e1] text-3xl md:text-4xl font-bold mt-1">{totalBalance}</h2>
            <p className="text-[#f9f4e1]/60 text-xs mt-2">Across {balances.length} creators</p>
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center">
            <Gift className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
          </div>
        </div>
      </motion.div>

      {/* Creator Balances */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
      >
        <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold mb-4">Your Creator Balances</h2>
        <div className="space-y-3">
          {balances.map((balance) => (
            <div key={balance.creatorId} className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                  <span className="text-purple-400 font-semibold text-sm">{balance.creatorName.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-[#f9f4e1] font-medium text-sm md:text-base">{balance.creatorName}</p>
                  <p className="text-[#f9f4e1]/60 text-xs">Creator community</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#f9f4e1] font-semibold text-lg md:text-xl">{balance.balance}</p>
                <p className="text-[#f9f4e1]/60 text-xs">tokens</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Unlocked Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold">Unlocked Perks</h2>
            <span className="text-orange-500 text-sm font-medium">{unlockedPerks.length}</span>
          </div>

          {unlockedPerks.length > 0 ? (
            <div className="space-y-3">
              {unlockedPerks.map((perk) => (
                <div key={perk.id} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <p className="text-[#f9f4e1] font-medium text-sm">{perk.perkName}</p>
                        {perk.creatorName && (
                          <span className="text-[#f9f4e1]/40 text-xs">from {perk.creatorName}</span>
                        )}
                      </div>
                      <p className="text-[#f9f4e1]/60 text-xs">{perk.description}</p>
                      <p className="text-[#f9f4e1]/40 text-xs mt-1">Unlocked {formatTimeAgo(perk.unlockedAt)}</p>
                    </div>
                    {(perk.deliveryType === 'link' || perk.deliveryType === 'code') && (
                      <motion.button
                        onClick={() => handleClaimPerk(perk)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap"
                      >
                        {perk.deliveryType === 'link' ? (
                          <>
                            <ExternalLink className="w-3 h-3 inline mr-1" />
                            Claim
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 inline mr-1" />
                            Copy Code
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Lock className="w-8 h-8 text-[#f9f4e1]/40 mx-auto mb-2" />
              <p className="text-[#f9f4e1]/60 text-sm">No perks unlocked yet</p>
            </div>
          )}
        </motion.div>

        {/* Pending Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold">Unlock Progress</h2>
            <span className="text-[#f9f4e1]/60 text-sm">{pendingPerks.length} pending</span>
          </div>

          <div className="space-y-4">
            {pendingPerks.map((perk) => {
              const progress = (perk.currentProgress / perk.threshold) * 100;
              return (
                <div key={perk.id} className="p-3 bg-[#0a0e1a] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#f9f4e1] font-medium text-sm">{perk.perkName}</p>
                    <span className="text-[#f9f4e1]/60 text-xs">{perk.currentProgress} / {perk.threshold}</span>
                  </div>
                  <p className="text-[#f9f4e1]/60 text-xs mb-2">{perk.description}</p>
                  <div className="w-full h-2 bg-[#f9f4e1]/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
      >
          <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold">Your Rewards</h2>
          <Link
            href="/fan/activity"
            className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 cursor-pointer"
          >
            View All
          </Link>
        </div>

        <div className="space-y-3 md:space-y-4">
          {recentRewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 md:p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/5"
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#f9f4e1]/10 flex items-center justify-center flex-shrink-0">
                  {getEventIcon(reward.eventType)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#f9f4e1] font-medium text-sm md:text-base truncate">{reward.creatorName}</p>
                  <p className="text-[#f9f4e1]/60 text-xs md:text-sm">{getEventTypeLabel(reward.eventType)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                <div className="text-right">
                  <p className="text-[#f9f4e1] font-semibold text-sm md:text-base">+{reward.amount}</p>
                  <p className="text-[#f9f4e1]/60 text-xs">{formatTimeAgo(reward.timestamp)}</p>
                </div>
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
