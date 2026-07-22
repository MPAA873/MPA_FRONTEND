"use client";
import React, { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Layers,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Search,
  UserPlus,
  Settings,
  FileSearch,
  Edit3,
  CheckSquare,
  Globe,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

// 1. Visual Card for Manuscript Anatomy
const AnatomyBlock = ({ title, desc, color = "bg-emerald-50" }) => (
  <div className={`${color} border-l-4 border-emerald-500 p-4 rounded-r-lg mb-2 transition-transform hover:translate-x-2 cursor-default`}>
    <h4 className="font-bold text-[#78350f] text-sm uppercase tracking-wider">{title}</h4>
    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{desc}</p>
  </div>
);

// 2. Section Header
const SectionHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="bg-emerald-500 p-3 rounded-xl text-white shadow-lg shadow-emerald-200">
      <Icon size={28} />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-[#78350f]">{title}</h2>
      <p className="text-emerald-700 font-medium">{subtitle}</p>
    </div>
  </div>
);

// 3. Info Item for the list
const InfoItem = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-emerald-50/50">
    <span className="font-semibold text-gray-700">{label}</span>
    <span className="text-emerald-600 font-medium">{value}</span>
  </div>
);

// 4. Workflow Step Component
const WorkflowStep = ({ number, title, icon: Icon, isLast }) => (
  <div className="flex items-start gap-4 relative">
    <div className="flex flex-col items-center">
      <div className="bg-emerald-600 text-white p-2.5 rounded-full z-10 shadow-md">
        <Icon size={18} />
      </div>
      {!isLast && <div className="w-0.5 h-full bg-emerald-100 absolute top-10 left-[19px]"></div>}
    </div>
    <div className="pb-8">
      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Step {number}</span>
      <h4 className="font-bold text-[#78350f] text-sm leading-tight">{title}</h4>
    </div>
  </div>
);

