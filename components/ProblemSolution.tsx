'use client';

import { motion } from 'framer-motion';
import { Layers, Heart, CreditCard } from 'lucide-react';

const problemCards = [
  { 
    icon: Layers, 
    title: 'Too Many Platforms', 
    description: 'Your audience lives across Patreon, YouTube, and Discord - but your rewards don\'t.' 
  },
  { 
    icon: Heart, 
    title: 'Fans Want More Than Follows', 
    description: 'Likes are cheap. True fans want recognition and ownership.' 
  },
  { 
    icon: CreditCard, 
    title: 'Paywalls Kill Momentum', 
    description: 'Creators don\'t need another subscription - they need a reward system that grows with them.' 
  },
];

export function ProblemSolution() {
  return (
    <section id="why-creators-need-reward-layer" className="py-24 px-6 bg-[#0a0e1a] scroll-mt-20">
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
            Why the Future of the Creator Economy Isn't About Paywalls - It's About Participation.
          </h2>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problemCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#151922] p-8 rounded-xl border border-[#f9f4e1]/10 hover:border-[#f9f4e1]/20 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 bg-orange-500/10 rounded-xl mb-6 group-hover:bg-orange-500/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-[#f9f4e1] mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                    {card.title}
                  </h3>
                  <p className="text-[#f9f4e1]/70" style={{ fontSize: '16px' }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="font-lora text-[#f9f4e1] text-xl" style={{ fontSize: '24px', fontWeight: 500 }}>
            InOrbyt connects everything you've already built — and turns every fan into a stakeholder.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
