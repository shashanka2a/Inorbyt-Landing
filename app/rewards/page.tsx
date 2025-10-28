'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Users,
  Briefcase,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';

interface Reward {
  id: string;
  recipient: string;
  recipientType: 'fan' | 'freelancer';
  amount: number;
  reason: string;
  status: 'pending' | 'sent' | 'failed';
  timestamp: Date;
  platform: string;
  tokenSymbol: string;
}

interface RewardTemplate {
  id: string;
  name: string;
  amount: number;
  reason: string;
  recipientType: 'fan' | 'freelancer';
}

export function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      recipient: '@sarahfan123',
      recipientType: 'fan',
      amount: 50,
      reason: 'Shared my latest video',
      status: 'sent',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      platform: 'YouTube',
      tokenSymbol: 'SARAH'
    },
    {
      id: '2',
      recipient: '@designer_mike',
      recipientType: 'freelancer',
      amount: 200,
      reason: 'Logo design completed',
      status: 'sent',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      platform: 'Discord',
      tokenSymbol: 'SARAH'
    },
    {
      id: '3',
      recipient: '@music_lover',
      recipientType: 'fan',
      amount: 25,
      reason: 'First-time supporter',
      status: 'pending',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      platform: 'Patreon',
      tokenSymbol: 'SARAH'
    },
    {
      id: '4',
      recipient: '@video_editor',
      recipientType: 'freelancer',
      amount: 150,
      reason: 'Video editing service',
      status: 'failed',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      platform: 'Substack',
      tokenSymbol: 'SARAH'
    }
  ]);

  const [templates, setTemplates] = useState<RewardTemplate[]>([
    {
      id: '1',
      name: 'Video Share Reward',
      amount: 50,
      reason: 'Thanks for sharing my content!',
      recipientType: 'fan'
    },
    {
      id: '2',
      name: 'First Supporter',
      amount: 25,
      reason: 'Welcome to the community!',
      recipientType: 'fan'
    },
    {
      id: '3',
      name: 'Design Work',
      amount: 200,
      reason: 'Great work on the design!',
      recipientType: 'freelancer'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'sent' | 'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'fan' | 'freelancer'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<RewardTemplate | null>(null);

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reward.status === statusFilter;
    const matchesType = typeFilter === 'all' || reward.recipientType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-400 bg-green-500/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-[#f9f4e1]/60 bg-[#f9f4e1]/10';
    }
  };

  const handleUseTemplate = (template: RewardTemplate) => {
    setSelectedTemplate(template);
    setShowCreateModal(true);
    setShowTemplateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-lora text-[#f9f4e1] text-3xl font-semibold">Rewards</h1>
          <p className="text-[#f9f4e1]/70 mt-1">Manage and track your community rewards</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors"
          >
            <Copy className="w-4 h-4" />
            Templates
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Send Reward
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/40" />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] placeholder-[#f9f4e1]/40 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'pending', 'sent', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === status
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {['all', 'fan', 'freelancer'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                typeFilter === type
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Recent Rewards</h2>
          <span className="text-[#f9f4e1]/60 text-sm">{filteredRewards.length} rewards</span>
        </div>

        <div className="space-y-4">
          {filteredRewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/5 hover:border-[#f9f4e1]/10 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  reward.recipientType === 'fan' ? 'bg-purple-500/20' : 'bg-amber-500/20'
                }`}>
                  {reward.recipientType === 'fan' ? (
                    <Users className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Briefcase className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#f9f4e1] font-medium">{reward.recipient}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      reward.recipientType === 'fan' ? 'bg-purple-500/20 text-purple-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {reward.recipientType}
                    </span>
                  </div>
                  <p className="text-[#f9f4e1]/70 text-sm">{reward.reason}</p>
                  <div className="flex items-center gap-4 text-xs text-[#f9f4e1]/60 mt-1">
                    <span>{formatTimeAgo(reward.timestamp)}</span>
                    <span>•</span>
                    <span>{reward.platform}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[#f9f4e1] font-semibold">+{reward.amount} {reward.tokenSymbol}</p>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(reward.status)}`}>
                    {getStatusIcon(reward.status)}
                    <span className="capitalize">{reward.status}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors">
                    <Edit className="w-4 h-4 text-[#f9f4e1]/70" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#f9f4e1]/70" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Template Modal */}
      <AnimatePresence>
        {showTemplateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-lora text-[#f9f4e1] text-xl font-semibold">Reward Templates</h3>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#f9f4e1]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10 hover:border-orange-500/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[#f9f4e1] font-semibold">{template.name}</h4>
                        <p className="text-[#f9f4e1]/70 text-sm">{template.reason}</p>
                        <div className="flex items-center gap-4 text-xs text-[#f9f4e1]/60 mt-1">
                          <span>{template.amount} tokens</span>
                          <span>•</span>
                          <span className="capitalize">{template.recipientType}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-colors"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Reward Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 max-w-md w-full"
            >
              <h3 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-6">Send Reward</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#f9f4e1]/70 text-sm mb-2">Recipient Type</label>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-purple-500 text-white">
                      Fan
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]">
                      Freelancer
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#f9f4e1]/70 text-sm mb-2">Recipient</label>
                  <input
                    type="text"
                    placeholder="@username"
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[#f9f4e1]/70 text-sm mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[#f9f4e1]/70 text-sm mb-2">Reason</label>
                  <textarea
                    placeholder="Why are you rewarding them?"
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
                  Send Reward
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
