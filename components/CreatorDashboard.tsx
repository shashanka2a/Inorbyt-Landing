'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Users, 
  Gift, 
  TrendingUp, 
  Activity,
  Send,
  Copy,
  ExternalLink,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface Reward {
  id: string;
  recipient: string;
  amount: number;
  reason: string;
  status: 'pending' | 'sent' | 'failed';
  timestamp: Date;
  type: 'fan' | 'freelancer';
}

interface CreatorStats {
  totalRewards: number;
  totalFans: number;
  totalFreelancers: number;
  tokenBalance: number;
  monthlyRewards: number;
}

export function CreatorDashboard() {
  const [stats, setStats] = useState<CreatorStats>({
    totalRewards: 1247,
    totalFans: 89,
    totalFreelancers: 12,
    tokenBalance: 50000,
    monthlyRewards: 89
  });

  const [recentRewards, setRecentRewards] = useState<Reward[]>([
    {
      id: '1',
      recipient: '@sarahfan123',
      amount: 50,
      reason: 'Shared my latest video',
      status: 'sent',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'fan'
    },
    {
      id: '2',
      recipient: '@designer_mike',
      amount: 200,
      reason: 'Logo design completed',
      status: 'sent',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'freelancer'
    },
    {
      id: '3',
      recipient: '@music_lover',
      amount: 25,
      reason: 'First-time supporter',
      status: 'pending',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: 'fan'
    }
  ]);

  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardForm, setRewardForm] = useState({
    recipient: '',
    amount: '',
    reason: '',
    type: 'fan' as 'fan' | 'freelancer'
  });

  const handleSendReward = () => {
    const newReward: Reward = {
      id: Date.now().toString(),
      recipient: rewardForm.recipient,
      amount: parseInt(rewardForm.amount),
      reason: rewardForm.reason,
      status: 'pending',
      timestamp: new Date(),
      type: rewardForm.type
    };

    setRecentRewards(prev => [newReward, ...prev]);
    setStats(prev => ({
      ...prev,
      totalRewards: prev.totalRewards + parseInt(rewardForm.amount),
      monthlyRewards: prev.monthlyRewards + 1
    }));

    // Mock sending
    setTimeout(() => {
      setRecentRewards(prev => prev.map(reward => 
        reward.id === newReward.id ? { ...reward, status: 'sent' } : reward
      ));
    }, 2000);

    setShowRewardModal(false);
    setRewardForm({ recipient: '', amount: '', reason: '', type: 'fan' });
  };

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
        return <CheckCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-lora text-[#f9f4e1] text-3xl font-semibold">Creator Dashboard</h1>
          <p className="text-[#f9f4e1]/70 mt-1">Manage your community rewards and track engagement</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowRewardModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Send Reward
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-orange-500" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{stats.totalRewards.toLocaleString()}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Total Rewards Sent</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{stats.totalFans}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Active Fans</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-amber-500" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{stats.totalFreelancers}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Freelancers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{stats.tokenBalance.toLocaleString()}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Token Balance</p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Recent Rewards</h2>
          <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentRewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  reward.type === 'fan' ? 'bg-purple-500/20' : 'bg-amber-500/20'
                }`}>
                  {reward.type === 'fan' ? (
                    <Users className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Send className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="text-[#f9f4e1] font-medium">{reward.recipient}</p>
                  <p className="text-[#f9f4e1]/60 text-sm">{reward.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[#f9f4e1] font-semibold">+{reward.amount}</p>
                  <p className="text-[#f9f4e1]/60 text-sm">{formatTimeAgo(reward.timestamp)}</p>
                </div>
                {getStatusIcon(reward.status)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && (
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
                    <button
                      onClick={() => setRewardForm(prev => ({ ...prev, type: 'fan' }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        rewardForm.type === 'fan'
                          ? 'bg-purple-500 text-white'
                          : 'bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
                      }`}
                    >
                      Fan
                    </button>
                    <button
                      onClick={() => setRewardForm(prev => ({ ...prev, type: 'freelancer' }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        rewardForm.type === 'freelancer'
                          ? 'bg-amber-500 text-white'
                          : 'bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
                      }`}
                    >
                      Freelancer
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#f9f4e1]/70 text-sm mb-2">Recipient</label>
                  <input
                    type="text"
                    placeholder="@username"
                    value={rewardForm.recipient}
                    onChange={(e) => setRewardForm(prev => ({ ...prev, recipient: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[#f9f4e1]/70 text-sm mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={rewardForm.amount}
                    onChange={(e) => setRewardForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[#f9f4e1]/70 text-sm mb-2">Reason</label>
                  <textarea
                    placeholder="Why are you rewarding them?"
                    value={rewardForm.reason}
                    onChange={(e) => setRewardForm(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="flex-1 px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReward}
                  disabled={!rewardForm.recipient || !rewardForm.amount || !rewardForm.reason}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
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
