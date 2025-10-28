'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  role: 'fan' | 'freelancer';
  tokensEarned: number;
  lastActive: Date;
  platforms: string[];
  rating?: number;
}

export function CommunityPage() {
  const [members, setMembers] = useState<CommunityMember[]>([
    {
      id: '1',
      name: 'Sarah Fan',
      username: '@sarahfan123',
      avatar: 'S',
      role: 'fan',
      tokensEarned: 450,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      platforms: ['Patreon', 'YouTube']
    },
    {
      id: '2',
      name: 'Mike Designer',
      username: '@designer_mike',
      avatar: 'M',
      role: 'freelancer',
      tokensEarned: 1200,
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
      platforms: ['Discord'],
      rating: 4.9
    },
    {
      id: '3',
      name: 'Emma Supporter',
      username: '@emma_supports',
      avatar: 'E',
      role: 'fan',
      tokensEarned: 200,
      lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000),
      platforms: ['Substack']
    },
    {
      id: '4',
      name: 'Alex Creator',
      username: '@alex_creates',
      avatar: 'A',
      role: 'freelancer',
      tokensEarned: 800,
      lastActive: new Date(Date.now() - 8 * 60 * 60 * 1000),
      platforms: ['Patreon', 'Discord'],
      rating: 4.7
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'fan' | 'freelancer'>('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-lora text-[#f9f4e1] text-3xl font-semibold">Community</h1>
          <p className="text-[#f9f4e1]/70 mt-1">Manage your fans and freelancers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/40" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] placeholder-[#f9f4e1]/40 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'fan', 'freelancer'].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filterRole === role
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{members.filter(m => m.role === 'fan').length}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Total Fans</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{members.filter(m => m.role === 'freelancer').length}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Freelancers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">
            {members.reduce((sum, member) => sum + member.tokensEarned, 0).toLocaleString()}
          </h3>
          <p className="text-[#f9f4e1]/70 text-sm">Tokens Distributed</p>
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
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  member.role === 'fan' ? 'bg-purple-500/20' : 'bg-amber-500/20'
                }`}>
                  <span className="text-white font-semibold">{member.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#f9f4e1] font-semibold">{member.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      member.role === 'fan' ? 'bg-purple-500/20 text-purple-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {member.role}
                    </span>
                    {member.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-[#f9f4e1]/60 text-sm">{member.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[#f9f4e1]/60 text-sm">{member.username}</p>
                  <div className="flex items-center gap-4 text-sm text-[#f9f4e1]/60 mt-1">
                    <span>{member.tokensEarned} tokens earned</span>
                    <span>•</span>
                    <span>{formatLastActive(member.lastActive)}</span>
                    <span>•</span>
                    <span>{member.platforms.join(', ')}</span>
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
