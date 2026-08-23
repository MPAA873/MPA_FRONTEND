"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating "Call for Paper" button — MPA Research Companion
 * Features:
 * - Ultra-crisp, brand-matched luxury academic styling
 * - Realistic telephone ringing micro-interaction with acoustic radar waves
 * - Compact non-obstructive footprint (doesn't block text content)
 * - Quick switch between Phone Helpline and Official Email Desks
 * - One-click email copying and direct tel: dialing
 * - Fully responsive across Mobile, Tablet, and Desktop
 */

const PHONES = [
  { number: "+91-9452292537", label: "Primary Editorial Helpline", badge: "24/7" },
  { number: "+91-8923580628", label: "Secondary Submission Support", badge: "Direct" },
];

const EMAILS = [
  {
    address: "info@mparesearch.com",
    label: "General inquiries & submission support",
    role: "Desk Support",
  },
  {
    address: "researchdirector@mparesearch.com",
    label: "Editorial board member inquiries",
    role: "Editorial",
  },
  {
    address: "fahad.khan@mparesearch.com",
    label: "Dr. Fahad Khan, Co-Editor-in-Chief",
    role: "Escalations",
  },
];

export default function CallForPaper() {
  const [open, setOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [activeTab, setActiveTab] = useState("call");
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (open && wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const handleCopy = (e, email) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div ref={wrapRef} className="cfp-wrap">
      {/* Contact Card Modal */}
      <div 
        className={`cfp-card ${open ? "cfp-card--open" : ""}`}
        role="dialog" 
        aria-modal="true"
        aria-label="Call for Paper contact options" 
        aria-hidden={!open}
      >
        {/* Card Header */}
        <div className="cfp-card__header">
          <div className="cfp-card__badge-wrap">
            <div className="cfp-card__badge">
              <svg viewBox="0 0 24 24" fill="none" className="cfp-icon" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <span className="cfp-badge-pulse" />
          </div>

          <div className="cfp-card__heading">
            <div className="cfp-card__title-row">
              <h3 className="cfp-card__title">Call for Papers</h3>
              <span className="cfp-card__tag">2026 Edition</span>
            </div>
            <p className="cfp-card__subtitle">Publish your research with MPA Research</p>
          </div>

          <button
            type="button"
            aria-label="Close"
            className="cfp-card__close"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" className="cfp-icon-sm" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Status Strip */}
        <div className="cfp-status-strip">
          <span className="cfp-status-dot" />
          <span className="cfp-status-text">Submissions Open • APCs Fully Waived</span>
        </div>

        {/* Segmented Tabs */}
        <div className="cfp-tabs">
          <button
            type="button"
            className={`cfp-tab-btn ${activeTab === "call" ? "cfp-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("call")}
          >
            <svg viewBox="0 0 24 24" fill="none" className="cfp-tab-icon" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>Call Helpline</span>
          </button>
          <button
            type="button"
            className={`cfp-tab-btn ${activeTab === "email" ? "cfp-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("email")}
          >
            <svg viewBox="0 0 24 24" fill="none" className="cfp-tab-icon" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>Email Desk</span>
          </button>
        </div>

        {/* Call Section */}
        {activeTab === "call" && (
          <div className="cfp-card__section">
            <div className="cfp-card__section-header">
              <span className="cfp-card__label">Direct Helpline Lines</span>
              <span className="cfp-badge-pill">24/7 Available</span>
            </div>
            {PHONES.map((p) => (
              <a key={p.number} href={`tel:${p.number.replace(/[^\d+]/g, "")}`} className="cfp-row">
                <span className="cfp-row__icon cfp-row__icon--call">
                  <svg viewBox="0 0 24 24" fill="none" className="cfp-icon-sm" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <span className="cfp-row__text">
                  <span className="cfp-row__main">{p.number}</span>
                  <span className="cfp-row__sub">{p.label}</span>
                </span>
                <span className="cfp-row__chevron">›</span>
              </a>
            ))}
          </div>
        )}

        {/* Email Section */}
        {activeTab === "email" && (
          <div className="cfp-card__section">
            <div className="cfp-card__section-header">
              <span className="cfp-card__label">Editorial Inboxes</span>
              <span className="cfp-badge-pill">Click / Copy</span>
            </div>
            {EMAILS.map((item) => (
              <div key={item.address} className="cfp-row cfp-row--email">
                <a href={`mailto:${item.address}`} className="cfp-row__email-link">
                  <span className="cfp-row__icon cfp-row__icon--mail">
                    <svg viewBox="0 0 24 24" fill="none" className="cfp-icon-sm" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <span className="cfp-row__text">
                    <span className="cfp-row__main cfp-row__main--truncate">{item.address}</span>
                    <span className="cfp-row__sub">{item.label}</span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, item.address)}
                  className="cfp-copy-btn"
                  title="Copy email"
                >
                  {copiedEmail === item.address ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cfp-card__footer">
          <a href="/submit" className="cfp-cta">
            <span>Submit Your Manuscript</span>
            <svg viewBox="0 0 24 24" fill="none" className="cfp-icon-sm" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Floating Trigger Button with Realistic Telephone Ringing Animation */}
      <div className="cfp-trigger-container">
        <span className="cfp-ring cfp-ring--1" />
        <span className="cfp-ring cfp-ring--2" />

        <button
          type="button"
          className="cfp-trigger"
          aria-expanded={open}
          aria-label="Call for Paper — contact options"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Subtle realistic gloss */}
          <span className="cfp-trigger__gloss" />

          {/* Realistic Telephone Handset Icon with Sound Waves */}
          <svg className="cfp-phone-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.5 4.5C19.2 6.2 20 8.5 20 11"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="cfp-wave-outer"
            />
            <path
              d="M15 7C16 8 16.5 9.4 16.5 11"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="cfp-wave-inner"
            />
            <path
              d="M5.5 4.25C5.9 3.5 6.75 3 7.6 3.15C8.45 3.3 9.15 4.4 9.45 5.25C9.75 6.1 9.45 7.15 8.85 7.75L7.6 9C8.7 11.4 10.6 13.3 13 14.4L14.25 13.15C14.85 12.55 15.9 12.25 16.75 12.55C17.6 12.85 18.7 13.55 18.85 14.4C19 15.25 18.5 16.1 17.75 16.5C16.35 17.25 14.65 17.3 13.1 16.8C10.1 15.8 7.2 13.4 5.2 10.9C4.2 9.4 3.75 7.65 4.5 5.75C4.7 5.2 5.05 4.65 5.5 4.25Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>

          {/* Active online dot */}
          <span className="cfp-active-dot" />
        </button>
      </div>

      <span className={`cfp-tooltip ${open ? "cfp-tooltip--hidden" : ""}`}>
        <strong>Call for Paper</strong>
        <small>Editorial Support</small>
      </span>

      <style jsx>{`
        .cfp-wrap {
          position: fixed;
          left: 20px;
          bottom: 24px;
          z-index: 999;
          display: flex;
          align-items: flex-end;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .cfp-trigger-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ---------- Trigger Button (Matches MPA Research amber/cognac theme) ---------- */
        .cfp-trigger {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
          background: linear-gradient(135deg, #a45e20 0%, #8c4c16 48%, #6a350c 100%);
          box-shadow: 0 8px 20px rgba(106, 53, 12, 0.38), 0 2px 6px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
          outline: none;
        }

        .cfp-trigger:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 26px rgba(106, 53, 12, 0.45), 0 3px 8px rgba(0, 0, 0, 0.2);
        }

        .cfp-trigger:active {
          transform: scale(0.96) translateY(0);
        }

        .cfp-trigger__gloss {
          position: absolute;
          inset: 1px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.35) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ---------- Authentic Telephone Ringing Keyframes ---------- */
        .cfp-phone-svg {
          width: 22px;
          height: 22px;
          color: #ffffff;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
          transform-origin: 20% 80%;
          animation: cfp-realistic-ring 3.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
        }

        @keyframes cfp-realistic-ring {
          0%, 60%, 100% {
            transform: rotate(0deg) scale(1);
          }
          63% { transform: rotate(-18deg) scale(1.06); }
          66% { transform: rotate(16deg) scale(1.06); }
          69% { transform: rotate(-14deg) scale(1.04); }
          72% { transform: rotate(12deg) scale(1.04); }
          75% { transform: rotate(-8deg) scale(1.02); }
          78% { transform: rotate(6deg) scale(1.01); }
          81% { transform: rotate(0deg) scale(1); }
          84% { transform: rotate(-16deg) scale(1.05); }
          87% { transform: rotate(14deg) scale(1.05); }
          90% { transform: rotate(-10deg) scale(1.03); }
          93% { transform: rotate(8deg) scale(1.02); }
          96% { transform: rotate(0deg) scale(1); }
        }

        .cfp-wave-outer, .cfp-wave-inner {
          animation: cfp-wave-pulse 3.2s ease-in-out infinite;
        }
        .cfp-wave-inner { animation-delay: 0.1s; }
        .cfp-wave-outer { animation-delay: 0.25s; }

        @keyframes cfp-wave-pulse {
          0%, 20% { opacity: 0; transform: scale(0.85); }
          25%, 55% { opacity: 1; transform: scale(1); }
          65%, 100% { opacity: 0.3; }
        }

        /* Pulse Waves */
        .cfp-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid rgba(164, 94, 32, 0.45);
          opacity: 0;
          pointer-events: none;
          animation: cfp-radar-pulse 3.2s cubic-bezier(0.1, 0.45, 0.1, 1) infinite;
        }
        .cfp-ring--1 { animation-delay: 2.1s; }
        .cfp-ring--2 { animation-delay: 2.7s; border-color: rgba(22, 163, 74, 0.4); }

        @keyframes cfp-radar-pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { opacity: 0.35; }
          100% { transform: scale(1.85); opacity: 0; }
        }

        .cfp-active-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 9px;
          height: 9px;
          background: #22c55e;
          border: 1.5px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.8);
        }

        /* ---------- Tooltip ---------- */
        .cfp-tooltip {
          position: absolute;
          left: 60px;
          bottom: 8px;
          background: #1c140e;
          color: #fbf8f5;
          padding: 5px 10px;
          border-radius: 8px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-8px);
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .cfp-tooltip strong { font-size: 12px; color: #fce7d2; }
        .cfp-tooltip small { font-size: 10px; color: #a89f97; }
        .cfp-wrap:hover .cfp-tooltip:not(.cfp-tooltip--hidden) {
          opacity: 1;
          transform: translateX(0);
        }

        /* ---------- Contact Card Modal ---------- */
        .cfp-card {
          position: absolute;
          left: 0;
          bottom: 64px;
          width: 328px;
          max-width: calc(100vw - 32px);
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 18px 42px -6px rgba(45, 25, 10, 0.22), 0 4px 16px rgba(0, 0, 0, 0.08);
          border: 1px solid #ede4db;
          padding: 16px;
          transform: translateY(12px) scale(0.95);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.2s ease;
          overflow: hidden;
        }
        .cfp-card--open {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }

        .cfp-card__header {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
        }
        .cfp-card__badge-wrap { position: relative; flex-shrink: 0; }
        .cfp-card__badge {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #96531c, #6c350d);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .cfp-badge-pulse {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 7px;
          height: 7px;
          background: #16a34a;
          border: 1.5px solid #fff;
          border-radius: 50%;
        }
        .cfp-card__heading { flex: 1; min-width: 0; }
        .cfp-card__title-row { display: flex; align-items: center; gap: 6px; }
        .cfp-card__title { font-size: 15px; font-weight: 700; color: #26160c; margin: 0; }
        .cfp-card__tag {
          font-size: 10px;
          font-weight: 700;
          color: #16a34a;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 1px 5px;
          border-radius: 4px;
        }
        .cfp-card__subtitle { font-size: 11.5px; color: #786b62; margin: 2px 0 0; }
        .cfp-card__close {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: none;
          background: #f5ede6;
          color: #6b5c51;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .cfp-status-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 8px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          margin-bottom: 10px;
        }
        .cfp-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #16a34a; }
        .cfp-status-text { font-size: 11.5px; font-weight: 500; color: #166534; }

        .cfp-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          padding: 3px;
          background: #f4eee7;
          border-radius: 9px;
          margin-bottom: 10px;
        }
        .cfp-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 7px;
          border: none;
          background: transparent;
          font-size: 11.5px;
          font-weight: 600;
          color: #6c5c50;
          cursor: pointer;
        }
        .cfp-tab-btn--active {
          background: #ffffff;
          color: #8c4c16;
          box-shadow: 0 1.5px 4px rgba(0, 0, 0, 0.08);
        }

        .cfp-card__section { margin-bottom: 10px; }
        .cfp-card__section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2px 6px;
        }
        .cfp-card__label {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8c4c16;
        }
        .cfp-badge-pill {
          font-size: 10px;
          font-weight: 600;
          color: #166534;
          background: #dcfce7;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .cfp-row {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 9px;
          border-radius: 10px;
          text-decoration: none;
          background: #fbf8f5;
          border: 1px solid #f0e6dc;
          margin-bottom: 6px;
          transition: all 0.15s ease;
        }
        .cfp-row:hover {
          background: #f7eee4;
          border-color: #dfcdbd;
          transform: translateX(2px);
        }
        .cfp-row--email { justify-content: space-between; }
        .cfp-row__email-link { display: flex; align-items: center; gap: 9px; min-width: 0; flex: 1; text-decoration: none; }
        .cfp-row__icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cfp-row__icon--call { background: #faeade; color: #8c4c16; }
        .cfp-row__icon--mail { background: #e6f7ed; color: #16a34a; }
        .cfp-row__text { flex: 1; min-width: 0; }
        .cfp-row__main { display: block; font-size: 13px; font-weight: 600; color: #29180e; }
        .cfp-row__main--truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cfp-row__sub { display: block; font-size: 11px; color: #7d6e64; }
        .cfp-row__chevron { font-size: 16px; color: #b5a496; }

        .cfp-copy-btn {
          padding: 3px 7px;
          border-radius: 5px;
          border: 1px solid #e5d8cc;
          background: #ffffff;
          font-size: 10.5px;
          color: #7d6e64;
          cursor: pointer;
        }
        .cfp-copy-btn:hover { background: #f3eae0; color: #8c4c16; }

        .cfp-card__footer { margin-top: 10px; padding-top: 10px; border-top: 1px solid #f0e6dc; }
        .cfp-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 9px 12px;
          border-radius: 10px;
          background: linear-gradient(135deg, #96531c 0%, #763b0e 100%);
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(118, 59, 14, 0.28);
          transition: all 0.2s ease;
        }
        .cfp-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(118, 59, 14, 0.38);
        }

        .cfp-icon { width: 17px; height: 17px; }
        .cfp-icon-sm { width: 14px; height: 14px; }
        .cfp-tab-icon { width: 13px; height: 13px; }

        @media (max-width: 640px) {
          .cfp-tooltip { display: none !important; }
          .cfp-wrap { left: 14px; bottom: 16px; }
          .cfp-trigger { width: 46px; height: 46px; }
          .cfp-phone-svg { width: 19px; height: 19px; }
          .cfp-card { width: calc(100vw - 28px); bottom: 58px; padding: 14px; }
        }
      `}</style>
    </div>
  );
}