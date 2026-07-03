"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const leadEditors = [
  {
    id: "chief-1",
    name: "Dr. Pratibha Pandey",
    title: "Chief Editor",
    specialty: "PhD in Bioengineering",
    org: "Chandigarh University, Mohali, India",
    image: "/images/PratibhaPanday.png", 
    desc: "An ardent learner with PhD in Bioengineering (Biotechnology), M- Tech (Silver Medalist) Biotechnology), MBA (HR) and B-Tech (Biotechnology) actively involved in research and development in the field of Biotechnology and Bioengineering.",
  },
  {
    id: "chief-2",
    name: "Dr. Fahad Khan",
    title: "Editor In-Chief",
    specialty: "Dept. of Community Medicine",
    org: "Saveetha Institute of Medical and Technical Sciences, India",
    image: "/images/fahad-khan.png",
    desc: "Working in the Department of Community Medicine at the Saveetha Institute of Medical and Technical Sciences, India. Fahad’s research investigates the effects of natural compounds against different types of cancers.",
  },
];

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
            Editorial Leadership
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
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 italic">
                    "{editor.desc}"
                  </p>
                  
                  <button 
                    onClick={() => router.push('/editorial-board')}
                    className="inline-flex items-center gap-2 text-[#22C55E] text-xs font-bold hover:translate-x-2 transition-transform"
                  >
                    FULL RESEARCH BIO <ArrowRight size={14} />
                  </button>
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