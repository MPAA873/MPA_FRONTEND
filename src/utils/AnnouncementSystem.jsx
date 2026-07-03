"use client";
import React from "react";
import { Sparkles, Zap, Info } from "lucide-react";

export const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-[#FDF6ED]/80 backdrop-blur-sm py-2.5 overflow-hidden border-b border-green-100/50 relative z-40">
      {/* Marquee Container */}
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-10 mx-5">
            
            {/* Status Section */}
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </div>
              <p className="text-xs md:text-sm font-semibold tracking-wide text-[#713F12]">
                Submissions are <span className="text-[#22C55E] font-black italic">OPEN</span>
              </p>
            </div>

            {/* Subtle Separator Icon */}
            <Info size={14} className="text-green-200" />

            {/* Offer Section */}
            <div className="flex items-center gap-2.5">
              <Zap size={14} className="text-[#22C55E] fill-[#22C55E]/10" />
              <p className="text-xs md:text-sm font-medium tracking-tight text-[#713F12]/80">
                APCs are <span className="font-extrabold text-[#22C55E] border-b-2 border-green-200">FULLY WAIVED</span> 
                <span className="mx-2 opacity-50">|</span> 
                Valid until <span className="text-[#713F12] font-bold">31 December 2026</span>
              </p>
            </div>

            {/* Brand Sparkle */}
            <Sparkles size={14} className="text-yellow-500/50" />
          </div>
        ))}
      </div>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};