"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Search,
  FileWarning,
  RotateCcw,
  ChevronRight,
  BookOpen,
  CalendarClock,
  Layers,
} from "lucide-react";

import { useGetMyPaperTrackingQuery } from "@/store/paperTrackingApiSlice";
import { getStatusStyle, formatDate } from "./statusConfig";

const FILTERS = ["All", "In Progress", "Published", "Not Accepted"];

const filterMatchesPaper = (filter, paper) => {
  if (filter === "All") return true;
  if (filter === "Published") return paper.currentStatus === "Published";
  if (filter === "Not Accepted") return paper.currentStatus === "Not Accepted";
  return paper.currentStatus !== "Published" && paper.currentStatus !== "Not Accepted";
};

const ProgressBar = ({ percent, accent }) => (
  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-500"
      style={{ width: `${percent}%`, backgroundColor: accent }}
    />
  </div>
);

const PaperCard = ({ paper }) => {
  const style = getStatusStyle(paper.currentStatus);
  const Icon = style.icon;

  return (
    <Link
      href={`/dashboard/paper-tracking/${paper.manuscriptId}`}
      className="group block bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#10B981] hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-400 mb-1 truncate">
            {paper.manuscriptId}
          </p>
          <h3 className="text-[15px] font-bold text-[#5D3A1A] leading-snug line-clamp-2">
            {paper.title}
          </h3>
        </div>
        <span
          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${style.bg}`}
        >
          <Icon size={18} style={{ color: style.accent }} />
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
          <Layers size={12} />
          {paper.discipline || "General"}
        </span>
        {paper.isRevised && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
            <RotateCcw size={12} />
            Revised
          </span>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-xs font-bold ${style.text}`}>{paper.currentStatus}</span>
          <span className="text-xs font-semibold text-gray-400">{paper.progress.percent}%</span>
        </div>
        <ProgressBar percent={paper.progress.percent} accent={style.accent} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarClock size={13} />
          {formatDate(paper.lastUpdated)}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] group-hover:gap-2 transition-all">
          Track
          <ChevronRight size={14} />
        </span>
      </div>
    </Link>
  );
};

const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse">
    <div className="h-3 w-20 bg-gray-100 rounded mb-3" />
    <div className="h-4 w-full bg-gray-100 rounded mb-2" />
    <div className="h-4 w-2/3 bg-gray-100 rounded mb-5" />
    <div className="h-2 w-full bg-gray-100 rounded mb-5" />
    <div className="h-3 w-1/3 bg-gray-100 rounded" />
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center bg-white border border-dashed border-gray-200 rounded-2xl py-16 px-6">
    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
      <BookOpen size={26} className="text-[#10B981]" />
    </div>
    <h3 className="text-base font-bold text-[#5D3A1A] mb-1">No papers to track yet</h3>
    <p className="text-sm text-gray-500 max-w-sm">
      Once you submit a manuscript, its progress through review and publication will show up here.
    </p>
    <Link
      href="/dashboard/my-submissions"
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#10B981] px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
    >
      Go to My Submissions
    </Link>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center text-center bg-white border border-red-100 rounded-2xl py-16 px-6">
    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
      <FileWarning size={26} className="text-red-500" />
    </div>
    <h3 className="text-base font-bold text-[#5D3A1A] mb-1">Couldn't load your papers</h3>
    <p className="text-sm text-gray-500 max-w-sm mb-5">
      Something went wrong while fetching your tracking data. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#5D3A1A] px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
    >
      Retry
    </button>
  </div>
);

const PaperTrackingPage = () => {
  const { data, isLoading, isFetching, isError, refetch } = useGetMyPaperTrackingQuery();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const papers = data?.papers || [];

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesFilter = filterMatchesPaper(activeFilter, paper);
      const matchesSearch =
        !search.trim() ||
        paper.title.toLowerCase().includes(search.toLowerCase()) ||
        paper.manuscriptId.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [papers, activeFilter, search]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#10B981] flex items-center justify-center text-white shadow-sm shadow-emerald-100">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#5D3A1A]">Track Paper</h1>
            <p className="text-sm text-gray-500">
              Follow every submission through review to publication.
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or ID"
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-[#10B981] transition-all"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-colors ${
              activeFilter === filter
                ? "bg-[#10B981] border-[#10B981] text-white"
                : "bg-white border-gray-200 text-gray-500 hover:border-[#10B981] hover:text-[#10B981]"
            }`}
          >
            {filter}
            {filter !== "All" && (
              <span className="ml-1.5 opacity-70">
                ({papers.filter((p) => filterMatchesPaper(filter, p)).length})
              </span>
            )}
          </button>
        ))}
        {isFetching && !isLoading && (
          <span className="text-xs text-gray-400 ml-1 shrink-0">Refreshing…</span>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : filteredPapers.length === 0 ? (
        papers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="text-center text-sm text-gray-500 py-16">
            No papers match this filter or search.
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.manuscriptId} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PaperTrackingPage;