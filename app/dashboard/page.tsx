'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CreatorOnboarding } from '@/components/CreatorOnboarding';
import { CreatorDashboard } from '@/components/CreatorDashboard';
import { FanVerificationFlow } from '@/components/FanVerificationFlow';
import { FreelancerDashboard } from '@/components/FreelancerDashboard';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'creator' | 'fan' | 'freelancer';
  avatar?: string;
  walletAddress?: string;
  plan?: 'free' | 'pro' | 'studio';
  onboardingComplete?: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'creator',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    plan: 'pro',
    onboardingComplete: false
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleOnboardingComplete = () => {
    setUser(prev => ({ ...prev, onboardingComplete: true }));
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-[#f9f4e1]/70">Loading your dashboard...</p>
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

  // Show fan verification flow for fans
  if (user.role === 'fan') {
    return <FanVerificationFlow />;
  }

  // Show appropriate dashboard based on user role
  const renderDashboardContent = () => {
    switch (user.role) {
      case 'creator':
        return <CreatorDashboard />;
      case 'freelancer':
        return <FreelancerDashboard />;
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
