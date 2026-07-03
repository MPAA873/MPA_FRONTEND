"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Button visibility logic
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Progress calculation logic
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Progress Circle calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[999] flex items-center justify-center transition-all duration-500 ease-out 
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}
      `}
      aria-label="Scroll to top"
    >
      {/* Progress Circle Container */}
      <div className="relative group p-1">
        <svg className="w-12 h-12 transform -rotate-90 transition-transform duration-300 group-hover:scale-110">
          {/* Background Circle (Static) */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-gray-200/50"
          />
          {/* Progress Circle (Animated) */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset }}
            strokeLinecap="round"
            className="text-[#16a34a] transition-all duration-150 ease-linear"
          />
        </svg>

        {/* Floating Button Inner */}
        <div className="absolute inset-0 m-auto w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 transition-all duration-300 group-hover:bg-[#16a34a] group-hover:shadow-green-200">
          <ArrowUp 
            size={18} 
            strokeWidth={2} // Less bold, more modern
            className="text-[#16a34a] transition-all duration-300 group-hover:text-white group-hover:-translate-y-1" 
          />
        </div>
      </div>
    </button>
  );
};

export default ScrollToTop;