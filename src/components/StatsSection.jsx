"use client";

import { useEffect, useRef, useState } from "react";
import { useGetPublicStatsQuery } from "@/store/apiSlice"; 

const icons = {
  articles: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 6h18l6 6v30a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M30 6v6h6" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M15 22h18M15 28h18M15 34h11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  reviewers: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 5 8 11v10c0 11 7 17.5 16 22 9-4.5 16-11 16-22V11L24 5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M17 24l5 5 10-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  disciplines: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M6 24h36M24 6c4.5 5 7 11 7 18s-2.5 13-7 18c-4.5-5-7-11-7-18s2.5-13 7-18Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  views: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 24s7.5-14 20-14 20 14 20 14-7.5 14-20 14S4 24 4 24Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="6.5" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  ),
};

// Ek count-up number jo sirf tab chalega jab visible ho
function CountUpValue({ target = 0, suffix = "", duration = 1600, start }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const from = 0;
    const to = Number(target) || 0;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo — shuru fast, end mein smooth settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return (
    <span>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { data, isLoading } = useGetPublicStatsQuery();
  const stats = data?.stats;

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // sirf ek baar animate ho, scroll up-down pe repeat na ho
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      key: "articles",
      icon: icons.articles,
      label: "Published Articles",
      value: stats?.publishedArticles ?? 0,
      suffix: "+",
    },
    {
      key: "reviewers",
      icon: icons.reviewers,
      label: "Expert Reviewers",
      value: stats?.reviewers ?? 0,
      suffix: "+",
    },
    {
      key: "disciplines",
      icon: icons.disciplines,
      label: "Research Disciplines",
      value: stats?.disciplines ?? 0,
      suffix: "+",
    },
    {
      key: "views",
      icon: icons.views,
      label: "Total Article Views",
      value: stats?.totalViews ?? 0,
      suffix: "+",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FFF8F0] border-y border-[#EAD9C3] py-8 md:py-10"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div
              key={item.key}
              style={{
                animationDelay: `${idx * 120}ms`,
              }}
              className={`flex items-center gap-3 md:gap-4 bg-white rounded-2xl border border-[#EFE3D0] px-4 py-4 md:px-5 md:py-5 transition-all duration-700 ease-out ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#EAF6EE] text-[#178A4C] flex items-center justify-center">
                <div className="w-6 h-6 md:w-7 md:h-7">{item.icon}</div>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-xl md:text-2xl font-extrabold text-[#5C3A1E]">
                  {isLoading ? (
                    <span className="inline-block w-10 h-5 bg-[#EFE3D0] rounded animate-pulse" />
                  ) : (
                    <CountUpValue target={item.value} suffix={item.suffix} start={inView} />
                  )}
                </span>
                <span className="text-xs md:text-sm text-[#8A7660] font-medium">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}