/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  Github, Linkedin, Mail, Instagram, Code2, Database, Globe, Terminal,
  Award, ChevronRight, Menu, X, Bot, Layers, Layout, ExternalLink,
  MessageSquare, FileText, BookOpen, ArrowUpRight, Sun, Moon,
} from "lucide-react";

// --- Types ---
interface Project { title: string; description: string; tags: string[]; link: string; }
interface Certification { id: number; title: string; issuer: string; description: string; fileUrl: string; previewImages: string[]; }
interface ActivityImage { title: string; description: string; url: string; }
interface Publication { id: number; title: string; journal: string; description: string; fileName: string; fileUrl: string; previewImages: string[]; tags: string[]; }

// --- Translations ---
const T = {
  id: {
    nav: { home:"Beranda",about:"Tentang",skills:"Keahlian",experience:"Pengalaman",projects:"Proyek",certs:"Sertifikasi",publications:"Publikasi",gallery:"Galeri",contact:"Kontak",contact_btn:"Hubungi" },
    hero: { badge:"",title:"Pengembangan Sistem Web, Otomasi, & Information Technology Education.",desc:"Halo, saya [name]. Berfokus pada pembangunan solusi digital yang fungsional, berbobot ringan, serta integrasi teknologi modern untuk kebutuhan nyata.",cta_projects:"Lihat Proyek",cta_cv:"Pratinjau CV",cta_contact:"Kontak",cv_title:"CV Ahmad Habibi",cv_subtitle:"Curriculum Vitae",cv_info:"Informasi Berkas",cv_desc:"Dokumen CV lengkap memuat riwayat pendidikan, pengalaman di BSN & Kampus Mengajar, serta sertifikasi keahlian.",cv_download:"Unduh CV (PDF)",cv_open:"Buka di Tab Baru" },
    about: { subtitle:"Profil Singkat",title:"Pendidikan & Teknologi Informasi",p1:"Saya lulusan Pendidikan Teknologi Informasi dengan pengalaman magang di instansi pemerintahan (Badan Standardisasi Nasional - BSN) dan program Kampus Mengajar Kemendikbudristek.",p2:"Berfokus pada pembuatan aplikasi yang fungsional, performa ringan, dan mudah digunakan \u2014 baik untuk otomatisasi alur kerja, pengolahan data, hingga platform digital.",stat1:"IPK (Skala 4.00)",stat2:"Fokus Bidang" },
    skills: { subtitle:"Kemampuan",title:"Keahlian & Perangkat",cats:[{name:"Pemrograman & Tool",skills:["Python","VS Code","Git","HTML / CSS / JS","Streamlit"]},{name:"AI & Data",skills:["Data Analytics","Prompt Engineering","AI Assistance","Excel Analysis"]},{name:"Desain & Kreatif",skills:["UI/UX Design","Canva","CapCut","Video Editing"]},{name:"Produktivitas",skills:["Microsoft Word","PowerPoint","Excel","Google Workspace"]}] },
    experience: { subtitle:"Riwayat",title:"Pengalaman Kerja & Organisasi",items:[{role:"Internship Specialist",company:"Badan Standardisasi Nasional (BSN)",period:"2025 - 2026",description:"Mengembangkan prototipe generator dokumen RSNI berbasis Python dengan bantuan AI, serta mengelola kepatuhan data standar nasional."},{role:"Pendidik Teknologi (Kampus Mengajar)",company:"SDN SODO 1 - Kemendikbudristek",period:"2023",description:"Meningkatkan literasi digital sekolah dan membangun sistem absensi perpustakaan berbasis QR-Code untuk pencatatan otomatis."},{role:"Divisi Kementerian Hukum",company:"BEM Universitas Bhinneka PGRI",period:"2021 - 2023",description:"Mengawasi regulasi organisasi dan kepatuhan hukum internal untuk Unit Kegiatan Mahasiswa (UKM)."}] },
    projects: { subtitle:"Portofolio",title:"Daftar Proyek",open:"Buka Proyek",items:[{title:"SENS Perfume",description:"Website showcase katalog parfum modern dengan navigasi produk responsif dan pengalaman visual bersih.",tags:["React","Vercel","Web"],link:"https://sens-perfume.vercel.app"},{title:"Generator RSNI",description:"Aplikasi otomasi berbasis Streamlit untuk membantu pembuatan dokumen RSNI dan standarisasi teknis.",tags:["Python","Streamlit","Otomasi"],link:"https://generator-rsni.streamlit.app"},{title:"SNI Companion",description:"Platform pendamping digital untuk mempermudah akses informasi, panduan, dan regulasi seputar SNI.",tags:["React","Vercel","SNI"],link:"https://sni-companion.vercel.app"},{title:"Training AI",description:"Aplikasi interaktif materi edukasi AI untuk pelatihan pengguna dan demonstrasi kecerdasan buatan.",tags:["AI","Streamlit","EduTech"],link:"https://training-ai.streamlit.app"},{title:"ASPRIKU",description:"Aplikasi web interaktif dengan desain antarmuka responsif dan alur navigasi yang efisien.",tags:["React","Vercel","Web App"],link:"https://aspriku.vercel.app/"},{title:"CV Ananda",description:"Website CV digital interaktif yang menampilkan profil, pengalaman, dan portofolio secara profesional.",tags:["React","Vercel","CV"],link:"https://cvananda.vercel.app/"},{title:"Sapahati",description:"Platform digital komunitas kesehatan mental dengan fitur konten edukasi dan layanan pendampingan.",tags:["Web","Kesehatan","Komunitas"],link:"https://sapahati.id/#"}] },
    certs: { subtitle:"Kualifikasi",title:"Sertifikasi & Pelatihan",view:"Lihat Dokumen",modal_subtitle:"Detail Sertifikat",publisher:"Penerbit",description_label:"Deskripsi",download:"Unduh Dokumen",open_pdf:"Buka PDF Langsung",items:[{title:"Web Development Assistance",issuer:"Certification Program",description:"Pelatihan dan pendampingan pengembangan web modern serta implementasi solusi digital."},{title:"BEM Organizational Cert",issuer:"Univ Bhinneka PGRI",description:"Penghargaan atas kontribusi aktif di Divisi Kementerian Hukum BEM (2022/2023)."},{title:"Kampus Mengajar Angkatan 6",issuer:"Kemendikbudristek",description:"Pelaksanaan program penguatan literasi, numerasi, dan teknologi di SD."},{title:"Data Analytics with AI",issuer:"Revolut Tech Academy",description:"Pelatihan pengembangan software dan analitik data dengan AI."},{title:"Dasar AI",issuer:"Dicoding Indonesia",description:"Sertifikasi pemahaman konsep dasar kecerdasan buatan dan alur kerja AI."},{title:"Python Programming",issuer:"Dicoding Indonesia",description:"Dasar-dasar pemrograman Python untuk pengolahan data dan otomasi."},{title:"Information Security (ISO 27001)",issuer:"BSN Official",description:"Pemahaman sistem manajemen keamanan informasi berstandar internasional."},{title:"Pelatihan Microsoft Word",issuer:"Program Pelatihan",description:"Pelatihan format dokumen profesional dan produktivitas administrasi."},{title:"SNI ISO 9001 - Manajemen Mutu",issuer:"BSN Official",description:"Pelatihan persyaratan standar manajemen mutu dan implementasi standarisasi."}] },
    publications: { subtitle:"Karya Tulis",title:"Publikasi & Artikel",modal_subtitle:"Dokumen Publikasi",file_label:"Berkas Publikasi",file:"File",download:"Unduh Berkas",open_pdf:"Buka PDF",read:"Baca Dokumen",items:[{title:"Publikasi Jurnal / Artikel Ilmiah",journal:"Dokumen Publikasi Ilmiah",description:"Karya publikasi ilmiah terkait teknologi pendidikan dan inovasi digital.",tags:["Jurnal","Artikel","PDF"]}] },
    gallery: { subtitle:"Dokumentasi",title:"Galeri Aktivitas",items:[{title:"Kegiatan Magang BSN",description:"Dokumentasi kegiatan magang di Badan Standardisasi Nasional, berfokus pada pengelolaan data standar dan pengembangan solusi digital."},{title:"Koordinasi Program BSN",description:"Momen koordinasi dan pembelajaran selama program magang, adaptasi alur kerja, dan kolaborasi tim."},{title:"Presentasi Hasil Magang",description:"Penyampaian hasil pekerjaan dan evaluasi kontribusi teknologi dalam proses pendukung standardisasi."},{title:"Kampus Mengajar Angkatan 6",description:"Program Kemendikbudristek dalam mendukung literasi, numerasi, dan pemanfaatan teknologi di sekolah dasar."},{title:"Pendampingan Siswa",description:"Kegiatan pendampingan pembelajaran dan pengenalan aplikasi digital kepada para siswa."}] },
    contact: { subtitle:"Kontak",title:"Mari Terhubung",desc:"Terbuka untuk peluang kerja, kolaborasi proyek teknologi, standarisasi, maupun konsultasi edukasi teknologi. Silakan hubungi saya melalui jalur berikut:" },
    footer:"Portfolio",
    pdf: { page:"Halaman",of:"dari",preview:"Pratinjau PDF",loading:"Memuat dokumen...",error:"Preview PDF gagal dimuat. Silakan unduh atau buka langsung.",page_error:"Preview halaman PDF gagal dirender. Coba buka PDF langsung.",open_tab:"Buka PDF di Tab Baru",download:"Unduh PDF",prev:"Prev",next:"Next" },
  },
  en: {
    nav: { home:"Home",about:"About",skills:"Skills",experience:"Experience",projects:"Projects",certs:"Certifications",publications:"Publications",gallery:"Gallery",contact:"Contact",contact_btn:"Contact" },
    hero: { badge:"",title:"Web System Development, Automation, & Information Technology Education.",desc:"Hi, I\u2019m [name]. Focused on building functional, lightweight digital solutions with modern technology integrations for real-world needs.",cta_projects:"View Projects",cta_cv:"Preview CV",cta_contact:"Contact",cv_title:"CV Ahmad Habibi",cv_subtitle:"Curriculum Vitae",cv_info:"File Information",cv_desc:"Complete CV document containing educational background, experience at BSN & Kampus Mengajar, and skill certifications.",cv_download:"Download CV (PDF)",cv_open:"Open in New Tab" },
    about: { subtitle:"Brief Profile",title:"Education & Information Technology",p1:"I am a graduate of Information Technology Education with internship experience at a government agency (National Standardization Agency - BSN) and the Kampus Mengajar program by Kemendikbudristek.",p2:"Focused on building functional, lightweight, and user-friendly applications \u2014 from workflow automation and data processing to digital platforms.",stat1:"GPA (Scale 4.00)",stat2:"Focus Area" },
    skills: { subtitle:"Capabilities",title:"Skills & Tools",cats:[{name:"Programming & Tools",skills:["Python","VS Code","Git","HTML / CSS / JS","Streamlit"]},{name:"AI & Data",skills:["Data Analytics","Prompt Engineering","AI Assistance","Excel Analysis"]},{name:"Design & Creative",skills:["UI/UX Design","Canva","CapCut","Video Editing"]},{name:"Productivity",skills:["Microsoft Word","PowerPoint","Excel","Google Workspace"]}] },
    experience: { subtitle:"History",title:"Work & Organizational Experience",items:[{role:"Internship Specialist",company:"National Standardization Agency (BSN)",period:"2025 - 2026",description:"Developed a Python-based RSNI document generator prototype with AI assistance, and managed national standard data compliance."},{role:"Technology Educator (Kampus Mengajar)",company:"SDN SODO 1 - Kemendikbudristek",period:"2023",description:"Improved school digital literacy and built a QR-Code-based library attendance system for automated record-keeping."},{role:"Legal Affairs Division",company:"BEM Universitas Bhinneka PGRI",period:"2021 - 2023",description:"Supervised organizational regulations and internal legal compliance for Student Activity Units (UKM)."}] },
    projects: { subtitle:"Portfolio",title:"Project List",open:"Open Project",items:[{title:"SENS Perfume",description:"Modern perfume catalog showcase website with responsive product navigation and clean visual experience.",tags:["React","Vercel","Web"],link:"https://sens-perfume.vercel.app"},{title:"Generator RSNI",description:"Streamlit-based automation app to assist in creating RSNI documents and technical standardization.",tags:["Python","Streamlit","Automation"],link:"https://generator-rsni.streamlit.app"},{title:"SNI Companion",description:"Digital companion platform to facilitate access to information, guides, and regulations around SNI.",tags:["React","Vercel","SNI"],link:"https://sni-companion.vercel.app"},{title:"Training AI",description:"Interactive AI educational app for user training and artificial intelligence demonstrations.",tags:["AI","Streamlit","EduTech"],link:"https://training-ai.streamlit.app"},{title:"ASPRIKU",description:"Interactive web app with responsive interface design and efficient navigation flow.",tags:["React","Vercel","Web App"],link:"https://aspriku.vercel.app/"},{title:"CV Ananda",description:"Interactive digital CV website showcasing profile, experience, and portfolio professionally.",tags:["React","Vercel","CV"],link:"https://cvananda.vercel.app/"},{title:"Sapahati",description:"Mental health community digital platform with educational content and counseling service features.",tags:["Web","Health","Community"],link:"https://sapahati.id/#"}] },
    certs: { subtitle:"Qualifications",title:"Certifications & Training",view:"View Document",modal_subtitle:"Certificate Detail",publisher:"Issuer",description_label:"Description",download:"Download Document",open_pdf:"Open PDF Directly",items:[{title:"Web Development Assistance",issuer:"Certification Program",description:"Training and mentoring in modern web development and digital solution implementation."},{title:"BEM Organizational Cert",issuer:"Univ Bhinneka PGRI",description:"Recognition for active contributions in the Legal Affairs Division of BEM (2022/2023)."},{title:"Kampus Mengajar Batch 6",issuer:"Kemendikbudristek",description:"Program to strengthen literacy, numeracy, and technology use in elementary schools."},{title:"Data Analytics with AI",issuer:"Revolut Tech Academy",description:"Software development and data analytics training with AI."},{title:"Basics of AI",issuer:"Dicoding Indonesia",description:"Certification of basic understanding of artificial intelligence concepts and workflows."},{title:"Python Programming",issuer:"Dicoding Indonesia",description:"Python programming fundamentals for data processing and automation."},{title:"Information Security (ISO 27001)",issuer:"BSN Official",description:"Understanding information security management systems to international standards."},{title:"Microsoft Word Training",issuer:"Training Program",description:"Professional document formatting and administrative productivity training."},{title:"SNI ISO 9001 - Quality Management",issuer:"BSN Official",description:"Training on quality management standard requirements and standardization implementation."}] },
    publications: { subtitle:"Written Works",title:"Publications & Articles",modal_subtitle:"Publication Document",file_label:"Publication File",file:"File",download:"Download File",open_pdf:"Open PDF",read:"Read Document",items:[{title:"Journal / Scientific Article Publication",journal:"Scientific Publication Document",description:"Scientific publication related to educational technology and digital innovation.",tags:["Journal","Article","PDF"]}] },
    gallery: { subtitle:"Documentation",title:"Activity Gallery",items:[{title:"BSN Internship Activities",description:"Documentation of internship activities at the National Standardization Agency, focused on standard data management and digital solution development."},{title:"BSN Program Coordination",description:"Coordination and learning moments during the internship program, workflow adaptation, and team collaboration."},{title:"Internship Result Presentation",description:"Delivery of work results and evaluation of technology contributions in the standardization support process."},{title:"Kampus Mengajar Batch 6",description:"Kemendikbudristek program to support literacy, numeracy, and technology use in elementary schools."},{title:"Student Mentoring",description:"Learning mentoring activities and introducing digital applications to students."}] },
    contact: { subtitle:"Contact",title:"Let\u2019s Connect",desc:"Open to job opportunities, technology project collaborations, standardization, and technology education consultation. Please reach me through:" },
    footer:"Portfolio",
    pdf: { page:"Page",of:"of",preview:"PDF Preview",loading:"Loading document...",error:"PDF preview failed to load. Please download or open directly.",page_error:"PDF page preview failed to render. Try opening the PDF directly.",open_tab:"Open PDF in New Tab",download:"Download PDF",prev:"Prev",next:"Next" },
  },
} as const;

