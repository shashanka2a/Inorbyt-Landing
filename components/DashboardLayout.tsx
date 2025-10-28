'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Gift, 
  Briefcase, 
  Settings, 
  BarChart3,
  Wallet,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'creator' | 'fan' | 'freelancer';
  avatar?: string;
  walletAddress?: string;
  plan?: 'free' | 'pro' | 'studio';
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'rewards', label: 'Rewards', icon: Gift, href: '/rewards' },
  { id: 'community', label: 'Community', icon: Users, href: '/community' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

const creatorNavItems = [
  ...navigationItems,
  { id: 'freelancers', label: 'Freelancers', icon: Briefcase, href: '/freelancers' },
];

const freelancerNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/freelancer/dashboard' },
  { id: 'gigs', label: 'My Gigs', icon: Briefcase, href: '/freelancer/gigs' },
  { id: 'earnings', label: 'Earnings', icon: Wallet, href: '/freelancer/earnings' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/freelancer/settings' },
];

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  const getNavItems = () => {
    switch (user.role) {
      case 'creator':
        return creatorNavItems;
      case 'freelancer':
        return freelancerNavItems;
      default:
        return navigationItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 left-0 z-50 w-70 bg-[#151922] border-r border-[#f9f4e1]/10 lg:relative lg:translate-x-0 lg:flex lg:flex-col"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-[#f9f4e1]/10">
            <Link href="/dashboard" className="flex items-center gap-3">
              <Image 
                src="/inorbyt.svg" 
                alt="InOrbyt" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors"
            >
              <svg className="w-5 h-5 text-[#f9f4e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-[#f9f4e1]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#f9f4e1] font-semibold truncate">{user.name}</p>
                <p className="text-[#f9f4e1]/60 text-sm truncate">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'creator' ? 'bg-orange-500/20 text-orange-400' :
                    user.role === 'freelancer' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  {user.plan && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#f9f4e1]/10 text-[#f9f4e1]/80">
                      {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#f9f4e1]/70 hover:text-[#f9f4e1] hover:bg-[#f9f4e1]/5 transition-all duration-200 group"
                >
                  <Icon className="w-5 h-5 group-hover:text-orange-400 transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#f9f4e1]/10">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#f9f4e1]/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-[#151922] border-b border-[#f9f4e1]/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors"
              >
                <svg className="w-5 h-5 text-[#f9f4e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f9f4e1]/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] placeholder-[#f9f4e1]/40 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-[#f9f4e1]/10 transition-colors">
                <Bell className="w-5 h-5 text-[#f9f4e1]/70" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Wallet Status */}
              {user.walletAddress && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm font-medium">Connected to Base</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={user.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </div>
  );
}
