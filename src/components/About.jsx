import React from "react";
import { Target, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Target className="text-white" size={24} />,
      title: "Our Scope",
      description:
        "Multidisciplinary research spanning natural sciences, engineering, social sciences, and humanities.",
    },
    {
      icon: <Users className="text-white" size={24} />,
      title: "Expert Review",
      description:
        "Rigorous peer review by leading academics ensuring the highest quality standards.",
    },
    {
      icon: <Award className="text-white" size={24} />,
      title: "Open Access",
      description:
        "Free, immediate access to all published research promoting global knowledge sharing.",
    },
    {
      icon: <TrendingUp className="text-white" size={24} />,
      title: "Impact",
      description:
        "High visibility and citation rates through indexing in major academic databases.",
    },
  ];

  const stats = [
    { label: "Disciplines", value: "Cross - Disciplinary Journals" },
    { label: "Avg. Review Time", value: "14-21 days" },
  ];

  return (
    <section 
      className="py-12 md:py-24 px-4 sm:px-6 bg-white max-w-7xl mx-auto scroll-mt-20 overflow-hidden" 
      id="about"
    >
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-black text-[#713F12] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-6 tracking-tight">
          About <span className="text-[#10B981]">MPA Research</span>
        </h2>
        <p className="text-[#854D0E] max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-2 font-medium">
          Committed to advancing knowledge through rigorous peer-reviewed
          research, fostering collaboration, and promoting scientific excellence
          worldwide.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-[#FFFBEB] p-6 md:p-8 rounded-3xl border border-yellow-100 hover:border-[#10B981] hover:bg-white hover:shadow-xl hover:shadow-yellow-100/50 transition-all duration-300"
          >
            <div className="bg-[#10B981] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-200">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-[#713F12] mb-3">
              {feature.title}
            </h3>
            <p className="text-[#854D0E] text-sm leading-relaxed opacity-90">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mission Banner Section */}
      <div className="bg-[#22C55E] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl shadow-emerald-100 relative overflow-hidden">
        {/* Decorative Elements for Mobile/Desktop */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-80 md:h-80 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-black/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className="text-white text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Our Mission</h2>
            <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed font-medium">
              To provide a premier platform for researchers worldwide to share
              innovative findings, foster scientific dialogue, and contribute to
              the advancement of human knowledge across all disciplines.
            </p>
            <ul className="space-y-4">
              {[
                "Promote scientific excellence",
                "Ensure ethical publishing standards",
                "Foster global collaboration",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm md:text-base font-bold">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/15 backdrop-blur-md border border-white/20 p-5 md:p-10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center md:items-start text-center md:text-left transition-transform hover:scale-[1.02]"
              >
                <div className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-white/80 text-[10px] md:text-xs font-black uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;