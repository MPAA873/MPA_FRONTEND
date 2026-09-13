"use client";
import React from "react";
import Link from "next/link";
import { useGetMyRevisionsQuery } from "@/store/apiSlice";
import {
  AlertCircle,
  FileCheck,
  Clock,
  ArrowRight,
  Loader2,
  Inbox,
  FileDown,
  FileText,
  RefreshCw,
} from "lucide-react";

const statusConfig = {
  "Revision Required": {
    label: "Revision Required",
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    icon: <AlertCircle size={16} />,
    accent: "border-orange-400",
    btnText: "Revise Now",
    btnClass: "bg-orange-500 hover:bg-orange-600",
  },
  "Final Script Sent": {
    label: "Final Proofreading Pending",
    badge: "bg-blue-100 text-blue-700 border border-blue-200",
    icon: <FileCheck size={16} />,
    accent: "border-blue-400",
    btnText: "Review & Approve",
    btnClass: "bg-blue-600 hover:bg-blue-700",
  },
};

const getFileExt = (url) => {
  if (!url) return "";
  const clean = url.split("?")[0];
  const parts = clean.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "FILE";
};

const FeedbackFileCard = ({ url }) => {
  if (!url) return null;
  const ext = getFileExt(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="flex items-center gap-3 mb-4 bg-orange-50 border border-orange-100 rounded-xl px-3.5 py-2.5 hover:bg-orange-100 transition-colors group"
    >
      <div className="w-9 h-9 rounded-lg bg-white border border-orange-200 flex items-center justify-center shrink-0">
        <FileText size={16} className="text-orange-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-[#5D3A1A] truncate">Editor's Feedback File</p>
        <p className="text-[11px] text-gray-500">{ext} · Click to view or download</p>
      </div>
      <FileDown
        size={16}
        className="text-orange-500 shrink-0 group-hover:translate-y-0.5 transition-transform"
      />
    </a>
  );
};

const CardSkeleton = () => (
  <div className="bg-white rounded-[2rem] border border-gray-100 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 w-32 bg-gray-100 rounded-full" />
      <div className="h-3 w-16 bg-gray-100 rounded" />
    </div>
    <div className="h-4 w-full bg-gray-100 rounded mb-2" />
    <div className="h-4 w-2/3 bg-gray-100 rounded mb-5" />
    <div className="h-11 w-full bg-gray-100 rounded-xl mb-5" />
    <div className="h-11 w-full bg-gray-100 rounded-xl" />
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="bg-red-50 border border-red-100 rounded-[2rem] p-10 text-center">
    <AlertCircle className="mx-auto text-red-400 mb-3" size={32} />
    <h3 className="text-[#5D3A1A] font-bold text-base mb-1">Couldn't load your revisions</h3>
    <p className="text-gray-500 text-sm mb-5">Something went wrong. Please try again.</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#5D3A1A] px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
    >
      <RefreshCw size={15} />
      Retry
    </button>
  </div>
);

const MyRevisionsPage = () => {
  const { data, isLoading, isFetching, isError, refetch } = useGetMyRevisionsQuery();
  const revisions = data?.revisions || [];

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#5D3A1A]">
            My <span className="text-[#10B981]">Revisions</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Papers that need your attention — revision requests or final proof approvals.
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <Loader2 size={13} className="animate-spin" />
            Refreshing…
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : revisions.length === 0 ? (
        <div className="bg-white border border-emerald-50 rounded-[2rem] shadow-sm p-10 sm:p-12 text-center">
          <Inbox className="mx-auto text-emerald-300 mb-4" size={40} />
          <h3 className="text-[#5D3A1A] font-bold text-lg mb-1">All caught up!</h3>
          <p className="text-gray-500 text-sm">
            You have no pending revisions or proofreading requests right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {revisions.map((paper) => {
            const cfg = statusConfig[paper.status] || statusConfig["Revision Required"];
            return (
              <div
                key={paper._id}
                className={`bg-white rounded-[2rem] border-l-4 ${cfg.accent} border-t border-r border-b border-gray-100 shadow-sm hover:shadow-lg transition-all p-5 sm:p-6 flex flex-col`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${cfg.badge}`}
                  >
                    {cfg.icon} {cfg.label}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium truncate">
                    {paper.manuscriptId}
                  </span>
                </div>

                <h3 className="text-[#5D3A1A] font-bold text-base leading-snug mb-2 line-clamp-2">
                  {paper.title}
                </h3>

                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {paper.discipline && (
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                      {paper.discipline}
                    </span>
                  )}
                  {paper.manuscriptType && (
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                      {paper.manuscriptType}
                    </span>
                  )}
                </div>

                {paper.status === "Revision Required" && paper.revisionFeedback && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    <span className="font-semibold text-orange-600">Feedback: </span>
                    {paper.revisionFeedback}
                  </p>
                )}

                {paper.status === "Final Script Sent" && (
                  <p className="text-xs text-gray-500 mb-3">
                    Editor has prepared your final templated manuscript. Please review and confirm.
                  </p>
                )}

                <FeedbackFileCard url={paper.feedbackFile} />

                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-5 mt-auto">
                  <Clock size={12} />
                  Updated {new Date(paper.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <Link
                  href={`/revise-manuscript/${paper._id}`}
                  className={`inline-flex items-center justify-center gap-2 text-white text-sm font-bold py-3 rounded-xl transition-all ${cfg.btnClass}`}
                >
                  {cfg.btnText} <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRevisionsPage;