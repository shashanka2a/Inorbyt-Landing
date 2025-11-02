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
    <section id="why-creators-need-reward-layer" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#0a0e1a] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-lora text-[#f9f4e1] leading-[1.15] mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-[48px]" style={{ fontWeight: 700 }}>
            Why the Future of the Creator Economy Isn't About Paywalls - It's About Participation.
          </h2>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {problemCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#151922] p-4 sm:p-6 md:p-8 rounded-xl border border-[#f9f4e1]/10 hover:border-[#f9f4e1]/20 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 bg-orange-500/10 rounded-xl mb-6 group-hover:bg-orange-500/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-[#f9f4e1] mb-3 sm:mb-4 text-lg sm:text-xl" style={{ fontWeight: 600 }}>
                    {card.title}
                  </h3>
                  <p className="text-[#f9f4e1]/70 text-sm sm:text-base">
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
          <p className="font-lora text-[#f9f4e1] text-lg sm:text-xl md:text-[24px]" style={{ fontWeight: 500 }}>
            InOrbyt connects everything you've already built — and turns every fan into a stakeholder.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
