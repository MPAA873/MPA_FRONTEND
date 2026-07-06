"use client";

import React from "react";
import { Sparkles, Zap, Info, BadgeCheck } from "lucide-react";

export const AnnouncementBanner = () => {
  return (
    <div className="relative z-40 w-full border-b border-green-100 bg-[#FDF6ED]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-3 text-center md:gap-5 lg:gap-8">

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>

          <p className="text-xs font-semibold text-[#713F12] sm:text-sm">
            Submissions are{" "}
            <span className="font-extrabold italic text-green-600">
              OPEN
            </span>
          </p>
        </div>

        {/* Separator */}
        <div className="hidden md:flex">
          <Info size={15} className="text-green-300" />
        </div>

        {/* APC */}
        <div className="flex items-center gap-2">
          <Zap
            size={15}
            className="fill-green-500/10 text-green-500"
          />

          <p className="text-xs font-medium text-[#713F12] sm:text-sm">
            APCs are{" "}
            <span className="font-extrabold text-green-600">
              FULLY WAIVED
            </span>
          </p>
        </div>

        {/* Separator */}
        <div className="hidden md:flex">
          <Info size={15} className="text-green-300" />
        </div>

        {/* Date */}
        <p className="text-xs font-medium text-[#713F12] sm:text-sm">
          Valid until{" "}
          <span className="font-bold">
            31 December 2026
          </span>
        </p>

        {/* Separator */}
        <div className="hidden md:flex">
          <Info size={15} className="text-green-300" />
        </div>

        {/* Zenodo DOI */}
        <div className="flex items-center gap-2">
          <BadgeCheck
            size={15}
            className="text-blue-600"
          />

          <p className="text-xs font-medium text-[#713F12] sm:text-sm">
            <span className="font-extrabold text-blue-700">
              Permanent Zenodo DOIs
            </span>{" "}
            Included
          </p>
        </div>

        {/* Separator */}
        <div className="hidden md:flex">
          <Info size={15} className="text-green-300" />
        </div>

        {/* Extra Highlight */}
        <div className="flex items-center gap-2">
          <Sparkles
            size={15}
            className="text-yellow-500"
          />

          <p className="text-xs font-medium text-[#713F12] sm:text-sm">
            Peer Reviewed • Open Access • Indexed Journal
          </p>
        </div>

      </div>
    </div>
  );
};