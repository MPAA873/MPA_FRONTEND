"use client";
import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowUpRight,
  BookOpen,
  Archive,
  BadgeCheck,
  ShieldCheck,
  Home,
  Info,
  FileUp,
  GraduationCap,
  FileText,
  Scale,
  Search,
  Sparkles,
  PenTool,
  CheckCircle2,
  ShieldAlert,
  Headphones,
  Check,
  Copy,
  ChevronUp,
} from "lucide-react";

// Universal Link component (compatible with Next.js and standard React)
// If you are in Next.js, you can also use: import Link from "next/link";
const Link = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

// Quick Links
const quickLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Submit Manuscript", href: "/submit", icon: FileUp },
  { label: "Editorial Board", href: "/editorial-board", icon: GraduationCap },
  { label: "Guidelines", href: "/guidelines", icon: FileText },
  { label: "Journal Policies", href: "/journal-policies", icon: Scale },
];

// Resources
const resourceLinks = [
  { label: "Browse Articles", href: "/articles", icon: Search },
  { label: "Current Issue", href: "/issue", icon: Sparkles },
  { label: "Author Guidelines", href: "/guidelines", icon: PenTool },
  { label: "Peer Review Policy", href: "/guidelines", icon: CheckCircle2 },
  { label: "Ethics & Malpractice", href: "/guidelines", icon: ShieldAlert },
  { label: "Contact Us", href: "/contact", icon: Headphones },
];

