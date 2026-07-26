"use client";
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
  Database,
  Link2,
  Lock,
  HardDrive,
} from "lucide-react";

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

const boardMembers = [
  {
    id: "board-1",
    name: "Dr. Pratibha Pandey",
    title: "Co-Founder & Editor-in-Chief",
    org: "MPA Research",
    image: "/images/PratibhaPanday.png",
    desc:
      "Dr. Pandey co-founded MPA Research to accelerate science through open, technologically efficient publishing. Her work spans natural product-based drug discovery and phytochemical research, including plant-derived compounds for cancer therapeutics and natural coagulants for water treatment. She has co-authored studies published in journals including Water Environment Research, Cellular and Molecular Biology, and the Brazilian Journal of Pharmaceutical Sciences. She has been awarded competitive research grants, including the Women Scientists Scheme (WOS-A) from India's Department of Science and Technology, and has held academic and research appointments.",
    orcid: "https://orcid.org/0000-0001-7029-8517",
  },
  {
    id: "board-2",
    name: "Dr. Fahad Khan",
    title: "Co-Founder & Editor-in-Chief",
    org: "Saveetha Institute of Medical and Technical Sciences, India",
    image: "/images/fahad-khan.png",
    desc:
      "Dr. Fahad Khan is associated with Saveetha Institute of Medical and Technical Sciences, India. His research focuses on natural product pharmacology and computational approaches to disease mechanisms, including anticancer compound screening and molecular studies of viral and cancer-related targets. He has co-authored work published in journals including Immuno (MDPI), Cellular and Molecular Biology, and the Brazilian Journal of Pharmaceutical Sciences.",
    orcid: "https://orcid.org/0000-0003-3449-7978",
  },
  {
    id: "board-3",
    name: "Babita Pathak",
    title: "Co-Founder & Chief Human Resource Officer",
    org: "MPA Research",
    image: "/images/babita.jpeg",
    desc:
      "Babita, as MPA Research's Chief Human Resource Officer, leads people strategy at MPA Research, overseeing talent, culture, and organizational development across the editorial, technical, and operations teams. She is responsible for building the systems and culture that let a distributed, globally-minded team — from editors and reviewers to engineering and support staff — work together effectively as the journal scales. Her approach centers on aligning people practices with the organization's academic mission — ensuring every hire, from reviewers to engineers, shares a commitment to research integrity and author experience.",
    orcid: null,
  },
];

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

        {/* ============================================= */}
        {/* NEW: MPA RESEARCH BOARD OF DIRECTORS */}
        {/* ============================================= */}
        <section className="py-12 md:py-20 px-4 sm:px-6 -mx-4 sm:-mx-6 bg-[#FDF6ED] scroll-mt-20 border-y border-yellow-100">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col items-center mb-12 md:mb-14 text-center">
              <div className="flex items-center gap-2 text-[#22C55E] bg-white px-4 py-1 rounded-full shadow-sm border border-green-100 mb-4">
                <ShieldCheck size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Board Directory
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#713F12] tracking-tight">
                MPA Research Board of Directors
              </h2>
              <p className="text-[#854D0E]/70 mt-3 max-w-2xl text-sm md:text-base">
                Meet the founders and leaders steering MPA Research's mission of
                rigorous, open, and technologically efficient scholarly publishing.
              </p>
            </div>

            {/* Members */}
            <div className="space-y-6 lg:space-y-8">
              {boardMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                    {/* Image */}
                    <div className="relative shrink-0">
                      <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden ring-4 ring-[#FDF6ED] group-hover:ring-green-100 transition-all duration-500">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-white text-[10px] px-3 py-1 rounded-lg font-bold shadow-lg whitespace-nowrap">
                        Board Member
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-1 justify-center md:justify-start">
                        <h3 className="text-xl md:text-2xl font-black text-[#333] group-hover:text-[#22C55E] transition-colors">
                          {member.name}
                        </h3>
                        <span className="hidden md:inline text-gray-300">•</span>
                        <span className="text-[#10B981] text-sm font-bold">
                          {member.title}
                        </span>
                      </div>
                      <p className="text-[#713F12] text-xs font-bold mb-4 uppercase tracking-tighter opacity-80">
                        {member.org}
                      </p>
                      <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-5">
                        {member.desc}
                      </p>

                      {member.orcid && (
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                          <a
                            href={member.orcid}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#713F12] bg-[#FDF6ED] border border-[#EFE1C6] rounded-full px-3 py-1.5 hover:border-[#A6CE39] hover:bg-[#A6CE39]/10 hover:text-[#5C7A1E] transition-colors"
                          >
                            <OrcidIcon size={14} />
                            ORCID Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24 mt-12 md:mt-16">
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
      {/* OPEN ACCESS & DIGITAL PRESERVATION */}
      {/* ============================================= */}

      <section className="py-14 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}

          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-2 bg-[#ECFDF5] border border-emerald-200 px-4 py-2 rounded-full mb-5">

              <Database size={17} className="text-[#10B981]" />

              <span className="text-[#10B981] font-bold text-sm uppercase tracking-wider">
                Open Science Infrastructure
              </span>

            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#713F12] mb-5 tracking-tight">

              Open Access &
              <span className="text-[#10B981]"> Digital Preservation</span>

            </h2>

            <p className="max-w-3xl mx-auto text-[#854D0E] text-base md:text-lg leading-relaxed">
              Every published manuscript is permanently preserved, globally discoverable,
              and assigned a persistent Digital Object Identifier (DOI) through our
              direct integration with Zenodo.
            </p>

          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">

            {/* Left Content */}

            <div className="lg:col-span-3">

              <div className="bg-[#FFFBEB] border border-yellow-100 rounded-[2rem] p-7 md:p-10 relative overflow-hidden">

                <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#10B981]/10 blur-3xl"></div>

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-2xl bg-[#10B981] flex items-center justify-center shadow-xl shadow-emerald-200 mb-8">

                    <Database size={30} className="text-white" />

                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-[#713F12] mb-6">

                    Digital Preservation &
                    <span className="text-[#10B981]"> DOI via Zenodo</span>

                  </h3>

                  <p className="text-[#854D0E] leading-8 text-sm md:text-base mb-5">

                    To guarantee long-term visibility, permanent discoverability,
                    and research integrity, MPA Research is directly integrated
                    with <span className="font-bold text-[#10B981]">Zenodo</span>,
                    a trusted open-science repository developed under the
                    European Open Science Cloud initiative and operated by CERN.

                  </p>

                  <p className="text-[#854D0E] leading-8 text-sm md:text-base">

                    Every accepted manuscript is automatically assigned a unique,
                    persistent Digital Object Identifier (DOI), ensuring instant
                    citation, worldwide accessibility, and secure preservation
                    within a globally recognized digital archive for future generations.

                  </p>

                </div>

              </div>

            </div>

            {/* Right Cards */}

            <div className="lg:col-span-2">

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5">

                {[
                  {
                    icon: <Link2 size={22} className="text-white" />,
                    title: "Persistent DOI",
                    desc: "Every publication receives a globally citable permanent DOI."
                  },
                  {
                    icon: <HardDrive size={22} className="text-white" />,
                    title: "Long-Term Archive",
                    desc: "Research is securely preserved in Zenodo's trusted repository."
                  },
                  {
                    icon: <Globe2 size={22} className="text-white" />,
                    title: "Global Visibility",
                    desc: "Accessible worldwide through open scholarly infrastructure."
                  },
                  {
                    icon: <Lock size={22} className="text-white" />,
                    title: "Permanent Access",
                    desc: "Your work remains discoverable regardless of future technology changes."
                  }
                ].map((item, index) => (

                  <div
                    key={index}
                    className="group bg-white border border-yellow-100 rounded-3xl p-6 hover:border-[#10B981] hover:shadow-xl transition-all duration-300"
                  >

                    <div className="w-12 h-12 rounded-2xl bg-[#10B981] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">

                      {item.icon}

                    </div>

                    <h4 className="text-lg font-black text-[#713F12] mb-2">

                      {item.title}

                    </h4>

                    <p className="text-sm leading-7 text-[#854D0E]">

                      {item.desc}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Bottom Banner */}

          <div className="mt-10 rounded-[2rem] bg-[#10B981] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                <ShieldCheck className="text-white" size={28} />

              </div>

              <div>

                <h4 className="text-white text-xl font-black">

                  Trusted Open Science Publishing

                </h4>

                <p className="text-white/90 text-sm md:text-base mt-1">

                  DOI registration, permanent preservation, and unrestricted Open Access —
                  ensuring your research remains visible, citable, and preserved for decades.

                </p>

              </div>

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