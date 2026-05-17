/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Instagram, 
  Cpu, 
  Code2, 
  Database, 
  Globe, 
  Terminal, 
  Award, 
  ChevronRight, 
  Menu, 
  X,
  Bot,
  Binary,
  Layers,
  Layout,
  ExternalLink,
  MessageSquare,
  FileText,
  BookOpen
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  description: string;
  fileUrl: string;
}

interface ActivityImage {
  title: string;
  description: string;
  url: string;
}

interface Publication {
  id: number;
  title: string;
  journal: string;
  description: string;
  fileName: string;
  fileUrl: string;
  tags: string[];
}

const profileImage = new URL('../img/profil.webp', import.meta.url).href;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certification', href: '#certifications' },
    { label: 'Publikasi', href: '#publications' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed z-50 transition-all duration-300 ${isScrolled ? 'glass-panel accent-glow inset-x-3 top-3 py-3 md:inset-x-4 md:top-4 md:py-4' : 'inset-x-0 top-0 bg-transparent py-5 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="font-bold text-lg sm:text-xl tracking-[0.2em]">HABIBI</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {menuItems.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-xs xl:text-sm font-medium hover:text-quantum-primary transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-quantum-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 glass-panel text-sm font-semibold text-cyan-400 hover:bg-white/10 transition-all cursor-pointer"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white rounded-lg p-2 hover:bg-white/10 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-3 overflow-hidden rounded-xl border border-white/10 bg-slate-950/95"
          >
            <div className="flex flex-col p-4 gap-1">
              {menuItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="text-base font-medium py-3 px-3 rounded-lg hover:bg-white/5">
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [showResume, setShowResume] = useState(false);
  const resumeUrl = new URL('../document/CV_Ahmad_Habibi_.pdf', import.meta.url).href;

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-28 pb-16 md:pt-20 md:pb-0 overflow-hidden">
      {/* Quantum Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-quantum-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-quantum-secondary/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="glass-panel accent-glow absolute right-4 top-0 hidden items-center gap-3 border-cyan-500/30 p-3 sm:right-6 sm:p-4 md:flex"
        >
          <div className="rounded-lg bg-rose-500/20 p-2">
            <Binary className="text-rose-400" size={20} />
          </div>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]">Core GPA</div>
            <div className="text-sm font-bold text-white">3.69 / 4.0</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Connecting <span className="text-gradient">Technology</span> <br /> 
            to the Future.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Hello, I am <span className="text-white font-semibold">Ahmad Habibi</span>. 
            An Education Technology Information Graduate pushing the boundaries of AI-driven systems and modern digital solutions.
          </p>
          <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
            <a href="#projects" className="px-6 sm:px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-quantum-bg font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform block text-center">
              Explore Projects
            </a>
            <button
              type="button"
              onClick={() => setShowResume(true)}
              className="px-6 sm:px-8 py-4 glass-panel border-white/10 font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              View Resume <ChevronRight size={18} />
            </button>
          </div>
          <div className="mt-6 flex justify-center md:hidden">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="glass-panel accent-glow inline-flex items-center gap-3 border-cyan-500/30 p-3 sm:p-4"
            >
              <div className="rounded-lg bg-rose-500/20 p-2">
                <Binary className="text-rose-400" size={20} />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]">Core GPA</div>
                <div className="text-sm font-bold text-white">3.69 / 4.0</div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-6 text-slate-500 sm:mt-12">
            <span className="text-xs uppercase tracking-widest font-bold">Follow Me</span>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-quantum-primary transition-colors" />
              <a href="http://www.linkedin.com/in/ahmad-habibi-6869061a7" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-quantum-primary transition-colors" />
              </a>
              <Mail className="w-5 h-5 cursor-pointer hover:text-quantum-primary transition-colors" />
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-quantum-bg/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-5xl max-h-[92svh] overflow-hidden border-cyan-500/30"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
                <div>
                  <span className="caps-label text-cyan-400">Resume Preview</span>
                  <h3 className="mt-1 text-lg sm:text-xl font-bold">CV Ahmad Habibi</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowResume(false)}
                  className="rounded-full p-2 hover:bg-white/10 transition-colors"
                  aria-label="Close resume preview"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid max-h-[calc(92svh-76px)] overflow-y-auto lg:grid-cols-[1fr_260px]">
                <div className="h-[58svh] min-h-[360px] bg-slate-950 lg:h-[70vh]">
                  <object
                    data={`${resumeUrl}#toolbar=0&navpanes=0`}
                    type="application/pdf"
                    className="h-full w-full"
                    aria-label="Preview CV Ahmad Habibi"
                  >
                    <div className="flex h-full items-center justify-center p-8 text-center">
                      <p className="text-slate-400">Preview PDF tidak tersedia di browser ini.</p>
                    </div>
                  </object>
                </div>
                <div className="flex flex-col justify-center gap-5 p-4 sm:p-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Document</div>
                    <div className="mt-2 font-semibold text-white">CV_Ahmad_Habibi_.pdf</div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      Buka preview CV atau unduh file untuk melihat detail pengalaman, sertifikasi, dan kemampuan.
                    </p>
                  </div>
                  <a
                    href={resumeUrl}
                    download="CV_Ahmad_Habibi_.pdf"
                    className="w-full rounded-xl bg-cyan-500 px-5 py-4 text-center font-bold text-quantum-bg transition-colors hover:bg-cyan-400"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle: string }) => (
  <div className="mb-10 sm:mb-16 text-center">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="caps-label mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
    >
      {children}
    </motion.h2>
  </div>
);

const Skills = () => {
  const categories = [
    { name: 'Core Tech', icon: Code2, skills: ['Python', 'VS Code', 'Git', 'Terminal'] },
    { name: 'AI & Data', icon: Bot, skills: ['Data Analytics', 'Asisten AI', 'Prompt Eng.'] },
    { name: 'Creative', icon: Layout, skills: ['Canva', 'CapCut', 'UI/UX Design', 'Video Editing'] },
    { name: 'Productivity', icon: Database, skills: ['Excel', 'Word', 'PPT', 'Outlook'] },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle="Capabilities">My Tech Stack</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 tech-card-hover group"
            >
              <div className="p-3 bg-white/5 rounded-xl w-fit mb-6 group-hover:bg-quantum-primary/20 transition-colors">
                <cat.icon className="text-quantum-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const items = [
    {
      role: 'Internship Specialist',
      company: 'Badan Standarisasi Nasional (BSN)',
      period: '2025 - 2026',
      description: 'Developed Python-based SNI generator prototypes with AI assistance. Managed SNI data compliance.',
      icon: Layers
    },
    {
      role: 'Technology Educator',
      company: 'Kampus Mengajar - SDN SODO 1',
      period: '2023',
      description: 'Improved tech literacy and developed a QR-code based library management system for automated attendance.',
      icon: Globe
    },
    {
      role: 'Ministry of Law Division',
      company: 'BEM Universitas',
      period: '2021-2023',
      description: 'Supervised organizational compliance and internal regulations for UKM.',
      icon: Terminal
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle="Journey">Experience & History</SectionHeading>
        <div className="space-y-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-5 sm:p-8 flex flex-col md:flex-row gap-5 sm:gap-8 items-start tech-card-hover"
            >
              <div className="p-4 bg-quantum-primary/10 rounded-2xl text-quantum-primary">
                <item.icon size={32} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold">{item.role}</h3>
                  <span className="text-sm font-mono text-quantum-primary bg-quantum-primary/10 px-3 py-1 rounded-full mt-2 md:mt-0">
                    {item.period}
                  </span>
                </div>
                <div className="text-lg font-medium text-slate-300 mb-4">{item.company}</div>
                <p className="text-slate-400 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projectImages = {
    sensPerfume: new URL('./assets/projects/sens-perfume.svg', import.meta.url).href,
    generatorRsni: new URL('./assets/projects/generator-rsni.svg', import.meta.url).href,
    sniCompanion: new URL('./assets/projects/sni-companion.svg', import.meta.url).href,
    trainingAi: new URL('./assets/projects/training-ai.svg', import.meta.url).href,
    aspriku: new URL('./assets/projects/aspriku.svg', import.meta.url).href,
    tradingSignalOne: new URL('./assets/projects/trading-signal-one.svg', import.meta.url).href,
  };

  const projects: Project[] = [
    {
      title: 'SENS Perfume',
      description: 'Modern perfume showcase website with a clean product experience and responsive presentation.',
      tags: ['React', 'Vercel', 'Product Web'],
      link: 'https://sens-perfume.vercel.app',
      image: projectImages.sensPerfume
    },
    {
      title: 'Generator RSNI',
      description: 'Streamlit application for assisting RSNI document generation and standardization workflows.',
      tags: ['Python', 'Streamlit', 'Automation'],
      link: 'https://generator-rsni.streamlit.app',
      image: projectImages.generatorRsni
    },
    {
      title: 'SNI Companion',
      description: 'Digital companion platform designed to support SNI-related access, guidance, and user workflows.',
      tags: ['React', 'Vercel', 'SNI'],
      link: 'https://sni-companion.vercel.app',
      image: projectImages.sniCompanion
    },
    {
      title: 'Training AI',
      description: 'Interactive Streamlit app for AI training materials, learning support, and practical demonstrations.',
      tags: ['AI', 'Streamlit', 'Education'],
      link: 'https://training-ai.streamlit.app',
      image: projectImages.trainingAi
    },
    {
      title: 'ASPRIKU',
      description: 'Responsive web application deployed on Vercel with a polished public-facing experience.',
      tags: ['React', 'Vercel', 'Web App'],
      link: 'https://aspriku.vercel.app/',
      image: projectImages.aspriku
    },
    {
      title: 'Trading Signal One',
      description: 'Market-focused web app for presenting trading signal insights through a clean and responsive interface.',
      tags: ['React', 'Vercel', 'Trading'],
      link: 'https://trading-signal-one.vercel.app/',
      image: projectImages.tradingSignalOne
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle="Portfolio">Featured Projects</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex h-full min-h-[410px] sm:min-h-[470px] flex-col overflow-hidden rounded-2xl bg-slate-900/80 border border-white/10 hover:border-quantum-primary/40 transition-all duration-500 shadow-xl shadow-slate-950/30"
            >
              <div className="aspect-[16/9] overflow-hidden relative bg-slate-950">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-5 sm:p-6 flex flex-1 flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest text-quantum-primary uppercase bg-quantum-primary/10 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-quantum-primary transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="mt-auto flex items-center gap-4 pt-2">
                   <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-bold text-cyan-400 flex items-center gap-3 group/btn hover:text-white transition-all uppercase tracking-[0.16em] sm:tracking-[0.2em]"
                   >
                     <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center group-hover/btn:border-cyan-400 group-hover/btn:bg-cyan-500/10 transition-all relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border border-t-cyan-400 border-transparent rounded-full opacity-0 group-hover/btn:opacity-100"
                        />
                        <ExternalLink size={14} />
                     </div>
                     Open Project
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<ActivityImage | null>(null);

  const images: ActivityImage[] = [
    {
      url: new URL('../img/Activity Gallery/bsn3.webp', import.meta.url).href,
      title: 'Kegiatan Magang BSN',
      description: 'Dokumentasi kegiatan magang di Badan Standardisasi Nasional, berfokus pada pengelolaan data standar dan pengembangan solusi digital berbasis teknologi.'
    },
    {
      url: new URL('../img/Activity Gallery/bsn2.webp', import.meta.url).href,
      title: 'Koordinasi Program BSN',
      description: 'Momen koordinasi dan pembelajaran selama program magang, termasuk proses adaptasi kerja, kolaborasi tim, dan pemahaman alur kerja instansi.'
    },
    {
      url: new URL('../img/Activity Gallery/presen.webp', import.meta.url).href,
      title: 'Presentasi Hasil Magang',
      description: 'Kegiatan penyampaian hasil pekerjaan dan evaluasi program magang, dengan penekanan pada kontribusi teknologi dalam mendukung proses standardisasi.'
    },
    {
      url: new URL('../img/Activity Gallery/km1.webp', import.meta.url).href,
      title: 'Kampus Mengajar',
      description: 'Dokumentasi program Kampus Mengajar Angkatan 6 dalam mendukung literasi, numerasi, dan penguatan teknologi di lingkungan sekolah dasar.'
    },
    {
      url: new URL('../img/Activity Gallery/km2.webp', import.meta.url).href,
      title: 'Pendampingan Siswa',
      description: 'Kegiatan pendampingan pembelajaran dan pengenalan teknologi kepada siswa, sekaligus membangun pengalaman kolaborasi di lingkungan pendidikan.'
    },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle="Visual Log">Activity Gallery</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-video overflow-hidden rounded-2xl glass-panel border-white/5 tech-card-hover cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-quantum-bg via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
                <div>
                  <span className="caps-label text-quantum-primary mb-1 block">Log #{idx + 101}</span>
                  <h4 className="text-white font-bold">{img.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-quantum-bg/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-5xl w-full max-h-[92svh] overflow-y-auto border-cyan-500/30 relative"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-quantum-bg/70 hover:bg-white/10 rounded-full transition-colors z-10"
                aria-label="Close gallery preview"
              >
                <X size={24} />
              </button>

              <div className="grid lg:grid-cols-[1.4fr_0.8fr]">
                <div className="bg-slate-950/70 max-h-[60svh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    decoding="async"
                    className="w-full h-full max-h-[60svh] sm:max-h-[75vh] object-contain"
                  />
                </div>
                <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <span className="caps-label text-cyan-400 mb-4 block">Activity Detail</span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-5">{selectedImage.title}</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading subtitle="Reach Out">Let's Connect</SectionHeading>
          <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-12 -mt-6 sm:-mt-10">
            Open for collaborations, interesting tech projects, or educational consultations. 
            Feel free to reach out through any of these channels.
          </p>
          
          <div className="space-y-6">
             <a href="https://wa.me/6282235208332" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-6 glass-panel p-5 sm:p-6 border-white/5 tech-card-hover block">
                <div className="p-4 bg-green-500/10 text-green-400 rounded-2xl">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">WhatsApp</div>
                  <div className="text-base sm:text-lg font-medium tracking-tight">0822-3520-8332</div>
                </div>
             </a>
             
             <a href="https://instagram.com/habibi_mdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-6 glass-panel p-5 sm:p-6 border-white/5 tech-card-hover block">
                <div className="p-4 bg-rose-500/10 text-rose-400 rounded-2xl">
                  <Instagram size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Instagram</div>
                  <div className="text-base sm:text-lg font-medium tracking-tight">@habibi_mdf</div>
                </div>
             </a>

             <a href="mailto:ahmadhabibi130301@gmail.com" className="flex items-center gap-4 sm:gap-6 glass-panel p-5 sm:p-6 border-white/5 tech-card-hover block">
                <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Email</div>
                  <div className="break-all text-base sm:text-lg font-medium tracking-tight">ahmadhabibi130301@gmail.com</div>
                </div>
             </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-slate-900/50 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-center md:text-left">
      <div className="flex items-center gap-2">
        <span className="font-bold tracking-[0.2em]">HABIBI</span>
      </div>
      <div className="text-slate-500 text-sm leading-relaxed">
        © 2026 Ahmad Habibi.
      </div>
      <div className="flex gap-6">
        <a href="https://github.com/habibimdf" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 hover:text-quantum-primary transition-colors"><Github size={20} /></a>
        <a href="http://www.linkedin.com/in/ahmad-habibi-6869061a7" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 hover:text-quantum-primary transition-colors"><Linkedin size={20} /></a>
        <a href="#" className="p-2 hover:text-quantum-primary transition-colors"><Instagram size={20} /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative isolate quantum-grid min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AboutSection />
        <Skills />
        <Experience />
        <CertsSection />
        <PublicationsSection />
        <Gallery />
        <Projects />
        <Contact />
        <Footer />
      </div>
      
      {/* Overlay for subtle color variation */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-t from-cyan-900/5 to-transparent shadow-[inset_0_0_100px_rgba(34,211,238,0.02)]" />
    </div>
  );
}

// --- Sub-sections for About and Certs ---

const Details = () => (
  <div className="flex items-center gap-4">
     <a 
      href="#" 
      onClick={(e) => e.preventDefault()}
      className="text-[11px] font-bold text-cyan-400 flex items-center gap-2 group-hover:text-white transition-colors uppercase tracking-[0.2em] relative"
     >
       Open Project 
       <div className="w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-quantum-bg transition-all">
        <ExternalLink size={12} />
       </div>
     </a>
  </div>
);

const AboutSection = () => (
  <section id="about" className="py-16 sm:py-24 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Quantum Scan Effect Container */}
          <div className="mx-auto max-w-sm lg:max-w-none aspect-[4/5] glass-panel p-3 sm:p-4 sm:rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden shadow-2xl relative">
             <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <motion.div 
                   animate={{ top: ['-10%', '110%', '-10%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                />
             </div>
             
             <img 
              src={profileImage}
              alt="Ahmad Habibi" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-xl transition-all duration-700 brightness-105 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-quantum-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <p className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">System Identity Confirmed</p>
             </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-quantum-primary/20 rounded-full blur-[80px] -z-10" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading subtitle="my profile">About Me</SectionHeading>
          <div className="text-base sm:text-xl italic text-cyan-400 mb-6 sm:mb-8 leading-relaxed font-light font-mono">
            {"> "} Teknologi merupakan jembatan masa depan.
          </div>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6">
            Saya freshgraduate jurusan Pendidikan Teknologi Informasi, dengan pengalaman magang di instansi pemerintahan (<span className="text-cyan-400">BSN</span>) dan pendidikan (<span className="text-indigo-400">Kampus Mengajar</span>).
          </p>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10">
            Mampu bekerja secara individu dan berkolaborasi dengan tim. Spesialisasi dalam menjembatani kebutuhan pendidikan tradisional dengan <span className="text-white font-bold">Inovasi Digital</span>.
          </p>
          
          <div className="grid grid-cols-2 gap-5 sm:gap-8 border-t border-white/5 pt-8">
            <div className="space-y-1">
              <h4 className="text-white font-bold text-3xl sm:text-4xl font-mono">3.69</h4>
              <p className="caps-label">Academic Index</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-3xl sm:text-4xl font-mono text-cyan-400">EduTech</h4>
              <p className="caps-label">Focus Scalar</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const CertsSection = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certificateFiles = {
    bem: new URL('../certificate/BEM Organizational Cert.pdf', import.meta.url).href,
    kampusMengajar: new URL('../certificate/Kampus Mengajar Angkatan 6.pdf', import.meta.url).href,
    dataAnalytics: new URL('../certificate/Data Analytics with AI.pdf', import.meta.url).href,
    dasarAi: new URL('../certificate/dasarai.pdf', import.meta.url).href,
    dasarPython: new URL('../certificate/dasarpython.pdf', import.meta.url).href,
    informationSecurity: new URL('../certificate/Information Security (ISO 27001).pdf', import.meta.url).href,
    microsoftWord: new URL('../certificate/PELATIHAN MICROSOFT WORD.pdf', import.meta.url).href,
    sniIso9001: new URL('../certificate/SNIISO9001 persyaratan sistem manajemen mutu.pdf', import.meta.url).href,
  };

  const certs: Certification[] = [
    { id: 1, title: 'BEM Organizational Cert', issuer: 'Univ Bhinneka PGRI', description: 'Awarded for active contribution in Ministry of Law division (2022/2023).', fileUrl: certificateFiles.bem },
    { id: 2, title: 'Kampus Mengajar Angkatan 6', issuer: 'Kemendikbudristek', description: 'Successfully implemented literacy, numeracy, and tech programs in elementary school.', fileUrl: certificateFiles.kampusMengajar },
    { id: 3, title: 'Data Analytics with AI', issuer: 'Revolut Tech Academy', description: 'Gained expertise in software development and advanced data analytics.', fileUrl: certificateFiles.dataAnalytics },
    { id: 4, title: 'Dasar AI', issuer: 'Dicoding Indonesia', description: 'Completed foundational learning for AI concepts and modern digital workflows.', fileUrl: certificateFiles.dasarAi },
    { id: 5, title: 'Python Programming', issuer: 'Dicoding Indonesia', description: 'Mastered fundamentals of Python for software and AI development.', fileUrl: certificateFiles.dasarPython },
    { id: 6, title: 'Information Security (ISO 27001)', issuer: 'BSN Official', description: 'Certified in managing global info-security standards.', fileUrl: certificateFiles.informationSecurity },
    { id: 7, title: 'Pelatihan Microsoft Word', issuer: 'Training Program', description: 'Completed practical training focused on Microsoft Word document formatting and productivity workflows.', fileUrl: certificateFiles.microsoftWord },
    { id: 8, title: 'SNI ISO 9001 - Sistem Manajemen Mutu', issuer: 'BSN Official', description: 'Completed training on ISO 9001 quality management system requirements and standardization practices.', fileUrl: certificateFiles.sniIso9001 }
  ];

  return (
    <section id="certifications" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle="Recognition">Certifications</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {certs.map((cert) => (
             <motion.div
               key={cert.id}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               onClick={() => setSelectedCert(cert)}
               className="glass-panel p-5 sm:p-6 border-white/5 flex gap-4 sm:gap-5 tech-card-hover cursor-pointer active:scale-95 transition-transform"
             >
               <div className="w-12 h-12 shrink-0 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                 <Award size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-white mb-1 leading-tight">{cert.title}</h4>
                  <p className="text-xs text-cyan-400 font-medium mb-3">{cert.issuer}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{cert.description}</p>
               </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-quantum-bg/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-4xl w-full max-h-[92svh] overflow-y-auto p-5 sm:p-8 relative border-cyan-500/30"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
                <div className="w-full md:w-1/2 h-[46svh] min-h-[280px] md:aspect-[4/3] md:h-auto bg-slate-800 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden">
                  <object
                    data={`${selectedCert.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    type="application/pdf"
                    className="w-full h-full"
                    aria-label={`Preview ${selectedCert.title}`}
                  >
                    <div className="text-center p-4">
                      <Award size={64} className="text-cyan-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-sm font-mono text-slate-500">PDF PREVIEW UNAVAILABLE</p>
                    </div>
                  </object>
                </div>
                <div className="w-full md:w-1/2">
                   <span className="caps-label text-cyan-400 mb-4 block">Official Documents</span>
                   <h3 className="text-2xl sm:text-3xl font-bold mb-4 pr-8 sm:pr-0">{selectedCert.title}</h3>
                   <div className="bg-white/5 p-4 rounded-xl mb-6">
                     <p className="text-sm text-slate-300 leading-relaxed">
                       {selectedCert.description}
                     </p>
                   </div>
                   <div className="flex flex-col gap-2 border-t border-white/5 pt-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Issuer:</span>
                        <span className="text-right text-white font-medium">{selectedCert.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Status:</span>
                        <span className="text-emerald-400 font-medium tracking-widest uppercase text-xs">Verified</span>
                      </div>
                   </div>
                   <a
                     href={selectedCert.fileUrl}
                     download={`${selectedCert.title}.pdf`}
                     className="block text-center w-full mt-8 py-3 bg-cyan-500 text-quantum-bg font-bold rounded-xl hover:bg-cyan-400 transition-colors"
                   >
                     Download Document
                   </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PublicationsSection = () => {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const publicationFiles = {
    journalArticle: new URL('../document/publication/11446-34225-1-PB.pdf', import.meta.url).href,
  };

  const publications: Publication[] = [
    {
      id: 1,
      title: 'Publikasi Jurnal/Artikel',
      journal: 'Dokumen publikasi ilmiah',
      description: 'File publikasi yang tersedia pada folder publication untuk pratinjau dan unduhan.',
      fileName: '11446-34225-1-PB.pdf',
      fileUrl: publicationFiles.journalArticle,
      tags: ['Journal', 'Article', 'PDF'],
    },
  ];

  return (
    <section id="publications" className="py-16 sm:py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle="Published Work">Publikasi Jurnal/Artikel</SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          {publications.map((publication, idx) => (
            <motion.button
              key={publication.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedPublication(publication)}
              className="group glass-panel p-5 sm:p-7 border-white/5 text-left tech-card-hover cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <BookOpen size={28} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {publication.tags.map((tag) => (
                      <span key={tag} className="rounded bg-quantum-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-quantum-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white transition-colors group-hover:text-quantum-primary">
                    {publication.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-cyan-400">{publication.journal}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{publication.description}</p>
                  <div className="mt-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 transition-all group-hover:border-cyan-400 group-hover:bg-cyan-500/10">
                      <ExternalLink size={14} />
                    </span>
                    Preview PDF
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPublication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPublication(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-quantum-bg/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-5xl w-full max-h-[92svh] overflow-y-auto p-5 sm:p-8 relative border-cyan-500/30"
            >
              <button
                type="button"
                onClick={() => setSelectedPublication(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                aria-label="Close publication preview"
              >
                <X size={24} />
              </button>

              <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                <div className="h-[58svh] min-h-[360px] overflow-hidden rounded-xl border border-white/5 bg-slate-800">
                  <object
                    data={`${selectedPublication.fileUrl}#toolbar=0&navpanes=0`}
                    type="application/pdf"
                    className="h-full w-full"
                    aria-label={`Preview ${selectedPublication.title}`}
                  >
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <FileText size={64} className="mb-4 text-cyan-400" />
                      <p className="text-sm font-mono text-slate-500">PDF PREVIEW UNAVAILABLE</p>
                    </div>
                  </object>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="caps-label text-cyan-400 mb-4 block">Publication File</span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 pr-8 lg:pr-0">{selectedPublication.title}</h3>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-sm leading-relaxed text-slate-300">{selectedPublication.description}</p>
                  </div>
                  <div className="mt-6 flex flex-col gap-2 border-t border-white/5 pt-6 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Type:</span>
                      <span className="text-right font-medium text-white">{selectedPublication.journal}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">File:</span>
                      <span className="text-right font-medium text-white break-all">{selectedPublication.fileName}</span>
                    </div>
                  </div>
                  <a
                    href={selectedPublication.fileUrl}
                    download={selectedPublication.fileName}
                    className="mt-8 block w-full rounded-xl bg-cyan-500 px-5 py-3 text-center font-bold text-quantum-bg transition-colors hover:bg-cyan-400"
                  >
                    Download Publication
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