/* =========================================
   Main Component
========================================= */
const AuthorGuidelines = () => {
  const [activeTab, setActiveTab] = useState("structure");
  const router = useRouter();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/guidelines.docx";
    link.download = "Manuscript-Template.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const workflowSteps = [
    { title: "Manuscript Submission", icon: FileText },
    { title: "Admin Assessment", icon: Settings },
    { title: "Plagiarism Screening", icon: Search },
    { title: "Editor Assignment", icon: UserPlus },
    { title: "Suitability Check", icon: CheckCircle2 },
    { title: "Reviewer Assignment", icon: Users },
    { title: "Single-Anonymous Peer Review", icon: ShieldCheck },
    { title: "Review Reports", icon: FileSearch },
    { title: "Editorial Decision (Accept/Revise/Reject)", icon: MessageSquare },
    { title: "Author Revision", icon: Edit3 },
    { title: "Final Decision", icon: CheckSquare },
    { title: "Copyediting & Production", icon: Layers },
    { title: "Publication", icon: Globe },
  ];

  return (
    <div className="bg-[#fdfcfb] min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className=" py-20 px-6 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Info size={16} /> FOR AUTHORS & RESEARCHERS
          </div>
          <h1 className="text-5xl md:text-5xl font-extrabold text-[#78350f] mb-6 tracking-tight">
            Submission <span className="text-[#22C55E]">Guidelines</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ensure your research meets our high standards of excellence. Follow this comprehensive guide to prepare your manuscript for peer review and publication.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-3 bg-[#22C55E] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-200 "
            >
              <Download size={20} /> Download Word Template
            </button>
            <button onClick={() => router.push("/submit")} className="flex items-center gap-3 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-2xl font-bold transition-all">
              Online Submission System <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- QUICK STATS / OVERVIEW --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-emerald-50 flex items-center gap-5">
            <div className="bg-amber-100 p-4 rounded-xl text-amber-700"><Layers size={32} /></div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Format</p>
              <p className="text-xl font-bold text-[#78350f]">APA / Numerical</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-emerald-50 flex items-center gap-5">
            <div className="bg-emerald-100 p-4 rounded-xl text-emerald-700"><Users size={32} /></div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Review Type</p>
              <p className="text-xl font-bold text-[#78350f]">Single anonymized review process</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-emerald-50 flex items-center gap-5">
            <div className="bg-blue-100 p-4 rounded-xl text-blue-700"><CheckCircle2 size={32} /></div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Decision Time</p>
              <p className="text-xl font-bold text-[#78350f]">21 - 30 Days Avg.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* --- LEFT SIDE: MANUSCRIPT ANATOMY VISUAL --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-emerald-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                <h3 className="text-2xl font-bold text-[#78350f] mb-6 flex items-center gap-2">
                  <FileText className="text-emerald-500" /> Manuscript Anatomy
                </h3>

                <div className="space-y-3 relative z-10">
                  <AnatomyBlock title="Header" desc="Paper Type, Vol/Issue, Title, Author Details" color="bg-emerald-50/80" />
                  <AnatomyBlock title="Abstract" desc="Single paragraph summary (~200 words)" />
                  <AnatomyBlock title="Introduction" desc="Background, Aims, Literature Review" color="bg-emerald-50/50" />
                  <AnatomyBlock title="Materials & Methods" desc="Reproducibility, Experimental Design" />
                  <AnatomyBlock title="Results & Discussion" desc="Findings, Tables, Figures, Analysis" color="bg-emerald-50/50" />
                  <AnatomyBlock title="Conclusion" desc="Summary, Implications, Future Work" />
                  <AnatomyBlock title="Back Matter" desc="Author Contrib, Ethics, Funding, Refs" color="bg-[#fffbeb]" />
                </div>

                <div className="mt-8 p-4 bg-[#fdfcfb] rounded-xl border border-dashed border-emerald-300">
                  <p className="text-xs text-gray-500 italic leading-relaxed text-center">
                    "Ensure your document is double-spaced, 12pt Times New Roman with 2.54cm margins."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: DETAILED GUIDELINES --- */}
          <div className="lg:col-span-8">

            {/* TABS NAVIGATION */}
            <div className="flex flex-wrap gap-4 mb-10 border-b border-gray-200 pb-2">
              {['structure', 'formatting', 'review process', 'ethics', 'compliance'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 font-bold text-sm uppercase tracking-widest transition-all
                    ${activeTab === tab ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400 hover:text-emerald-500'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: STRUCTURE */}
            {activeTab === 'structure' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <SectionHeader title="1. Core Sections" subtitle="Detailed breakdown of content requirements" icon={Layers} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
                      <h4 className="font-bold text-[#78350f] mb-3">Introduction</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Establish background, highlight importance, and clearly outline the research aim. Reference significant studies using numerical sequence (e.g., [1], [2-4]).
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
                      <h4 className="font-bold text-[#78350f] mb-3">Materials & Methods</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Provide enough detail for reproducibility. Include data availability, ethical approvals, and standard methods with references.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#22C55E] text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10"><MessageSquare size={120} /></div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <ImageIcon className="text-white" /> Results & Discussion
                    </h4>
                    <p className="text-emerald-50 mb-4 leading-relaxed">
                      Present findings clearly. The Discussion should analyze and interpret results in relation to existing research rather than just restating them.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Compare with literature</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Acknowledge limitations</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Suggest future work</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Broader implications</li>
                    </ul>
                  </div>

                  <div className="bg-[#fffbeb] p-8 rounded-3xl border border-amber-200">
                    <h4 className="text-xl font-bold text-[#78350f] mb-4">Conclusion</h4>
                    <p className="text-gray-700 leading-relaxed mb-4 italic">
                      "A required section briefly summarizing main findings and outlining possible future directions."
                    </p>
                  </div>
                </section>
              </div>
            )}

            {/* TAB CONTENT: FORMATTING */}
            {activeTab === 'formatting' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <SectionHeader title="2. Formatting & Media" subtitle="Visual and technical specifications" icon={ImageIcon} />

                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-50 mb-8">
                    <h4 className="text-lg font-bold text-[#78350f] mb-6 border-b pb-2">Quick Reference Guide</h4>
                    <div className="space-y-1">
                      <InfoItem label="Word Limit" value="5,000 – 8,000 words" />
                      <InfoItem label="Keywords" value="3 – 10 relevant terms" />
                      <InfoItem label="Font" value="12pt Times New Roman" />
                      <InfoItem label="Spacing" value="Double-spaced throughout" />
                      <InfoItem label="Margins" value="2.54cm (All sides)" />
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-emerald-200 p-8 rounded-3xl bg-white">
                    <h4 className="font-bold text-[#78350f] mb-4">Figures & Tables Standards</h4>
                    <p className="text-gray-600 text-sm mb-6">
                      All visuals must be referenced in consecutive order (Figure 1, Table 1). Position them as close as possible to the initial citation.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 bg-gray-50 border border-gray-200 aspect-video rounded-xl flex items-center justify-center relative">
                        <span className="text-gray-400 text-xs font-mono uppercase tracking-tighter">[ Figure Placeholder ]</span>
                        <div className="absolute bottom-2 w-full text-center text-[10px] text-gray-500 px-4">
                          Figure 1. Example caption centered on a single line.
                        </div>
                      </div>
                      <div className="flex-1 text-sm text-gray-600 leading-relaxed">
                        <p className="font-bold text-emerald-700 mb-2 underline decoration-emerald-200 decoration-2">Supplementary Materials:</p>
                        Data too detailed for main text should be included as Supp. Materials with an "S" prefix (e.g., Figure S1, Table S1).
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* TAB CONTENT: REVIEW PROCESS (NEW SECTION) */}
            {activeTab === 'review process' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <SectionHeader title="Editorial Workflow" subtitle="The journey from submission to publication" icon={Users} />
                  
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-50 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                      {workflowSteps.map((step, index) => (
                        <WorkflowStep 
                          key={index} 
                          number={index + 1} 
                          title={step.title} 
                          icon={step.icon} 
                          isLast={index === workflowSteps.length - 1} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                    <h4 className="text-xl font-bold text-[#78350f] mb-4 flex items-center gap-2">
                      <ShieldCheck className="text-emerald-600" /> Peer Review Description
                    </h4>
                    <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                      <p>
                        Our journal utilizes a <strong>Single-Anonymous Peer Review</strong> model. In this system, the reviewers' identities are kept hidden from the authors, while the reviewers are aware of the authors' identities and affiliations. 
                      </p>
                      <p>
                        This approach allows reviewers to provide honest, critical, and constructive feedback without the pressure of personal influence, ensuring that every published manuscript meets the highest standards of scientific rigor and academic integrity.
                      </p>
                      <div className="bg-white p-4 rounded-xl border border-emerald-200 flex items-center gap-4">
                        <div className="h-10 w-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shrink-0">
                          <CheckCircle2 size={20} />
                        </div>
                        <p className="text-xs italic text-gray-500">
                          "Each manuscript is typically evaluated by at least two independent subject matter experts before an editorial decision is reached."
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* TAB CONTENT: ETHICS */}
            {activeTab === 'ethics' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <SectionHeader title="3. Publication Ethics" subtitle="Commitment to integrity and transparency" icon={ShieldCheck} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white border border-emerald-100 rounded-2xl">
                      <h4 className="font-bold text-emerald-800 mb-3 uppercase text-xs tracking-widest">Authors' Responsibility</h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Ensure work is 100% original.</li>
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Not under consideration elsewhere.</li>
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Properly acknowledge all sources.</li>
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Disclose all conflicts of interest.</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-white border border-emerald-100 rounded-2xl">
                      <h4 className="font-bold text-emerald-800 mb-3 uppercase text-xs tracking-widest">Editors' Promise</h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Fair evaluation without discrimination.</li>
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Decisions based solely on scientific quality.</li>
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Full confidentiality protection.</li>
                        <li className="flex gap-2"><ChevronRight size={16} className="text-emerald-500 shrink-0" /> Managed conflict procedures.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                      Malpractice Disclaimer
                    </h4>
                    <p className="text-xs text-red-700 leading-relaxed">
                      The publisher disclaims any responsibility for the accuracy or reliability of content. Neither the publisher nor editors assume legal liability for errors, omissions, or consequences from the use of information in this publication.
                    </p>
                  </div>
                </section>
              </div>
            )}

            {/* TAB CONTENT: COMPLIANCE */}
            {activeTab === 'compliance' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <SectionHeader title="4. Final Compliance" subtitle="Mandatory statements & declarations" icon={HelpCircle} />

                  <div className="space-y-4">
                    {[
                      { title: "Ethics Statement", desc: "Provide approval details, committee name, and code (or state N/A)." },
                      { title: "Informed Consent", desc: "State whether consent was obtained, waived, or not applicable." },
                      { title: "Data Availability", desc: "Include repository names, DOIs, or 'Data available on request' statement." },
                      { title: "Funding", desc: "Declare all financial support or state 'No external funding received'." },
                      { title: "Acknowledgments", desc: "Non-author contributions (technical help, resources) with consent." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 transition-colors">
                        <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg font-bold text-xs">{idx + 1}</div>
                        <div>
                          <h5 className="font-bold text-[#78350f]">{item.title}</h5>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="bg-[#22C55E] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Submit Your Manuscript?</h2>
          <p className="text-emerald-50 mb-10 text-lg opacity-90">
            Ensure you have checked the document against our checklist before uploading.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => router.push("/submit")}
              className="bg-white text-emerald-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl">
              Proceed to Submission
            </button>
            <button onClick={() => router.push("/contact")} className="bg-emerald-600 text-white border border-emerald-500/50 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-all">
              Contact Editorial Office
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorGuidelines;