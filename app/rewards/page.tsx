'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Search, 
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  Award,
  Sparkles,
  Gift,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface AutomaticReward {
  id: string;
  recipient: string;
  amount: number;
  eventType: 'welcome' | 'message' | 'role' | 'event';
  timestamp: Date;
  platform: string;
}

function RewardsPageContent() {
  const [rewards] = useState<AutomaticReward[]>([
    {
      id: '1',
      recipient: '@sarahfan123',
      amount: 10,
      eventType: 'welcome',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      platform: 'Discord'
    },
    {
      id: '2',
      recipient: '@mike_supports',
      amount: 5,
      eventType: 'message',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      platform: 'Discord'
    },
    {
      id: '3',
      recipient: '@emma_fan',
      amount: 20,
      eventType: 'role',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      platform: 'Discord'
    },
    {
      id: '4',
      recipient: '@alex_member',
      amount: 15,
      eventType: 'event',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      platform: 'Discord'
    },
    {
      id: '5',
      recipient: '@john_designer',
      amount: 10,
      eventType: 'welcome',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      platform: 'Discord'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState<'all' | 'welcome' | 'message' | 'role' | 'event'>('all');

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = eventFilter === 'all' || reward.eventType === eventFilter;
    return matchesSearch && matchesEvent;
  });

  const totalRewards = rewards.reduce((sum, r) => sum + r.amount, 0);
  const rewardsByType = {
    welcome: rewards.filter(r => r.eventType === 'welcome').length,
    message: rewards.filter(r => r.eventType === 'message').length,
    role: rewards.filter(r => r.eventType === 'role').length,
    event: rewards.filter(r => r.eventType === 'event').length
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

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'welcome':
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

  const getEventLabel = (type: string) => {
    switch (type) {
      case 'welcome': return 'Welcome Reward';
      case 'message': return 'Message Activity';
      case 'role': return 'Role Assignment';
      case 'event': return 'Special Event';
      default: return type;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-lora text-[#f9f4e1] text-2xl md:text-3xl font-semibold">Automatic Rewards</h1>
          <p className="text-[#f9f4e1]/70 mt-1 text-sm md:text-base">Track automatic rewards issued to your Discord community</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6 col-span-2 md:col-span-1"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">{totalRewards}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Total Distributed</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mb-2" />
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">{rewardsByType.welcome}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Welcome</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-2" />
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">{rewardsByType.message}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Messages</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <Award className="w-5 h-5 md:w-6 md:h-6 text-amber-400 mb-2" />
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">{rewardsByType.role}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Roles</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-orange-400 mb-2" />
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">{rewardsByType.event}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Events</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/40" />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] placeholder-[#f9f4e1]/40 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {['all', 'welcome', 'message', 'role', 'event'].map((eventType) => (
            <button
              key={eventType}
              onClick={() => setEventFilter(eventType as any)}
              className={`px-3 py-1 rounded-lg text-xs md:text-sm font-medium transition-colors capitalize ${
                eventFilter === eventType
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
              }`}
            >
              {eventType}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="font-lora text-[#f9f4e1] text-lg md:text-xl font-semibold">Recent Automatic Rewards</h2>
          <span className="text-[#f9f4e1]/60 text-xs md:text-sm">{filteredRewards.length} rewards</span>
        </div>

        <div className="space-y-3 md:space-y-4">
          {filteredRewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 md:p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/5 hover:border-[#f9f4e1]/10 transition-all duration-200"
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#f9f4e1]/10 flex items-center justify-center flex-shrink-0">
                  {getEventIcon(reward.eventType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-[#f9f4e1] font-medium text-sm md:text-base truncate">{reward.recipient}</p>
                  </div>
                  <p className="text-[#f9f4e1]/70 text-xs md:text-sm">{getEventLabel(reward.eventType)}</p>
                  <div className="flex items-center gap-2 md:gap-4 text-xs text-[#f9f4e1]/60 mt-1 flex-wrap">
                    <span>{formatTimeAgo(reward.timestamp)}</span>
                    <span>•</span>
                    <span>{reward.platform}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                <div className="text-right">
                  <p className="text-[#f9f4e1] font-semibold text-sm md:text-base">+{reward.amount}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                    <span className="text-green-400 text-xs">Sent</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function RewardsPage() {
  // Mock user for demo - in production, get from auth context
  const user = {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'creator' as const,
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    plan: 'pro' as const
  };

  const handleLogout = () => {
    // Handle logout
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <RewardsPageContent />
    </DashboardLayout>
  );
}