type Lang = "id" | "en";
type Theme = "dark" | "light";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "id", setLang: () => {} });
const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: "dark", setTheme: () => {} });
const useLang = () => useContext(LangCtx);
const useTheme = () => useContext(ThemeCtx);
const useT = () => { const { lang } = useLang(); return T[lang]; };

const profileImage = new URL("../img/profil.webp", import.meta.url).href;
const pdfPreviews = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/pdf-previews/${slug}/page-${String(i + 1).padStart(2, "0")}.webp`);

// --- PDF Viewer ---
const PdfViewer = ({ fileUrl, title, previewImages = [] }: { fileUrl: string; title: string; previewImages?: string[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [renderVersion, setRenderVersion] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);
  const useImg = isMobile && previewImages.length > 0;
  const t = useT();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const up = () => setIsMobile(mq.matches);
    up(); mq.addEventListener("change", up);
    return () => mq.removeEventListener("change", up);
  }, []);

  useEffect(() => {
    if (!useImg) return;
    setPdfDoc(null); setError(null); setIsLoading(false); setIsRendering(false);
    setPageCount(previewImages.length);
    setPageNumber((c) => Math.min(Math.max(c, 1), previewImages.length));
  }, [previewImages.length, useImg]);

  useEffect(() => {
    if (useImg) return;
    let cancelled = false;
    let task: { promise: Promise<PDFDocumentProxy>; destroy: () => void } | null = null;
    setIsLoading(true); setError(null); setPdfDoc(null); setPageNumber(1); setPageCount(0);
    (async () => {
      try {
        const lib = await import("pdfjs-dist");
        lib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
        if (cancelled) return;
        task = lib.getDocument(fileUrl);
        const doc = await task.promise;
        if (cancelled) { doc.destroy(); return; }
        setPdfDoc(doc); setPageCount(doc.numPages);
      } catch { if (!cancelled) setError(t.pdf.error); }
      finally { if (!cancelled) setIsLoading(false); }
    })();
    return () => { cancelled = true; task?.destroy(); };
  }, [fileUrl, useImg]);

  useEffect(() => {
    const h = () => setRenderVersion((c) => c + 1);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    if (useImg || !pdfDoc || !canvasRef.current || !containerRef.current) return;
    let cancelled = false;
    setIsRendering(true);
    (async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled || !canvasRef.current || !containerRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const bv = page.getViewport({ scale: 1 });
        const aw = Math.max(containerRef.current.clientWidth - 24, 260);
        const vp = page.getViewport({ scale: Math.min(aw / bv.width, 1.35) });
        const isSmall = window.matchMedia("(max-width: 768px)").matches;
        let pr = Math.min(window.devicePixelRatio || 1, isSmall ? 1 : 1.5);
        const maxPx = isSmall ? 1800000 : 4200000;
        const est = vp.width * vp.height * pr * pr;
        if (est > maxPx) pr *= Math.sqrt(maxPx / est);
        canvas.width = Math.floor(vp.width * pr); canvas.height = Math.floor(vp.height * pr);
        canvas.style.width = `${Math.floor(vp.width)}px`; canvas.style.height = `${Math.floor(vp.height)}px`;
        ctx.setTransform(pr, 0, 0, pr, 0, 0); ctx.clearRect(0, 0, vp.width, vp.height);
        try { await page.render({ canvasContext: ctx, viewport: vp }).promise; }
        catch {
          if (cancelled) return;
          const fv = page.getViewport({ scale: Math.min(aw / bv.width, 0.72) });
          canvas.width = Math.floor(fv.width); canvas.height = Math.floor(fv.height);
          canvas.style.width = `${Math.floor(fv.width)}px`; canvas.style.height = `${Math.floor(fv.height)}px`;
          ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, fv.width, fv.height);
          await page.render({ canvasContext: ctx, viewport: fv }).promise;
        }
      } catch { if (!cancelled) setError(t.pdf.page_error); }
      finally { if (!cancelled) setIsRendering(false); }
    })();
    return () => { cancelled = true; };
  }, [pdfDoc, pageNumber, renderVersion, useImg]);

  const prevImg = previewImages[pageNumber - 1];
  return (
    <div className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-900 px-3 py-2">
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-white">{title}</div>
          <div className="text-[10px] text-neutral-400">{pageCount ? `${t.pdf.page} ${pageNumber} ${t.pdf.of} ${pageCount}` : t.pdf.preview}</div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPageNumber((c) => Math.max(1, c - 1))} disabled={pageNumber <= 1} className="rounded border border-neutral-700 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-800 disabled:opacity-30">{t.pdf.prev}</button>
          <button type="button" onClick={() => setPageNumber((c) => Math.min(pageCount, c + 1))} disabled={pageNumber >= pageCount} className="rounded border border-neutral-700 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-800 disabled:opacity-30">{t.pdf.next}</button>
        </div>
      </div>
      <div ref={containerRef} className="relative flex min-h-0 flex-1 items-start justify-center overflow-auto p-3">
        {!useImg && (isLoading || isRendering) && <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 text-xs font-medium text-neutral-300">{t.pdf.loading}</div>}
        {useImg && prevImg ? (
          <img src={prevImg} alt={`${title} p${pageNumber}`} className="max-w-full rounded bg-white shadow-lg" />
        ) : error ? (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 p-6 text-center">
            <FileText size={48} className="text-neutral-400" />
            <p className="text-sm text-neutral-400">{error}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200">{t.pdf.open_tab}</a>
              <a href={fileUrl} download className="rounded-lg border border-neutral-700 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800">{t.pdf.download}</a>
            </div>
          </div>
        ) : (
          <canvas ref={canvasRef} className="max-w-full rounded bg-white shadow-lg" aria-label={`Preview ${title}`} />
        )}
      </div>
    </div>
  );
};

// --- Navbar ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const t = useT();
  const isDark = theme === "dark";

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const items = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.certs, href: "#certifications" },
    
  ];

  const scrolledCls = isScrolled
    ? (isDark ? "bg-black/90 backdrop-blur-md border-b border-neutral-800 py-3 shadow-md" : "bg-white/90 backdrop-blur-md border-b border-neutral-200 py-3 shadow-md")
    : "bg-transparent py-5";
  const ctrlCls = isDark ? "border-neutral-700 text-neutral-300 hover:bg-neutral-800" : "border-neutral-300 text-neutral-600 hover:bg-neutral-100";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${scrolledCls}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#home" className={`font-bold text-lg sm:text-xl tracking-tight transition-colors ${isDark ? "text-white hover:text-neutral-300" : "text-neutral-900 hover:text-neutral-600"}`}>Portofolio</a>
        <div className="hidden lg:flex items-center gap-5">
          {items.map((item) => (
            <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-neutral-900"}`}>{item.label}</a>
          ))}
          <a href="#contact" className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-neutral-900 text-white hover:bg-neutral-700"}`}>{t.nav.contact_btn}</a>
          <button type="button" onClick={() => setLang(lang === "id" ? "en" : "id")} className={`text-xs font-bold px-2 py-1 rounded border transition-colors ${ctrlCls}`} aria-label="Toggle language">{lang === "id" ? "EN" : "ID"}</button>
          <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} className={`p-1.5 rounded border transition-colors ${ctrlCls}`} aria-label="Toggle theme">{isDark ? <Sun size={15} /> : <Moon size={15} />}</button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={() => setLang(lang === "id" ? "en" : "id")} className={`text-xs font-bold px-2 py-1 rounded border transition-colors ${ctrlCls}`}>{lang === "id" ? "EN" : "ID"}</button>
          <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} className={`p-1.5 rounded border transition-colors ${ctrlCls}`} aria-label="Toggle theme">{isDark ? <Sun size={15} /> : <Moon size={15} />}</button>
          <button className={`rounded-lg p-2 transition-colors ${isDark ? "text-neutral-400 hover:text-white hover:bg-neutral-900" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {isOpen && (
        <div className={`lg:hidden mt-2 mx-4 rounded-xl border p-3 shadow-xl ${isDark ? "border-neutral-800 bg-neutral-950" : "border-neutral-200 bg-white"}`}>
          <div className="flex flex-col gap-1">
            {items.map((item) => <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isDark ? "text-neutral-300 hover:text-white hover:bg-neutral-900" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"}`}>{item.label}</a>)}
            <a href="#contact" onClick={() => setIsOpen(false)} className={`mt-2 text-center py-2.5 px-3 rounded-lg font-semibold text-sm transition-colors ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-neutral-900 text-white hover:bg-neutral-700"}`}>{t.nav.contact_btn}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Section Heading ---
