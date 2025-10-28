'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette,
  Globe,
  Key,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Upload,
  Download,
  ExternalLink
} from 'lucide-react';

interface UserSettings {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  timezone: string;
  language: string;
}

interface NotificationSettings {
  emailRewards: boolean;
  emailUpdates: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing' | 'appearance'>('profile');
  
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    bio: 'Creator focused on building meaningful connections with my community.',
    avatar: 'S',
    timezone: 'UTC-8',
    language: 'English'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailRewards: true,
    emailUpdates: false,
    pushNotifications: true,
    weeklyDigest: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginAlerts: true
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleSaveProfile = () => {
    // Handle profile save
    console.log('Saving profile...', userSettings);
  };

  const handleSaveNotifications = () => {
    // Handle notification settings save
    console.log('Saving notifications...', notificationSettings);
  };

  const handleSaveSecurity = () => {
    // Handle security settings save
    console.log('Saving security...', securitySettings);
  };

  const handleChangePassword = () => {
    // Handle password change
    console.log('Changing password...', passwordForm);
    setShowPasswordForm(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-4">Profile Information</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-semibold text-xl">{userSettings.avatar}</span>
            </div>
            <div>
              <button className="px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors">
                <Upload className="w-4 h-4 mr-2 inline" />
                Upload Avatar
              </button>
              <p className="text-[#f9f4e1]/60 text-sm mt-1">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#f9f4e1]/70 text-sm mb-2">Display Name</label>
              <input
                type="text"
                value={userSettings.name}
                onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
              />
            </div>
            <div>
              <label className="block text-[#f9f4e1]/70 text-sm mb-2">Email</label>
              <input
                type="email"
                value={userSettings.email}
                onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#f9f4e1]/70 text-sm mb-2">Bio</label>
            <textarea
              value={userSettings.bio}
              onChange={(e) => setUserSettings(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#f9f4e1]/70 text-sm mb-2">Timezone</label>
              <select
                value={userSettings.timezone}
                onChange={(e) => setUserSettings(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
                <option value="UTC+1">Central European Time</option>
              </select>
            </div>
            <div>
              <label className="block text-[#f9f4e1]/70 text-sm mb-2">Language</label>
              <select
                value={userSettings.language}
                onChange={(e) => setUserSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-4">Notification Preferences</h2>
        
        <div className="space-y-4">
          {[
            { key: 'emailRewards', label: 'Email notifications for rewards', description: 'Get notified when you receive rewards' },
            { key: 'emailUpdates', label: 'Email updates', description: 'Product updates and new features' },
            { key: 'pushNotifications', label: 'Push notifications', description: 'Browser notifications for important events' },
            { key: 'weeklyDigest', label: 'Weekly digest', description: 'Summary of your weekly activity' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
              <div>
                <h3 className="text-[#f9f4e1] font-medium">{setting.label}</h3>
                <p className="text-[#f9f4e1]/60 text-sm">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings[setting.key as keyof NotificationSettings] as boolean}
                  onChange={(e) => setNotificationSettings(prev => ({ 
                    ...prev, 
                    [setting.key]: e.target.checked 
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#f9f4e1]/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#f9f4e1]/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveNotifications}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-4">Security Settings</h2>
        
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#f9f4e1] font-medium">Two-Factor Authentication</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.twoFactorEnabled}
                  onChange={(e) => setSecuritySettings(prev => ({ 
                    ...prev, 
                    twoFactorEnabled: e.target.checked 
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#f9f4e1]/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#f9f4e1]/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <p className="text-[#f9f4e1]/60 text-sm">Add an extra layer of security to your account</p>
          </div>

          {/* Session Timeout */}
          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <h3 className="text-[#f9f4e1] font-medium mb-2">Session Timeout</h3>
            <p className="text-[#f9f4e1]/60 text-sm mb-3">Automatically log out after inactivity</p>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings(prev => ({ 
                ...prev, 
                sessionTimeout: parseInt(e.target.value) 
              }))}
              className="px-3 py-2 bg-[#151922] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          {/* Login Alerts */}
          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#f9f4e1] font-medium">Login Alerts</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.loginAlerts}
                  onChange={(e) => setSecuritySettings(prev => ({ 
                    ...prev, 
                    loginAlerts: e.target.checked 
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#f9f4e1]/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#f9f4e1]/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <p className="text-[#f9f4e1]/60 text-sm">Get notified of new login attempts</p>
          </div>

          {/* Change Password */}
          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <h3 className="text-[#f9f4e1] font-medium mb-2">Password</h3>
            <p className="text-[#f9f4e1]/60 text-sm mb-3">Last changed 30 days ago</p>
            <button
              onClick={() => setShowPasswordForm(true)}
              className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveSecurity}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-4">Billing & Subscription</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#f9f4e1] font-medium">Current Plan</h3>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">Pro</span>
            </div>
            <p className="text-[#f9f4e1]/60 text-sm mb-3">$29/month • Next billing: Dec 15, 2024</p>
            <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-colors">
              Manage Subscription
            </button>
          </div>

          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <h3 className="text-[#f9f4e1] font-medium mb-2">Payment Method</h3>
            <p className="text-[#f9f4e1]/60 text-sm mb-3">•••• •••• •••• 4242</p>
            <button className="px-4 py-2 bg-[#151922] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors">
              Update Payment Method
            </button>
          </div>

          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <h3 className="text-[#f9f4e1] font-medium mb-2">Billing History</h3>
            <p className="text-[#f9f4e1]/60 text-sm mb-3">Download your invoices and receipts</p>
            <button className="px-4 py-2 bg-[#151922] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors">
              <Download className="w-4 h-4 mr-2 inline" />
              Download Invoices
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-4">Appearance Settings</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <h3 className="text-[#f9f4e1] font-medium mb-2">Theme</h3>
            <p className="text-[#f9f4e1]/60 text-sm mb-3">Choose your preferred theme</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium">
                Dark
              </button>
              <button className="px-4 py-2 bg-[#151922] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors">
                Light
              </button>
              <button className="px-4 py-2 bg-[#151922] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors">
                Auto
              </button>
            </div>
          </div>

          <div className="p-4 bg-[#0a0e1a] rounded-lg border border-[#f9f4e1]/10">
            <h3 className="text-[#f9f4e1] font-medium mb-2">Accent Color</h3>
            <p className="text-[#f9f4e1]/60 text-sm mb-3">Customize the accent color throughout the app</p>
            <div className="flex gap-2">
              {['orange', 'purple', 'blue', 'green', 'red'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-lg ${
                    color === 'orange' ? 'bg-orange-500' : 
                    color === 'purple' ? 'bg-purple-500' :
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'green' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-lora text-[#f9f4e1] text-3xl font-semibold">Settings</h1>
        <p className="text-[#f9f4e1]/70 mt-1">Manage your account preferences and security</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'text-[#f9f4e1]/70 hover:text-[#f9f4e1] hover:bg-[#f9f4e1]/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'billing' && renderBillingTab()}
            {activeTab === 'appearance' && renderAppearanceTab()}
          </motion.div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 max-w-md w-full">
            <h3 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-6">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#f9f4e1]/70 text-sm mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                />
              </div>
              <div>
                <label className="block text-[#f9f4e1]/70 text-sm mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                />
              </div>
              <div>
                <label className="block text-[#f9f4e1]/70 text-sm mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500/50"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordForm(false)}
                className="flex-1 px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 text-[#f9f4e1]/70 rounded-lg hover:text-[#f9f4e1] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
