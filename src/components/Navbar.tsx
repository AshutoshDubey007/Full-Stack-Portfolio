import React, { useState } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';

interface NavbarProps {
  initials?: string;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenSayHi: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  initials = "AD",
  activeSection,
  onNavigate,
  onOpenSayHi,
  onOpenResume,
}) => {
  const scrollY = useScrollPosition();
  const [logoHovered, setLogoHovered] = useState(false);

  const navLinks = [
    { name: "Home", target: "hero" },
    { name: "Work", target: "works" },
    { name: "Resume", target: "resume", isSpecial: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300 ${
          scrollY > 100 ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* 1. Logo: 9x9 circle with accent gradient border (reverses on hover), inner bg-bg circle, scales 110% on hover */}
        <button
          onClick={() => onNavigate('hero')}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="group relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Scroll to top"
        >
          {/* Gradient ring that reverses on hover */}
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
              logoHovered ? 'accent-gradient-rev' : 'accent-gradient'
            }`}
          />
          {/* Inner circle with initials */}
          <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary tracking-tight font-medium">
              {initials}
            </span>
          </div>
        </button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1.5" />

        {/* 3. Nav Links: ["Home", "Work", "Resume"] */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.name}
                onClick={() => {
                  if (link.isSpecial) {
                    onOpenResume();
                  } else {
                    onNavigate(link.target);
                  }
                }}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
                  isActive
                    ? 'text-text-primary bg-stroke/50'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5" />

        {/* 5. "Say hi" button with gradient hover border */}
        <div className="relative group">
          <span
            className="absolute -inset-[2px] rounded-full accent-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[0.5px]"
            aria-hidden="true"
          />
          <button
            onClick={onOpenSayHi}
            className="relative inline-flex items-center gap-1.5 text-xs sm:text-sm rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 bg-surface text-text-primary backdrop-blur-md transition-colors duration-200 font-medium"
          >
            <span>Say hi</span>
            <span className="text-[11px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};
