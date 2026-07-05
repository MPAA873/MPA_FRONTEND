import React from "react";
import { Award, Star, Users, BookOpenCheck, Mail, ArrowRight } from "lucide-react";

const BecomeReviewer = () => {
  const benefits = [
    {
      icon: <Award className="text-white" size={22} />,
      title: "Reviewer Certificate",
    },
    {
      icon: <Star className="text-white" size={22} />,
      title: "Editorial Recognition",
    },
    {
      icon: <Users className="text-white" size={22} />,
      title: "Professional Networking",
    },
    {
      icon: <BookOpenCheck className="text-white" size={22} />,
      title: "Academic Contribution",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg-white scroll-mt-20" id="become-reviewer">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#713F12] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl shadow-yellow-100/40 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-[#22C55E]/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-72 md:h-72 bg-white/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-yellow-300 text-[11px] md:text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Users size={14} />
                Reviewer Program
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">
                Become a Reviewer
              </h2>
              <p className="text-white/85 text-base md:text-lg leading-relaxed font-medium mb-8">
                Join our international reviewer community and contribute to
                maintaining the quality and integrity of scholarly publishing.
              </p>

              <a
                href="mailto:info@mparesearch.com"
                className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-sm md:text-base px-6 py-3.5 md:px-8 md:py-4 rounded-2xl shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:gap-3"
              >
                <Mail size={18} />
                Apply as Reviewer
                <ArrowRight size={16} />
              </a>
              <p className="text-white/60 text-xs md:text-sm font-medium mt-4">
                Share your profile at{" "}
                <a
                  href="mailto:info@mparesearch.com"
                  className="text-yellow-300 hover:text-yellow-200 font-bold underline underline-offset-2"
                >
                  info@mparesearch.com
                </a>
              </p>
            </div>

            {/* Right Benefits Grid */}
            <div>
              <p className="text-white/70 text-[11px] md:text-xs font-black uppercase tracking-widest mb-4">
                Benefits Include
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white/10 backdrop-blur-md border border-white/15 p-5 md:p-7 rounded-2xl md:rounded-3xl flex flex-col items-start gap-4 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="bg-[#10B981] w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <span className="text-white text-sm md:text-base font-bold leading-snug">
                      {benefit.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeReviewer;