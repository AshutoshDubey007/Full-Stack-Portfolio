import React from 'react';
import { motion } from 'framer-motion';
import { JournalItem } from '../types/portfolio';

interface JournalProps {
  entries: JournalItem[];
  onSelectEntry?: (entry: JournalItem) => void;
}

export const Journal: React.FC<JournalProps> = ({ entries, onSelectEntry }) => {
  return (
    <section id="journal" className="bg-bg py-14 sm:py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12"
        >
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-6 sm:w-8 h-px bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium font-mono">
                Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-tight">
              Recent <span className="font-display italic text-text-primary">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-xs sm:text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Technical writings on modern Next.js 15 architectures, low-latency AI pipelines, and WebSocket state synchronization.
            </p>
          </div>

          {/* Action button */}
          <div className="hidden sm:inline-flex">
            <div className="relative group rounded-full p-[1.5px]">
              <span
                className="absolute inset-0 rounded-full accent-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <button className="relative inline-flex items-center gap-2 rounded-full text-xs font-medium uppercase tracking-wider px-6 py-3 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300">
                <span>View all notes</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Journal Entries */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {entries.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => onSelectEntry?.(entry)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 p-4 sm:p-4 md:px-6 rounded-2xl sm:rounded-full bg-surface/40 hover:bg-surface border border-stroke hover:border-stroke/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl touch-manipulation"
            >
              {/* Left: Thumbnail & Title */}
              <div className="flex items-center gap-3.5 sm:gap-6 flex-1 min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-stroke/70 relative">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-muted font-mono mb-0.5 sm:mb-1">
                    {entry.category}
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-normal text-text-primary tracking-tight truncate sm:line-clamp-1 group-hover:text-white transition-colors">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Right: Read time & Date */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto text-[11px] sm:text-xs text-muted shrink-0 pl-15.5 sm:pl-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-muted/80">{entry.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-stroke" />
                  <span className="font-mono text-muted/80">{entry.date}</span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stroke flex items-center justify-center text-text-primary/70 group-hover:text-text-primary group-hover:border-accent transition-colors ml-1">
                  <span className="text-[11px] sm:text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
