'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  Calendar,
  User,
  Star,
  Plus,
  Eye,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

interface Gig {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    rating: number;
  };
  description: string;
  reward: number;
  tokenSymbol: string;
  status: 'available' | 'in-progress' | 'completed' | 'paid';
  deadline: Date;
  requirements: string[];
  skills: string[];
}

interface FreelancerStats {
  completedGigs: number;
  totalEarnings: number;
  averageRating: number;
  activeGigs: number;
}

export function FreelancerDashboard() {
  const [stats, setStats] = useState<FreelancerStats>({
    completedGigs: 12,
    totalEarnings: 2450,
    averageRating: 4.8,
    activeGigs: 3
  });

  const [gigs, setGigs] = useState<Gig[]>([
    {
      id: '1',
      title: 'Logo Design for Tech Startup',
      creator: {
        name: 'Sarah Chen',
        avatar: 'S',
        rating: 4.9
      },
      description: 'Need a modern, minimalist logo for our new AI startup. Looking for clean lines and tech-forward aesthetic.',
      reward: 500,
      tokenSymbol: 'SARAH',
      status: 'in-progress',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      requirements: ['Modern design', 'Vector format', 'Multiple variations'],
      skills: ['Logo Design', 'Branding', 'Illustrator']
    },
    {
      id: '2',
      title: 'Video Editing for YouTube Channel',
      creator: {
        name: 'Leo Visuals',
        avatar: 'L',
        rating: 4.7
      },
      description: 'Edit 10-minute educational videos with smooth transitions, graphics, and professional audio mixing.',
      reward: 300,
      tokenSymbol: 'LEO',
      status: 'available',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      requirements: ['4K quality', 'Color grading', 'Audio enhancement'],
      skills: ['Video Editing', 'After Effects', 'Color Grading']
    },
    {
      id: '3',
      title: 'Social Media Graphics Package',
      creator: {
        name: 'Maya Beats',
        avatar: 'M',
        rating: 4.8
      },
      description: 'Create a complete set of social media graphics including posts, stories, and cover images.',
      reward: 200,
      tokenSymbol: 'MAYA',
      status: 'completed',
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      requirements: ['Instagram format', 'Brand consistency', 'High resolution'],
      skills: ['Graphic Design', 'Social Media', 'Photoshop']
    }
  ]);

  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [showGigModal, setShowGigModal] = useState(false);

  const handleApplyGig = (gigId: string) => {
    setGigs(prev => prev.map(gig => 
      gig.id === gigId ? { ...gig, status: 'in-progress' } : gig
    ));
    setStats(prev => ({ ...prev, activeGigs: prev.activeGigs + 1 }));
  };

  const handleCompleteGig = (gigId: string) => {
    setGigs(prev => prev.map(gig => 
      gig.id === gigId ? { ...gig, status: 'completed' } : gig
    ));
    setStats(prev => ({ 
      ...prev, 
      completedGigs: prev.completedGigs + 1,
      activeGigs: prev.activeGigs - 1
    }));
  };

  const handleMarkPaid = (gigId: string) => {
    const gig = gigs.find(g => g.id === gigId);
    if (gig) {
      setGigs(prev => prev.map(g => 
        g.id === gigId ? { ...g, status: 'paid' } : g
      ));
      setStats(prev => ({ 
        ...prev, 
        totalEarnings: prev.totalEarnings + gig.reward
      }));
    }
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return 'Overdue';
    if (diffInDays === 0) return 'Due today';
    if (diffInDays === 1) return 'Due tomorrow';
    return `${diffInDays} days left`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-400 bg-green-500/20';
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'completed':
        return 'text-blue-400 bg-blue-500/20';
      case 'paid':
        return 'text-purple-400 bg-purple-500/20';
      default:
        return 'text-[#f9f4e1]/60 bg-[#f9f4e1]/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Plus className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'paid':
        return <DollarSign className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-lora text-[#f9f4e1] text-2xl md:text-3xl font-semibold">Freelancer Dashboard</h1>
          <p className="text-[#f9f4e1]/70 mt-1 text-sm md:text-base">Manage your gigs and track your earnings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Browse Gigs</span>
        </motion.button>
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
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.completedGigs}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Completed Gigs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-purple-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.totalEarnings.toLocaleString()}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Total Earnings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.averageRating}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Average Rating</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
            </div>
          </div>
          <h3 className="text-[#f9f4e1] text-lg md:text-2xl font-semibold">{stats.activeGigs}</h3>
          <p className="text-[#f9f4e1]/70 text-xs md:text-sm">Active Gigs</p>
        </motion.div>
      </div>

      {/* Gigs List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-xl border border-[#f9f4e1]/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Your Gigs</h2>
          <div className="flex gap-2">
            {['all', 'available', 'in-progress', 'completed'].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {gigs.map((gig, index) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/5 hover:border-[#f9f4e1]/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{gig.creator.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-[#f9f4e1] font-semibold">{gig.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#f9f4e1]/60">
                        <span>{gig.creator.name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{gig.creator.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[#f9f4e1]/70 text-sm mb-3">{gig.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-[#f9f4e1]/60">
                      <DollarSign className="w-4 h-4" />
                      <span>{gig.reward} {gig.tokenSymbol}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#f9f4e1]/60">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDeadline(gig.deadline)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#f9f4e1]/60">
                      <User className="w-4 h-4" />
                      <span>{gig.skills.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(gig.status)}`}>
                    {getStatusIcon(gig.status)}
                    <span className="capitalize">{gig.status.replace('-', ' ')}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedGig(gig);
                        setShowGigModal(true);
                      }}
                      className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-[#f9f4e1]/70" />
                    </button>
                    
                    {gig.status === 'available' && (
                      <button
                        onClick={() => handleApplyGig(gig.id)}
                        className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-sm font-medium hover:bg-orange-500/30 transition-colors"
                      >
                        Apply
                      </button>
                    )}
                    
                    {gig.status === 'in-progress' && (
                      <button
                        onClick={() => handleCompleteGig(gig.id)}
                        className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-medium hover:bg-green-500/30 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                    
                    {gig.status === 'completed' && (
                      <button
                        onClick={() => handleMarkPaid(gig.id)}
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-sm font-medium hover:bg-purple-500/30 transition-colors"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gig Detail Modal */}
      <AnimatePresence>
        {showGigModal && selectedGig && (
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
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-lora text-[#f9f4e1] text-xl font-semibold">{selectedGig.title}</h3>
                <button
                  onClick={() => setShowGigModal(false)}
                  className="p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#f9f4e1]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">{selectedGig.creator.avatar}</span>
                  </div>
                  <div>
                    <p className="text-[#f9f4e1] font-semibold">{selectedGig.creator.name}</p>
                    <div className="flex items-center gap-2 text-sm text-[#f9f4e1]/60">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{selectedGig.creator.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{selectedGig.reward} {selectedGig.tokenSymbol}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[#f9f4e1] font-semibold mb-2">Description</h4>
                  <p className="text-[#f9f4e1]/70">{selectedGig.description}</p>
                </div>

                <div>
                  <h4 className="text-[#f9f4e1] font-semibold mb-2">Requirements</h4>
                  <ul className="space-y-1">
                    {selectedGig.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-[#f9f4e1]/70">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#f9f4e1] font-semibold mb-2">Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGig.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-sm text-[#f9f4e1]/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#f9f4e1]/10">
                  <div className="text-sm text-[#f9f4e1]/60">
                    Deadline: {formatDeadline(selectedGig.deadline)}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowGigModal(false)}
                      className="px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors"
                    >
                      Close
                    </button>
                    {selectedGig.status === 'available' && (
                      <button
                        onClick={() => {
                          handleApplyGig(selectedGig.id);
                          setShowGigModal(false);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
