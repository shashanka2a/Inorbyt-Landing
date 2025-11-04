'use client';

import { useState } from 'react';
import { FanDashboard } from '@/components/FanDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

export default function FanDashboardPage() {
  const [showJoinSuccess, setShowJoinSuccess] = useState(false);
  const [joinSuccessData, setJoinSuccessData] = useState<{ creatorName: string; tokens: number } | null>(null);

  // Check for join success in URL params (from OAuth redirect or join flow)
  // This would be set after successful Discord connection or join action

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <FanDashboard />
      </div>

      {/* Join Success Modal */}
      <AnimatePresence>
        {showJoinSuccess && joinSuccessData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowJoinSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#151922] to-[#0f1218] rounded-2xl border border-[#f9f4e1]/10 p-8 max-w-md w-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <button
                  onClick={() => setShowJoinSuccess(false)}
                  className="text-[#f9f4e1]/60 hover:text-[#f9f4e1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="font-lora text-[#f9f4e1] text-2xl font-semibold mb-2">
                You've joined {joinSuccessData.creatorName}!
              </h2>
              <p className="text-[#f9f4e1]/70 mb-6">
                You earned <span className="text-orange-400 font-semibold">{joinSuccessData.tokens} tokens</span> as a welcome reward!
              </p>

              <motion.button
                onClick={() => setShowJoinSuccess(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium transition-all duration-200"
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

