"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const leadEditors = [
  {
    id: "chief-1",
    name: "Dr. Pratibha Pandey",
    title: "Co-Editor In-Chief",
    specialty: "PhD in Bioengineering",
    org: "Chandigarh University, Mohali, India",
    image: "/images/PratibhaPanday.png",
    desc: "Dr. Pratibha Pandey is associated with Chandigarh University, Mohali, India. Her work spans natural product-based drug discovery and phytochemical research, including plant-derived compounds for cancer therapeutics and natural coagulants for water treatment. She has co-authored studies published in journals including Water Environment Research, Cellular and Molecular Biology, and the Brazilian Journal of Pharmaceutical Sciences.",
    orcid: "https://orcid.org/0000-0001-7029-8517",
  },
  {
    id: "chief-2",
    name: "Dr. Fahad Khan",
    title: "Co-Editor In-Chief",
    specialty: "Dept. of Community Medicine",
    org: "Saveetha Institute of Medical and Technical Sciences, India",
    image: "/images/fahad-khan.png",
    desc: "Dr. Fahad Khan is associated with Saveetha Institute of Medical and Technical Sciences, India. His research focuses on natural product pharmacology and computational approaches to disease mechanisms, including anticancer compound screening and molecular studies of viral and cancer-related targets. He has co-authored work published in journals including Immuno (MDPI), Cellular and Molecular Biology, and the Brazilian Journal of Pharmaceutical Sciences.",
    orcid: "https://orcid.org/0000-0003-3449-7978",
  },
];

// Official ORCID "iD" mark — inline SVG so it renders crisply at any
// size without an extra network request, using ORCID's brand green.
function OrcidIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="128" cy="128" r="128" fill="#A6CE39" />
      <path
        fill="#FFFFFF"
        d="M86.3 186.2H70.9V79.1h15.4v107.1zM110.8 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7 0-21.5-13.7-39.7-43.7-39.7h-23.7v79.4zM78.6 56.8c0 5.5-4.5 10.1-10.1 10.1-5.6 0-10.1-4.6-10.1-10.1 0-5.6 4.5-10.1 10.1-10.1 5.6 0 10.1 4.5 10.1 10.1z"
      />
    </svg>
  );
}

const EditorialLeadership = () => {
  const router = useRouter();

  const scrollToNext = () => {
    const element = document.getElementById("articles-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#FDF6ED] py-16 px-4 border-t border-green-50">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center gap-2 text-[#22C55E] bg-white px-4 py-1 rounded-full shadow-sm border border-green-100 mb-4">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Board Directory</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#713F12] tracking-tight">
            MPA Research Leadership
          </h2>
          <p className="text-[#854D0E]/70 mt-2 max-w-xl text-sm md:text-base">
            Guided by world-class researchers committed to scientific integrity and excellence in global peer-review.
          </p>
        </div>

        {/* Two Main Editors Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {leadEditors.map((editor, index) => (
            <motion.div
              key={editor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Image Section */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-[#FDF6ED] group-hover:ring-green-100 transition-all duration-500">
                    <img
                      src={editor.image}
                      alt={editor.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-white text-[10px] px-3 py-1 rounded-lg font-bold shadow-lg whitespace-nowrap">
                    {editor.title}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-[#333] mb-1 group-hover:text-[#22C55E] transition-colors">
                    {editor.name}
                  </h3>
                  <p className="text-[#713F12] text-xs font-bold mb-3 uppercase tracking-tighter opacity-80">
                    {editor.org}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 italic">
                    "{editor.desc}"
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <button
                      onClick={() => router.push('/editorial-board')}
                      className="inline-flex items-center gap-2 text-[#22C55E] text-xs font-bold hover:translate-x-2 transition-transform"
                    >
                      FULL RESEARCH BIO <ArrowRight size={14} />
                    </button>

                    {editor.orcid && (
                      <a
                        href={editor.orcid}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#713F12] bg-[#FDF6ED] border border-[#EFE1C6] rounded-full px-3 py-1.5 hover:border-[#A6CE39] hover:bg-[#A6CE39]/10 hover:text-[#5C7A1E] transition-colors"
                      >
                        <OrcidIcon size={14} />
                        ORCID Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12">

        </div>
      </div>

      {/* Smooth Scroll Indicator (CSS Animation) */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        onClick={scrollToNext}
      >
        <span className="text-[10px] font-bold text-[#713F12]/40 tracking-[0.2em] uppercase mb-2 group-hover:text-[#22C55E] transition-colors">
          Read Articles
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <ChevronDown size={20} className="text-[#22C55E] -mb-3 opacity-50" strokeWidth={3} />
          <ChevronDown size={30} className="text-[#22C55E]" strokeWidth={2} />
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialLeadership;