import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'projects' | 'skills' | 'education'>('experience');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative max-w-4xl w-full bg-surface border border-stroke rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-stroke/60 bg-bg/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-mono">
                  Verified Curriculum Vitae
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary">
                Ashutosh Dubey
              </h3>
              <p className="text-[11px] sm:text-xs text-muted mt-0.5 truncate">
                Frontend & Mobile Engineer • React, React Native (Expo) & Next.js 15 • Pune, India
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <a
                href="mailto:ashutoshkdubey007@gmail.com"
                className="text-xs px-4 py-2 rounded-full bg-text-primary text-bg font-medium hover:opacity-90 transition-opacity"
              >
                Hire / Contact
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface border border-stroke text-text-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-4 sm:px-8 py-2.5 sm:py-3 border-b border-stroke/40 flex items-center gap-2 bg-surface/50 overflow-x-auto scrollbar-none">
            {(['experience', 'projects', 'skills', 'education'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-3.5 sm:px-4 py-1.5 rounded-full capitalize font-medium transition-all shrink-0 ${
                  activeTab === tab
                    ? 'bg-stroke text-text-primary font-semibold shadow-sm'
                    : 'text-muted hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 sm:space-y-6 text-sm overscroll-contain">
            {activeTab === 'experience' && (
              <div className="space-y-4 sm:space-y-5">
                {/* ZeTheta */}
                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      AI Chatbot Developer <span className="text-accent font-normal">@ ZeTheta</span>
                    </h4>
                    <span className="text-[11px] sm:text-xs text-muted font-mono">March 2025 – July 2025 | Remote</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-muted text-xs sm:text-sm">
                    <li>Cut end-user response time by 80% by architecting scalable AI-powered chatbot pipelines with Python, LangChain, and REST endpoints.</li>
                    <li>Implemented vector search response retrieval using FAISS vector databases and document embeddings, boosting response precision.</li>
                    <li>Executed PostgreSQL database operations, query testing, schema refinement, and reliability improvements.</li>
                  </ul>
                </div>

                {/* Nexora Cogniware */}
                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      Software Developer <span className="text-accent font-normal">@ Nexora Cogniware</span>
                    </h4>
                    <span className="text-[11px] sm:text-xs text-muted font-mono">June 2025 – November 2025 | Gwalior, India</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-muted text-xs sm:text-sm">
                    <li>Delivered multiple responsive pages and modular UI component systems using Astro.js and Tailwind CSS, achieving 95+ Lighthouse scores.</li>
                    <li>Built end-to-end authentication and authorization middleware integrated with Microsoft Azure cloud identity services.</li>
                    <li>Integrated headless Directus CMS through RESTful APIs for real-time dynamic content rendering.</li>
                  </ul>
                </div>

                {/* Turing */}
                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      Software Developer <span className="text-accent font-normal">@ Turing</span>
                    </h4>
                    <span className="text-[11px] sm:text-xs text-muted font-mono">November 2025 – December 2025 | Remote</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-muted text-xs sm:text-sm">
                    <li>Engineered secure user authentication workflows covering JWT session management and login authorization following security best practices.</li>
                    <li>Operated in Linux CLI environments for server management, testing, and continuous delivery.</li>
                    <li>Containerized applications with Docker and gained exposure to Kubernetes orchestration and AWS cloud deployment.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4 sm:space-y-5">
                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      Ryven <span className="text-xs text-muted font-normal">(React Native Gym Workout App)</span>
                    </h4>
                    <span className="text-xs text-accent font-mono">React Native, Expo SDK 58, Reanimated, Zustand, Supabase</span>
                  </div>
                  <p className="text-muted text-xs sm:text-sm">
                    Cross-platform mobile application for workout routines, hydration tracking, and strength progression. Features offline SQLite synchronization, native haptics, Google Auth, and 60fps reanimated gesture interactions.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      DevKit Marketplace <span className="text-xs text-muted font-normal">(Full-Stack Project)</span>
                    </h4>
                    <span className="text-xs text-accent font-mono">Next.js 15, TypeScript, Razorpay</span>
                  </div>
                  <p className="text-muted text-xs sm:text-sm">
                    Digital marketplace for discovering, purchasing, and monetizing developer toolkits and AI prompts. Features automated Razorpay payments, buyer-seller chat/ticketing, product access verification, and GitHub Actions CI/CD.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      Signalist Stalker <span className="text-xs text-muted font-normal">(Fintech Stock Tracker)</span>
                    </h4>
                    <span className="text-xs text-accent font-mono">Next.js, Finnhub, Inngest</span>
                  </div>
                  <p className="text-muted text-xs sm:text-sm">
                    Real-time stock tracking platform delivering live market insights, top gainers/losers, and personalized summaries. Integrates Inngest for scheduled queues, Finnhub API for market data, and automated email alerts.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      NexTALK Messenger <span className="text-xs text-muted font-normal">(WebSocket Chat)</span>
                    </h4>
                    <span className="text-xs text-accent font-mono">MERN Stack, Socket.io</span>
                  </div>
                  <p className="text-muted text-xs sm:text-sm">
                    Instant messaging application built with Socket.io for instantaneous bidirectional communications, private/group channels, typing indicators, user auth, and persistent chat archives in MongoDB.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-bg/40 border border-stroke">
                  <div className="text-[11px] sm:text-xs uppercase font-mono text-muted mb-1.5 font-semibold">Frontend & Mobile</div>
                  <p className="text-text-primary text-xs sm:text-sm leading-relaxed">
                    React.js, React Native (0.88), Expo SDK 58, Next.js 15, TypeScript, Tailwind CSS, Astro.js, HTML5, CSS3, JavaScript (ES6+), GSAP, Framer Motion, Reanimated
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-bg/40 border border-stroke">
                  <div className="text-[11px] sm:text-xs uppercase font-mono text-muted mb-1.5 font-semibold">Backend & Databases</div>
                  <p className="text-text-primary text-xs sm:text-sm leading-relaxed">
                    Node.js, Express.js, Flask, FastAPI, Python, REST APIs, Supabase, MongoDB, PostgreSQL, SQLite, Directus, NextAuth, Razorpay
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-bg/40 border border-stroke">
                  <div className="text-[11px] sm:text-xs uppercase font-mono text-muted mb-1.5 font-semibold">AI & Machine Learning</div>
                  <p className="text-text-primary text-xs sm:text-sm leading-relaxed">
                    LangChain, FAISS Vector Database, Document Embeddings, Retrieval-Augmented Generation (RAG)
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-bg/40 border border-stroke">
                  <div className="text-[11px] sm:text-xs uppercase font-mono text-muted mb-1.5 font-semibold">Tools & Cloud</div>
                  <p className="text-text-primary text-xs sm:text-sm leading-relaxed">
                    Git, GitHub, EAS Build, Docker, Kubernetes, AWS, Microsoft Azure, Linux CLI, CI/CD Actions
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-3.5 sm:space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">
                      ITM Gwalior
                    </h4>
                    <span className="text-[11px] sm:text-xs text-muted font-mono">2022 – 2026 | Gwalior, MP</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-primary/90">
                    Bachelor of Technology (B.Tech) in Computer Science & Engineering
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-bg/50 border border-stroke/70">
                  <h4 className="text-[11px] sm:text-xs uppercase font-mono text-muted mb-2.5 font-semibold">
                    Certifications & Credentials
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-muted text-xs sm:text-sm">
                    <li><strong className="text-text-primary">Oracle Cloud Infrastructure Generative AI Certification</strong> — Oracle</li>
                    <li><strong className="text-text-primary">Zscaler Cyber Security</strong> — Zscaler</li>
                    <li><strong className="text-text-primary">JavaScript Specialist Certification</strong> — HackerRank</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
