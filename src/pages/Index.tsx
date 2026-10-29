import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SelectedWorks } from '../components/SelectedWorks';
import { Journal } from '../components/Journal';
import { Explorations } from '../components/Explorations';
import { Stats } from '../components/Stats';
import { ContactFooter } from '../components/ContactFooter';
import { ProjectModal } from '../components/ProjectModal';
import { LightboxModal } from '../components/LightboxModal';
import { ResumeModal } from '../components/ResumeModal';
import { SayHiModal } from '../components/SayHiModal';
import { ASHUTOSH_PROFILE_DATA } from '../data/portfolioData';
import { ProjectItem, ExplorationItem, ProfileData } from '../types/portfolio';

export const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [lightboxItem, setLightboxItem] = useState<ExplorationItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSayHiOpen, setIsSayHiOpen] = useState(false);

  // Directly populated with Ashutosh Dubey's real profile
  const profile: ProfileData = ASHUTOSH_PROFILE_DATA;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-[#4E85BF]/30 selection:text-white overflow-x-hidden">
      {/* Section 1: Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Floating Navbar */}
        <Navbar
          initials={profile.initials}
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onOpenSayHi={() => setIsSayHiOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <main>
          {/* Section 2: Hero */}
          <Hero
            eyebrow={profile.eyebrow}
            name={profile.name}
            location={profile.location}
            roles={profile.roles}
            description={profile.description}
            onSeeWorks={() => scrollToSection('works')}
            onReachOut={() => setIsSayHiOpen(true)}
          />

          {/* Section 3: Selected Works (with Filter) */}
          <SelectedWorks
            projects={profile.projects}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />

          {/* Section 4: Journal */}
          <Journal
            entries={profile.journal}
            onSelectEntry={() => {}}
          />

          {/* Section 5: Explorations (Parallax Gallery) */}
          <Explorations
            explorations={profile.explorations}
            onOpenLightbox={(item) => setLightboxItem(item)}
          />

          {/* Section 6: Stats */}
          <Stats stats={profile.stats} />
        </main>

        {/* Section 7: Contact / Footer */}
        <ContactFooter
          email={profile.email}
          marqueeText={profile.marqueeText}
          socials={profile.socials}
        />
      </motion.div>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <SayHiModal
        isOpen={isSayHiOpen}
        email={profile.email}
        phone={profile.phone}
        onClose={() => setIsSayHiOpen(false)}
      />
    </div>
  );
};
