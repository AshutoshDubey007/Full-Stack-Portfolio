import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-surface border border-stroke rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Header Media */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-bg overflow-hidden shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/40 to-black/60" />

              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg/80 border border-stroke text-text-primary hover:text-white flex items-center justify-center transition-colors touch-manipulation"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-mono">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-text-primary">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Scrollable details */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-5 text-sm overscroll-contain">
              <div>
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-2">
                  System Architecture & Overview
                </h4>
                <p className="text-text-primary/90 leading-relaxed text-xs sm:text-sm md:text-base">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-2.5">
                  Technologies & Core Tools
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-bg border border-stroke text-text-primary/90 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full text-xs font-medium uppercase tracking-wider px-6 py-3 bg-text-primary text-bg hover:opacity-90 transition-opacity"
                  >
                    <span>View Repository on GitHub</span>
                    <span>↗</span>
                  </a>
                )}
                {project.link && project.link !== project.github && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full text-xs font-medium uppercase tracking-wider px-6 py-3 bg-surface border border-stroke text-text-primary hover:border-accent transition-colors"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
