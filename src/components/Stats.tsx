import React from 'react';
import { motion } from 'framer-motion';
import { StatItem } from '../types/portfolio';

interface StatsProps {
  stats: StatItem[];
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <section className="bg-bg py-14 sm:py-16 md:py-24 border-y border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-stroke/60">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className={`flex flex-col ${index > 0 ? 'pt-6 sm:pt-8 md:pt-0 md:pl-12' : ''}`}
            >
              <div className="text-4xl sm:text-6xl md:text-7xl font-display italic text-text-primary mb-2 sm:mb-3 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base md:text-lg font-medium text-text-primary mb-1 sm:mb-2">
                {stat.label}
              </div>
              {stat.subtext && (
                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xs">
                  {stat.subtext}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
