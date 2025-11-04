'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Save, 
  Gift, 
  Users,
  ExternalLink,
  FileText,
  CheckCircle
} from 'lucide-react';

interface Perk {
  id: string;
  name: string;
  required_amount: number;
  delivery_type: 'discord_role' | 'link' | 'code';
  payload: string;
}

interface FanPreview {
  fanId: string;
  fanName: string;
  currentAmount: number;
  requiredAmount: number;
  progress: number;
}

export default function ManagePerksPage() {
  const router = useRouter();
  const [perks, setPerks] = useState<Perk[]>([
    {
      id: '1',
      name: 'Exclusive Role',
      required_amount: 50,
      delivery_type: 'discord_role',
      payload: 'vip_member'
    },
    {
      id: '2',
      name: 'VIP Channel Access',
      required_amount: 100,
      delivery_type: 'link',
      payload: 'https://example.com/vip-access'
    }
  ]);

  const [fanPreviews] = useState<FanPreview[]>([
    { fanId: '1', fanName: '@mike_designer', currentAmount: 45, requiredAmount: 50, progress: 90 },
    { fanId: '2', fanName: '@emma_music', currentAmount: 95, requiredAmount: 100, progress: 95 },
    { fanId: '3', fanName: '@sarah_writer', currentAmount: 48, requiredAmount: 50, progress: 96 }
  ]);

  const [editingPerk, setEditingPerk] = useState<Perk | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = async () => {
    // Simulate API call
    try {
      // POST /creator/{id}/perks
      console.log('Saving perks:', perks);
      router.push('/creator/dashboard');
    } catch (error) {
      console.error('Error saving perks:', error);
    }
  };

  const handleAddPerk = () => {
    const newPerk: Perk = {
      id: Date.now().toString(),
      name: '',
      required_amount: 0,
      delivery_type: 'discord_role',
      payload: ''
    };
    setPerks([...perks, newPerk]);
    setEditingPerk(newPerk);
    setShowAddForm(true);
  };

  const handleUpdatePerk = (updatedPerk: Perk) => {
    setPerks(perks.map(p => p.id === updatedPerk.id ? updatedPerk : p));
    setEditingPerk(null);
    setShowAddForm(false);
  };

  const handleDeletePerk = (id: string) => {
    setPerks(perks.filter(p => p.id !== id));
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
            <h1 className="font-lora text-[#f9f4e1] text-2xl md:text-3xl font-semibold">Manage Perks</h1>
            <p className="text-[#f9f4e1]/70 mt-1 text-sm md:text-base">Create and edit unlockable perks for your community</p>
          </div>
        </div>
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Perks List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold">Your Perks</h2>
            <motion.button
              onClick={handleAddPerk}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 rounded-lg transition-colors text-sm text-[#f9f4e1] font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Perk
            </motion.button>
          </div>

          <div className="space-y-4">
            {perks.map((perk) => (
              <motion.div
                key={perk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-6"
              >
                {editingPerk?.id === perk.id ? (
                  <PerkEditForm
                    perk={perk}
                    onSave={handleUpdatePerk}
                    onCancel={() => {
                      setEditingPerk(null);
                      setShowAddForm(false);
                    }}
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-lora text-[#f9f4e1] text-lg font-semibold mb-2">{perk.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-[#f9f4e1]/70">
                            <Gift className="w-4 h-4" />
                            <span>Required: {perk.required_amount} tokens</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#f9f4e1]/70">
                            {perk.delivery_type === 'discord_role' && <Users className="w-4 h-4" />}
                            {perk.delivery_type === 'link' && <ExternalLink className="w-4 h-4" />}
                            {perk.delivery_type === 'code' && <FileText className="w-4 h-4" />}
                            <span className="capitalize">{perk.delivery_type.replace('_', ' ')}</span>
                          </div>
                          {perk.payload && (
                            <div className="text-[#f9f4e1]/60 text-xs font-mono bg-[#0a0e1a] p-2 rounded">
                              {perk.payload}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingPerk(perk)}
                          className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePerk(perk.id)}
                          className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors duration-200 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fan Preview */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-lg md:rounded-xl border border-[#f9f4e1]/10 p-6 sticky top-6">
            <h2 className="font-lora text-[#f9f4e1] text-xl font-semibold mb-4">Fans Close to Unlocking</h2>
            <div className="space-y-4">
              {fanPreviews.map((fan) => (
                <div key={fan.fanId} className="p-3 bg-[#0a0e1a] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#f9f4e1] font-medium text-sm">{fan.fanName}</p>
                    <span className="text-[#f9f4e1]/60 text-xs">{fan.currentAmount} / {fan.requiredAmount}</span>
                  </div>
                  <div className="w-full h-2 bg-[#f9f4e1]/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
                      style={{ width: `${fan.progress}%` }}
                    />
                  </div>
                  <p className="text-[#f9f4e1]/60 text-xs mt-1">{fan.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PerkEditFormProps {
  perk: Perk;
  onSave: (perk: Perk) => void;
  onCancel: () => void;
}

function PerkEditForm({ perk, onSave, onCancel }: PerkEditFormProps) {
  const [formData, setFormData] = useState<Perk>(perk);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[#f9f4e1] text-sm font-medium mb-2">Perk Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500"
          placeholder="e.g., Exclusive Role"
          required
        />
      </div>

      <div>
        <label className="block text-[#f9f4e1] text-sm font-medium mb-2">Required Amount (tokens)</label>
        <input
          type="number"
          value={formData.required_amount}
          onChange={(e) => setFormData({ ...formData, required_amount: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-[#f9f4e1] text-sm font-medium mb-2">Delivery Type</label>
        <select
          value={formData.delivery_type}
          onChange={(e) => setFormData({ ...formData, delivery_type: e.target.value as Perk['delivery_type'] })}
          className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500"
        >
          <option value="discord_role">Discord Role</option>
          <option value="link">Link</option>
          <option value="code">Code</option>
        </select>
      </div>

      <div>
        <label className="block text-[#f9f4e1] text-sm font-medium mb-2">Payload</label>
        <input
          type="text"
          value={formData.payload}
          onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
          className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#f9f4e1]/10 rounded-lg text-[#f9f4e1] focus:outline-none focus:border-orange-500"
          placeholder={formData.delivery_type === 'discord_role' ? 'role_name' : formData.delivery_type === 'link' ? 'https://...' : 'CODE123'}
          required
        />
        <p className="text-[#f9f4e1]/60 text-xs mt-1">
          {formData.delivery_type === 'discord_role' && 'Discord role name'}
          {formData.delivery_type === 'link' && 'URL to redirect users'}
          {formData.delivery_type === 'code' && 'Redemption code'}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium transition-all duration-200"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 text-[#f9f4e1] rounded-lg font-medium transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

