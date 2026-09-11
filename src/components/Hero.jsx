"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
  Globe,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Pause,
  Play,
  Share2,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useGetLatestPublishedQuery } from "../store/apiSlice";

// Phrases for the typing animation — tailored to a research/publishing journal
const TYPING_PHRASES = [
  { line1: "Advancing Knowledge.", line2: "Inspiring Innovation." },
  { line1: "Peer-Reviewed Research.", line2: "Trusted Worldwide." },
  { line1: "Open Access Publishing.", line2: "Global Scholarly Reach." },
  { line1: "Empowering Researchers.", line2: "Shaping the Future." },
  { line1: "Rigorous. Credible.", line2: "Impactful Science." },
];

// Custom hook: smooth typewriter effect across multiple two-line phrases
const useTypewriter = (phrases, { typingSpeed = 55, deletingSpeed = 30, pauseTime = 1800 } = {}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[phraseIndex];
  const fullText = `${currentPhrase.line1}\n${currentPhrase.line2}`;

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && charCount === fullText.length) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && charCount === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setCharCount((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, isPaused, fullText, phrases.length, typingSpeed, deletingSpeed, pauseTime]);

  const displayedText = fullText.substring(0, charCount);
  const [displayLine1, displayLine2 = ""] = displayedText.split("\n");

  return { displayLine1, displayLine2 };
};

/**
 * Creative Graphical Abstract component for manuscripts without an uploaded image.
 * Provides a high-impact, authentic scientific illustration with pathway nodes,
 * molecular bonds, and publication metadata.
 */
const ScholarlyGraphicalAbstract = ({ title, category }) => {
  return (
    <div className="relative w-full h-full min-h-[170px] sm:min-h-[190px] rounded-xl overflow-hidden bg-gradient-to-br from-[#042f1f] via-[#064e3b] to-[#022c22] p-3 flex flex-col justify-between border border-emerald-500/20 shadow-inner group/art select-none">
      {/* Dynamic background scientific grid & glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#34d399 1px, transparent 1px), radial-gradient(#fbbf24 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 8px 8px",
        }}
      />
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

      {/* Top badges */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/30 backdrop-blur-sm">
          <Sparkles size={10} className="text-amber-300" />
          Graphical Abstract
        </span>
        <span className="text-[9px] font-mono text-emerald-400/80 tracking-wider">
          Peer-Reviewed 
        </span>
      </div>

      {/* Center scientific vector visualization */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2">
        <svg
          viewBox="0 0 200 110"
          className="w-full max-w-[170px] h-auto drop-shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-transform duration-500 group-hover/art:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pathway connections */}
          <path
            d="M25 55 Q 60 20, 100 55 T 175 55"
            stroke="url(#pathGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            className="animate-pulse"
          />
          <path
            d="M60 25 L 100 55 L 140 25"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <path
            d="M60 85 L 100 55 L 140 85"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Signaling Nodes */}
          {/* Node 1 - PI3K/Receptor */}
          <circle cx="25" cy="55" r="9" fill="#065f46" stroke="#34d399" strokeWidth="2" />
          <circle cx="25" cy="55" r="4" fill="#a7f3d0" />
          <text x="25" y="73" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">Ligand</text>

          {/* Node 2 - Top Kinase */}
          <circle cx="60" cy="25" r="7" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
          <text x="60" y="14" fill="#d1fae5" fontSize="7" textAnchor="middle">Akt</text>

          {/* Node 3 - Core Central Complex */}
          <circle cx="100" cy="55" r="14" fill="#064e3b" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="100" cy="55" r="8" fill="#10b981" />
          <text x="100" y="58" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">mTOR</text>

          {/* Node 4 - Bottom Effector */}
          <circle cx="60" cy="85" r="7" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
          <text x="60" y="100" fill="#d1fae5" fontSize="7" textAnchor="middle">p70S6K</text>

          {/* Node 5 - Target / Response */}
          <circle cx="140" cy="25" r="7" fill="#047857" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="140" y="14" fill="#fde68a" fontSize="7" textAnchor="middle">4E-BP1</text>

          {/* Node 6 - Cellular Outcome */}
          <rect x="162" y="44" width="26" height="22" rx="5" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
          <text x="175" y="58" fill="#ecfdf5" fontSize="7" fontWeight="bold" textAnchor="middle">Apoptosis</text>

          <defs>
            <linearGradient id="pathGrad" x1="25" y1="55" x2="175" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom status badge */}
      <div className="relative z-10 flex items-center justify-between text-[9px] text-emerald-200/90 pt-1 border-t border-emerald-500/20">
        <span className="flex items-center gap-1 truncate max-w-[130px]">
          <ShieldCheck size={11} className="text-emerald-400 flex-shrink-0" />
          {category || "Molecular Biology"}
        </span>
        <span className="font-mono text-[8.5px] text-amber-300/90 font-medium">
          FIG 1.0
        </span>
      </div>
    </div>
  );
};

