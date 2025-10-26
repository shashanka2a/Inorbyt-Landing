'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle, Clock, Users, Zap } from 'lucide-react';
import Link from 'next/link';

const guides = [
  {
    id: 'getting-started',
    title: 'Getting Started with InOrbyt',
    description: 'Learn the basics of setting up your reward ecosystem',
    duration: '5 min read',
    difficulty: 'Beginner',
    icon: Zap,
    steps: [
      'Create your InOrbyt account',
      'Connect your first platform (Patreon, YouTube, or Substack)',
      'Set up your reward token',
      'Configure basic perks for your community'
    ]
  },
  {
    id: 'platform-integration',
    title: 'Platform Integration Guide',
    description: 'Connect all your existing platforms seamlessly',
    duration: '8 min read',
    difficulty: 'Intermediate',
    icon: Users,
    steps: [
      'Connect Patreon account and sync supporters',
      'Link YouTube channel and enable reward triggers',
      'Integrate Substack for newsletter rewards',
      'Set up Discord bot for community engagement'
    ]
  },
  {
    id: 'reward-strategies',
    title: 'Reward Strategy Best Practices',
    description: 'Design effective reward systems for your community',
    duration: '12 min read',
    difficulty: 'Advanced',
    icon: CheckCircle,
    steps: [
      'Define reward tiers and milestones',
      'Create engagement-based reward triggers',
      'Design exclusive perks and experiences',
      'Measure and optimize reward effectiveness'
    ]
  }
];

const quickTips = [
  'Start with one platform to test your reward system',
  'Set clear milestones that fans can easily understand',
  'Reward both engagement and loyalty, not just purchases',
  'Use analytics to see which rewards drive the most engagement',
  'Keep your reward descriptions simple and exciting'
];

export function CreatorGuidesContent() {
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
              Creator Guides
            </h1>
            <p className="text-[#f9f4e1]/80 text-xl max-w-2xl mx-auto">
              Step-by-step tutorials for connecting and rewarding across platforms. 
              Build your reward ecosystem with confidence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-lora text-[#f9f4e1] mb-8 text-center" style={{ fontSize: '32px', fontWeight: 600 }}>
              Quick Tips for Success
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#151922] p-4 rounded-lg border border-[#f9f4e1]/10 hover:border-[#f9f4e1]/20 transition-all duration-300"
                >
                  <p className="text-[#f9f4e1]/80 text-sm">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Guides */}
          <div className="space-y-8">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10 hover:border-[#f9f4e1]/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-[#f9f4e1] mb-2" style={{ fontSize: '24px', fontWeight: 600 }}>
                            {guide.title}
                          </h3>
                          <p className="text-[#f9f4e1]/70 mb-4" style={{ fontSize: '16px' }}>
                            {guide.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#f9f4e1]/60">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {guide.duration}
                          </div>
                          <div className="px-2 py-1 bg-orange-500/20 rounded text-orange-400">
                            {guide.difficulty}
                          </div>
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="mb-6">
                        <h4 className="text-[#f9f4e1] mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>
                          What you'll learn:
                        </h4>
                        <ul className="space-y-2">
                          {guide.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-[#f9f4e1]/80 text-sm">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors duration-300"
                      >
                        <span className="font-semibold">Read Guide</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10">
              <h3 className="font-lora text-[#f9f4e1] mb-4" style={{ fontSize: '28px', fontWeight: 600 }}>
                Ready to Start Rewarding?
              </h3>
              <p className="text-[#f9f4e1]/70 mb-6" style={{ fontSize: '16px' }}>
                Join thousands of creators who are already building their reward ecosystems.
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
