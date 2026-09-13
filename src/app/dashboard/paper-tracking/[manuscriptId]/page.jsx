"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileWarning,
  Layers,
  FileType,
  CalendarDays,
  RefreshCcw,
  BookOpenCheck,
  Hash,
  BookMarked,
  Newspaper,
  CheckCircle2,
} from "lucide-react";

import { useGetPaperTrackingDetailQuery } from "@/store/paperTrackingApiSlice";
import { getStatusStyle, STEPPER_LABELS, formatDate, formatDateTime } from "../statusConfig";

const Stepper = ({ step, totalSteps, isRejected }) => {
  if (isRejected) {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 sm:p-5">
        <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
          <FileWarning size={18} className="text-red-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-red-700">Not Accepted</p>
          <p className="text-xs text-red-500 mt-0.5">
            This submission did not proceed to publication. Check your email for editor feedback.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
      {/* Desktop / tablet horizontal stepper */}
      <div className="hidden sm:flex items-center">
        {STEPPER_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum <= step;
          const isCurrent = stepNum === step;
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center text-center w-20">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    isComplete
                      ? "bg-[#10B981] border-[#10B981] text-white"
                      : "bg-white border-gray-200 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-emerald-100" : ""}`}
                >
                  {isComplete ? <CheckCircle2 size={16} /> : stepNum}
                </div>
                <span
                  className={`mt-2 text-[11px] font-semibold leading-tight ${
                    isComplete ? "text-[#5D3A1A]" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {stepNum !== totalSteps && (
                <div
                  className={`flex-1 h-0.5 -mt-6 transition-colors ${
                    stepNum < step ? "bg-[#10B981]" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile vertical stepper */}
      <div className="sm:hidden flex flex-col">
        {STEPPER_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum <= step;
          const isCurrent = stepNum === step;
          return (
            <div key={label} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 shrink-0 ${
                    isComplete
                      ? "bg-[#10B981] border-[#10B981] text-white"
                      : "bg-white border-gray-200 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-emerald-100" : ""}`}
                >
                  {isComplete ? <CheckCircle2 size={13} /> : stepNum}
                </div>
                {stepNum !== totalSteps && (
                  <div
                    className={`w-0.5 flex-1 min-h-[22px] ${
                      stepNum < step ? "bg-[#10B981]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-xs font-semibold pt-1 pb-4 ${
                  isComplete ? "text-[#5D3A1A]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InfoPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3.5 py-2.5">
    <Icon size={15} className="text-[#10B981] shrink-0" />
    <div className="min-w-0">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-xs font-bold text-[#5D3A1A] truncate">{value}</p>
    </div>
  </div>
);

const TimelineItem = ({ event, isLast }) => (
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] mt-1.5" />
      {!isLast && <div className="w-0.5 flex-1 bg-gray-200 min-h-[24px]" />}
    </div>
    <div className={isLast ? "pb-0" : "pb-5"}>
      <p className="text-sm font-semibold text-[#5D3A1A]">{event.title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{formatDateTime(event.date)}</p>
    </div>
  </div>
);

const DetailSkeleton = () => (
  <div className="max-w-4xl mx-auto animate-pulse">
    <div className="h-4 w-24 bg-gray-100 rounded mb-6" />
    <div className="h-24 bg-gray-100 rounded-2xl mb-6" />
    <div className="h-40 bg-gray-100 rounded-2xl mb-6" />
    <div className="h-56 bg-gray-100 rounded-2xl" />
  </div>
);

const PaperTrackingDetailPage = () => {
  const { manuscriptId } = useParams();
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetPaperTrackingDetailQuery(manuscriptId, {
    skip: !manuscriptId,
  });

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DetailSkeleton />
      </div>
    );
  }

  if (isError || !data?.paper) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <FileWarning size={26} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-[#5D3A1A] mb-1">Couldn't load this paper</h3>
        <p className="text-sm text-gray-500 mb-5">
          It may have been removed, or you may not have access to it.
        </p>
        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#5D3A1A] px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  const { paper, timeline } = data;
  const style = getStatusStyle(paper.currentStatus);
  const isRejected = paper.currentStatus === "Not Accepted";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl mx-auto">
      <button
        onClick={() => router.push("/dashboard/paper-tracking")}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#10B981] transition-colors mb-5"
      >
        <ArrowLeft size={16} />
        Back to Track Paper
      </button>

      {/* Title / status header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-400 mb-1">{paper.manuscriptId}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-[#5D3A1A] leading-snug">
              {paper.title}
            </h1>
          </div>
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${style.bg} ${style.text}`}
          >
            {paper.currentStatus}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{paper.statusDescription}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <InfoPill icon={Layers} label="Discipline" value={paper.discipline || "General"} />
          <InfoPill icon={FileType} label="Type" value={paper.manuscriptType || "—"} />
          <InfoPill icon={CalendarDays} label="Submitted" value={formatDate(paper.submittedOn)} />
          <InfoPill
            icon={RefreshCcw}
            label="Last Update"
            value={formatDate(paper.lastUpdated)}
          />
        </div>
      </div>

      {/* Progress stepper */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-[#5D3A1A] mb-3">Review Progress</h2>
        <Stepper step={paper.progress.step} totalSteps={paper.progress.totalSteps} isRejected={isRejected} />
      </div>

      {/* Publication info */}
      {paper.publication && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <BookOpenCheck size={18} className="text-[#10B981]" />
            <h2 className="text-sm font-bold text-[#5D3A1A]">Publication Details</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <InfoPill icon={Hash} label="Paper No." value={paper.publication.paperNumber || "—"} />
            <InfoPill icon={BookMarked} label="Volume" value={paper.publication.volume || "—"} />
            <InfoPill icon={Newspaper} label="Issue" value={paper.publication.issueLabel || paper.publication.issue || "—"} />
            <InfoPill
              icon={CalendarDays}
              label="Published On"
              value={formatDate(paper.publication.publishedAt)}
            />
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
        <h2 className="text-sm font-bold text-[#5D3A1A] mb-5">Activity Timeline</h2>
        {timeline && timeline.length > 0 ? (
          <div>
            {timeline.map((event, i) => (
              <TimelineItem key={`${event.title}-${event.date}-${i}`} event={event} isLast={i === timeline.length - 1} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No activity recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default PaperTrackingDetailPage;