const Hero = () => {
  const router = useRouter();

  // State to trigger the auto-sliding animation loop
  const [slideKey, setSlideKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);

  // Fetch the latest published manuscript from your API logic
  const { data, isLoading } = useGetLatestPublishedQuery();
  const latestArticle = data?.article;

  // Typing animation for the hero heading
  const { displayLine1, displayLine2 } = useTypewriter(TYPING_PHRASES);

  // Function to format author names
  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return "Principal Investigator";
    return authors.map((auth) => auth.name).join(", ");
  };

  // Logic to handle auto-scrolling (with pause-on-hover & user pause control)
  useEffect(() => {
    if (latestArticle && !isHovered && !isPausedByUser) {
      const interval = setInterval(() => {
        setSlideKey((prev) => prev + 1);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [latestArticle, isHovered, isPausedByUser]);

  // Auth check logic
  const checkAuthAndRun = (callback) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Please login or signup to continue", {
        icon: "🔒",
        duration: 4000,
      });
      router.push("/login");
      return;
    }
    callback();
  };

  // Manual navigation handlers
  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setSlideKey((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setSlideKey((prev) => prev + 1);
  };

  const togglePause = (e) => {
    e.stopPropagation();
    setIsPausedByUser((prev) => !prev);
  };

  return (
    <section className="w-full overflow-hidden scroll-mt-35" id="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-15">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* --- LEFT SECTION --- */}
          <div className="flex flex-col order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 min-h-[2.4em] sm:min-h-[2.2em]">
              <span className="text-[#713F12] block whitespace-pre-wrap break-words">
                {displayLine1}
                {displayLine2.length === 0 && (
                  <span className="typing-cursor text-[#713F12]">|</span>
                )}
              </span>
              <span className="text-[#22C55E] block whitespace-pre-wrap break-words">
                {displayLine2}
                {displayLine2.length > 0 && (
                  <span className="typing-cursor text-[#22C55E]">|</span>
                )}
              </span>
            </h1>

            <div className="text-[#854D0E] text-lg sm:text-xl max-w-lg mb-8 leading-relaxed opacity-90">
              <p className="mb-4">
                <span className="font-bold">MPA Research</span> is an international, peer-reviewed, open access multidisciplinary journal dedicated to publishing high-quality research.
              </p>
              <p className="text-base sm:text-lg opacity-80">
                Join our growing international community and share impactful discoveries with a global audience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
              <button
                onClick={() =>
                  checkAuthAndRun(() => {
                    router.push("/submit");
                  })
                }
                className="bg-[#22C55E] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#16a34a] transition-all transform hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                Submit Manuscript <ArrowRight size={20} />
              </button>

              <button
                onClick={() => router.push("/manuscript-search")}
                className="bg-white text-[#713F12] px-8 py-4 rounded-2xl font-bold border border-green-100 hover:bg-green-50 transition-all shadow-sm cursor-pointer"
              >
                Browse Articles
              </button>
            </div>
          </div>

          {/* --- RIGHT SECTION (ENHANCED PROFESSIONAL ANNOUNCEMENTS SHOWCASE) --- */}
          <div
            className="relative order-1 lg:order-2 w-full max-w-[650px] mx-auto group/hero-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient creative multi-layer background illumination */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-400/20 via-amber-300/15 to-green-500/20 blur-3xl rounded-3xl -z-10 animate-pulse duration-1000"></div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-200/40 rounded-full blur-2xl -z-10 pointer-events-none"></div>

            {/* Main Announcements Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_15px_45px_rgba(22,101,52,0.10),0_2px_10px_rgba(0,0,0,0.03)] border border-emerald-100/90 overflow-hidden flex flex-col min-h-[380px] transition-all duration-300 hover:shadow-[0_22px_55px_rgba(22,101,52,0.14)] relative">
              
              {/* Top Dynamic Progress Bar for 10-second auto-slide */}
              {latestArticle && !isLoading && (
                <div className="w-full h-1 bg-emerald-50/80 overflow-hidden">
                  <motion.div
                    key={`progress-${slideKey}-${isHovered || isPausedByUser}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered || isPausedByUser ? "100%" : "100%" }}
                    transition={{
                      duration: isHovered || isPausedByUser ? 0 : 10,
                      ease: "linear",
                    }}
                    className={`h-full ${
                      isHovered || isPausedByUser
                        ? "bg-amber-400/80"
                        : "bg-gradient-to-r from-emerald-500 via-green-500 to-amber-400"
                    }`}
                  />
                </div>
              )}

              {/* Announcements Header */}
              <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-emerald-50/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Pulsing live radar beacon */}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#713F12] tracking-tight">
                        Announcements
                      </h2>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-xs">
                        <Sparkles size={11} className="text-emerald-600" />
                        Featured Feed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Pause / Resume Button */}
                  <button
                    onClick={togglePause}
                    title={isPausedByUser ? "Resume Auto-scroll" : "Pause Auto-scroll"}
                    className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100 flex items-center justify-center cursor-pointer"
                  >
                    {isPausedByUser ? <Play size={15} /> : <Pause size={15} />}
                  </button>

                  {/* Previous Slide Button */}
                  <button
                    onClick={handlePrevSlide}
                    aria-label="Previous announcement"
                    className="w-8 h-8 rounded-xl text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all border border-gray-100 hover:border-emerald-200 flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <ChevronLeft size={18} strokeWidth={2.2} />
                  </button>

                  {/* Next Slide Button */}
                  <button
                    onClick={handleNextSlide}
                    aria-label="Next announcement"
                    className="w-8 h-8 rounded-xl text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all border border-gray-100 hover:border-emerald-200 flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <ChevronRight size={18} strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* Announcements Content Body */}
              <div className="relative flex-grow flex items-center px-6 sm:px-8 py-6">
                {isLoading ? (
                  <div className="w-full flex flex-col items-center justify-center py-12">
                    <div className="relative flex items-center justify-center mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <Loader2 className="animate-spin text-emerald-500" size={28} />
                      </div>
                      <div className="absolute -inset-2 bg-emerald-200/30 rounded-3xl blur-md -z-10 animate-pulse"></div>
                    </div>
                    <p className="text-[#713F12] text-sm font-semibold tracking-wide">Syncing Latest Research...</p>
                    <p className="text-gray-400 text-xs mt-1">Retrieving verified DOI publications</p>
                  </div>
                ) : latestArticle ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideKey}
                      initial={{ opacity: 0, y: 14, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -14, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full cursor-pointer group/article"
                      onClick={() => router.push(`/articles/${latestArticle.slug}`)}
                    >
                      {/* Left: Article Metadata & Details */}
                      <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1">
                        
                        {/* Tags / Badges Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                            <BookOpen size={11} className="text-emerald-600" />
                            {latestArticle.category || "Research Article"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70">
                            <Globe size={11} className="text-amber-600" />
                            Open Access
                          </span>
                          {latestArticle.doi && (
                            <span className="text-[10.5px] font-mono text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200/60 hidden sm:inline-block">
                              DOI: {latestArticle.doi}
                            </span>
                          )}
                        </div>

                        {/* Article Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-[1.35] mb-2.5 line-clamp-3 group-hover/article:text-emerald-600 transition-colors">
                          {latestArticle.title}
                        </h3>

                        {/* Author Citation Info */}
                        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-[13.5px] font-medium italic mb-4">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center not-italic font-bold text-[10px] flex-shrink-0">
                            Dr
                          </span>
                          <span className="line-clamp-1">{formatAuthors(latestArticle.authors)}</span>
                        </div>

                        {/* Interactive Call to Action Banner */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 group-hover/article:text-emerald-700 transition-colors">
                            <span>Read Full Manuscript</span>
                            <ArrowRight
                              size={15}
                              className="group-hover/article:translate-x-1.5 transition-transform duration-200"
                            />
                          </div>
                          
                          <div className="text-[11px] text-gray-400 flex items-center gap-1">
                            <ExternalLink size={12} className="text-gray-400" />
                            <span>Peer Reviewed</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Manuscript Image or Creative Scholarly Graphical Abstract */}
                      <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2">
                        <div className="relative w-full max-w-[220px] aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FDF6ED] to-[#FAF1E4] border border-amber-100/80 shadow-sm p-1.5 group-hover/article:shadow-md transition-shadow">
                          {latestArticle.files?.manuscriptImage ? (
                            <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-white">
                              <img
                                src={latestArticle.files.manuscriptImage}
                                alt="Publication Figure"
                                className="w-full h-full object-cover group-hover/article:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded backdrop-blur-xs">
                                Figure
                              </div>
                            </div>
                          ) : (
                            <ScholarlyGraphicalAbstract
                              title={latestArticle.title}
                              category={latestArticle.category}
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-full text-center py-12 flex flex-col items-center justify-center text-gray-400">
                    <FileText size={40} className="text-emerald-200 mb-2" />
                    <p className="text-sm font-semibold text-gray-600">No active announcements</p>
                    <p className="text-xs text-gray-400 mt-0.5">Check back soon for latest publications and updates</p>
                  </div>
                )}
              </div>

              {/* Bottom Subtle Status Footer */}
              <div className="px-6 sm:px-8 py-2.5 bg-[#FAFBF9] border-t border-emerald-50/80 flex items-center justify-between text-[11.5px] text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-gray-600">MPA Research Scholarly Feed</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  {isHovered && (
                    <span className="text-emerald-600 font-medium animate-pulse">
                      Hovered • Timer Paused
                    </span>
                  )}
                  <span>Auto-updates</span>
                </div>
              </div>
            </div>

            {/* Creative layered decorative offset background */}
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-green-50 to-emerald-100/60 rounded-2xl -z-20 border border-green-200/50 shadow-xs transition-transform duration-300 group-hover/hero-card:translate-x-1 group-hover/hero-card:translate-y-1"></div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink-cursor 0.9s step-end infinite;
          font-weight: 400;
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
