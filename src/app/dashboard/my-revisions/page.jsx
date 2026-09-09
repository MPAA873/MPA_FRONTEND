"use client";
import React from "react";
import Link from "next/link";
import { useGetMyRevisionsQuery } from "@/store/apiSlice";
import { AlertCircle, FileCheck, Clock, ArrowRight, Loader2, Inbox } from "lucide-react";

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

const MyRevisionsPage = () => {
  const { data, isLoading, isError } = useGetMyRevisionsQuery();
  const revisions = data?.revisions || [];

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#10B981] w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5D3A1A]">
          My <span className="text-[#10B981]">Revisions</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Papers that need your attention — revision requests or final proof approvals.
        </p>
      </div>

      {isError && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm">
          Failed to load revisions. Please try again.
        </div>
      )}

      {!isError && revisions.length === 0 && (
        <div className="bg-white border border-emerald-50 rounded-[2rem] shadow-sm p-12 text-center">
          <Inbox className="mx-auto text-emerald-300 mb-4" size={40} />
          <h3 className="text-[#5D3A1A] font-bold text-lg mb-1">All caught up!</h3>
          <p className="text-gray-500 text-sm">
            You have no pending revisions or proofreading requests right now.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {revisions.map((paper) => {
          const cfg = statusConfig[paper.status] || statusConfig["Revision Required"];
          return (
            <div
              key={paper._id}
              className={`bg-white rounded-[2rem] border-l-4 ${cfg.accent} border-t border-r border-b border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.badge}`}>
                  {cfg.icon} {cfg.label}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {paper.manuscriptId}
                </span>
              </div>

              <h3 className="text-[#5D3A1A] font-bold text-base leading-snug mb-2 line-clamp-2">
                {paper.title}
              </h3>

              {paper.status === "Revision Required" && paper.revisionFeedback && (
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  <span className="font-semibold text-orange-600">Feedback: </span>
                  {paper.revisionFeedback}
                </p>
              )}

              {paper.status === "Final Script Sent" && (
                <p className="text-xs text-gray-500 mb-4">
                  Editor has prepared your final templated manuscript. Please review and confirm.
                </p>
              )}

              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-5">
                <Clock size={12} />
                Updated {new Date(paper.updatedAt).toLocaleDateString()}
              </div>

              <Link
                href={`/revise-manuscript/${paper._id}`}
                className={`mt-auto inline-flex items-center justify-center gap-2 text-white text-sm font-bold py-3 rounded-xl transition-all ${cfg.btnClass}`}
              >
                {cfg.btnText} <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRevisionsPage;