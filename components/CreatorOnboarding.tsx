'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  Link as LinkIcon, 
  Settings,
  Gift,
  Copy,
  CheckCircle,
  MessageSquare,
  Award,
  Users,
  ExternalLink
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
      id: 'connect-discord',
      title: 'Connect Your Discord Server',
      description: 'Link your Discord server to enable automatic rewards for your community',
      icon: LinkIcon,
      completed: false
    },
    {
      id: 'get-join-link',
      title: 'Get Your Creator Link',
      description: 'Share this link with your Discord community so fans can join and earn rewards',
      icon: LinkIcon,
      completed: false
    },
    {
      id: 'configure-rewards',
      title: 'Configure Automatic Rewards',
      description: 'Set up rules for rewarding Discord engagement automatically',
      icon: Settings,
      completed: false
    },
    {
      id: 'create-perks',
      title: 'Create Perks',
      description: 'Define perks that unlock automatically when fans reach token milestones',
      icon: Gift,
      completed: false
    }
  ]);

  const [discordConnected, setDiscordConnected] = useState(false);
  const [joinLink, setJoinLink] = useState('');
  const [joinLinkCopied, setJoinLinkCopied] = useState(false);
  const [rewardRules, setRewardRules] = useState({
    welcomeReward: 10,
    messageReward: 5,
    roleReward: 20,
    eventReward: 15
  });
  const [perksCreated, setPerksCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleConnectDiscord = () => {
    setIsLoading(true);
    // Mock Discord OAuth connection
    setTimeout(() => {
      setDiscordConnected(true);
      // Auto-generate join link
      setJoinLink('https://inorbyt.io/c/sarah-chen');
      setIsLoading(false);
      setTimeout(() => {
        handleStepComplete('connect-discord');
      }, 300);
    }, 2000);
  };

  const handleCopyJoinLink = () => {
    navigator.clipboard.writeText(joinLink);
    setJoinLinkCopied(true);
    setTimeout(() => setJoinLinkCopied(false), 2000);
  };

  const handleSaveRewardRules = () => {
    setIsLoading(true);
    // Mock save
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        handleStepComplete('configure-rewards');
      }, 300);
    }, 1000);
  };

  const handleCreatePerks = () => {
    setIsLoading(true);
    // Mock perk creation
    setTimeout(() => {
      setPerksCreated(true);
      setIsLoading(false);
      setTimeout(() => {
        handleStepComplete('create-perks');
      }, 300);
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
                key="discord"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#f9f4e1]/10">
                  <h3 className="text-[#f9f4e1] font-semibold mb-3">Connect Discord Server</h3>
                  <p className="text-[#f9f4e1]/70 mb-4">
                    Authenticate with Discord to link your server. We'll verify you own the server and enable automatic rewards.
                  </p>
                  <div className="space-y-2 text-sm text-[#f9f4e1]/60">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Secure OAuth authentication</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Server ownership verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Automatic reward token created</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleConnectDiscord}
                  disabled={discordConnected || isLoading}
                  whileHover={!isLoading && !discordConnected ? { scale: 1.02 } : {}}
                  whileTap={!isLoading && !discordConnected ? { scale: 0.98 } : {}}
                  className="w-full px-6 py-3 bg-[#5865F2] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4752C4] transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Connecting...</span>
                    </>
                  ) : discordConnected ? (
                    <>
                      <Check className="w-5 h-5" />
                      Discord Connected
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      Connect Discord
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="join-link"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#f9f4e1]/10">
                  <h3 className="text-[#f9f4e1] font-semibold mb-3">Your Creator Link</h3>
                  <p className="text-[#f9f4e1]/70 mb-4">
                    Share this link in your Discord server. Fans who click it will automatically join your reward community and receive welcome tokens.
                  </p>
                  
                  <div className="flex items-center gap-2 p-3 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg">
                    <input
                      type="text"
                      value={joinLink}
                      readOnly
                      className="flex-1 bg-transparent text-[#f9f4e1] focus:outline-none"
                    />
                    <button
                      onClick={handleCopyJoinLink}
                      className="p-2 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 rounded-lg transition-colors"
                    >
                      {joinLinkCopied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#f9f4e1]/70" />
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Your reward token has been automatically created!
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      handleStepComplete('get-join-link');
                    }, 500);
                  }}
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Loading...</span>
                    </>
                  ) : (
                    'Continue'
                  )}
                </motion.button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="rewards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#f9f4e1]/10">
                  <h3 className="text-[#f9f4e1] font-semibold mb-4">Automatic Reward Rules</h3>
                  <p className="text-[#f9f4e1]/70 mb-6 text-sm">
                    Configure how many tokens fans earn for different Discord activities. Rewards are issued automatically!
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#151922] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-[#f9f4e1] font-medium">Welcome Reward</p>
                          <p className="text-[#f9f4e1]/60 text-sm">When fans join via your link</p>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={rewardRules.welcomeReward}
                        onChange={(e) => setRewardRules(prev => ({ ...prev, welcomeReward: parseInt(e.target.value) || 0 }))}
                        className="w-20 px-2 py-1 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded text-[#f9f4e1] text-center"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[#151922] rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-[#f9f4e1] font-medium">Message Activity</p>
                          <p className="text-[#f9f4e1]/60 text-sm">Per active message (rate-limited)</p>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={rewardRules.messageReward}
                        onChange={(e) => setRewardRules(prev => ({ ...prev, messageReward: parseInt(e.target.value) || 0 }))}
                        className="w-20 px-2 py-1 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded text-[#f9f4e1] text-center"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[#151922] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-amber-400" />
                        <div>
                          <p className="text-[#f9f4e1] font-medium">Role Assignment</p>
                          <p className="text-[#f9f4e1]/60 text-sm">When fans earn Discord roles</p>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={rewardRules.roleReward}
                        onChange={(e) => setRewardRules(prev => ({ ...prev, roleReward: parseInt(e.target.value) || 0 }))}
                        className="w-20 px-2 py-1 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded text-[#f9f4e1] text-center"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[#151922] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-orange-400" />
                        <div>
                          <p className="text-[#f9f4e1] font-medium">Special Events</p>
                          <p className="text-[#f9f4e1]/60 text-sm">For event participation</p>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={rewardRules.eventReward}
                        onChange={(e) => setRewardRules(prev => ({ ...prev, eventReward: parseInt(e.target.value) || 0 }))}
                        className="w-20 px-2 py-1 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded text-[#f9f4e1] text-center"
                      />
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleSaveRewardRules}
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Saving...</span>
                    </>
                  ) : (
                    'Save Reward Rules'
                  )}
                </motion.button>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="perks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0e1a] rounded-lg p-6 border border-[#f9f4e1]/10">
                  <h3 className="text-[#f9f4e1] font-semibold mb-3">Create Your First Perk</h3>
                  <p className="text-[#f9f4e1]/70 mb-4 text-sm">
                    Perks unlock automatically when fans reach token milestones. You can add more perks later in your dashboard.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Perk Name</label>
                      <input
                        type="text"
                        placeholder="Exclusive Role"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Description</label>
                      <textarea
                        placeholder="Special Discord role for active community members"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Unlock Threshold (Tokens)</label>
                      <input
                        type="number"
                        placeholder="50"
                        className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                      />
                      <p className="text-[#f9f4e1]/60 text-xs mt-1">Fans need this many tokens to unlock</p>
                    </div>
                    <div>
                      <label className="block text-[#f9f4e1]/70 text-sm mb-2">Delivery Type</label>
                      <select className="w-full px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50">
                        <option>Discord Role</option>
                        <option>Access Link</option>
                        <option>Redemption Code</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleCreatePerks}
                  disabled={perksCreated || isLoading}
                  whileHover={!isLoading && !perksCreated ? { scale: 1.02 } : {}}
                  whileTap={!isLoading && !perksCreated ? { scale: 0.98 } : {}}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Creating...</span>
                    </>
                  ) : perksCreated ? (
                    <>
                      <Check className="w-5 h-5" />
                      Perk Created!
                    </>
                  ) : (
                    'Create Perk'
                  )}
                </motion.button>
                
                <p className="text-center text-[#f9f4e1]/60 text-sm">
                  You can add more perks anytime in your dashboard
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#f9f4e1]/10">
            <button
              onClick={onSkip}
              className="text-[#f9f4e1]/60 hover:text-[#f9f4e1] transition-colors text-sm"
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