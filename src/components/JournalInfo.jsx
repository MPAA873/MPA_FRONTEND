"use client";
import React from 'react';
import {
  CheckCircle2,
  Globe,
  Zap,
  ShieldCheck,
  Layers,
  Users,
  BookOpen,
  BarChart3,
  FileText,
  Microscope,
  Cpu,
  HeartPulse,
  Leaf,
  Briefcase,
  Stethoscope,
  Dna,
  FlaskConical,
  Pill,
  Laptop,
  Database,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const JournalInfo = () => {
  const whyPublish = [
    { title: "Single-Blind Review", desc: "Rigorous and unbiased peer review process.", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Maximum Visibility", desc: "Open access publication for global reach.", icon: <Globe className="w-6 h-6" /> },
    { title: "Rapid Processing", desc: "Fast-track review without compromising quality.", icon: <Zap className="w-6 h-6" /> },
    { title: "Professional Support", desc: "Dedicated editorial assistance at every step.", icon: <Users className="w-6 h-6" /> },
    { title: "High Standards", desc: "Transparent editorial and ethical policies.", icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: "Permanent Access", desc: "Lifelong online availability of your research.", icon: <Layers className="w-6 h-6" /> },
  ];

  const disciplines = [
    {
      name: "Healthcare and Medical Sciences",
      icon: <Stethoscope size={18} />,
    },
    {
      name: "Life Sciences",
      icon: <Dna size={18} />,
    },
    {
      name: "Biotechnology",
      icon: <FlaskConical size={18} />,
    },
    {
      name: "Pharmaceuticals",
      icon: <Pill size={18} />,
    },
    {
      name: "Computer Science and Artificial Intelligence",
      icon: <Cpu size={18} />,
    },
    {
      name: "Information Technology",
      icon: <Laptop size={18} />,
    },
    {
      name: "Data Science",
      icon: <Database size={18} />,
    },
    {
      name: "Management and Business",
      icon: <Briefcase size={18} />,
    },
  ];

  const router = useRouter();

  return (
    <div className="bg-[#fdfaf3] font-sans text-[#4A3728]">
      {/* Section: Why Publish */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#5c3a1a]">
            Why Publish with <span className="text-[#10b981]">MPA Research?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We provide authors with a high-impact, professional publishing experience tailored to the modern researcher.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyPublish.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="w-12 h-12 bg-[#fdfaf3] text-[#10b981] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#10b981] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#5c3a1a]">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Scope & Ethics */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Journal Scope */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-[#5c3a1a]">
              <Microscope className="text-[#10b981]" /> Journal Scope
            </h2>
            <p className="mb-8 text-gray-600 leading-relaxed">
              MPA Research welcomes original research and interdisciplinary studies addressing real-world challenges across various disciplines.
            </p>
            <div className="flex flex-wrap gap-3">
              {disciplines.map((item, index) => (
                <span key={index} className="flex items-center gap-2 px-4 py-2 bg-[#fdfaf3] border border-[#e8dfd3] rounded-full text-sm font-medium hover:border-[#10b981] hover:text-[#10b981] transition-all cursor-default">
                  {item.icon} {item.name}
                </span>
              ))}
            </div>
          </div>

          {/* Ethics & Open Access */}
          <div className="space-y-8">
            <div className="bg-[#fdfaf3] p-8 rounded-3xl border border-[#e8dfd3]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[#5c3a1a]">
                <ShieldCheck className="text-[#10b981]" /> Publication Ethics
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['No Plagiarism', 'Data Integrity', 'Proper Citation', 'Conflict Disclosure'].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 size={16} className="text-[#10b981]" /> {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#5c3a1a] text-white p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <BookOpen className="text-[#10b981]" /> Open Access Policy
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Unrestricted access to knowledge accelerates innovation. All articles are freely accessible worldwide immediately upon publication.
              </p>
              <div className="flex items-center gap-4 text-[#10b981] font-semibold">
                <span>Free to Read</span>
                <span>•</span>
                <span>Free to Download</span>
                <span>•</span>
                <span>Free to Cite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-[#5c3a1a] to-[#3a2511] rounded-[2rem] p-10 md:p-16 text-white relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-[#10b981] opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to publish your research?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join our global research community and maximize the impact of your scholarly work. Submissions are accepted throughout the year.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => {
                router.push("/submit")
              }} className="bg-[#10b981] hover:bg-[#059669] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105">
                Submit Your Manuscript
              </button>
              <button onClick={() => {
                router.push("/guidelines")
              }} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all">
                Author Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Research Impact Footer Note */}
      <div className="max-w-7xl mx-auto px-4 pb-16 text-center border-t border-gray-100 pt-16">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Evidence-Based</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Peer-Reviewed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Global Reach</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Open Innovation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalInfo;