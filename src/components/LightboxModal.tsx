import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplorationItem } from '../types/portfolio';

interface LightboxModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-surface border border-stroke rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-bg/80 border border-stroke text-text-primary hover:text-white flex items-center justify-center transition-colors touch-manipulation"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Media Image */}
            <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 halftone-overlay opacity-15 pointer-events-none" />
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-mono">
                Visual Playground Study
              </span>
              <h3 className="text-xl sm:text-2xl font-display italic text-text-primary">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {item.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
