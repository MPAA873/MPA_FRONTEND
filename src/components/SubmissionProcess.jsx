"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileUp,
    Search,
    ShieldCheck,
    UserCheck,
    CreditCard,
    Globe,
    Send,
    ChevronLeft,
    ChevronRight,
    Clock,
    BookOpenCheck,
    ArrowRight
} from "lucide-react";

const workflowSteps = [
    {
        id: 1,
        title: "Manuscript Submission",
        desc: "Securely upload your research with full metadata and cover letter.",
        icon: FileUp,
        time: "Real-time",
        color: "from-emerald-400 to-emerald-600",
    },
    {
        id: 2,
        title: "Quality Assessment",
        desc: "Advanced plagiarism screening and technical compliance check.",
        icon: Search,
        time: "72 Hours",
        color: "from-amber-400 to-amber-600",
    },
    {
        id: 3,
        title: "Expert Peer Review",
        desc: "Rigorous single-anonymous evaluation by domain authorities.",
        icon: ShieldCheck,
        time: "14–21Days",
        color: "from-blue-400 to-blue-600",
    },
    {
        id: 4,
        title: "Editorial Verdict",
        desc: "Final decision based on merit: Accept, Revise, or Reject.",
        icon: UserCheck,
        time: "48 Hours",
        color: "from-purple-400 to-purple-600",
    },
    {
        id: 5,
        title: "APC Processing",
        desc: "Seamless payment integration for open-access processing fees. APC waived off till 31st December 2026",
        icon: CreditCard,
        time: "Instant",
        color: "from-cyan-400 to-cyan-600",
    },
    {
        id: 6,
        title: "Online Publication",
        desc: "Immediate global indexing and open-access availability.",
        icon: Globe,
        time: "48 Hours",
        color: "from-emerald-500 to-teal-700",
    },

];

const AUTOPLAY_MS = 2000; 
const TOTAL = workflowSteps.length;

const SubmissionProcess = () => {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [paused, setPaused] = useState(false);
    const dragStartX = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % TOTAL);
        }, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [paused]);

    const goTo = useCallback((i) => setIndex(((i % TOTAL) + TOTAL) % TOTAL), []);
    const next = useCallback(() => goTo(index + 1), [index, goTo]);
    const prev = useCallback(() => goTo(index - 1), [index, goTo]);

    const signedDiff = (idx) => {
        let d = idx - index;
        if (d > TOTAL / 2) d -= TOTAL;
        if (d < -TOTAL / 2) d += TOTAL;
        return d;
    };

    const getCardStyles = (idx) => {
        const diff = signedDiff(idx);
        const abs = Math.abs(diff);

        if (abs === 0) {
            return { zIndex: 50, x: "0%", scale: 1, opacity: 1, rotateY: 0, translateZ: 0 };
        }
        if (abs === 1) {
            const dir = diff > 0 ? 1 : -1;
            return {
                zIndex: 40,
                x: `${dir * (isMobile ? 70 : 60)}%`,
                scale: isMobile ? 0.75 : 0.85,
                opacity: 0.6,
                rotateY: dir * -25,
                translateZ: -100
            };
        }
        if (abs === 2 && !isMobile) {
            const dir = diff > 0 ? 1 : -1;
            return {
                zIndex: 20,
                x: `${dir * 100}%`,
                scale: 0.7,
                opacity: 0.2,
                rotateY: dir * -35,
                translateZ: -200
            };
        }
        return { zIndex: 0, x: "0%", scale: 0.5, opacity: 0, rotateY: 0, translateZ: -400 };
    };

    const onPointerDown = (e) => {
        dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
        setPaused(true);
    };
    const onPointerUp = (e) => {
        if (dragStartX.current === null) return;
        const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
        const delta = endX - dragStartX.current;
        if (delta > 50) prev();
        else if (delta < -50) next();
        dragStartX.current = null;
        setPaused(false);
    };

    return (
        <section className="py-12 px-4 bg-[#FDF6ED] overflow-hidden">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-[#78350f] tracking-tighter mb-4">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Professional Path</span> to Publication
                </h2>
            </div>

            <div
                className="relative h-[320px] md:h-[350px] flex flex-col items-center justify-center select-none touch-pan-y"
                style={{ perspective: "1200px" }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onTouchStart={onPointerDown}
                onTouchEnd={onPointerUp}
            >
                <div className="relative w-full max-w-[460px] h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                    <AnimatePresence mode="popLayout">
                        {workflowSteps.map((step, idx) => {
                            const Icon = step.icon;
                            const style = getCardStyles(idx);
                            const isActive = idx === index;
                            
                            return (
                                <motion.div
                                    key={step.id}
                                    animate={style}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 200, 
                                        damping: 25, 
                                        mass: 0.8 
                                    }}
                                    onClick={() => !isActive && goTo(idx)}
                                    className={`absolute w-[260px] md:w-[320px] bg-white rounded-3xl p-6 border border-white/50 shadow-xl flex flex-col items-center text-center will-change-transform ${!isActive ? "cursor-pointer" : ""}`}
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <div className={`absolute -top-3 shadow-md bg-gradient-to-br ${step.color} px-4 py-1 rounded-lg text-white text-[10px] font-bold tracking-widest uppercase`}>
                                        Stage {step.id}
                                    </div>

                                    <div className={`mt-2 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                                        <Icon size={28} strokeWidth={2} />
                                    </div>

                                    <h3 className="text-lg md:text-xl font-black text-[#78350f] mb-2 leading-tight">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4">
                                        {step.desc}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl w-full justify-center">
                                        <Clock size={14} className="text-emerald-500" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            Time: <span className="text-emerald-600">{step.time}</span>
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="absolute -bottom-8 flex items-center gap-6 z-50">
                    <button
                        onClick={prev}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-emerald-500 hover:text-white transition-colors text-[#78350f] active:scale-90"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-2">
                        {workflowSteps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === i ? "w-8 bg-emerald-500" : "w-1.5 bg-gray-300"}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-emerald-500 hover:text-white transition-colors text-[#78350f] active:scale-90"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Progress line */}
            <div className="max-w-2xl mx-auto mt-20 hidden md:block">
                <div className="h-1 w-full bg-gray-200 rounded-full relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
                        animate={{ width: `${((index + 1) / TOTAL) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <Link
                    href="/guidelines"
                    className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all active:scale-95"
                >
                    <BookOpenCheck size={20} />
                    Submission Guidelines
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
};

export default SubmissionProcess;