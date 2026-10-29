import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useHlsVideo } from '../hooks/useHlsVideo';

interface ContactFooterProps {
  email?: string;
  marqueeText?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    dribbble?: string;
    github?: string;
  };
}

const HLS_VIDEO_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const ContactFooter: React.FC<ContactFooterProps> = ({
  email = "ashutoshkdubey007@gmail.com",
  marqueeText = "ASHUTOSH DUBEY • FRONTEND ENGINEER • SCALABLE WEB SYSTEMS • ",
  socials = {
    github: "https://github.com/AshutoshDubey007",
    linkedin: "https://linkedin.com/in/ashutosh-dubey",
    twitter: "https://twitter.com",
  },
}) => {
  const videoRef = useHlsVideo({ src: HLS_VIDEO_SRC });
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // GSAP Marquee: xPercent: -50, duration 40, ease "none", repeat -1
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 38,
          ease: "none",
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [marqueeText]);

  const marqueeItems = Array(10).fill(marqueeText);

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative bg-bg pt-14 sm:pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden select-none"
    >
      {/* Background Video: flipped vertically scale-y-[-1] + Heavier overlay bg-black/60 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          width={1920}
          height={1080}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 flex flex-col justify-between min-h-[460px] sm:min-h-[500px]">
        {/* GSAP Marquee Container */}
        <div className="w-full overflow-hidden border-y border-stroke/40 py-5 sm:py-6 md:py-8 mb-12 sm:mb-16 pointer-events-none">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap will-change-transform select-none"
          >
            {marqueeItems.map((phrase, idx) => (
              <span
                key={idx}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-wider text-text-primary/70 shrink-0 px-3 sm:px-4"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* Center CTA */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center mb-12 sm:mb-16 w-full">
          <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4 font-mono">
            Get in touch • Pune, India
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display italic text-text-primary mb-6 leading-tight">
            Let's build fast, accessible, and extraordinary products together.
          </h2>

          {/* Email button with gradient hover border ring */}
          <div className="relative group rounded-full p-[2px] transition-transform duration-200 hover:scale-105 inline-block max-w-full">
            <span
              className="absolute inset-0 rounded-full accent-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <a
              href={`mailto:${email}`}
              className="relative inline-flex items-center gap-2 sm:gap-3 rounded-full text-xs sm:text-sm md:text-base font-medium px-6 sm:px-8 py-3.5 sm:py-4 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300 shadow-xl truncate max-w-full"
            >
              <span className="truncate">{email}</span>
              <span className="text-accent transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-8 md:px-10 lg:px-16 pt-6 sm:pt-8 border-t border-stroke/40 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-muted">
          {/* Social Links */}
          <div className="flex items-center gap-5 sm:gap-6 flex-wrap justify-center">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors uppercase tracking-wider font-medium text-[11px] sm:text-xs"
              >
                GitHub
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors uppercase tracking-wider font-medium text-[11px] sm:text-xs"
              >
                LinkedIn
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors uppercase tracking-wider font-medium text-[11px] sm:text-xs"
              >
                Twitter
              </a>
            )}
            {socials.dribbble && (
              <a
                href={socials.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors uppercase tracking-wider font-medium text-[11px] sm:text-xs"
              >
                Dribbble
              </a>
            )}
          </div>

          {/* Available for projects pill with green pulsing dot */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-stroke text-text-primary/90 text-[11px] sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium tracking-wide">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