const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle: string }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="mb-10 text-center">
      <span className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{subtitle}</span>
      <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>{children}</h2>
    </div>
  );
};

// --- Hero ---
const Hero = () => {
  const [showResume, setShowResume] = useState(false);
  const resumeUrl = new URL("../document/CV_Ahmad_Habibi_.pdf", import.meta.url).href;
  const resumePreviews = pdfPreviews("cv-ahmad-habibi", 2);
  const t = useT();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const descParts = t.hero.desc.split("[name]");

  return (
    <section id="home" className={`relative pt-32 pb-20 md:pt-40 md:pb-28 ${isDark ? "" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl ${isDark ? "text-white" : "text-neutral-900"}`}>{t.hero.title}</h1>
          <p className={`max-w-2xl text-base sm:text-lg leading-relaxed mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {descParts[0]}<span className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>Ahmad Habibi</span>{descParts[1]}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a href="#projects" className={`px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-neutral-900 text-white hover:bg-neutral-700"}`}>{t.hero.cta_projects}</a>
            <button type="button" onClick={() => setShowResume(true)} className={`px-6 py-3 rounded-lg border font-medium transition-colors flex items-center gap-2 ${isDark ? "border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800" : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"}`}>{t.hero.cta_cv} <ChevronRight size={16} /></button>
            <a href="#contact" className={`px-6 py-3 rounded-lg transition-colors font-medium ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-neutral-900"}`}>{t.hero.cta_contact}</a>
          </div>
          <div className={`flex items-center gap-6 pt-4 border-t ${isDark ? "text-neutral-400 border-neutral-800" : "text-neutral-400 border-neutral-200"}`}>
            {[{href:"https://github.com/habibimdf",icon:<Github size={20}/>,label:"GitHub",ext:false},{href:"http://www.linkedin.com/in/ahmad-habibi-6869061a7",icon:<Linkedin size={20}/>,label:"LinkedIn",ext:true},{href:"https://instagram.com/habibi_mdf",icon:<Instagram size={20}/>,label:"Instagram",ext:true},{href:"mailto:ahmadhabibi130301@gmail.com",icon:<Mail size={20}/>,label:"Email",ext:false}].map((s) => (
              <a key={s.label} href={s.href} target={s.ext ? "_blank" : undefined} rel={s.ext ? "noopener noreferrer" : undefined} aria-label={s.label} className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-neutral-900"}`}>{s.icon}</a>
            ))}
          </div>
        </div>
      </div>
      {showResume && (
        <div onClick={() => setShowResume(false)} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
              <div><span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">{t.hero.cv_subtitle}</span><h3 className="text-base sm:text-lg font-bold text-white">{t.hero.cv_title}</h3></div>
              <button type="button" onClick={() => setShowResume(false)} className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors" aria-label="Close"><X size={20} /></button>
            </div>
            <div className="grid lg:grid-cols-[1fr_260px] flex-1 overflow-y-auto">
              <div className="h-[55vh] min-h-[360px] bg-black p-2"><PdfViewer fileUrl={resumeUrl} title={t.hero.cv_title} previewImages={resumePreviews} /></div>
              <div className="p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-800 bg-neutral-900/40">
                <div className="space-y-3"><div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{t.hero.cv_info}</div><p className="text-sm text-neutral-300 leading-relaxed">{t.hero.cv_desc}</p></div>
                <div className="space-y-2 pt-6">
                  <a href={resumeUrl} download="CV_Ahmad_Habibi_.pdf" className="block w-full py-2.5 text-center text-sm font-semibold rounded-lg bg-white hover:bg-neutral-200 text-black transition-colors">{t.hero.cv_download}</a>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full py-2 text-center text-xs font-medium rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors">{t.hero.cv_open}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- About ---
const AboutSection = () => {
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const cardCls = isDark ? "bg-neutral-900/60 border-neutral-800" : "bg-neutral-100 border-neutral-200";
  return (
    <section id="about" className={`py-16 sm:py-20 border-t ${isDark ? "border-neutral-800 bg-neutral-950/60" : "border-neutral-200 bg-neutral-50"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
          <div className={`mx-auto w-full max-w-[260px] aspect-[4/5] rounded-2xl overflow-hidden border shadow-md ${isDark ? "border-neutral-800 bg-neutral-900" : "border-neutral-200 bg-neutral-200"}`}>
            <img src={profileImage} alt="Ahmad Habibi" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{t.about.subtitle}</span>
            <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-neutral-900"}`}>{t.about.title}</h3>
            <p className={`text-sm sm:text-base leading-relaxed mb-4 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{t.about.p1}</p>
            <p className={`text-sm sm:text-base leading-relaxed mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{t.about.p2}</p>
            <div className={`grid grid-cols-2 gap-4 border-t pt-6 ${isDark ? "border-neutral-800" : "border-neutral-200"}`}>
              <div className={`p-4 rounded-xl border ${cardCls}`}><div className={`text-2xl font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>3.69</div><div className={`text-xs mt-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{t.about.stat1}</div></div>
              <div className={`p-4 rounded-xl border ${cardCls}`}><div className={`text-sm sm:text-base font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>Information Technology Education</div><div className={`text-xs mt-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{t.about.stat2}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Skills ---
const Skills = () => {
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const icons = [Code2, Bot, Layout, Database];
  const rots = [-1.3, 1.0, -0.7, 1.5];
  return (
    <section id="skills" className={`py-16 sm:py-20 border-t ${isDark ? "border-neutral-800" : "border-neutral-200 bg-white"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle={t.skills.subtitle}>{t.skills.title}</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.skills.cats.map((cat, i) => { const Icon = icons[i]; return (
            <div key={cat.name} style={{ transform: `rotate(${rots[i]}deg)` }} className={`p-4 rounded-lg border hover:rotate-0 transition-all duration-300 ${isDark ? "border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/40" : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-white"}`}>
              <div className={`p-2 rounded-lg w-fit mb-3 border ${isDark ? "bg-neutral-900 border-neutral-800 text-white" : "bg-white border-neutral-200 text-neutral-700"}`}><Icon size={18} /></div>
              <h3 className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-neutral-900"}`}>{cat.name}</h3>
              <div className="flex flex-wrap gap-1">{cat.skills.map((s) => <span key={s} className={`px-1.5 py-px rounded text-[10px] border ${isDark ? "bg-neutral-900 border-neutral-800 text-neutral-400" : "bg-white border-neutral-200 text-neutral-600"}`}>{s}</span>)}</div>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
};

// --- Experience ---
const Experience = () => {
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const icons = [Layers, Globe, Terminal];
  const rots = [-1.2, 1.4, -0.9];
  return (
    <section id="experience" className={`py-16 sm:py-20 border-t ${isDark ? "border-neutral-800 bg-neutral-950/60" : "border-neutral-200 bg-neutral-50"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle={t.experience.subtitle}>{t.experience.title}</SectionHeading>
        <div className="space-y-5">
          {t.experience.items.map((item, i) => { const Icon = icons[i]; return (
            <div key={i} style={{ transform: `rotate(${rots[i]}deg)` }} className={`p-4 rounded-lg border hover:rotate-0 transition-all duration-300 flex flex-col sm:flex-row gap-3 sm:gap-5 items-start ${isDark ? "border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/40" : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"}`}>
              <div className={`p-2.5 rounded-lg border shrink-0 ${isDark ? "bg-neutral-900 border-neutral-800 text-white" : "bg-neutral-100 border-neutral-200 text-neutral-700"}`}><Icon size={18} /></div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>{item.role}</h3>
                  <span className={`text-[10px] font-medium px-2 py-px rounded-full border w-fit ${isDark ? "text-neutral-400 bg-neutral-900 border-neutral-800" : "text-neutral-500 bg-neutral-100 border-neutral-200"}`}>{item.period}</span>
                </div>
                <div className={`text-[11px] font-medium mb-1.5 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>{item.company}</div>
                <p className={`text-[11px] leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>{item.description}</p>
              </div>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
};

// --- Projects ---
const Projects = () => {
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const rots = [-1.5, 1.2, -0.8, 1.8, -1.1, 0.9, -1.6];
  return (
    <section id="projects" className={`py-16 sm:py-20 border-t ${isDark ? "border-neutral-800" : "border-neutral-200 bg-white"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle={t.projects.subtitle}>{t.projects.title}</SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((p, i) => (
            <div key={i} style={{ transform: `rotate(${rots[i % rots.length]}deg)` }} className={`flex flex-col justify-between p-4 rounded-lg border hover:rotate-0 transition-all duration-300 group ${isDark ? "border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/40" : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-white"}`}>
              <div>
                <div className="flex flex-wrap gap-1 mb-2">{p.tags.map((tag) => <span key={tag} className={`text-[10px] font-medium px-1.5 py-px rounded border ${isDark ? "text-neutral-500 bg-neutral-900 border-neutral-800" : "text-neutral-500 bg-white border-neutral-200"}`}>{tag}</span>)}</div>
                <h3 className={`text-sm font-bold mb-1.5 transition-colors ${isDark ? "text-white group-hover:text-neutral-200" : "text-neutral-900 group-hover:text-neutral-700"}`}>{p.title}</h3>
                <p className={`text-[11px] leading-relaxed mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{p.description}</p>
              </div>
              <div className={`pt-3 border-t ${isDark ? "border-neutral-800/80" : "border-neutral-200"}`}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${isDark ? "text-white hover:text-neutral-300" : "text-neutral-900 hover:text-neutral-600"}`}>{t.projects.open} <ArrowUpRight size={13} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Certifications ---
const CertsSection = () => {
  const [sel, setSel] = useState<Certification | null>(null);
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const rots = [-1.4, 1.1, -0.8, 1.7, -1.2, 0.8, -1.5, 1.3, -0.6];
  const files = {
    webDev: new URL("../certificate/Web Development Assistance.pdf", import.meta.url).href,
    bem: new URL("../certificate/BEM Organizational Cert.pdf", import.meta.url).href,
    km: new URL("../certificate/Kampus Mengajar Angkatan 6.pdf", import.meta.url).href,
    da: new URL("../certificate/Data Analytics with AI.pdf", import.meta.url).href,
    ai: new URL("../certificate/dasarai.pdf", import.meta.url).href,
    py: new URL("../certificate/dasarpython.pdf", import.meta.url).href,
    is: new URL("../certificate/Information Security (ISO 27001).pdf", import.meta.url).href,
    mw: new URL("../certificate/PELATIHAN MICROSOFT WORD.pdf", import.meta.url).href,
    sni: new URL("../certificate/SNIISO9001 persyaratan sistem manajemen mutu.pdf", import.meta.url).href,
  };
  const urls = [files.webDev, files.bem, files.km, files.da, files.ai, files.py, files.is, files.mw, files.sni];
  const prevs: string[][] = [[], pdfPreviews("cert-bem-organizational",1), pdfPreviews("cert-kampus-mengajar",2), pdfPreviews("cert-data-analytics-ai",2), pdfPreviews("cert-dasar-ai",2), pdfPreviews("cert-dasar-python",3), pdfPreviews("cert-information-security",1), pdfPreviews("cert-microsoft-word",1), pdfPreviews("cert-sni-iso9001",1)];
  const certs: Certification[] = t.certs.items.map((item, i) => ({ id: i + 1, title: item.title, issuer: item.issuer, description: item.description, fileUrl: urls[i], previewImages: prevs[i] }));

  return (
    <section id="certifications" className={`py-16 sm:py-20 border-t ${isDark ? "border-neutral-800 bg-neutral-950/60" : "border-neutral-200 bg-neutral-50"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle={t.certs.subtitle}>{t.certs.title}</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((cert, i) => (
            <div key={cert.id} onClick={() => setSel(cert)} style={{ transform: `rotate(${rots[i % rots.length]}deg)` }} className={`p-4 rounded-lg border cursor-pointer flex flex-col justify-between hover:rotate-0 transition-all duration-300 ${isDark ? "border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/40" : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"}`}>
              <div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border mb-2 ${isDark ? "bg-neutral-900 border-neutral-800 text-white" : "bg-neutral-100 border-neutral-200 text-neutral-700"}`}><Award size={16} /></div>
                <h4 className={`font-bold text-[13px] mb-1 leading-snug ${isDark ? "text-white" : "text-neutral-900"}`}>{cert.title}</h4>
                <p className={`text-[10px] font-medium mb-1.5 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>{cert.issuer}</p>
                <p className={`text-[10px] leading-relaxed line-clamp-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{cert.description}</p>
              </div>
              <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[10px] font-semibold ${isDark ? "border-neutral-800/80 text-neutral-300" : "border-neutral-200 text-neutral-600"}`}>
                <span>{t.certs.view}</span><ChevronRight size={12} className={isDark ? "text-neutral-400" : "text-neutral-500"} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {sel && (
        <div onClick={() => setSel(null)} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
              <div><span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">{t.certs.modal_subtitle}</span><h3 className="text-base sm:text-lg font-bold text-white">{sel.title}</h3></div>
              <button onClick={() => setSel(null)} className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors" aria-label="Close"><X size={20} /></button>
            </div>
            <div className="grid md:grid-cols-[1fr_280px] flex-1 overflow-y-auto">
              <div className="h-[50vh] min-h-[340px] bg-black p-2"><PdfViewer fileUrl={sel.fileUrl} title={sel.title} previewImages={sel.previewImages} /></div>
              <div className="p-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800 bg-neutral-900/40">
                <div className="space-y-4">
                  <div><div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">{t.certs.publisher}</div><div className="text-sm font-semibold text-white">{sel.issuer}</div></div>
                  <div><div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">{t.certs.description_label}</div><p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900 p-3 rounded-lg border border-neutral-800">{sel.description}</p></div>
                </div>
                <div className="space-y-2 pt-6">
                  <a href={sel.fileUrl} download={`${sel.title}.pdf`} className="block text-center w-full py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold text-sm rounded-lg transition-colors">{t.certs.download}</a>
                  <a href={sel.fileUrl} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-2 border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium text-xs rounded-lg transition-colors">{t.certs.open_pdf}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- Publications ---
const PublicationsSection = () => {
  const [sel, setSel] = useState<Publication | null>(null);
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const fileUrl = new URL("../document/publication/11446-34225-1-PB.pdf", import.meta.url).href;
  const pubs: Publication[] = t.publications.items.map((item, i) => ({
    id: i + 1, title: item.title, journal: item.journal, description: item.description,
    fileName: "11446-34225-1-PB.pdf", fileUrl, previewImages: pdfPreviews("publication-journal-article", 8), tags: item.tags,
  }));
  return (
    <section id="publications" className={`py-16 sm:py-20 border-t ${isDark ? "border-neutral-800" : "border-neutral-200 bg-white"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle={t.publications.subtitle}>{t.publications.title}</SectionHeading>
        <div className="space-y-5">
          {pubs.map((pub, i) => (
            <div key={pub.id} onClick={() => setSel(pub)} style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 1.0}deg)` }} className={`p-4 rounded-lg border cursor-pointer flex flex-col sm:flex-row gap-4 items-start justify-between hover:rotate-0 transition-all duration-300 ${isDark ? "border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/40" : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-white"}`}>
              <div className="flex gap-3 items-start">
                <div className={`p-2.5 rounded-lg border shrink-0 ${isDark ? "bg-neutral-900 border-neutral-800 text-white" : "bg-white border-neutral-200 text-neutral-700"}`}><BookOpen size={18} /></div>
                <div>
                  <div className="flex flex-wrap gap-1 mb-1.5">{pub.tags.map((tag) => <span key={tag} className={`text-[10px] font-medium px-1.5 py-px rounded border ${isDark ? "text-neutral-500 bg-neutral-900 border-neutral-800" : "text-neutral-500 bg-white border-neutral-200"}`}>{tag}</span>)}</div>
                  <h3 className={`text-sm font-bold mb-0.5 ${isDark ? "text-white" : "text-neutral-900"}`}>{pub.title}</h3>
                  <p className={`text-[10px] mb-1.5 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>{pub.journal}</p>
                  <p className={`text-[11px] leading-relaxed max-w-xl ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>{pub.description}</p>
                </div>
              </div>
              <div className="shrink-0 self-end sm:self-center">
                <button type="button" className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors ${isDark ? "bg-white hover:bg-neutral-200 text-black" : "bg-neutral-900 hover:bg-neutral-700 text-white"}`}><ExternalLink size={12} /> {t.publications.read}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {sel && (
        <div onClick={() => setSel(null)} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
              <div><span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">{t.publications.modal_subtitle}</span><h3 className="text-base sm:text-lg font-bold text-white">{sel.title}</h3></div>
              <button type="button" onClick={() => setSel(null)} className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors" aria-label="Close"><X size={20} /></button>
            </div>
            <div className="grid md:grid-cols-[1fr_260px] flex-1 overflow-y-auto">
              <div className="h-[55vh] min-h-[360px] bg-black p-2"><PdfViewer fileUrl={sel.fileUrl} title={sel.title} previewImages={sel.previewImages} /></div>
              <div className="p-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800 bg-neutral-900/40">
                <div className="space-y-3">
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">{t.publications.file_label}</div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{sel.description}</p>
                  <div className="text-xs text-neutral-400 pt-2 border-t border-neutral-800">{t.publications.file}: <span className="text-neutral-200">{sel.fileName}</span></div>
                </div>
                <div className="space-y-2 pt-6">
                  <a href={sel.fileUrl} download={sel.fileName} className="block text-center w-full py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold text-sm rounded-lg transition-colors">{t.publications.download}</a>
                  <a href={sel.fileUrl} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-2 border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium text-xs rounded-lg transition-colors">{t.publications.open_pdf}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- Gallery ---
const Gallery = () => {
  const [sel, setSel] = useState<ActivityImage | null>(null);
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const imgUrls = [
    new URL("../img/Activity Gallery/bsn3.webp", import.meta.url).href,
    new URL("../img/Activity Gallery/bsn2.webp", import.meta.url).href,
    new URL("../img/Activity Gallery/presen.webp", import.meta.url).href,
    new URL("../img/Activity Gallery/km1.webp", import.meta.url).href,
    new URL("../img/Activity Gallery/km2.webp", import.meta.url).href,
  ];
  const images: ActivityImage[] = t.gallery.items.map((item, i) => ({ title: item.title, description: item.description, url: imgUrls[i] }));
  return (
    <section id="gallery" className={`py-16 sm:py-20 border-t ${isDark ? "border-neutral-800 bg-neutral-950/60" : "border-neutral-200 bg-neutral-50"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading subtitle={t.gallery.subtitle}>{t.gallery.title}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} onClick={() => setSel(img)} className={`group overflow-hidden rounded-xl border cursor-pointer transition-all shadow-md ${isDark ? "border-neutral-800 bg-neutral-950 hover:border-neutral-700" : "border-neutral-200 bg-white hover:border-neutral-300"}`}>
              <div className="aspect-[4/3] overflow-hidden bg-black"><img src={img.url} alt={img.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /></div>
              <div className="p-4">
                <h4 className={`font-semibold text-sm mb-1 ${isDark ? "text-white" : "text-neutral-900"}`}>{img.title}</h4>
                <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{img.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {sel && (
        <div onClick={() => setSel(null)} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl relative">
            <button onClick={() => setSel(null)} className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-full transition-colors z-10" aria-label="Close"><X size={20} /></button>
            <div className="aspect-[16/10] bg-black flex items-center justify-center"><img src={sel.url} alt={sel.title} className="w-full h-full object-contain" /></div>
            <div className="p-5 border-t border-neutral-800"><h3 className="text-base sm:text-lg font-bold text-white mb-2">{sel.title}</h3><p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{sel.description}</p></div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- Contact ---
const Contact = () => {
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  const itemCls = isDark ? "border-neutral-800 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700" : "border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300";
  const iconCls = isDark ? "bg-neutral-900 border-neutral-800 text-white" : "bg-neutral-100 border-neutral-200 text-neutral-700";
  return (
    <section id="contact" className={`py-16 sm:py-24 border-t ${isDark ? "border-neutral-800" : "border-neutral-200 bg-white"}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <SectionHeading subtitle={t.contact.subtitle}>{t.contact.title}</SectionHeading>
        <p className={`text-sm sm:text-base leading-relaxed mb-8 -mt-6 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{t.contact.desc}</p>
        <div className="space-y-3 text-left">
          {[
            { href:"https://wa.me/6282235208332", icon:<MessageSquare size={20}/>, label:"WhatsApp", value:"0822-3520-8332", ext:true },
            { href:"mailto:ahmadhabibi130301@gmail.com", icon:<Mail size={20}/>, label:"Email", value:"ahmadhabibi130301@gmail.com", ext:false },
            { href:"http://www.linkedin.com/in/ahmad-habibi-6869061a7", icon:<Linkedin size={20}/>, label:"LinkedIn", value:"Ahmad Habibi", ext:true },
            { href:"https://instagram.com/habibi_mdf", icon:<Instagram size={20}/>, label:"Instagram", value:"@habibi_mdf", ext:true },
          ].map((c) => (
            <a key={c.label} href={c.href} target={c.ext ? "_blank" : undefined} rel={c.ext ? "noopener noreferrer" : undefined} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${itemCls}`}>
              <div className={`p-3 border rounded-lg ${iconCls}`}>{c.icon}</div>
              <div>
                <div className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{c.label}</div>
                <div className={`text-sm sm:text-base font-medium break-all ${isDark ? "text-white" : "text-neutral-900"}`}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  const t = useT(); const { theme } = useTheme(); const isDark = theme === "dark";
  return (
    <footer className={`py-8 border-t text-center ${isDark ? "border-neutral-800 bg-black" : "border-neutral-200 bg-neutral-50"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>&copy; {new Date().getFullYear()} Ahmad Habibi &bull; {t.footer}</div>
        <div className={`flex gap-4 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
          {[{href:"https://github.com/habibimdf",icon:<Github size={18}/>,label:"GitHub"},{href:"http://www.linkedin.com/in/ahmad-habibi-6869061a7",icon:<Linkedin size={18}/>,label:"LinkedIn"},{href:"https://instagram.com/habibi_mdf",icon:<Instagram size={18}/>,label:"Instagram"}].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-neutral-900"}`}>{s.icon}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};


// --- Floating Anya ---
const FloatingAnya = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "0px",
        right: "16px",
        zIndex: 40,
        width: "120px",
        transform: hovered ? "translateY(-10px) scale(1.1)" : "translateY(0px) scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        animation: "anyaFloat 3s ease-in-out infinite",
        cursor: "pointer",
        userSelect: "none",
        pointerEvents: "auto",
      }}
      title="Heh~"
    >
      <img
        src="/anya.png"
        alt="Anya Forger"
        draggable={false}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: "drop-shadow(0 4px 16px rgba(255,150,180,0.35))",
        }}
      />
    </div>
  );
};

// --- App Root ---
export default function App() {
  const [lang, setLang] = useState<Lang>("id");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const l = localStorage.getItem("portfolio-lang") as Lang | null;
    const th = localStorage.getItem("portfolio-theme") as Theme | null;
    if (l) setLang(l);
    if (th) setTheme(th);
  }, []);

  const handleLang = (l: Lang) => { setLang(l); localStorage.setItem("portfolio-lang", l); };
  const handleTheme = (t: Theme) => { setTheme(t); localStorage.setItem("portfolio-theme", t); };
  const isDark = theme === "dark";

  return (
    <LangCtx.Provider value={{ lang, setLang: handleLang }}>
      <ThemeCtx.Provider value={{ theme, setTheme: handleTheme }}>
        <div className={`min-h-screen font-sans ${isDark ? "bg-black text-neutral-100 selection:bg-white selection:text-black" : "bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white"}`}>
          <Navbar />
          <main>
            <Hero />
            <AboutSection />
            <Skills />
            <Experience />
            <Projects />
            <CertsSection />
            <PublicationsSection />
            <Gallery />
            <Contact />
          </main>
          <Footer />
          <FloatingAnya />
        </div>
      </ThemeCtx.Provider>
    </LangCtx.Provider>
  );
}
