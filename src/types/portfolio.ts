export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  filterCategory: 'mobile' | 'frontend' | 'fullstack' | 'ai';
  span: string; // e.g. "md:col-span-7" | "md:col-span-5"
  aspectRatio: string;
  image: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface JournalItem {
  id: string;
  title: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
  summary: string;
  link?: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  rotation: number;
  column: 1 | 2;
  aspect: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
}

export interface ProfileData {
  eyebrow: string;
  name: string;
  initials: string;
  location: string;
  roles: string[];
  description: string;
  email: string;
  phone?: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    dribbble?: string;
    github?: string;
  };
  projects: ProjectItem[];
  journal: JournalItem[];
  explorations: ExplorationItem[];
  stats: StatItem[];
  marqueeText: string;
}
