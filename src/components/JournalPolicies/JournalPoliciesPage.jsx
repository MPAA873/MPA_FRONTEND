"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { BookOpenCheck, Menu, X, ChevronRight } from "lucide-react";
import { policies } from "./policiesData";

const HEADER_OFFSET = 124; // px to clear the sticky top bar + main nav when scrolling to a section

export default function JournalPoliciesPage() {
  const [activeId, setActiveId] = useState(policies[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sectionRefs = useRef({});
  const clickLockRef = useRef(false);
  const clickLockTimeout = useRef(null);

  // Highlight the sidebar item for whichever section is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLockRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = sectionRefs.current[id];
    if (!el) return;

    // Lock scrollspy briefly so the manual click wins over the observer
    // while the smooth-scroll animation is still in flight.
    clickLockRef.current = true;
    setActiveId(id);

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });

    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }

    setDrawerOpen(false);

    clearTimeout(clickLockTimeout.current);
    clickLockTimeout.current = setTimeout(() => {
      clickLockRef.current = false;
    }, 700);
  }, []);

  // Respect a deep-link hash on first load (e.g. /journal-policies#ai-policy)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash?.replace("#", "");
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => scrollToSection(hash), 50);
    }
  }, [scrollToSection]);

  const activePolicy = policies.find((p) => p.id === activeId) || policies[0];

  return (
    <section className="w-full bg-white">
      {/* ---------- Page hero ---------- */}
      <div className="bg-[#FDF6ED] border-b border-[#F2E8DA] py-14 md:py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm border border-[#BBF7D0]">
            <BookOpenCheck size={16} className="text-[#22C55E]" />
            About the Journal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#713F12] tracking-tight mb-5">
            Journal Policies
          </h1>
          <p className="text-[#854D0E] text-[17px] md:text-lg leading-relaxed max-w-2xl mx-auto">
            Everything authors, reviewers, and readers need to know about how
            MPA Research is published, reviewed, and preserved &mdash; open
            access, licensing, ethics, and more, all in one place.
          </p>
          <div className="w-24 h-1.5 bg-[#22C55E] rounded-full mx-auto mt-8" />
        </div>
      </div>

      {/* ---------- Mobile section switcher ---------- */}
      <div className="lg:hidden sticky top-[100px] sm:top-[108px] z-30 bg-white border-b border-[#F2E8DA]">
        <button
          type="button"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-expanded={drawerOpen}
          className="w-full flex items-center justify-between gap-3 px-5 py-4"
        >
          <span className="flex items-center gap-2 text-[#713F12] font-semibold">
            <activePolicy.icon size={18} className="text-[#d97706]" />
            {activePolicy.title}
          </span>
          {drawerOpen ? (
            <X size={20} className="text-[#713F12]" />
          ) : (
            <Menu size={20} className="text-[#713F12]" />
          )}
        </button>

        {drawerOpen && (
          <nav className="border-t border-[#F2E8DA] max-h-[70vh] overflow-y-auto">
            <ul className="py-2">
              {policies.map((policy) => {
                const isActive = policy.id === activeId;
                const Icon = policy.icon;
                return (
                  <li key={policy.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(policy.id)}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left text-[15px] transition-colors ${
                        isActive
                          ? "bg-[#DCFCE7] text-[#166534] font-semibold"
                          : "text-[#5B4636] hover:bg-[#FDF6ED]"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={isActive ? "text-[#22C55E]" : "text-[#d97706]"}
                      />
                      {policy.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* ---------- Main layout: sidebar + content ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16 grid lg:grid-cols-[280px_1fr] gap-10">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <nav className="policy-sidebar-nav sticky top-[132px] max-h-[calc(100vh-152px)] overflow-y-auto bg-[#FDF6ED] border border-[#F2E8DA] rounded-3xl p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A16207] px-4 pt-3 pb-2">
              Journal Policies
            </p>
            <ul className="space-y-1">
              {policies.map((policy) => {
                const isActive = policy.id === activeId;
                const Icon = policy.icon;
                return (
                  <li key={policy.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(policy.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group w-full flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-[14.5px] transition-all duration-200 ${
                        isActive
                          ? "bg-white text-[#166534] font-semibold shadow-sm border border-[#BBF7D0]"
                          : "text-[#5B4636] hover:bg-white/70 border border-transparent"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#DCFCE7] text-[#22C55E]"
                            : "bg-white text-[#d97706] group-hover:bg-[#FDF6ED]"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="leading-snug">{policy.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <article
                key={policy.id}
                id={policy.id}
                ref={(el) => (sectionRefs.current[policy.id] = el)}
                className="scroll-mt-[132px] pb-14 mb-14 border-b border-[#F2E8DA] last:border-b-0 last:mb-0 last:pb-0"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 shrink-0 bg-[#FDF6ED] rounded-2xl flex items-center justify-center text-[#d97706] shadow-sm border border-[#F2E8DA]">
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-[#22C55E]">
                      POLICY {policy.number}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#713F12] tracking-tight mt-1">
                      {policy.title}
                    </h2>
                  </div>
                </div>

                <div className="policy-body text-[#854D0E] text-[16px] md:text-[16.5px] leading-relaxed space-y-4">
                  {policy.content}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const idx = policies.findIndex((p) => p.id === policy.id);
                    const next = policies[idx + 1];
                    if (next) scrollToSection(next.id);
                  }}
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#166534] mt-8 hover:gap-2.5 transition-all"
                >
                  {policies[policies.findIndex((p) => p.id === policy.id) + 1]
                    ? `Next: ${
                        policies[
                          policies.findIndex((p) => p.id === policy.id) + 1
                        ].title
                      }`
                    : "Back to top"}
                  <ChevronRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* Scoped typography for policy body content (plain <p>, <ul>, <ol>, <a>, <strong> tags) */}
      <style jsx global>{`
        .policy-sidebar-nav {
          scrollbar-width: thin;
          scrollbar-color: #86efac transparent;
        }
        .policy-sidebar-nav::-webkit-scrollbar {
          width: 6px;
        }
        .policy-sidebar-nav::-webkit-scrollbar-thumb {
          background: #86efac;
          border-radius: 999px;
        }
        .policy-sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }
        .policy-body p {
          margin: 0 0 1rem 0;
        }
        .policy-body p:last-child {
          margin-bottom: 0;
        }
        .policy-body strong {
          color: #713f12;
          font-weight: 600;
        }
        .policy-body a {
          color: #166534;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: #bbf7d0;
          text-underline-offset: 2px;
        }
        .policy-body a:hover {
          color: #22c55e;
        }
        .policy-body ul,
        .policy-body ol {
          margin: 0 0 1rem 0;
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .policy-body ul {
          list-style-type: disc;
        }
        .policy-body ol {
          list-style-type: decimal;
        }
        .policy-body li {
          padding-left: 0.25rem;
        }
        .policy-body li::marker {
          color: #22c55e;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}