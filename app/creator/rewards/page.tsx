'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Filter,
  Users,
  MessageSquare,
  Award,
  Sparkles,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface Reward {
  id: string;
  fanName: string;
  reason: string;
  tokens: number;
  eventType: 'join' | 'message' | 'role' | 'event';
  timestamp: Date;
}

export default function CreatorRewardsPage() {
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      fanName: '@mike_designer',
      reason: 'Welcome reward',
      tokens: 10,
      eventType: 'join',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      fanName: '@emma_music',
      reason: 'Message activity',
      tokens: 5,
      eventType: 'message',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      fanName: '@sarah_writer',
      reason: 'Role earned',
      tokens: 20,
      eventType: 'role',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: '4',
      fanName: '@leo_visuals',
      reason: 'Special event',
      tokens: 15,
      eventType: 'event',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '5',
      fanName: '@alex_coder',
      reason: 'Welcome reward',
      tokens: 10,
      eventType: 'join',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.fanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEventType = selectedEventType === 'all' || reward.eventType === selectedEventType;
    return matchesSearch && matchesEventType;
  });

  const paginatedRewards = filteredRewards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
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
        return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Fan Name', 'Reason', 'Tokens', 'Event Type', 'Timestamp'],
      ...filteredRewards.map(r => [
        r.fanName,
        r.reason,
        r.tokens.toString(),
        r.eventType,
        r.timestamp.toISOString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rewards-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/creator/dashboard"
            className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-lora text-[#f9f4e1] text-2xl md:text-3xl font-semibold">Rewards History</h1>
            <p className="text-[#f9f4e1]/70 mt-1 text-sm md:text-base">View and export all issued rewards</p>
          </div>
        </div>
        <motion.button
          onClick={handleExportCSV}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 border border-[#f9f4e1]/20 rounded-lg text-[#f9f4e1] font-medium transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fan name or reason..."
              className="w-full pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Event Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/60" />
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Event Types</option>
              <option value="join">Join</option>
              <option value="message">Message</option>
              <option value="role">Role</option>
              <option value="event">Event</option>
            </select>
          </div>

          {/* Time Range Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/60" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rewards Table */}
      <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e1a] border-b border-[#f9f4e1]/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#f9f4e1]/70 uppercase tracking-wider">Fan</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#f9f4e1]/70 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#f9f4e1]/70 uppercase tracking-wider">Event Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#f9f4e1]/70 uppercase tracking-wider">Tokens</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#f9f4e1]/70 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f9f4e1]/5">
              {paginatedRewards.map((reward) => (
                <motion.tr
                  key={reward.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-[#0a0e1a]/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#f9f4e1]/10 flex items-center justify-center">
                        {getEventIcon(reward.eventType)}
                      </div>
                      <span className="text-[#f9f4e1] font-medium text-sm">{reward.fanName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#f9f4e1]/80 text-sm">{reward.reason}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-[#0a0e1a] rounded text-xs text-[#f9f4e1]/70">
                      {getEventIcon(reward.eventType)}
                      {getEventTypeLabel(reward.eventType)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#f9f4e1] font-semibold text-sm">+{reward.tokens}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#f9f4e1]/60 text-sm">{formatTimeAgo(reward.timestamp)}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[#f9f4e1]/10 flex items-center justify-between">
            <p className="text-[#f9f4e1]/60 text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRewards.length)} of {filteredRewards.length} rewards
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

