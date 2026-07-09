"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, FileText, Globe, BarChart2,
  ExternalLink, Calendar, Hash,
  User, Award, BookOpen, Quote, Download,
  Mail, Building2, Eye, Layout, Clock,
  CheckCircle2, FileCheck, Share2, Maximize2
} from "lucide-react";
import ArticleToolsDropdown from "@/components/ArticleToolsDropdown";

export default function ArticleDetailClient({ article }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("abstract");
  const [showCiteModal, setShowCiteModal] = useState(false);

  const keywords = useMemo(() => {
    if (!article?.keywords || article.keywords.length === 0) return [];
    try {
      const raw = article.keywords[0];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return Array.isArray(article.keywords) ? article.keywords : [];
    }
  }, [article?.keywords]);

  const formatAuthorCitation = (authors) => {
    if (!authors || authors.length === 0) return "";
    const formatted = authors.map((a) => {
      const parts = a.name.trim().split(" ");
      const lastName = parts[parts.length - 1];
      const initials = parts.slice(0, -1).map((p) => p[0]?.toUpperCase() + ".").join(" ");
      return initials ? `${lastName}, ${initials}` : lastName;
    });
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return `${formatted[0]}, & ${formatted[1]}`;
    return `${formatted.slice(0, -1).join(", ")}, & ${formatted[formatted.length - 1]}`;
  };

  const citationText = article
    ? `${formatAuthorCitation(article.authors)} (${new Date(article.publishedAt).getFullYear()}). ${article.title}. MPA Research, Volume ${article.volume}, Issue ${article.issue}, ${article.doi ? article.doi : (typeof window !== "undefined" ? window.location.href : "")}`
    : "";

  if (!article) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
        <button onClick={() => router.push('/')} className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-xl font-bold mt-4 w-full sm:w-auto">Return Home</button>
      </div>
    </div>
  );

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900">

      {/* --- HEADER --- */}
      <header className="bg-green-600 relative overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-24 md:pb-28 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={() => router.back()} className="group flex items-center gap-2 text-green-100 hover:text-white mb-6 sm:mb-10 transition-colors">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Library</span>
          </button>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 sm:gap-x-3 mb-4 sm:mb-5 text-green-100 text-[11px] sm:text-sm font-semibold">
            <span>Volume: {article.volume}</span>
            <span className="hidden sm:inline">|</span>
            <span>Issue: {article.issue}</span>
            <span className="hidden sm:inline">|</span>
            <span>{article.issueLabel}</span>
            <span className="hidden sm:inline">|</span>
            <span>{new Date(article.publishedAt).getFullYear()}</span>
            <span className="hidden sm:inline">|</span>
            <span>Paper: {article.paperNumber}</span>

            {article.doi && (
              <>
                <span className="hidden sm:inline">|</span>
                <a
                  href={article.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white break-all"
                >
                  DOI: {article.doi}
                </a>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[9px] sm:text-[10px] font-black px-2.5 sm:px-3 py-1 rounded uppercase tracking-[0.15em] sm:tracking-[0.2em]">{article.manuscriptType}</span>
            <span className="bg-yellow-400 text-yellow-950 text-[9px] sm:text-[10px] font-black px-2.5 sm:px-3 py-1 rounded uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1"><Globe size={12} /> Open Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-10 leading-[1.2] sm:leading-[1.15] max-w-5xl">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-green-50">
            {article.authors?.map((author, i) => (
              <span key={i} className="text-sm sm:text-lg font-medium">{author.name}<sup>{i + 1}</sup></span>
            ))}
          </div>
        </div>
      </header>

      {/* --- STICKY ACTION BAR --- */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="flex items-center gap-2"><Calendar size={16} className="text-green-600 flex-shrink-0" /> Published: <span className="text-[#713F12]">{formattedDate}</span></div>
            <div className="flex items-center gap-2"><Hash size={16} className="text-green-600 flex-shrink-0" /> DOI:
              {article.doi ? (
                <a
                  href={article.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#713F12] underline hover:text-green-600 truncate max-w-[220px]"
                >
                  {article.doi}
                </a>
              ) : (
                <span className="text-[#713F12]">
                  {article.paperNumber}
                </span>
              )}
            </div>
          </div>

          {/* Mobile: Published date row */}
          <div className="flex lg:hidden items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <Calendar size={14} className="text-green-600 flex-shrink-0" />
            <span className="text-[#713F12] normal-case font-semibold">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar">
            <a
              href={article.files?.manuscriptFile?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden xs:inline sm:inline">PDF Full Text</span>
              <span className="inline xs:hidden sm:hidden">PDF</span>
            </a>
            <button
              onClick={() => setShowCiteModal(true)}
              className="flex-shrink-0 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold transition-all active:scale-95 whitespace-nowrap"
            >
              <Quote size={16} className="sm:w-[18px] sm:h-[18px]" /> Cite
            </button>
            <div className="flex-shrink-0">
              <ArticleToolsDropdown article={article} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">

        {/* --- SIDEBAR --- */}
        <aside className="lg:col-span-3 order-1">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Navigation</div>
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-2 gap-1 lg:gap-0 no-scrollbar">
                <SidebarLink icon={<FileText size={18} />} label="Abstract" active={activeTab === "abstract"} onClick={() => setActiveTab("abstract")} />
                <SidebarLink icon={<Layout size={18} />} label="Figures & Data" active={activeTab === "figures"} onClick={() => setActiveTab("figures")} />
                <SidebarLink icon={<User size={18} />} label="Authors" active={activeTab === "authors"} onClick={() => setActiveTab("authors")} />
                <SidebarLink icon={<BarChart2 size={18} />} label="Metrics" active={activeTab === "metrics"} onClick={() => setActiveTab("metrics")} />
              </nav>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="lg:col-span-9 order-2">
          <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-sm border border-gray-100 p-5 sm:p-8 md:p-14 min-h-[400px] sm:min-h-[500px]">

            {/* TAB: ABSTRACT */}
            {activeTab === "abstract" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#713F12] mb-5 sm:mb-8 flex items-center gap-3">
                  <div className="w-1.5 h-6 sm:h-8 bg-green-600 rounded-full flex-shrink-0"></div> Abstract
                </h2>
                <p className="text-gray-700 leading-[1.7] sm:leading-[1.8] text-base sm:text-lg text-justify whitespace-pre-line">{article.abstract}</p>
                <div className="mt-8 sm:mt-12 flex flex-wrap gap-2">
                  {keywords.map((kw, i) => (
                    <span key={i} className="bg-green-50 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-green-100 text-xs sm:text-sm font-semibold">
                      {kw.replace(/[\[\]"]/g, '').trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: FIGURES (THE NEW GALLERY) */}
            {activeTab === "figures" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#713F12] mb-5 sm:mb-8 flex items-center gap-3">
                  <div className="w-1.5 h-6 sm:h-8 bg-green-600 rounded-full flex-shrink-0"></div> Figures & Illustrations
                </h2>

                {article.files?.figures?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                    {article.files.figures.map((fig, idx) => (
                      <div key={idx} className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                        <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 cursor-zoom-in" onClick={() => window.open(fig?.url, '_blank')}>
                          <img
                            src={fig?.url}
                            alt={`Figure ${idx + 1}`}
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur p-1.5 sm:p-2 rounded-full shadow-lg text-green-600">
                              <Maximize2 size={18} className="sm:w-5 sm:h-5" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 sm:p-6 flex justify-between items-center bg-white border-t border-gray-50">
                          <div>
                            <span className="text-[9px] sm:text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Figure {idx + 1}</span>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">Manuscript Illustration</p>
                          </div>
                          <a target="_blank" rel="noopener noreferrer" href={fig?.url} download className="p-2.5 sm:p-3 bg-green-50 text-green-600 rounded-xl sm:rounded-2xl hover:bg-green-600 hover:text-white transition-all flex-shrink-0">
                            <Download size={18} className="sm:w-5 sm:h-5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-14 sm:py-20 bg-gray-50 rounded-2xl sm:rounded-[2rem] border-2 border-dashed border-gray-200">
                    <Layout size={40} className="sm:w-12 sm:h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium text-sm sm:text-base px-4">No figures were uploaded for this manuscript.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: AUTHORS */}
            {activeTab === "authors" && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#713F12] mb-6 sm:mb-10 flex items-center gap-3">
                  <div className="w-1.5 h-6 sm:h-8 bg-green-600 rounded-full flex-shrink-0"></div> Author Directory
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {article.authors?.map((author, i) => (
                    <div key={i} className="p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:bg-white hover:border-green-300 transition-all">
                      <h3 className="text-lg sm:text-xl font-bold text-[#713F12]">{author.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm mt-2 flex items-center gap-2 break-words"><Building2 size={16} className="text-green-600 flex-shrink-0" /> {author.affiliation}</p>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1 flex items-center gap-2 break-all"><Mail size={16} className="text-green-600 flex-shrink-0" /> {author.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: METRICS */}
            {activeTab === "metrics" && (
              <div className="animate-in zoom-in-95 duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#713F12] mb-6 sm:mb-10 flex items-center gap-3">
                  <div className="w-1.5 h-6 sm:h-8 bg-green-600 rounded-full flex-shrink-0"></div> Article Metrics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <MetricCard icon={<Eye size={22} className="sm:w-6 sm:h-6" />} label="Views" value={article.views || 0} />
                  <MetricCard icon={<Download size={22} className="sm:w-6 sm:h-6" />} label="Downloads" value={Math.floor((article.views || 0) * 0.4)} />
                  <MetricCard icon={<Clock size={22} className="sm:w-6 sm:h-6" />} label="Avg Review" value="18 Days" />
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {showCiteModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[28px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-green-600 px-5 sm:px-8 py-5 sm:py-6 flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <Quote size={20} className="sm:w-[22px] sm:h-[22px]" />
                <h3 className="text-base sm:text-lg font-bold">Cite This Article</h3>
              </div>
              <button
                onClick={() => setShowCiteModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <p className="text-[10px] sm:text-[11px] font-black text-green-600 uppercase tracking-widest mb-2 sm:mb-3">APA Style</p>
                <p className="text-slate-800 text-sm sm:text-[15px] leading-relaxed break-words">{citationText}</p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(citationText);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-sm sm:text-base"
              >
                Copy Citation
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// --- HELPERS ---
function SidebarLink({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 lg:w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-4 flex items-center gap-2 sm:gap-3 transition-all rounded-xl mb-0 lg:mb-1 whitespace-nowrap ${active ? "bg-green-600 text-white shadow-lg shadow-green-100 font-bold" : "text-gray-500 hover:bg-green-50 hover:text-green-600 font-semibold"}`}
    >
      <span>{icon}</span>
      <span className="text-xs sm:text-sm">{label}</span>
    </button>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 bg-gray-50 flex flex-col items-center text-center transition-all hover:bg-white hover:shadow-xl group">
      <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl text-green-600 shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-2xl sm:text-3xl font-black text-[#713F12]">{value}</div>
      <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 mt-2">{label}</div>
    </div>
  );
}