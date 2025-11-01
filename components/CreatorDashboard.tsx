'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Gift, 
  TrendingUp, 
  Copy,
  ExternalLink,
  CheckCircle,
  Clock,
  Settings,
  Award,
  MessageSquare,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';

interface AutomaticReward {
  id: string;
  recipient: string;
  amount: number;
  eventType: 'join' | 'message' | 'role' | 'event';
  timestamp: Date;
}

interface Perk {
  id: string;
  name: string;
  description: string;
  threshold: number;
  unlockedCount: number;
}

interface CreatorStats {
  totalRewardsDistributed: number;
  activeFans: number;
  perksUnlocked: number;
  monthlyRewards: number;
}

export function CreatorDashboard() {
  const [joinLink] = useState('https://inorbyt.io/c/sarah-chen');
  const [joinLinkCopied, setJoinLinkCopied] = useState(false);
  const [discordConnected] = useState(true);
  const [showRewardRules, setShowRewardRules] = useState(false);
  const [showPerks, setShowPerks] = useState(false);

  const [stats] = useState<CreatorStats>({
    totalRewardsDistributed: 1247,
    activeFans: 89,
    perksUnlocked: 34,
    monthlyRewards: 156
  });

  const [rewardRules] = useState({
    welcomeReward: 10,
    messageReward: 5,
    roleReward: 20,
    eventReward: 15
  });

  const [perks] = useState<Perk[]>([
    {
      id: '1',
      name: 'Exclusive Role',
      description: 'Special Discord role for active members',
      threshold: 50,
      unlockedCount: 24
    },
    {
      id: '2',
      name: 'VIP Channel Access',
      description: 'Early access to new content',
      threshold: 100,
      unlockedCount: 10
    },
    {
      id: '3',
      name: 'Founder Badge',
      description: 'Limited edition badge',
      threshold: 200,
      unlockedCount: 0
    }
  ]);

  const [recentRewards] = useState<AutomaticReward[]>([
    {
      id: '1',
      recipient: '@mike_designer',
      amount: 5,
      eventType: 'message',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      recipient: '@emma_music',
      amount: 20,
      eventType: 'role',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      recipient: '@sarah_writer',
      amount: 10,
      eventType: 'join',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: '4',
      recipient: '@leo_visuals',
      amount: 15,
      eventType: 'event',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);

  const handleCopyJoinLink = () => {
    navigator.clipboard.writeText(joinLink);
    setJoinLinkCopied(true);
    setTimeout(() => setJoinLinkCopied(false), 2000);
  };

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

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-lora text-[#f9f4e1] text-2xl md:text-3xl font-semibold">Creator Dashboard</h1>
          <p className="text-[#f9f4e1]/70 mt-1 text-sm md:text-base">Track your Discord community rewards and engagement</p>
        </div>

        {/* Discord Status & Join Link */}
        <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                discordConnected ? 'bg-green-500/20' : 'bg-[#f9f4e1]/10'
              }`}>
                <ExternalLink className={`w-5 h-5 ${discordConnected ? 'text-green-400' : 'text-[#f9f4e1]/70'}`} />
              </div>
              <div>
                <p className="text-[#f9f4e1] font-medium">Discord Server</p>
                <p className="text-[#f9f4e1]/60 text-sm flex items-center gap-2">
                  {discordConnected ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Connected
                    </>
                  ) : (
                    'Not connected'
                  )}
                </p>
              </div>
            </div>
            <div className="flex-1 md:flex-initial flex items-center gap-2 max-w-full md:max-w-md">
              <div className="flex-1 flex items-center gap-2 p-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg">
                <LinkIcon className="w-4 h-4 text-[#f9f4e1]/60 flex-shrink-0" />
                <input
                  type="text"
                  value={joinLink}
                  readOnly
                  className="flex-1 bg-transparent text-[#f9f4e1] text-sm focus:outline-none truncate"
                />
              </div>
              <button
                onClick={handleCopyJoinLink}
                className="px-3 py-2 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 rounded-lg transition-colors flex-shrink-0"
              >
                {joinLinkCopied ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-[#f9f4e1]/70" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
              <Gift className="w-4 h-4 md:w-6 md:h-6 text-orange-500" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.totalRewardsDistributed.toLocaleString()}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Total Rewards Distributed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 md:w-6 md:h-6 text-purple-500" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.activeFans}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Active Fans</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.perksUnlocked}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Perks Unlocked</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.monthlyRewards}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">This Month</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Reward Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold">Reward Rules</h2>
            <motion.button
              onClick={() => setShowRewardRules(!showRewardRules)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-orange-500 hover:text-orange-400 text-xs md:text-sm font-medium transition-colors"
            >
              {showRewardRules ? 'Hide' : 'Edit'}
            </motion.button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-[#f9f4e1] text-sm">Welcome Reward</span>
              </div>
              <span className="text-[#f9f4e1] font-semibold">{rewardRules.welcomeReward} tokens</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="text-[#f9f4e1] text-sm">Message Activity</span>
              </div>
              <span className="text-[#f9f4e1] font-semibold">{rewardRules.messageReward} tokens</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-lg">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-[#f9f4e1] text-sm">Role Assignment</span>
              </div>
              <span className="text-[#f9f4e1] font-semibold">{rewardRules.roleReward} tokens</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-[#f9f4e1] text-sm">Special Events</span>
              </div>
              <span className="text-[#f9f4e1] font-semibold">{rewardRules.eventReward} tokens</span>
            </div>
          </div>

          <p className="text-[#f9f4e1]/60 text-xs mt-4">Rewards are issued automatically based on Discord activity</p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold">Active Perks</h2>
            <motion.button
              onClick={() => setShowPerks(!showPerks)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-orange-500 hover:text-orange-400 text-xs md:text-sm font-medium transition-colors"
            >
              Manage
            </motion.button>
          </div>

          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk.id} className="p-3 bg-[#0a0e1a] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#f9f4e1] font-medium text-sm">{perk.name}</span>
                  <span className="text-[#f9f4e1]/60 text-xs">{perk.unlockedCount} unlocked</span>
                </div>
                <p className="text-[#f9f4e1]/60 text-xs mb-2">{perk.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#f9f4e1]/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                      style={{ width: `${Math.min((perk.unlockedCount / stats.activeFans) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-[#f9f4e1]/60 text-xs">{perk.threshold} tokens</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Automatic Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold">Recent Automatic Rewards</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-orange-500 hover:text-orange-400 text-xs md:text-sm font-medium transition-colors"
          >
            View All
          </motion.button>
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
                  <p className="text-[#f9f4e1] font-medium text-sm md:text-base truncate">{reward.recipient}</p>
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