// Social Links with official brand hover styles
const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/mpa-research-centre/",
    label: "LinkedIn",
    hoverBg: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
  },
  {
    icon: Twitter,
    href: "https://x.com/MPAResearchPub",
    label: "Twitter / X",
    hoverBg: "hover:bg-black hover:border-amber-400 hover:text-amber-400",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1DtX1h1MiP/",
    label: "Facebook",
    hoverBg: "hover:bg-[#1877F2] hover:border-[#1877F2]",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/mparesearchjournal?igsh=c3E5Nzk3MHk2Y3o1",
    label: "Instagram",
    hoverBg: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent",
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("info@mparesearch.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#1C0E07] via-[#24130A] to-[#120703] text-[#EADBCE] overflow-hidden selection:bg-amber-600 selection:text-white">
      {/* ── Top Atmospheric Multi-Color Accent Line (Amber Gold & Emerald Glow) ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-90" />
      <div className="absolute top-[2px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent" />

      {/* Ambient Radial Lighting for warm academic depth */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#F59E0B]/12 rounded-full blur-[110px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-[#B45309]/15 rounded-full blur-[100px]" />

      {/* Subtle geometric dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#F5D0B5 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-12">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* ──────────────── Brand Column (lg:col-span-4) ──────────────── */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Logo with high-contrast protective badge */}
              <div className="inline-block group mb-5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 bg-white/95 hover:bg-white px-4 py-2.5 rounded-2xl shadow-2xl shadow-black/60 border border-amber-900/20 ring-1 ring-black/10 hover:shadow-amber-500/20 hover:border-amber-400/50 transition-all duration-300"
                  aria-label="MPA Research Home"
                >
                  {!logoError ? (
                    <img
                      src="/newLogo.png"
                      alt="MPA Research Logo"
                      onError={() => setLogoError(true)}
                      className="h-11 sm:h-12 w-auto max-w-[230px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    /* High-Fidelity SVG Fallback matching mparesearch.com */
                    <div className="flex items-center gap-2.5 select-none">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center font-bold shadow-inner">
                        <span className="text-[#10B981] font-black text-xl">M</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 leading-none font-black text-lg">
                          <span className="text-[#5C2B14]">mpa</span>
                          <span className="text-[#10B981]">research</span>
                        </div>
                        <span className="text-[10px] text-[#B45309] italic font-semibold mt-0.5">
                          — passion for research —
                        </span>
                      </div>
                    </div>
                  )}
                </Link>
              </div>

              {/* Tagline / Mission */}
              <p className="text-sm leading-relaxed text-[#DCC7B8] max-w-sm font-normal">
                A premier open-access platform for publishing cutting-edge,
                peer-reviewed research — committed to scientific integrity and
                global academic growth.
              </p>

              {/* Badges Stack */}
              <div className="mt-5 space-y-2.5">
                {/* Badge 1: Open Access & Peer Reviewed */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                  </span>
                  <BookOpen size={13} className="text-[#34D399]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F7EDE4]">
                    Open Access &middot; Peer Reviewed
                  </span>
                </div>

                {/* CC BY 4.0 License Note */}
                <p className="text-[11px] text-[#B8A293] leading-relaxed max-w-sm flex items-start gap-1.5 pt-1">
                  <span className="text-amber-400 font-bold shrink-0">CC</span>
                  <span>
                    Distributed under the terms of the Creative Commons Attribution
                    4.0 International License (CC BY 4.0)
                  </span>
                </p>

                {/* Badge 2: Zenodo Archiving */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-950/40 px-3.5 py-1.5 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-900/40 shadow-sm">
                    <Archive size={13} className="text-amber-400 shrink-0" />
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#EADBCE]">
                      Archived &middot; via Zenodo
                      <BadgeCheck size={13} className="text-emerald-400" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-widest text-[#BCA697] mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ icon: Icon, href, label, hoverBg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={"w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#2D160C]/70 border border-amber-900/50 text-[#EADBCE] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-md " + hoverBg}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ──────────────── Quick Links Column (lg:col-span-2) ──────────────── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-4 bg-gradient-to-b from-amber-400 to-[#10B981] rounded-sm" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Quick Links
              </h3>
            </div>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between py-1 text-sm text-[#D8C2B3] hover:text-amber-300 transition-all duration-200"
                    >
                      <span className="inline-flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                        <span className="p-1 rounded-md bg-[#2B150A]/90 border border-amber-900/40 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-colors">
                          <IconComponent size={13} />
                        </span>
                        <span className="font-medium text-[13.5px]">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="text-amber-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ──────────────── Resources Column (lg:col-span-3) ──────────────── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-4 bg-gradient-to-b from-[#10B981] to-amber-400 rounded-sm" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Resources
              </h3>
            </div>

            <ul className="space-y-2.5">
              {resourceLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between py-1 text-sm text-[#D8C2B3] hover:text-emerald-300 transition-all duration-200"
                    >
                      <span className="inline-flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                        <span className="p-1 rounded-md bg-[#2B150A]/90 border border-amber-900/40 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                          <IconComponent size={13} />
                        </span>
                        <span className="font-medium text-[13.5px]">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="text-emerald-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ──────────────── Contact / Office Hours Column (lg:col-span-3) ──────────────── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-4 bg-gradient-to-b from-amber-400 to-[#F59E0B] rounded-sm" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Get In Touch
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm text-[#D8C2B3]">
              {/* Mail Contact */}
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  <Mail size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#BCA697]">
                    Editorial Inquiries
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href="mailto:info@mparesearch.com"
                      className="font-medium hover:text-amber-300 transition-colors break-all text-[13.5px] text-white"
                    >
                      info@mparesearch.com
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      title="Copy email address"
                      className="p-1 rounded bg-[#2D160C] hover:bg-[#3D1E10] text-[#BCA697] hover:text-white transition-all shrink-0"
                    >
                      {copiedEmail ? (
                        <Check size={12} className="text-amber-400" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                </div>
              </li>

              {/* Phone / Helpline */}
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#BCA697]">
                    Author Helpline
                  </span>
                  <span className="text-[13.5px] font-medium text-[#F7EDE4] block mt-0.5">
                    24/7 Automated Submission Support
                  </span>
                </div>
              </li>

              {/* Operations Location */}
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  <MapPin size={15} />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#BCA697]">
                    Operations
                  </span>
                  <span className="text-[13.5px] font-medium text-[#F7EDE4] block mt-0.5">
                    Global Editorial Network
                  </span>
                </div>
              </li>
            </ul>

            {/* Office Hours Card (Warm Academic Brown Glass) */}
            <div className="mt-6 bg-[#261309]/80 border border-amber-900/40 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-950/80">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Office Hours
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-medium text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  IST (UTC+5:30)
                </div>
              </div>

              <div className="space-y-1.5 text-[12.5px] text-[#D8C2B3] leading-relaxed font-normal">
                <div className="flex items-center justify-between">
                  <span className="text-[#EADBCE] font-medium">Mon – Fri:</span>
                  <span className="text-amber-400 font-semibold">9:00 AM – 6:00 PM IST</span>
                </div>
                <div className="flex items-center justify-between text-[#BCA697]">
                  <span>Sat – Sun:</span>
                  <span>Automated support only</span>
                </div>
                <p className="text-[11px] text-[#A68F80] pt-1 italic">
                  Closed on major holidays
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider with Subtle Glow ── */}
        <div className="relative my-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-900/60 to-transparent" />
          <div className="absolute inset-x-1/3 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </div>

        {/* ── Privacy Policy & Bottom Section ── */}
        <div className="flex flex-col items-center gap-5">
          {/* Privacy Policy & Back to Top Buttons */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href="/privacy-policy"
              className="group flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-950/40 px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#EADBCE] hover:text-white hover:border-amber-500/50 hover:bg-amber-900/50 transition-all duration-300 shadow-sm hover:shadow-amber-500/10"
            >
              <ShieldCheck
                size={16}
                className="text-amber-400 group-hover:scale-110 transition-transform duration-300"
              />
              <span>Privacy Policy</span>
            </Link>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              type="button"
              className="group flex items-center gap-1.5 rounded-full border border-amber-900/50 bg-[#261309]/80 px-4 py-2.5 text-xs font-medium text-[#D8C2B3] hover:text-white hover:border-amber-700/60 hover:bg-[#341B0D] transition-all duration-300"
              title="Return to top of page"
            >
              <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-amber-400" />
              <span>Back to Top</span>
            </button>
          </div>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          {/* Academic Indexing / Copyright details */}
          <div className="text-center space-y-1.5">
            <p className="text-xs text-[#C5B0A2] font-medium">
              &copy; {year} MPA Research. All rights reserved.
            </p>
            <p className="text-[11px] text-[#A68F80] max-w-xl mx-auto">
              Multi-disciplinary Peer-Reviewed Academic Journal &middot; Published in accordance with COPE guidelines &middot; Open Access Initiative
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
