'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Gift, 
  Users, 
  Clock,
  AlertCircle,
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  tokenSymbol: string;
  platforms: string[];
  verified: boolean;
}

interface ClaimableReward {
  id: string;
  creator: Creator;
  amount: number;
  reason: string;
  platform: string;
  timestamp: Date;
  claimed: boolean;
}

export function FanVerificationFlow() {
  const [currentStep, setCurrentStep] = useState<'verify' | 'claim' | 'complete'>('verify');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const [claimableRewards, setClaimableRewards] = useState<ClaimableReward[]>([
    {
      id: '1',
      creator: {
        id: '1',
        name: 'Sarah Chen',
        tokenSymbol: 'SARAH',
        platforms: ['Patreon', 'YouTube'],
        verified: true
      },
      amount: 50,
      reason: 'Shared latest video',
      platform: 'YouTube',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      claimed: false
    },
    {
      id: '2',
      creator: {
        id: '2',
        name: 'Leo Visuals',
        tokenSymbol: 'LEO',
        platforms: ['Patreon', 'Discord'],
        verified: true
      },
      amount: 25,
      reason: 'First-time supporter',
      platform: 'Patreon',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      claimed: false
    }
  ]);

  const [totalClaimed, setTotalClaimed] = useState(0);

  const handleVerifyPlatform = (platform: string) => {
    setVerificationStatus('pending');
    
    // Mock verification process
    setTimeout(() => {
      setVerificationStatus('verified');
      setTimeout(() => {
        setCurrentStep('claim');
      }, 1000);
    }, 2000);
  };

  const handleClaimReward = (rewardId: string) => {
    setClaimableRewards(prev => prev.map(reward => 
      reward.id === rewardId ? { ...reward, claimed: true } : reward
    ));
    
    const reward = claimableRewards.find(r => r.id === rewardId);
    if (reward) {
      setTotalClaimed(prev => prev + reward.amount);
    }
  };

  const handleClaimAll = () => {
    const unclaimedRewards = claimableRewards.filter(r => !r.claimed);
    const totalAmount = unclaimedRewards.reduce((sum, reward) => sum + reward.amount, 0);
    
    setClaimableRewards(prev => prev.map(reward => ({ ...reward, claimed: true })));
    setTotalClaimed(prev => prev + totalAmount);
    
    setTimeout(() => {
      setCurrentStep('complete');
    }, 1500);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {['verify', 'claim', 'complete'].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step ? 'bg-orange-500' :
                  ['verify', 'claim', 'complete'].indexOf(currentStep) > index ? 'bg-green-500' :
                  'bg-[#f9f4e1]/20'
                }`}>
                  {['verify', 'claim', 'complete'].indexOf(currentStep) > index ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-white text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 ${
                    ['verify', 'claim', 'complete'].indexOf(currentStep) > index ? 'bg-green-500' : 'bg-[#f9f4e1]/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
                  Verify Your Platform
                </h2>
                <p className="text-[#f9f4e1]/70">
                  Connect your platform account to start claiming rewards from creators
                </p>
              </div>

              <div className="space-y-4">
                {['Patreon', 'YouTube', 'Substack', 'Discord'].map((platform) => (
                  <motion.button
                    key={platform}
                    onClick={() => handleVerifyPlatform(platform)}
                    disabled={verificationStatus === 'pending'}
                    className="w-full p-4 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg hover:border-orange-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#f9f4e1]/10 rounded-lg flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-[#f9f4e1]/70" />
                        </div>
                        <div className="text-left">
                          <p className="text-[#f9f4e1] font-medium">{platform}</p>
                          <p className="text-[#f9f4e1]/60 text-sm">Connect your account</p>
                        </div>
                      </div>
                      {verificationStatus === 'pending' ? (
                        <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                      ) : verificationStatus === 'verified' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-[#f9f4e1]/40" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {verificationStatus === 'verified' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Platform verified successfully!</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentStep === 'claim' && (
            <motion.div
              key="claim"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
                  Claim Your Rewards
                </h2>
                <p className="text-[#f9f4e1]/70">
                  You have {claimableRewards.filter(r => !r.claimed).length} unclaimed rewards
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {claimableRewards.map((reward) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      reward.claimed 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : 'bg-[#0a0e1a] border-[#f9f4e1]/10 hover:border-orange-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {reward.creator.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#f9f4e1] font-medium">{reward.creator.name}</p>
                          <p className="text-[#f9f4e1]/60 text-sm">{reward.reason}</p>
                          <p className="text-[#f9f4e1]/40 text-xs">{formatTimeAgo(reward.timestamp)} • {reward.platform}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#f9f4e1] font-semibold">+{reward.amount} {reward.creator.tokenSymbol}</p>
                        {reward.claimed ? (
                          <div className="flex items-center gap-1 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Claimed</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleClaimReward(reward.id)}
                            className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-sm font-medium hover:bg-orange-500/30 transition-colors"
                          >
                            Claim
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {claimableRewards.some(r => !r.claimed) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClaimAll}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  Claim All Rewards
                </motion.button>
              )}
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
                Welcome to InOrbyt!
              </h2>
              <p className="text-[#f9f4e1]/70 mb-6">
                You've successfully claimed {totalClaimed} tokens. You're now part of the reward ecosystem!
              </p>
              
              <div className="bg-[#0a0e1a] rounded-lg p-4 mb-6">
                <h3 className="text-[#f9f4e1] font-semibold mb-2">Your Wallet</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#f9f4e1]/70">Total Balance:</span>
                  <span className="text-[#f9f4e1] font-semibold">{totalClaimed} tokens</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors">
                  View Dashboard
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
                  Explore Creators
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
