'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, ExternalLink, Users, Zap, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    id: 'vision',
    title: 'Our Vision',
    icon: Zap,
    content: [
      'The creator economy is fragmented across platforms, with creators struggling to maintain meaningful relationships with their audiences.',
      'Current monetization models rely on paywalls and subscriptions, creating barriers between creators and fans.',
      'We envision a world where every creator can build a connected reward ecosystem that grows with their community.',
      'InOrbyt serves as the reward layer that connects existing platforms without requiring creators to abandon their established audiences.'
    ]
  },
  {
    id: 'problem',
    title: 'The Problem',
    icon: Users,
    content: [
      'Creators are forced to choose between platforms, fragmenting their audience and limiting growth potential.',
      'Fans want more than likes and follows—they seek recognition, ownership, and meaningful participation.',
      'Paywalls create barriers that prevent organic community growth and limit creator-fan relationships.',
      'Existing reward systems are complex, require crypto knowledge, and don\'t integrate with established platforms.'
    ]
  },
  {
    id: 'solution',
    title: 'Our Solution',
    icon: Shield,
    content: [
      'InOrbyt connects existing platforms (Patreon, YouTube, Substack, Discord) into a unified reward ecosystem.',
      'Creators can reward fans across all platforms with token-based incentives that don\'t require crypto knowledge.',
      'Fans earn tokens through engagement, loyalty, and participation, unlocking exclusive perks and experiences.',
      'Freelancers can be paid in creator tokens, building portfolios that grow with their clients\' success.'
    ]
  },
  {
    id: 'technology',
    title: 'Technology & Architecture',
    icon: TrendingUp,
    content: [
      'Built on Base blockchain for low-cost, fast transactions with gas-free user experience.',
      'Abstracted crypto complexity through intuitive interfaces and built-in wallet functionality.',
      'API integrations with major platforms enable seamless reward distribution and tracking.',
      'Smart contract architecture ensures transparent, trustless reward mechanisms.'
    ]
  }
];

const keyFeatures = [
  'Platform Integration: Connect Patreon, YouTube, Substack, and Discord',
  'Token-Based Rewards: Gas-free, instant reward distribution',
  'No Crypto Required: Built-in wallets and simplified interfaces',
  'Cross-Platform Analytics: Unified insights across all connected platforms',
  'Community Ownership: Fans become stakeholders in creator success',
  'Scalable Architecture: Grows with creator communities'
];

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    items: ['Core platform development', 'Patreon integration', 'Basic reward system', 'Creator onboarding']
  },
  {
    phase: 'Phase 2',
    title: 'Expansion',
    items: ['YouTube integration', 'Substack support', 'Advanced analytics', 'Community features']
  },
  {
    phase: 'Phase 3',
    title: 'Ecosystem',
    items: ['Discord bot integration', 'Freelancer marketplace', 'Cross-platform trading', 'API for developers']
  }
];

export function WhitepaperContent() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#005257] to-[#0a0e1a] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="font-lora text-[#f9f4e1] mb-6" style={{ fontSize: '48px', fontWeight: 700 }}>
              Whitepaper
            </h1>
            <p className="text-[#f9f4e1]/80 text-xl max-w-2xl mx-auto mb-8">
              The vision behind decentralized participation and community ownership.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors duration-300 mx-auto"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Executive Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10">
              <h2 className="font-lora text-[#f9f4e1] mb-6" style={{ fontSize: '32px', fontWeight: 600 }}>
                Executive Summary
              </h2>
              <p className="text-[#f9f4e1]/80 text-lg leading-relaxed mb-6">
                InOrbyt represents a paradigm shift in the creator economy, transforming how creators connect with their audiences and monetize their content. Rather than replacing existing platforms, InOrbyt serves as a reward layer that connects Patreon, YouTube, Substack, and Discord into a unified ecosystem.
              </p>
              <p className="text-[#f9f4e1]/80 text-lg leading-relaxed">
                Our platform enables creators to reward fans across all platforms with token-based incentives, turning every fan into a stakeholder in the creator's success. Built on Base blockchain with abstracted complexity, InOrbyt makes advanced reward mechanisms accessible to creators and fans without requiring crypto knowledge.
              </p>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-lora text-[#f9f4e1] mb-8 text-center" style={{ fontSize: '32px', fontWeight: 600 }}>
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#151922] p-4 rounded-lg border border-[#f9f4e1]/10 hover:border-[#f9f4e1]/20 transition-all duration-300"
                >
                  <p className="text-[#f9f4e1]/80">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-lora text-[#f9f4e1]" style={{ fontSize: '28px', fontWeight: 600 }}>
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-[#f9f4e1]/80 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <h2 className="font-lora text-[#f9f4e1] mb-8 text-center" style={{ fontSize: '32px', fontWeight: 600 }}>
              Development Roadmap
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {roadmap.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="bg-[#151922] p-6 rounded-xl border border-[#f9f4e1]/10"
                >
                  <h4 className="text-[#f9f4e1] mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                    {phase.phase}
                  </h4>
                  <h5 className="text-orange-400 mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
                    {phase.title}
                  </h5>
                  <ul className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-[#f9f4e1]/70 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10">
              <h3 className="font-lora text-[#f9f4e1] mb-4" style={{ fontSize: '28px', fontWeight: 600 }}>
                Join the Reward Revolution
              </h3>
              <p className="text-[#f9f4e1]/70 mb-6" style={{ fontSize: '16px' }}>
                Be part of the future where creators and fans are truly connected through meaningful rewards.
              </p>
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
                  Get Early Access
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
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
