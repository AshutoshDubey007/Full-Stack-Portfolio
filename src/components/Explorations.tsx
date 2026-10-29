import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExplorationItem } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationsProps {
  explorations: ExplorationItem[];
  onOpenLightbox: (item: ExplorationItem) => void;
}

export const Explorations: React.FC<ExplorationsProps> = ({
  explorations,
  onOpenLightbox,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  const col1Items = explorations.filter((item) => item.column === 1);
  const col2Items = explorations.filter((item) => item.column === 2);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Pinned center layer
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedContentRef.current,
        pinSpacing: false,
      });

      // 2. Parallax Columns scroll movement
      if (col1Ref.current && col2Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 100 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          col2Ref.current,
          { y: 220 },
          {
            y: -120,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[220vh] sm:min-h-[250vh] md:min-h-[300vh] bg-bg overflow-hidden"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center pointer-events-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-px bg-stroke" />
            <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium font-mono">
              Explorations
            </span>
            <span className="w-6 sm:w-8 h-px bg-stroke" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-text-primary tracking-tight mb-3 sm:mb-4">
            Visual <span className="font-display italic text-text-primary">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-sm md:text-base text-muted max-w-sm mb-6 sm:mb-8 leading-relaxed px-4">
            Interactive charts, 3D point clouds, computer vision studies, and prototype micro-interactions.
          </p>

          {/* Dribbble / Exploration Button */}
          <div className="relative group rounded-full p-[1.5px]">
            <span
              className="absolute inset-0 rounded-full accent-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <a
              href="https://github.com/AshutoshDubey007"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 rounded-full text-[11px] sm:text-xs font-medium uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 bg-surface/90 backdrop-blur-md text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300 shadow-lg"
            >
              <span>Explore on GitHub</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full px-4 sm:px-8 md:px-12 grid grid-cols-2 gap-4 sm:gap-12 md:gap-40 items-start pt-24 sm:pt-32 pb-40">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-12 sm:gap-20 md:gap-32 items-center md:items-start">
            {col1Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="pointer-events-auto group relative w-full max-w-[155px] sm:max-w-[240px] md:max-w-[320px] aspect-square rounded-2xl md:rounded-3xl bg-surface border border-stroke/90 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:scale-105 hover:z-30 hover:border-accent/40 hover:shadow-2xl hover:shadow-black/70 touch-manipulation"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-xs sm:text-sm md:text-base font-medium text-text-primary truncate">{item.title}</h4>
                  <p className="hidden sm:block text-[11px] text-muted line-clamp-1 mt-0.5">{item.caption}</p>
                  <span className="text-[9px] sm:text-[10px] text-accent mt-1 sm:mt-2 uppercase tracking-wider font-mono">
                    Inspect ↗
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-14 sm:gap-24 md:gap-36 items-center md:items-end pt-16 sm:pt-28 md:pt-48">
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="pointer-events-auto group relative w-full max-w-[155px] sm:max-w-[240px] md:max-w-[320px] aspect-square rounded-2xl md:rounded-3xl bg-surface border border-stroke/90 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:scale-105 hover:z-30 hover:border-accent/40 hover:shadow-2xl hover:shadow-black/70 touch-manipulation"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-xs sm:text-sm md:text-base font-medium text-text-primary truncate">{item.title}</h4>
                  <p className="hidden sm:block text-[11px] text-muted line-clamp-1 mt-0.5">{item.caption}</p>
                  <span className="text-[9px] sm:text-[10px] text-accent mt-1 sm:mt-2 uppercase tracking-wider font-mono">
                    Inspect ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
