'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Briefcase } from 'lucide-react';

const roles = [
  {
    icon: Users,
    title: 'For Creators',
    features: [
      'Connect existing platforms',
      'Reward loyal fans instantly',
      'Manage perks and insights in one dashboard'
    ],
    ctaText: 'Start Rewarding',
    ctaColor: 'from-orange-500 to-orange-600',
    bgColor: 'from-[#151922] to-[#0f1218]'
  },
  {
    icon: Heart,
    title: 'For Fans',
    features: [
      'Earn tokens by supporting creators',
      'Unlock perks, access, and early content',
      'Participate without wallets or crypto'
    ],
    ctaText: 'Join Community',
    ctaColor: 'from-purple-500 to-purple-600',
    bgColor: 'from-[#151922] to-[#0f1218]'
  },
  {
    icon: Briefcase,
    title: 'For Freelancers',
    features: [
      'Get paid in creator tokens',
      'Build a portfolio that grows with your clients',
      'Join verified creator projects'
    ],
    ctaText: 'Find Work',
    ctaColor: 'from-amber-500 to-amber-600',
    bgColor: 'from-[#151922] to-[#0f1218]'
  },
];

export function RolesSection() {
  return (
    <section id="for-creators-fans-freelancers" className="py-24 px-6 bg-[#0a0e1a] scroll-mt-20">
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
            One ecosystem, three empowered roles.
          </h2>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  boxShadow: '0 20px 60px rgba(249, 115, 22, 0.2)'
                }}
                className={`relative bg-gradient-to-br ${role.bgColor} p-8 rounded-2xl border border-[#f9f4e1]/10 group overflow-hidden cursor-pointer`}
              >
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${role.ctaColor} rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      boxShadow: '0 20px 40px rgba(249, 115, 22, 0.5)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-[#f9f4e1] mb-6 group-hover:text-orange-200 transition-colors duration-300" style={{ fontSize: '24px', fontWeight: 700 }}>
                    {role.title}
                  </h3>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {role.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.2 + featureIndex * 0.1 }}
                        className="flex items-center gap-3 text-[#f9f4e1]/70 group-hover:text-[#f9f4e1]/90 transition-colors duration-300"
                        style={{ fontSize: '16px' }}
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full px-6 py-3 rounded-full bg-gradient-to-r ${role.ctaColor} text-white overflow-hidden group/btn relative`}
                    style={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    <motion.span className="relative z-10 flex items-center justify-center gap-2">
                      {role.ctaText}
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
                </div>

                {/* Hover spotlight */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(600px circle at 50% 50%, rgba(249, 115, 22, 0.1), transparent 40%)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
