import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ["Design", "Create", "Inspire"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter from 000 to 100 over 2700ms using requestAnimationFrame
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2700;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve for natural finish
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const currentCount = Math.floor(easedProgress * 100);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(100);
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onComplete]);

  // Cycling rotating words every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-8 md:p-14 select-none pointer-events-auto"
    >
      {/* Top Bar / Label */}
      <div className="w-full flex justify-between items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.div>
        
        <div className="text-[10px] sm:text-[11px] text-muted/60 uppercase tracking-[0.2em] font-mono">
          System Initializing
        </div>
      </div>

      {/* Center Rotating Words */}
      <div className="flex-1 flex items-center justify-center my-auto overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 tracking-wide text-center"
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Row: Counter & Progress */}
      <div className="w-full flex flex-col items-end gap-4 sm:gap-6">
        <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter leading-none">
          {String(count).padStart(3, "0")}
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full h-[3px] bg-stroke/50 overflow-hidden rounded-full relative">
          <div
            className="h-full accent-gradient origin-left transition-transform duration-75 ease-linear rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
