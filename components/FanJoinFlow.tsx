'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ExternalLink, 
  Gift, 
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';

interface FanJoinFlowProps {
  creatorSlug?: string;
  onComplete?: () => void;
}

export function FanJoinFlow({ creatorSlug = 'sarah-chen', onComplete }: FanJoinFlowProps) {
  const [currentStep, setCurrentStep] = useState<'discord' | 'welcome' | 'complete'>('discord');
  const [discordConnected, setDiscordConnected] = useState(false);
  const [welcomeReward, setWelcomeReward] = useState(10);
  const [walletCreated, setWalletCreated] = useState(false);

  const handleConnectDiscord = () => {
    setDiscordConnected(true);
    // Mock wallet creation
    setTimeout(() => {
      setWalletCreated(true);
      setTimeout(() => {
        setCurrentStep('welcome');
      }, 1000);
    }, 1500);
  };

  const handleContinue = () => {
    if (currentStep === 'welcome') {
      setCurrentStep('complete');
    } else if (currentStep === 'complete' && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {['discord', 'welcome', 'complete'].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step ? 'bg-orange-500' :
                  ['discord', 'welcome', 'complete'].indexOf(currentStep) > index ? 'bg-green-500' :
                  'bg-[#f9f4e1]/20'
                }`}>
                  {['discord', 'welcome', 'complete'].indexOf(currentStep) > index ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-white text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 ${
                    ['discord', 'welcome', 'complete'].indexOf(currentStep) > index ? 'bg-green-500' : 'bg-[#f9f4e1]/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 'discord' && (
            <motion.div
              key="discord"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5865F2] to-[#4752C4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
                  Connect with Discord
                </h2>
                <p className="text-[#f9f4e1]/70">
                  Sign in with Discord to join this creator's reward community. Your wallet will be created automatically!
                </p>
              </div>

              <motion.button
                onClick={handleConnectDiscord}
                disabled={discordConnected}
                className="w-full px-6 py-4 bg-[#5865F2] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4752C4] transition-all duration-200 flex items-center justify-center gap-2"
              >
                {discordConnected ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Connecting...
                  </>
                ) : walletCreated ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Connected!
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5" />
                    Sign in with Discord
                  </>
                )}
              </motion.button>

              <div className="mt-6 space-y-2 text-sm text-[#f9f4e1]/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Wallet created automatically (no crypto knowledge needed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Secure OAuth authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Start earning rewards immediately</span>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
                Welcome to the Community!
              </h2>
              <p className="text-[#f9f4e1]/70 mb-6">
                You've successfully joined and earned your welcome reward!
              </p>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-orange-400" />
                  <span className="text-[#f9f4e1] text-3xl font-bold">+{welcomeReward}</span>
                  <span className="text-[#f9f4e1]/70">tokens</span>
                </div>
                <p className="text-[#f9f4e1]/60 text-sm">Welcome reward automatically added to your wallet</p>
              </div>

              <div className="bg-[#0a0e1a] rounded-lg p-4 mb-6">
                <h3 className="text-[#f9f4e1] font-semibold mb-2 text-sm">What's Next?</h3>
                <div className="space-y-2 text-left text-sm text-[#f9f4e1]/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Engage in Discord to earn more tokens automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Unlock perks as you reach token milestones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Track your progress in your dashboard</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Continue to Dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.button>
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
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
                You're All Set!
              </h2>
              <p className="text-[#f9f4e1]/70 mb-6">
                You've joined the reward community. Start engaging in Discord to earn tokens automatically!
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleContinue}
                  className="flex-1 px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors"
                >
                  View Dashboard
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  Explore More
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
