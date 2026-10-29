import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types/portfolio';

interface SelectedWorksProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onViewAll?: () => void;
}

type FilterType = 'all' | 'mobile' | 'frontend' | 'fullstack' | 'ai';

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.filterCategory === activeFilter;
  });

  const filterTabs: { label: string; value: FilterType }[] = [
    { label: "All Repos", value: "all" },
    { label: "📱 React Native App", value: "mobile" },
    { label: "Fullstack SaaS", value: "fullstack" },
    { label: "Frontend", value: "frontend" },
    { label: "AI & ML", value: "ai" },
  ];

  return (
    <section id="works" className="bg-bg py-14 sm:py-16 md:py-24 scroll-mt-20">
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
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-tight">
              Featured <span className="font-display italic text-text-primary">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-xs sm:text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Curated React Native mobile apps, production full-stack platforms, real-time WebSocket systems, and AI RAG pipelines.
            </p>
          </div>

          {/* GitHub Profile Button */}
          <div className="inline-flex self-start md:self-auto">
            <div className="relative group rounded-full p-[1.5px]">
              <span
                className="absolute inset-0 rounded-full accent-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <a
                href="https://github.com/AshutoshDubey007"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 rounded-full text-xs font-medium uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300"
              >
                <span>GitHub Profile</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`relative text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 rounded-full transition-all duration-200 shrink-0 touch-manipulation ${
                  isActive
                    ? 'text-bg bg-text-primary font-semibold shadow-md shadow-black/30'
                    : 'text-muted bg-surface/70 border border-stroke hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {tab.label}
                <span className="ml-1.5 text-[10px] opacity-75 font-mono">
                  {tab.value === 'all'
                    ? projects.length
                    : projects.filter((p) => p.filterCategory === tab.value).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const spanClass = index % 4 === 0 || index % 4 === 3 ? "md:col-span-7" : "md:col-span-5";

              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => onSelectProject(project)}
                  className={`group relative ${spanClass} aspect-[16/11] sm:aspect-[16/10] md:${project.aspectRatio} bg-surface border border-stroke rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 touch-manipulation`}
                >
                  {/* Background Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Halftone Overlay */}
                  <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />

                  {/* Mobile & Default Label Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 md:p-8 transition-opacity duration-300 md:group-hover:opacity-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted/90 font-mono">
                        {project.category}
                      </div>
                      <span className="md:hidden text-[11px] text-accent font-mono bg-bg/80 px-2.5 py-0.5 rounded-full border border-stroke/80">
                        View ↗
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl text-text-primary font-medium tracking-tight mt-1 mb-2">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-bg/80 text-text-primary/90 border border-stroke/60 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Hover Overlay */}
                  <div className="hidden md:flex absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-300 flex-col items-center justify-center p-6 text-center">
                    <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="absolute inset-0 accent-gradient-border" />
                      <div className="relative px-5 py-2.5 bg-white text-black rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide">
                        <span>View —</span>
                        <span className="font-display italic text-sm sm:text-base font-normal">
                          {project.title}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-muted max-w-sm line-clamp-2 px-2">
                      {project.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-0.5 rounded-full bg-stroke/60 text-text-primary/90 border border-stroke"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] font-mono text-accent mt-3 uppercase tracking-wider">
                      Click to inspect details ↗
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
