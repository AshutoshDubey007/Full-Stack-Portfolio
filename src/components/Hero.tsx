import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useHlsVideo } from '../hooks/useHlsVideo';

interface HeroProps {
  eyebrow?: string;
  name?: string;
  location?: string;
  roles?: string[];
  description?: string;
  onSeeWorks: () => void;
  onReachOut: () => void;
}

const HLS_VIDEO_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const Hero: React.FC<HeroProps> = ({
  eyebrow = "FRONTEND ENGINEER • PORTFOLIO '26",
  name = "Ashutosh Dubey",
  location = "Pune",
  roles = ["Frontend Engineer", "Next.js Specialist", "UI/UX Craftsman", "Fullstack Builder"],
  description = "Frontend Engineer specializing in React, Next.js 15, and TypeScript. Experience across 3 internships delivering low-latency WebSockets, AI pipelines, and responsive interfaces.",
  onSeeWorks,
  onReachOut,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useHlsVideo({ src: HLS_VIDEO_SRC });

  // Roles cycle every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // GSAP Entrance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.1 }
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(8px)", y: 15 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, stagger: 0.08 },
        0.25
      );
    }, containerRef);

    return () => ctx.revert();
  }, [name]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[92vh] md:min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 pt-24 pb-16 md:pt-28 md:pb-20 select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          width={1920}
          height={1080}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        {/* Dark overlay: bg-black/25 */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Bottom fade: h-48 bg-gradient-to-t from-bg to-transparent */}
        <div className="absolute bottom-0 left-0 right-0 h-40 md:h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </div>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-4 sm:mt-8 md:mt-12 w-full">
        {/* Eyebrow */}
        <div className="blur-in text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6 md:mb-8 font-medium px-3 py-1 rounded-full bg-surface/50 border border-white/5 backdrop-blur-sm">
          {eyebrow}
        </div>

        {/* Name */}
        <h1 className="name-reveal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.95] tracking-tight text-text-primary mb-4 sm:mb-6">
          {name}
        </h1>

        {/* Role line: "A {role} lives in Pune." */}
        <div className="blur-in text-sm sm:text-base md:text-xl text-text-primary/90 mb-4 font-normal flex items-center justify-center gap-1.5 flex-wrap px-2">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block text-lg sm:text-xl md:text-2xl min-w-[120px] sm:min-w-[150px] text-center"
          >
            {roles[roleIndex]}
          </span>
          <span>lives in {location}.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-xs sm:text-sm md:text-base text-muted max-w-md mb-8 sm:mb-12 leading-relaxed px-4">
          {description}
        </p>

        {/* CTA Buttons (inline-flex gap-4) */}
        <div className="blur-in flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-6 sm:px-0">
          {/* "See Works" */}
          <div className="relative group rounded-full p-[2px] transition-transform duration-200 hover:scale-105 w-full sm:w-auto">
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <button
              onClick={onSeeWorks}
              className="relative w-full sm:w-auto rounded-full text-xs sm:text-sm font-medium px-8 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300 focus:outline-none shadow-lg shadow-black/20"
            >
              See Works
            </button>
          </div>

          {/* "Reach out..." */}
          <div className="relative group rounded-full p-[2px] transition-transform duration-200 hover:scale-105 w-full sm:w-auto">
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <button
              onClick={onReachOut}
              className="relative w-full sm:w-auto rounded-full text-xs sm:text-sm font-medium px-8 py-3.5 bg-bg text-text-primary border-2 border-stroke group-hover:border-transparent transition-all duration-300 focus:outline-none"
            >
              Reach out...
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:flex absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-medium font-mono">
          SCROLL
        </span>
        <div className="relative w-px h-8 md:h-10 bg-stroke overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
