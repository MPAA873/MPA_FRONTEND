"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
  Globe,
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

const Hero = () => {
  const router = useRouter();

  // State to trigger the auto-sliding animation loop
  const [slideKey, setSlideKey] = useState(0);

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

  // Logic to handle auto-scrolling
  useEffect(() => {
    if (latestArticle) {
      const interval = setInterval(() => {
        setSlideKey((prev) => prev + 1);
      }, 10000); 
      return () => clearInterval(interval);
    }
  }, [latestArticle]);

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

  return (
    <section className="w-full bg-[#FDF6ED] overflow-hidden scroll-mt-35" id="hero">
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
                className="bg-[#22C55E] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#16a34a] transition-all transform hover:-translate-y-1 shadow-lg"
              >
                Submit Manuscript <ArrowRight size={20} />
              </button>

              <button
                onClick={() => router.push("/manuscript-search")}
                className="bg-white text-[#713F12] px-8 py-4 rounded-2xl font-bold border border-green-100 hover:bg-green-50 transition-all shadow-sm"
              >
                Browse Articles
              </button>
            </div>
          </div>

          {/* --- RIGHT SECTION (ANNOUNCEMENTS SLIDER) --- */}
          <div className="relative order-1 lg:order-2 w-full max-w-[650px] mx-auto">
            
            <div className="absolute -inset-6 bg-green-200/20 blur-3xl rounded-full -z-10 animate-pulse"></div>

            <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col min-h-[350px]">
              
              <div className="px-8 pt-8 pb-3">
                <h2 className="text-2xl font-semibold text-[#713F12] tracking-tight">Announcements</h2>
                <div className="h-[1px] w-full bg-[#DCFCE7] mt-4"></div>
              </div>

              <div className="relative flex-grow flex items-center px-4 sm:px-14 py-8">
                <button className="absolute left-3 z-10 text-gray-300 hover:text-green-500 transition-colors hidden sm:block">
                  <ChevronLeft size={44} strokeWidth={1} />
                </button>
                <button className="absolute right-3 z-10 text-gray-300 hover:text-green-500 transition-colors hidden sm:block">
                  <ChevronRight size={44} strokeWidth={1} />
                </button>

                {isLoading ? (
                  <div className="w-full flex flex-col items-center justify-center py-10">
                    <Loader2 className="animate-spin text-green-500 mb-3" size={36} />
                    <p className="text-gray-500 text-sm font-medium">Updating Feed...</p>
                  </div>
                ) : latestArticle ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideKey}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full cursor-pointer"
                      onClick={() => router.push(`/articles/${latestArticle.slug}`)}
                    >
                      <div className="md:col-span-7 flex flex-col">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#333] leading-[1.3] mb-6 line-clamp-3">
                          {latestArticle.title}
                        </h3>
                        <p className="text-[#666] text-sm sm:text-[15px] font-medium leading-relaxed italic">
                          {formatAuthors(latestArticle.authors)}
                        </p>
                      </div>

                      <div className="md:col-span-5 flex justify-center items-center">
                        <div className="relative w-full max-w-[200px] aspect-square rounded-lg flex items-center justify-center bg-[#FDF6ED]">
                          {latestArticle.files?.manuscriptImage ? (
                            <img
                              src={latestArticle.files.manuscriptImage}
                              alt="Publication Figure"
                              className="w-full h-full object-contain drop-shadow-xl"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center border border-dashed border-gray-200 rounded-lg">
                              <FileText size={60} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-full text-center py-10 text-gray-400">
                    No new announcements at this time.
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 w-full h-full bg-green-50 rounded-xl -z-20 border border-green-100"></div>
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