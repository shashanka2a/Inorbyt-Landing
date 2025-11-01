'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CreatorOnboarding } from '@/components/CreatorOnboarding';
import { CreatorDashboard } from '@/components/CreatorDashboard';
import { FanJoinFlow } from '@/components/FanJoinFlow';
import { FanDashboard } from '@/components/FanDashboard';
import { Users, Gift } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'creator' | 'fan';
  avatar?: string;
  walletAddress?: string;
  plan?: 'free' | 'pro' | 'studio';
  onboardingComplete?: boolean;
  joinFlowComplete?: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSelectRole = (role: 'creator' | 'fan') => {
    setUser({
      id: '1',
      name: role === 'creator' ? 'Sarah Chen' : 'Mike Rodriguez',
      email: role === 'creator' ? 'sarah@example.com' : 'mike@example.com',
      role,
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      plan: role === 'creator' ? 'pro' : undefined,
      onboardingComplete: false,
      joinFlowComplete: false
    });
  };

  const handleOnboardingComplete = () => {
    setUser(prev => prev ? { ...prev, onboardingComplete: true } : null);
  };

  const handleJoinFlowComplete = () => {
    setUser(prev => prev ? { ...prev, joinFlowComplete: true } : null);
  };

  const handleLogout = () => {
    // Reset to role selection
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-[#f9f4e1]/70">Loading demo...</p>
        </div>
      </div>
    );
  }

  // Show role selection if no user selected
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-lora text-[#f9f4e1] text-3xl md:text-4xl font-semibold mb-4">
              Try the InOrbyt MVP Demo
            </h1>
            <p className="text-[#f9f4e1]/70 text-lg">
              Choose a role to experience the complete flow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              onClick={() => handleSelectRole('creator')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 hover:border-orange-500/50 transition-all duration-200 text-left"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">Creator</h2>
              <p className="text-[#f9f4e1]/70 mb-4">
                Experience the creator onboarding flow: Connect Discord, configure automatic rewards, create perks, and manage your community.
              </p>
              <div className="text-sm text-[#f9f4e1]/60 space-y-1">
                <p>✓ Connect Discord server</p>
                <p>✓ Configure reward rules</p>
                <p>✓ Create unlockable perks</p>
                <p>✓ View dashboard & analytics</p>
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleSelectRole('fan')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 hover:border-purple-500/50 transition-all duration-200 text-left"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">Fan</h2>
              <p className="text-[#f9f4e1]/70 mb-4">
                Experience the fan journey: Join via creator link, connect Discord, earn welcome tokens, and unlock perks.
              </p>
              <div className="text-sm text-[#f9f4e1]/60 space-y-1">
                <p>✓ Join via creator link</p>
                <p>✓ Connect Discord account</p>
                <p>✓ Earn automatic rewards</p>
                <p>✓ Track perks & progress</p>
              </div>
            </motion.button>
          </div>

          <p className="text-center text-[#f9f4e1]/50 text-sm mt-8">
            This is a demo - all interactions are simulated
          </p>
        </div>
      </div>
    );
  }

  // Show onboarding for creators who haven't completed it
  if (user.role === 'creator' && !user.onboardingComplete) {
    return (
      <CreatorOnboarding
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingComplete}
      />
    );
  }

  // Show fan join flow for fans who haven't completed it
  if (user.role === 'fan' && !user.joinFlowComplete) {
    return (
      <FanJoinFlow
        onComplete={handleJoinFlowComplete}
      />
    );
  }

  // Show appropriate dashboard based on user role
  const renderDashboardContent = () => {
    switch (user.role) {
      case 'creator':
        return <CreatorDashboard />;
      case 'fan':
        return <FanDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-4">
              Welcome to InOrbyt!
            </h2>
            <p className="text-[#f9f4e1]/70">
              Choose your role to get started with the reward ecosystem.
            </p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {renderDashboardContent()}
    </DashboardLayout>
  );
}
