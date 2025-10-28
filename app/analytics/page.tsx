'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Gift, 
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

interface AnalyticsData {
  totalRewards: number;
  totalFans: number;
  totalFreelancers: number;
  monthlyGrowth: number;
  engagementRate: number;
  averageReward: number;
  topPlatform: string;
  rewardsByPlatform: { platform: string; amount: number; percentage: number }[];
  rewardsByType: { type: string; amount: number; percentage: number }[];
  monthlyTrend: { month: string; rewards: number; fans: number }[];
}

export function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRewards: 1247,
    totalFans: 89,
    totalFreelancers: 12,
    monthlyGrowth: 23.5,
    engagementRate: 78.2,
    averageReward: 45.6,
    topPlatform: 'Patreon',
    rewardsByPlatform: [
      { platform: 'Patreon', amount: 450, percentage: 36.1 },
      { platform: 'YouTube', amount: 320, percentage: 25.7 },
      { platform: 'Discord', amount: 280, percentage: 22.5 },
      { platform: 'Substack', amount: 197, percentage: 15.8 }
    ],
    rewardsByType: [
      { type: 'Fan Rewards', amount: 890, percentage: 71.4 },
      { type: 'Freelancer Payments', amount: 357, percentage: 28.6 }
    ],
    monthlyTrend: [
      { month: 'Jan', rewards: 120, fans: 45 },
      { month: 'Feb', rewards: 180, fans: 52 },
      { month: 'Mar', rewards: 220, fans: 61 },
      { month: 'Apr', rewards: 280, fans: 68 },
      { month: 'May', rewards: 350, fans: 75 },
      { month: 'Jun', rewards: 420, fans: 82 },
      { month: 'Jul', rewards: 480, fans: 89 }
    ]
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const getGrowthIcon = (value: number) => {
    return value > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    );
  };

  const getGrowthColor = (value: number) => {
    return value > 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-lora text-[#f9f4e1] text-3xl font-semibold">Analytics</h1>
          <p className="text-[#f9f4e1]/70 mt-1">Track your community growth and engagement</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#0a0e1a] text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
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
            {getGrowthIcon(analyticsData.monthlyGrowth)}
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{analyticsData.totalRewards.toLocaleString()}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Total Rewards</p>
          <div className={`flex items-center gap-1 text-sm mt-2 ${getGrowthColor(analyticsData.monthlyGrowth)}`}>
            <span>{analyticsData.monthlyGrowth > 0 ? '+' : ''}{analyticsData.monthlyGrowth}%</span>
            <span>vs last month</span>
          </div>
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
            {getGrowthIcon(12.3)}
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{analyticsData.totalFans}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Active Fans</p>
          <div className="flex items-center gap-1 text-sm mt-2 text-green-400">
            <span>+12.3%</span>
            <span>vs last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            {getGrowthIcon(5.7)}
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{analyticsData.engagementRate}%</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Engagement Rate</p>
          <div className="flex items-center gap-1 text-sm mt-2 text-green-400">
            <span>+5.7%</span>
            <span>vs last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            {getGrowthIcon(-2.1)}
          </div>
          <h3 className="text-[#f9f4e1] text-2xl font-semibold">{analyticsData.averageReward}</h3>
          <p className="text-[#f9f4e1]/70 text-sm">Avg Reward</p>
          <div className="flex items-center gap-1 text-sm mt-2 text-red-400">
            <span>-2.1%</span>
            <span>vs last month</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Monthly Trend</h2>
            <BarChart3 className="w-5 h-5 text-[#f9f4e1]/70" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.monthlyTrend.map((data, index) => (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-12 text-[#f9f4e1]/70 text-sm font-medium">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-[#0a0e1a] rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.rewards / 500) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                      />
                    </div>
                    <span className="text-[#f9f4e1] text-sm font-medium">{data.rewards}</span>
                  </div>
                  <div className="text-[#f9f4e1]/60 text-xs">{data.fans} fans</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Platform Distribution</h2>
            <PieChart className="w-5 h-5 text-[#f9f4e1]/70" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.rewardsByPlatform.map((platform, index) => (
              <div key={platform.platform} className="flex items-center gap-4">
                <div className="w-20 text-[#f9f4e1]/70 text-sm font-medium">{platform.platform}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-[#0a0e1a] rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${platform.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                    <span className="text-[#f9f4e1] text-sm font-medium">{platform.percentage}%</span>
                  </div>
                  <div className="text-[#f9f4e1]/60 text-xs">{platform.amount} rewards</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reward Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Reward Types</h2>
            <Target className="w-5 h-5 text-[#f9f4e1]/70" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.rewardsByType.map((type, index) => (
              <div key={type.type} className="flex items-center gap-4">
                <div className="w-24 text-[#f9f4e1]/70 text-sm font-medium">{type.type}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-[#0a0e1a] rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${type.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`h-2 rounded-full ${
                          type.type === 'Fan Rewards' 
                            ? 'bg-gradient-to-r from-green-500 to-green-600' 
                            : 'bg-gradient-to-r from-blue-500 to-blue-600'
                        }`}
                      />
                    </div>
                    <span className="text-[#f9f4e1] text-sm font-medium">{type.percentage}%</span>
                  </div>
                  <div className="text-[#f9f4e1]/60 text-xs">{type.amount} rewards</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Top Platforms</h2>
            <TrendingUp className="w-5 h-5 text-[#f9f4e1]/70" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.rewardsByPlatform
              .sort((a, b) => b.amount - a.amount)
              .slice(0, 3)
              .map((platform, index) => (
                <div key={platform.platform} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#f9f4e1] font-medium">{platform.platform}</span>
                      <span className="text-[#f9f4e1]/70 text-sm">{platform.amount} rewards</span>
                    </div>
                    <div className="text-[#f9f4e1]/60 text-xs">{platform.percentage}% of total</div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
