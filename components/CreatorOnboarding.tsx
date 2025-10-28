'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  Link as LinkIcon, 
  Coins, 
  Users, 
  Zap,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
}

interface CreatorOnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function CreatorOnboarding({ onComplete, onSkip }: CreatorOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'connect-wallet',
      title: 'Connect Your Wallet',
      description: 'Connect your wallet to Base network to start creating rewards',
      icon: LinkIcon,
      completed: false
    },
    {
      id: 'create-token',
      title: 'Create Your Creator Token',
      description: 'Deploy your unique token that represents your community',
      icon: Coins,
      completed: false
    },
    {
      id: 'link-platforms',
      title: 'Connect Your Platforms',
      description: 'Link Patreon, YouTube, Substack, or Discord to your reward system',
      icon: Users,
      completed: false
    },
    {
      id: 'first-reward',
      title: 'Send Your First Reward',
      description: 'Reward a fan or freelancer to complete your setup',
      icon: Zap,
      completed: false
    }
  ]);

  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenCreated, setTokenCreated] = useState(false);
  const [platformsLinked, setPlatformsLinked] = useState<string[]>([]);
  const [firstRewardSent, setFirstRewardSent] = useState(false);

  const handleStepComplete = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleConnectWallet = () => {
    // Mock wallet connection
    setTimeout(() => {
      setWalletConnected(true);
      handleStepComplete('connect-wallet');
    }, 1500);
  };

  const handleCreateToken = () => {
    // Mock token creation
    setTimeout(() => {
      setTokenCreated(true);
      handleStepComplete('create-token');
    }, 2000);
  };

  const handleLinkPlatform = (platform: string) => {
    if (!platformsLinked.includes(platform)) {
      setPlatformsLinked(prev => [...prev, platform]);
    }
  };

  const handleSendFirstReward = () => {
    // Mock reward sending
    setTimeout(() => {
      setFirstRewardSent(true);
      handleStepComplete('first-reward');
    }, 1500);
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#f9f4e1]/60 text-sm">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-[#f9f4e1]/60 text-sm">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-[#f9f4e1]/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8"
        >
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-[#f9f4e1]/70">
              {currentStepData.description}
            </p>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#f9f4e1]/10">
                  <h3 className="text-[#f9f4e1] font-semibold mb-3">Connect to Base Network</h3>
                  <p className="text-[#f9f4e1]/70 mb-4">
                    Your wallet will be connected to Base network for gas-free transactions.
                  </p>
                  <div className="flex items-center gap-3 text-sm text-[#f9f4e1]/60">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Gas-free transactions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#f9f4e1]/60 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Built-in wallet abstraction</span>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleConnectWallet}
                  disabled={walletConnected}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  {walletConnected ? (
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Wallet Connected
                    </div>
                  ) : (
                    'Connect Wallet'
                  )}
                </motion.button>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="token"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#f9f4e1]/10">
                  <h3 className="text-[#f9f4e1] font-semibold mb-3">Your Creator Token</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Token Name</label>
                      <input
                        type="text"
                        placeholder="e.g., SarahCoin"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Token Symbol</label>
                      <input
                        type="text"
                        placeholder="e.g., SARAH"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Initial Supply</label>
                      <input
                        type="number"
                        placeholder="1000000"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleCreateToken}
                  disabled={tokenCreated}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  {tokenCreated ? (
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Token Created
                    </div>
                  ) : (
                    'Create Token'
                  )}
                </motion.button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="platforms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {['Patreon', 'YouTube', 'Substack', 'Discord'].map((platform) => (
                    <motion.button
                      key={platform}
                      onClick={() => handleLinkPlatform(platform)}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        platformsLinked.includes(platform)
                          ? 'border-green-500/50 bg-green-500/10'
                          : 'border-[#f9f4e1]/10 bg-[#0a0e1a] hover:border-orange-500/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                          platformsLinked.includes(platform) ? 'bg-green-500' : 'bg-[#f9f4e1]/10'
                        }`}>
                          {platformsLinked.includes(platform) ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <ExternalLink className="w-4 h-4 text-[#f9f4e1]/70" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${
                          platformsLinked.includes(platform) ? 'text-green-400' : 'text-[#f9f4e1]/70'
                        }`}>
                          {platform}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  onClick={() => handleStepComplete('link-platforms')}
                  disabled={platformsLinked.length === 0}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  Continue ({platformsLinked.length} connected)
                </motion.button>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="reward"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#f9f4e1]/10">
                  <h3 className="text-[#f9f4e1] font-semibold mb-3">Send Your First Reward</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Recipient</label>
                      <select className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50">
                        <option>Select a fan or freelancer</option>
                        <option>@sarahfan123 (Fan)</option>
                        <option>@designer_mike (Freelancer)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Amount</label>
                      <input
                        type="number"
                        placeholder="100"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Reason</label>
                      <textarea
                        placeholder="Thanks for your support!"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleSendFirstReward}
                  disabled={firstRewardSent}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  {firstRewardSent ? (
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Reward Sent!
                    </div>
                  ) : (
                    'Send Reward'
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#f9f4e1]/10">
            <button
              onClick={onSkip}
              className="text-[#f9f4e1]/60 hover:text-[#f9f4e1] transition-colors"
            >
              Skip for now
            </button>
            
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-orange-500' : 
                    index < currentStep ? 'bg-green-500' : 'bg-[#f9f4e1]/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
