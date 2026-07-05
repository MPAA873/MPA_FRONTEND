import React from "react";
import {
  Target,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Eye,
  ShieldCheck,
  Scale,
  FileCheck2,
  RefreshCw,
  Globe2,
  GraduationCap,
  BadgeCheck,
  PenLine,
  ClipboardCheck,
  UserCheck,
  BookMarked,
  GitBranch,
  ArrowRight,
} from "lucide-react";

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

  const commitments = [
    { icon: <Scale size={20} className="text-white" />, label: "Fair peer review" },
    { icon: <Eye size={20} className="text-white" />, label: "Transparent editorial processes" },
    { icon: <BadgeCheck size={20} className="text-white" />, label: "High publication standards" },
    { icon: <RefreshCw size={20} className="text-white" />, label: "Continuous improvement" },
    { icon: <Globe2 size={20} className="text-white" />, label: "Global research collaboration" },
    { icon: <GraduationCap size={20} className="text-white" />, label: "Academic excellence" },
    { icon: <ShieldCheck size={20} className="text-white" />, label: "Research integrity" },
  ];

  const roles = [
    { icon: <PenLine size={22} className="text-white" />, label: "Author" },
    { icon: <ClipboardCheck size={22} className="text-white" />, label: "Reviewer" },
    { icon: <UserCheck size={22} className="text-white" />, label: "Editor" },
    { icon: <BookMarked size={22} className="text-white" />, label: "Reader" },
  ];

  const publicationProcess = [
    "Manuscript Submission",
    "Admin Assessment",
    "Plagiarism Screening",
    "Editor Assignment",
    "Suitability Check",
    "Reviewer Assignment",
    "Single-Anonymous Peer Review",
    "Review Reports",
    "Editorial Decision (Accept / Revise / Reject)",
    "Author Revision",
    "Final Decision",
    "Copyediting & Production",
    "Publication",
  ];

  return (
    <>
      {/* ============================================= */}
      {/* ORIGINAL ABOUT SECTION — UNCHANGED */}
      {/* ============================================= */}
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

        <section className="py-12 md:py-20 px-4 sm:px-6 bg-[#FFFBEB] scroll-mt-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6 md:gap-8">
            {/* Welcome Card */}
            <div className="lg:col-span-3 bg-white rounded-3xl md:rounded-[2.5rem] border border-yellow-100 p-6 sm:p-10 md:p-14 shadow-sm">
              <div className="bg-[#10B981] w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                <BookOpen className="text-white" size={26} />
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#713F12] mb-5 tracking-tight">
                Welcome to <span className="text-[#10B981]">MPA Research</span>
              </h2>
              <p className="text-[#854D0E] text-sm md:text-base leading-relaxed font-medium mb-4">
                MPA Research is an international peer-reviewed, open access
                multidisciplinary academic journal committed to advancing scholarly
                knowledge through the publication of high-quality, original research.
              </p>
              <p className="text-[#854D0E] text-sm md:text-base leading-relaxed font-medium mb-4">
                The journal provides a global platform where researchers,
                academicians, professionals, industry experts, and policymakers can
                disseminate innovative research findings that contribute to
                scientific progress, technological advancement, and societal
                development.
              </p>
              <p className="text-[#854D0E] text-sm md:text-base leading-relaxed font-medium">
                We believe that knowledge should be accessible to everyone and
                strive to foster interdisciplinary collaboration across diverse
                fields of study.
              </p>
            </div>

            {/* Vision Card */}
            <div className="lg:col-span-2 bg-[#713F12] rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="bg-[#22C55E] w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                <Eye className="text-white" size={26} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight relative z-10">
                Our Vision
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium relative z-10">
                To become a globally recognized scholarly journal known for
                excellence in research publishing, academic integrity, innovation,
                and meaningful contributions to society.
              </p>
            </div>
          </div>
        </section>

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

      {/* ============================================= */}
      {/* NEW: OUR COMMITMENT SECTION */}
      {/* ============================================= */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-[#713F12] mb-4 tracking-tight">
              Our <span className="text-[#10B981]">Commitment</span>
            </h2>
            <p className="text-[#854D0E] max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
              Every article we publish is backed by principles we hold ourselves
              to, day in and day out.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="group bg-[#FFFBEB] border border-yellow-100 rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col items-start gap-4 hover:border-[#10B981] hover:bg-white hover:shadow-lg hover:shadow-yellow-100/50 transition-all duration-300"
              >
                <div className="bg-[#10B981] w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-emerald-200">
                  {item.icon}
                </div>
                <span className="text-[#713F12] text-sm md:text-base font-bold leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ============================================= */}
      {/* PUBLICATION PROCESS */}
      {/* ============================================= */}

      <section className="py-14 md:py-20 px-4 sm:px-6 bg-[#FFFBEB]">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-5xl font-black text-[#713F12] mb-5">
              Publication <span className="text-[#10B981]">Process</span>
            </h2>

            <p className="max-w-3xl mx-auto text-[#854D0E] text-base md:text-lg leading-relaxed">
              Every manuscript follows a transparent and rigorous editorial workflow
              designed to ensure academic excellence, ethical publishing, and
              high-quality peer review.
            </p>
          </div>

          {/* Timeline */}

          <div className="relative">

            {/* Vertical Line */}

            <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#22C55E] via-[#84CC16] to-[#22C55E] rounded-full"></div>

            <div className="space-y-8">

              {publicationProcess.map((step, index) => (

                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col md:gap-12`}
                >

                  {/* Card */}

                  <div className="w-full md:w-[45%]">

                    <div className="bg-white border border-yellow-100 hover:border-[#10B981] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black text-lg shadow-lg">
                          {index + 1}
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#10B981] font-bold">
                            Step {index + 1}
                          </p>

                          <h3 className="text-lg md:text-xl font-black text-[#713F12] leading-snug">
                            {step}
                          </h3>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Center Circle */}

                  <div className="hidden md:flex relative z-20 w-12 h-12 rounded-full bg-[#10B981] border-[6px] border-[#FFFBEB] items-center justify-center shadow-xl">
                    <ArrowRight className="text-white" size={18} />
                  </div>

                  {/* Empty */}

                  <div className="hidden md:block w-[45%]"></div>

                </div>

              ))}

            </div>

          </div>

        </div>
      </section>


      {/* ============================================= */}
      {/* NEW: JOIN OUR RESEARCH COMMUNITY SECTION */}
      {/* ============================================= */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-[#FFFBEB] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#10B981] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl shadow-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 md:w-80 md:h-80 bg-white/10 rounded-full -ml-24 -mt-24 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-black/5 rounded-full -mr-16 -mb-16 blur-2xl"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                Join Our Research Community
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed font-medium">
                Whether you are an author, reviewer, editor, or reader, we invite
                you to become part of the growing MPA Research community.
                Together, we can advance knowledge, foster innovation, and
                contribute to solving global challenges through high-quality
                research.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="bg-white/15 backdrop-blur-md border border-white/20 p-5 md:p-8 rounded-2xl md:rounded-[1.75rem] flex flex-col items-center gap-3 text-center transition-transform hover:scale-[1.03]"
                >
                  <div className="bg-white/20 w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                    {role.icon}
                  </div>
                  <span className="text-white text-xs md:text-base font-black uppercase tracking-wide">
                    {role.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;