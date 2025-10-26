'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const creatorExamples = [
  {
    creator: '@NovaWrites',
    reward: 'Rewarded fans who shared her Substack essays.',
    description: '200 tokens distributed for engagement milestones.',
    avatar: 'N'
  },
  {
    creator: '@LeoVisuals',
    reward: 'Airdropped tokens to his Patreon supporters.',
    description: 'Early access perks unlocked instantly.',
    avatar: 'L'
  },
  {
    creator: '@MayaBeats',
    reward: 'Paid her freelance editor in tokens.',
    description: 'Transparent rewards, no crypto setup.',
    avatar: 'M'
  },
];

export function EcosystemSection() {
  return (
    <section id="discover-reward-ecosystem" className="py-24 px-6 bg-[#0a0e1a] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-lora text-[#f9f4e1] leading-[1.15] mb-6" style={{ fontSize: '48px', fontWeight: 700 }}>
            🪙 Discover the Reward Ecosystem
          </h2>
          <p className="text-[#f9f4e1]/70 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
            Explore how creators are using InOrbyt to connect their communities.
          </p>
        </motion.div>

        {/* Creator Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {creatorExamples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: '0 20px 60px rgba(249, 115, 22, 0.15)'
              }}
              className="bg-[#151922] p-8 rounded-2xl border border-[#f9f4e1]/10 hover:border-[#f9f4e1]/20 transition-all duration-300 group"
            >
              {/* Creator Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{example.avatar}</span>
                </div>
                <div>
                  <h3 className="text-[#f9f4e1] font-semibold" style={{ fontSize: '18px' }}>
                    {example.creator}
                  </h3>
                  <p className="text-[#f9f4e1]/60 text-sm">Creator</p>
                </div>
              </div>

              {/* Reward Example */}
              <div className="mb-6">
                <p className="text-[#f9f4e1]/80 mb-4" style={{ fontSize: '15px' }}>
                  {example.reward}
                </p>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <p className="text-[#f9f4e1]/90 font-medium" style={{ fontSize: '14px' }}>
                    {example.description}
                  </p>
                </div>
              </div>

              {/* Learn More Link */}
              <motion.button
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors duration-300 group/link"
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
                Learn more
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden group relative"
            style={{ fontSize: '18px', fontWeight: 600 }}
          >
            <motion.span className="relative z-10 flex items-center gap-2">
              Start Your Reward Ecosystem
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full"
              animate={{ translateX: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                width: '50%'
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
