"use client";
import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGetPublishedArticlesQuery } from "../store/apiSlice";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  ArrowRight,
  Loader2,
  Eye,
  Calendar,
  BookOpen,
  Star,
  TrendingUp,
  Bookmark,
  Download,
  FileText,
  X,
  Layers,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

// Resolve a manuscript's downloadable file URL (handles both
// { url, publicId } objects and plain string values safely).
const getManuscriptFileUrl = (article) => {
  const file = article?.files?.manuscriptFile;
  if (!file) return null;
  if (typeof file === "string") return file;
  return file.url || null;
};

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

/* ─────────────────────────────────────────────
   INLINE MINI-COMPONENTS (Keep them as they are)
───────────────────────────────────────────── */
function SectionHeader({ label, icon: Icon }) {
  return (
    <div className=" flex items-center gap-3 mb-2">
      {Icon && (
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#10B981]/10">
          <Icon size={16} className="text-[#10B981]" />
        </span>
      )}
      <div>
        <h2 className="text-xl font-bold text-[#713F12] tracking-tight">{label}</h2>
        <div className="mt-1 h-[3px] w-12 rounded-full bg-[#10B981]" />
      </div>
    </div>
  );
}

function SliderControls({ onLeft, onRight }) {
  return (
    <div className="flex gap-2">
      <button onClick={onLeft} className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#713F12] hover:border-[#10B981] hover:text-[#10B981] transition-all"><ChevronLeft size={18} /></button>
      <button onClick={onRight} className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#713F12] hover:border-[#10B981] hover:text-[#10B981] transition-all"><ChevronRight size={18} /></button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ARTICLE PILL (card) — now with Download +
   View Abstract actions. `variant="grid"` makes
   the card fluid-width for grid layouts,
   default keeps the original fixed-width slider card.
───────────────────────────────────────────── */
function ArticlePill({ article, onClick, onDownload, onViewAbstract, isDownloading, variant = "slider" }) {
  const typeColor = {
    "Review Article": "bg-purple-50 text-purple-700 border-purple-200",
    "Research Article": "bg-blue-50 text-blue-700 border-blue-200",
    "Short Communication": "bg-orange-50 text-orange-700 border-orange-200",
  };
  const pillClass = typeColor[article.articleType] || "bg-gray-50 text-gray-600 border-gray-200";
  const hasFile = Boolean(getManuscriptFileUrl(article));

  return (
    <div
      onClick={onClick}
      className={`group ${variant === "grid" ? "w-full" : "flex-shrink-0 w-[300px] md:w-[340px]"} bg-white rounded-2xl border border-[#F3F4F6] shadow-sm hover:shadow-md hover:border-[#10B981]/30 transition-all cursor-pointer overflow-hidden flex flex-col`}
    >
      <div className="relative w-full h-[180px] bg-[#F9FAFB] overflow-hidden">
        {article?.files?.manuscriptImage ? (
          <img src={article.files.manuscriptImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300"><ImageIcon size={40} /><span className="text-xs">No image</span></div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${pillClass}`}>{article.manuscriptType || "Article"}</span>
          <span className="text-[11px] text-gray-400">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-IN") : "—"}</span>
        </div>
        <h3 className="text-[15px] font-semibold text-[#1F2937] line-clamp-3 group-hover:text-[#713F12]">{article.title}</h3>
        <p className="text-[12px] text-[#B45309] font-medium line-clamp-1">{article.authors?.map((a) => a.name).join(", ")}</p>

        <div className="mt-auto flex flex-col gap-3 pt-3 border-t border-[#F3F4F6]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-400 flex items-center gap-1"><Eye size={13} /> {article.views ?? 0}</span>
            <span className="text-[12px] font-semibold text-[#10B981] flex items-center gap-1">Read <ArrowRight size={13} /></span>
          </div>

          {/* Actions: View Abstract + Download */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onViewAbstract?.(article)}
              className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[#713F12] bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-[#FEF3C7] rounded-lg px-3 py-2 transition-colors"
            >
              <FileText size={13} /> View Abstract
            </button>
            <button
              onClick={() => hasFile && onDownload?.(article)}
              disabled={!hasFile || isDownloading}
              title={hasFile ? "Download Article" : "No file available"}
              className={`flex items-center justify-center gap-1.5 text-[12px] font-semibold rounded-lg px-3 py-2 border transition-colors ${
                hasFile
                  ? "text-white bg-[#10B981] hover:bg-[#0e9f71] border-[#10B981] disabled:opacity-60"
                  : "text-gray-300 bg-gray-50 border-gray-100 cursor-not-allowed"
              }`}
            >
              {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABSTRACT MODAL
───────────────────────────────────────────── */
function AbstractModal({ article, onClose, onDownload, isDownloading }) {
  if (!article) return null;
  const hasFile = Boolean(getManuscriptFileUrl(article));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1F2937]/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-[#F3F4F6]">
          <div className="min-w-0">
            <span className="inline-block text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
              {article.manuscriptType || "Article"}
            </span>
            <h3 className="mt-3 text-lg md:text-xl font-bold text-[#1F2937] leading-snug">{article.title}</h3>
            <p className="mt-2 text-[13px] text-[#B45309] font-medium">
              {article.authors?.map((a) => a.name).join(", ")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E7EB] text-gray-400 hover:text-[#713F12] hover:border-[#10B981] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-wrap items-center gap-4 mb-5 text-[12px] text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Eye size={13} /> {article.views ?? 0} views</span>
            {article.paperNumber && (
              <span className="flex items-center gap-1.5"><Layers size={13} /> Paper No. {article.paperNumber}</span>
            )}
          </div>

          <h4 className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-2">Abstract</h4>
          <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
            {article.abstract || "Abstract not available for this manuscript."}
          </p>

          {article.keywords?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.keywords.map((kw, i) => (
                <span key={i} className="text-[11px] font-medium text-[#713F12] bg-[#FFFBEB] border border-[#FEF3C7] rounded-full px-3 py-1">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-[#F3F4F6] bg-[#FAFAFA]">
          <button
            onClick={() => onDownload?.(article)}
            disabled={!hasFile || isDownloading}
            className={`flex-1 flex items-center justify-center gap-2 text-[13px] font-semibold px-6 py-3 rounded-xl transition-all ${
              hasFile
                ? "bg-[#713F12] hover:bg-[#10B981] text-white disabled:opacity-60"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isDownloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
            {hasFile ? "Download Article" : "No File Available"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-[#E5E7EB] text-[13px] font-semibold text-[#713F12] hover:border-[#10B981] hover:text-[#10B981] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Articles() {
  const router = useRouter();
  const [editorIdx, setEditorIdx] = useState(0);
  const currentIssueRef = useRef(null);
  const mostViewedRef = useRef(null);
  const currentVolumeRef = useRef(null);

  // NEW: Dynamic refs for Ad-Hoc sliders
  const adHocRefs = useRef({});

  // Abstract modal + download state
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // Optimized API Call — homepage sections
  const { data: response, isLoading } = useGetPublishedArticlesQuery({ type: "homepage" });

  const homepageData = response?.data || {};
  const editorChoices = homepageData.editorChoice || [];
  const currentIssue = homepageData.currentIssue || [];
  const currentVolume = homepageData.currentVolume || [];
  const currentVolumeNumber = homepageData.currentVolumeNumber;
  const adHocIssues = homepageData.adHocIssues || [];
  const mostViewed = homepageData.mostViewed || [];

  // Navigation Logic for Editor's Choice
  const nextEditorChoice = () => {
    setEditorIdx((prev) => (prev + 1) % editorChoices.length);
  };

  const prevEditorChoice = () => {
    setEditorIdx((prev) => (prev - 1 + editorChoices.length) % editorChoices.length);
  };

  const scroll = (ref, direction) => {
    const target = ref.current;
    if (target) {
      const cardWidth = 356;
      target.scrollBy({
        left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  // Download handler — fetches the file as a blob so the browser
  // is forced to download it (rather than navigating to it), works
  // reliably for cross-origin file storage (e.g. Cloudinary).
  const handleDownload = useCallback(async (article) => {
    const url = getManuscriptFileUrl(article);
    if (!url) return;

    const articleKey = article._id;
    setDownloadingId(articleKey);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const ext = url.split(".").pop()?.split("?")[0] || "pdf";
      const fileName = `${article.manuscriptId || article.paperNumber || "article"}.${ext}`;

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback: open the file in a new tab if the blob fetch fails
      // (e.g. CORS restrictions on the storage provider).
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloadingId(null);
    }
  }, []);

  const handleViewAbstract = useCallback((article) => {
    setSelectedArticle(article);
  }, []);

  if (isLoading)
    return (
      <div className="py-24 flex flex-col justify-center items-center gap-3">
        <Loader2 className="animate-spin text-[#10B981]" size={40} />
        <p className="text-[#713F12] font-medium text-sm">Loading Articles…</p>
      </div>
    );

  return (
    <section id="articles" className="scroll-mt-24 max-w-7xl mx-auto py-14 px-4 md:px-8 font-sans">

      {/* ── PAGE HEADER ── */}
      <div className="mb-14 ">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#10B981]">MPA Research</span>
          <span className="w-12 h-px bg-[#10B981]" />
        </div>
        <h1 className="text-4xl md:text-[2.75rem] font-extrabold text-[#713F12] leading-tight mb-3">Journal & Articles</h1>
        <p className="text-[#B45309] text-base max-w-xl">Explore peer-reviewed research, editor-selected highlights, and most-read manuscripts.</p>
      </div>

      {/* ── SECTION 1: EDITOR'S CHOICE ── */}
      {editorChoices.length > 0 && (
        <div className="mb-16">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <SectionHeader label="Editor's Choice" icon={Star} />
            <div className="flex items-center gap-6">
              {/* Pagination Dots */}
              <div className="hidden sm:flex gap-1.5">
                {editorChoices.map((_, i) => (
                  <button key={i} onClick={() => setEditorIdx(i)} className={`h-2 rounded-full transition-all ${i === editorIdx ? "w-7 bg-[#10B981]" : "w-2 bg-[#10B981]/20"}`} />
                ))}
              </div>
              {/* Slider Controls for Editor Choice */}
              <SliderControls onLeft={prevEditorChoice} onRight={nextEditorChoice} />
            </div>
          </div>

          <div className="relative rounded-3xl border border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-[#FFF7ED] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" style={{ minHeight: 320 }}>
            <div className="flex flex-col lg:flex-row items-stretch group">
              <div
                className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10 gap-5 cursor-pointer"
                onClick={() => router.push(`/articles/${editorChoices[editorIdx]._id}`)}
              >
                <span className="text-[10px] font-bold uppercase text-[#10B981] bg-[#10B981]/10 px-3 py-1.5 rounded-full w-fit">Featured Manuscript</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#713F12] group-hover:text-[#10B981] transition-colors duration-300 leading-tight">
                  {editorChoices[editorIdx]?.title}
                </h3>
                <p className="text-[#78350F] text-sm md:text-base line-clamp-3 opacity-80 leading-relaxed">
                  {editorChoices[editorIdx]?.abstract}
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => router.push(`/articles/${editorChoices[editorIdx]._id}`)}
                    className="bg-[#713F12] hover:bg-[#10B981] text-white text-[13px] font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all transform hover:translate-x-1"
                  >
                    Read Article <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => handleViewAbstract(editorChoices[editorIdx])}
                    className="bg-white border border-[#E5E7EB] hover:border-[#10B981] hover:text-[#10B981] text-[#713F12] text-[13px] font-semibold px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
                  >
                    <FileText size={15} /> View Abstract
                  </button>
                  <button
                    onClick={() => handleDownload(editorChoices[editorIdx])}
                    disabled={!getManuscriptFileUrl(editorChoices[editorIdx]) || downloadingId === editorChoices[editorIdx]._id}
                    className="bg-white border border-[#E5E7EB] hover:border-[#10B981] hover:text-[#10B981] text-[#713F12] text-[13px] font-semibold px-5 py-3 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {downloadingId === editorChoices[editorIdx]._id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Download size={15} />
                    )}
                    Download
                  </button>
                </div>
              </div>
              <div
                className="w-full lg:w-[40%] min-h-[280px] relative overflow-hidden bg-[#FEF3C7]/40 cursor-pointer"
                onClick={() => router.push(`/articles/${editorChoices[editorIdx]._id}`)}
              >
                {editorChoices[editorIdx]?.files?.manuscriptImage ? (
                  <img
                    src={editorChoices[editorIdx].files.manuscriptImage}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Featured"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#D97706]/30"><ImageIcon size={80} /></div>
                )}
                {/* Visual Overlay for smooth transition look */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBEB] via-transparent to-transparent lg:block hidden" />
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ── SECTION 2: CURRENT ISSUE ── */}
      {currentIssue.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader label="Current Issue" icon={BookOpen} />
            <SliderControls
              onLeft={() => scroll(currentIssueRef, "left")}
              onRight={() => scroll(currentIssueRef, "right")}
            />
          </div>

          <div
            ref={currentIssueRef}
            className="flex gap-4 overflow-x-auto pb-3 no-scrollbar"
          >
            {currentIssue.map((article) => (
              <ArticlePill
                key={article._id}
                article={article}
                onClick={() => router.push(`/articles/${article._id}`)}
                onDownload={handleDownload}
                onViewAbstract={handleViewAbstract}
                isDownloading={downloadingId === article._id}
              />
            ))}
          </div>
        </div>
      )}



      {/* ── SECTION 3: AD-HOC / SPECIAL ISSUES ── */}
      {adHocIssues.map((group) => (
        <div key={group._id} className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader label={group.issue.label} icon={Bookmark} />
            <SliderControls
              onLeft={() => scroll({ current: adHocRefs.current[group._id] }, "left")}
              onRight={() => scroll({ current: adHocRefs.current[group._id] }, "right")}
            />
          </div>
          <div
            ref={(el) => (adHocRefs.current[group._id] = el)}
            className="flex gap-4 overflow-x-auto pb-3 no-scrollbar"
          >
            {group.papers.map((article) => (
              <ArticlePill
                key={article._id}
                article={article}
                onClick={() => router.push(`/articles/${article._id}`)}
                onDownload={handleDownload}
                onViewAbstract={handleViewAbstract}
                isDownloading={downloadingId === article._id}
              />
            ))}
          </div>
        </div>
      ))}

      {/* ── SECTION 4: MOST VIEWED ── */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <SectionHeader label="Most Viewed & Popular" icon={TrendingUp} />
          <SliderControls onLeft={() => scroll(mostViewedRef, "left")} onRight={() => scroll(mostViewedRef, "right")} />
        </div>
        <div ref={mostViewedRef} className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
          {mostViewed.map((article) => (
            <ArticlePill
              key={article._id}
              article={article}
              onClick={() => router.push(`/articles/${article._id}`)}
              onDownload={handleDownload}
              onViewAbstract={handleViewAbstract}
              isDownloading={downloadingId === article._id}
            />
          ))}
        </div>
      </div>

      {/* ── SECTION 5: CURRENT VOLUME (scroller, replaces "All Papers") ── */}
      <div id="current-volume" className="mb-4 scroll-mt-24">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <SectionHeader
            label={currentVolumeNumber ? `Current Volume (Vol. ${currentVolumeNumber})` : "Current Volume"}
            icon={Layers}
          />
          <div className="flex items-center gap-4">
            {currentVolume.length > 0 && (
              <p className="text-[13px] text-gray-400 font-medium hidden sm:block">
                <span className="text-[#713F12] font-semibold">{currentVolume.length}</span>{" "}
                {currentVolume.length === 1 ? "paper" : "papers"}
              </p>
            )}
            {currentVolume.length > 0 && (
              <SliderControls
                onLeft={() => scroll(currentVolumeRef, "left")}
                onRight={() => scroll(currentVolumeRef, "right")}
              />
            )}
          </div>
        </div>

        {currentVolume.length === 0 ? (
          <div className="py-20 flex flex-col justify-center items-center gap-3 text-gray-300">
            <BookOpen size={40} />
            <p className="text-gray-400 text-sm font-medium">No published papers found for the current volume.</p>
          </div>
        ) : (
          <div ref={currentVolumeRef} className="flex gap-4 overflow-x-auto pb-3 no-scrollbar scroll-smooth">
            {currentVolume.map((article) => (
              <ArticlePill
                key={article._id}
                article={article}
                onClick={() => router.push(`/articles/${article._id}`)}
                onDownload={handleDownload}
                onViewAbstract={handleViewAbstract}
                isDownloading={downloadingId === article._id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Abstract Modal */}
      <AbstractModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onDownload={handleDownload}
        isDownloading={selectedArticle ? downloadingId === selectedArticle._id : false}
      />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}