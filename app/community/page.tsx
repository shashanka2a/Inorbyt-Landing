'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { 
  Users, 
  Gift, 
  TrendingUp, 
  Calendar,
  Filter,
  Search,
  MoreHorizontal,
  Star,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

interface CommunityMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  tokensEarned: number;
  lastActive: Date;
  platform: string;
  perksUnlocked: number;
}

function CommunityPageContent() {
  const [members, setMembers] = useState<CommunityMember[]>([
    {
      id: '1',
      name: 'Sarah Fan',
      username: '@sarahfan123',
      avatar: 'S',
      tokensEarned: 450,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      platform: 'Discord',
      perksUnlocked: 3
    },
    {
      id: '2',
      name: 'Mike Supporter',
      username: '@mike_supports',
      avatar: 'M',
      tokensEarned: 320,
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
      platform: 'Discord',
      perksUnlocked: 2
    },
    {
      id: '3',
      name: 'Emma Fan',
      username: '@emma_fan',
      avatar: 'E',
      tokensEarned: 200,
      lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000),
      platform: 'Discord',
      perksUnlocked: 1
    },
    {
      id: '4',
      name: 'Alex Member',
      username: '@alex_member',
      avatar: 'A',
      tokensEarned: 180,
      lastActive: new Date(Date.now() - 8 * 60 * 60 * 1000),
      platform: 'Discord',
      perksUnlocked: 1
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-lora text-[#f9f4e1] text-2xl md:text-3xl font-semibold">Community</h1>
          <p className="text-[#f9f4e1]/70 mt-1 text-sm md:text-base">Manage your Discord community and active fans</p>
        </div>
        <div className="relative flex-1 md:flex-initial max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/40" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] placeholder-[#f9f4e1]/40 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">{members.length}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Active Fans</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">
            {members.reduce((sum, member) => sum + member.perksUnlocked, 0)}
          </h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Perks Unlocked</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6 col-span-2 md:col-span-1"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-xl md:text-2xl font-semibold">
            {members.reduce((sum, member) => sum + member.tokensEarned, 0).toLocaleString()}
          </h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Tokens Distributed</p>
        </motion.div>
      </div>

      {/* Members List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Community Members</h2>
          <span className="text-[#f9f4e1]/60 text-sm">{filteredMembers.length} members</span>
        </div>

        <div className="space-y-4">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/5 hover:border-[#f9f4e1]/10 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-500/20">
                  <span className="text-white font-semibold">{member.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[#f9f4e1] font-semibold text-sm md:text-base">{member.name}</h3>
                  </div>
                  <p className="text-[#f9f4e1]/60 text-xs md:text-sm truncate">{member.username}</p>
                  <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-[#f9f4e1]/60 mt-1 flex-wrap">
                    <span>{member.tokensEarned} tokens</span>
                    <span>•</span>
                    <span>{formatLastActive(member.lastActive)}</span>
                    <span>•</span>
                    <span>{member.platform}</span>
                    <span>•</span>
                    <span>{member.perksUnlocked} perks</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors">
                  <MessageSquare className="w-4 h-4 text-[#f9f4e1]/70" />
                </button>
                <button className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-[#f9f4e1]/70" />
                </button>
                <button className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-[#f9f4e1]/70" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function CommunityPage() {
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
      <CommunityPageContent />
    </DashboardLayout>
  );
}
