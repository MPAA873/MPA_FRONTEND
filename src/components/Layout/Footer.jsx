"use client";
import React from "react";
import Link from "next/link";
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
    ShieldCheck
} from "lucide-react";

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Submit Manuscript", href: "/submit" },
    { label: "Editorial Board", href: "/editorial-board" },
    { label: "Guidelines", href: "/guidelines" },
    { label: "Journal Policies", href: "/journal-policies" },
];

const resourceLinks = [
    { label: "Browse Articles", href: "/articles" },
    { label: "Current Issue", href: "/issue" },
    { label: "Author Guidelines", href: "/guidelines" },
    { label: "Peer Review Policy", href: "/guidelines" },
    { label: "Ethics & Malpractice", href: "/guidelines" },
    { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/mpa-research-centre/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/MPAResearchPub", label: "Twitter / X" },
    { icon: Facebook, href: "https://www.facebook.com/share/1DtX1h1MiP/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/mparesearchjournal?igsh=c3E5Nzk3MHk2Y3o1", label: "Instagram" },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-gradient-to-b from-[#4A2511] via-[#3B1D0D] to-[#2A1409] text-[#F5E9D9] overflow-hidden">
            {/* Decorative glow accents */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl" />
            {/* Top accent line */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#10B981] via-[#4ade80] to-[#10B981]" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <div className="inline-flex items-center gap-3 rounded-xl p-2 pr-4">
                            <img
                                src="/newLogo.png"
                                alt="MPA Research Logo"
                                className="h-35 w-35 object-contain rounded-lg"
                            />

                        </div>

                        <p className=" text-sm leading-relaxed text-[#F5E9D9]/70 max-w-sm">
                            A premier open-access platform for publishing cutting-edge, peer-reviewed
                            research — committed to scientific integrity and global academic growth.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                            <BookOpen size={13} className="text-[#4ade80]" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F5E9D9]/80">
                                Open Access &middot; Peer Reviewed
                            </span>
                        </div>

                        <p className="mt-2 text-[11px] text-[#F5E9D9]/50 leading-relaxed max-w-sm">
                            Distributed under the terms of the Creative Commons Attribution 4.0 International License (CC BY 4.0)
                        </p>

                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 transition-all duration-300 hover:border-emerald-400/40">
                            <Archive size={13} className="text-emerald-400 shrink-0" />

                            <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#F5E9D9]/80">
                                Archived &middot; via Zenodo
                                <BadgeCheck size={11} className="text-emerald-400" />
                            </span>
                        </div>


                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-7">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5E9D9]/70 hover:bg-[#10B981] hover:border-[#10B981] hover:text-white transition-all duration-300"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1.5 text-sm text-[#F5E9D9]/70 hover:text-[#4ade80] transition-colors duration-200"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowUpRight
                                            size={13}
                                            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {resourceLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1.5 text-sm text-[#F5E9D9]/70 hover:text-[#4ade80] transition-colors duration-200"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowUpRight
                                            size={13}
                                            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / Office Hours Column */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                            Get In Touch
                        </h3>

                        <ul className="space-y-4 text-sm text-[#F5E9D9]/70">
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                                <a href="mailto:info@mparesearch.com" className="hover:text-[#4ade80] transition-colors break-all">
                                    info@mparesearch.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                                <span>24/7 Automated Submission Support</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
                                <span>Global Editorial Network</span>
                            </li>
                        </ul>

                        {/* Office Hours Card */}
                        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2.5">
                                <Clock size={14} className="text-[#4ade80]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-white">
                                    Office Hours
                                </span>
                            </div>
                            <p className="text-[13px] text-[#F5E9D9]/70 leading-relaxed">
                                Mon – Fri: 9:00 AM – 6:00 PM IST
                                <br />
                                Sat – Sun: Automated support only
                                <br />
                                <span className="text-[#F5E9D9]/50">Closed on major holidays</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Divider ── */}
                {/* ── Privacy Policy Section ── */}
                <div className="flex flex-col items-center gap-4">

                    <Link
                        href="/privacy-policy"
                        className="group flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-sm font-medium text-[#F5E9D9]/80 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all duration-300"
                    >
                        <ShieldCheck
                            size={16}
                            className="text-emerald-400 group-hover:scale-110 transition-transform"
                        />
                        Privacy Policy
                    </Link>

                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

                    <p className="text-xs text-[#F5E9D9]/50">
                        &copy; {year} MPA Research. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;