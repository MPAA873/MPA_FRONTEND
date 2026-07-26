"use client";
import React from "react";
import { Mail, ExternalLink, BadgeCheck } from "lucide-react";

const EDITORIALS_DATA = [
  // Top leaders — Pratibha Pandey first, Fahad Khan second
  {
    _id: "69a68af9edc06008ef503fb3",
    type: "topLeader",
    name: "Dr. Pratibha Pandey",
    role: "Co-Editor In-Chief",
    image:
      "https://res.cloudinary.com/dpy0cqcff/image/upload/v1772522232/editorials/lmre2v95s6kiuskkcuf8.png",
    bio: "Assistant Professor (Research Cadre) at the Chandigarh University, Mohali, India. An ardent learner with PhD in Bioengineering (Biotechnology), M- Tech (Silver Medalist) Biotechnology), MBA (HR) and B-Tech (Biotechnology) actively involved in research and development in the field of Biotechnology and Bioengineering. Her scholarly work has been supported by competitive research grants from the Department of Science and Technology, Government of India and CRIP Programme of TEQIP III from AKTU, Lucknow. Her Research Area of Specialization includes Cancer Biology (Biomarkers and signalosomes in Gall bladder Cancer, Prostate cancer, Lung Cancer and Cervical cancer), Water Remediation, Chemoprevention using Natural Products via In silico and In vitro techniques. She has published more than 110 research articles in her last eight years of research career. She is responsible for editorial policy oversight, strategic development, and ensuring the integrity and quality of the peer-review process. She has served on the editorial boards of several reputable journals and has been actively involved in international scientific committees and conference organizations.",
    email: "pratibha.pandey@mparesearch.com",
    linkedin: "",
    isActive: true,
    initials: "",
    institution: "",
    interests: "",
    profileLink: "",
    orcid: "https://orcid.org/0000-0001-7029-8517",
  },
  {
    _id: "69a68b26edc06008ef503fb7",
    type: "topLeader",
    name: "Dr. Fahad Khan",
    role: "Co-Editor In-Chief",
    image:
      "https://res.cloudinary.com/dpy0cqcff/image/upload/v1772522277/editorials/vnyapfpmy5jtykdkymkk.png",
    bio: "Working in the Department of Community Medicine at the Saveetha Institute of Medical and Technical Sciences, India. Fahad's research investigates the effects of natural compounds against different types of cancers. His main focus is the cell signaling pathways by which the natural compounds could induce apoptosis in cancer cells and thus inhibits cancer metastasis and angiogenesis in in vitro models. He also has keen interest in computational biology based therapeutic approaches for disease prevention and exploration of underlying mechanism. Fahad's research findings have received extensive coverage in the national and international journal. He has published more than 100 research article in his last ten years of research career. His work has been funded by Dr. APJ Abdul Kalam Technical University, Lucknow, India. He currently serves as Associate Editor of Frontiers in Oncology journal, overseeing the peer review process and strategic development of the journal. His professional service includes editorial board memberships, conference organization, and reviewing for major international journals.",
    email: "fahad.khan@mparesearch.com",
    linkedin: "",
    isActive: true,
    initials: "",
    institution: "",
    interests: "",
    profileLink: "",
    orcid: "https://orcid.org/0000-0003-3449-7978",
  },

  // Regular editorial board members
  {
    _id: "69a68d655ffccdb5305738ab",
    type: "editor",
    name: "Prof. Mohd Saeed",
    role: "Editor 1",
    image: null,
    email: "exmaple@gmail.com",
    linkedin: "#",
    isActive: true,
    bio: "",
    institution:
      "Department of Chemistry, College of Sciences, University of Hail, Saudi Arabia.",
    interests:
      "Cancer therapeutics, Drug discovery, Natural product research, Nanotechnology.",
    initials: "MS",
    profileLink: "https://sciprofiles.com/profile/326562",
  },
  {
    _id: "69a68df55ffccdb5305738af",
    type: "editor",
    name: "Prof. Deena Elsori",
    role: "Editor 2",
    image: null,
    email: "example@gmail.com",
    linkedin: "",
    isActive: true,
    bio: "",
    institution: "Foundation and General Education, Rabdan Academy, Abu Dhabi, UAE",
    interests: "Women health, Chronic disease, Mental health, Cancer biology, Education",
    initials: "DE",
    profileLink: "https://ra.ac.ae/en/dean-team/bio/dr-deena-elsori",
  },
  {
    _id: "69a697465ffccdb5305738b4",
    type: "editor",
    name: "Dr. Daniel Ejim Uti",
    role: "Editor 3",
    image: null,
    email: "example@gmail.com",
    linkedin: "",
    isActive: true,
    bio: "",
    institution:
      "Dept. of Biochemistry, Faculty of Basic Medical Sciences, College of Medicine, Federal University of Health Sciences, Otukpo, Benue State Nigeria",
    interests: "Hematological indices, In silico drug designing, Oxidative stress, Nanotechnology",
    initials: "DU",
    profileLink: "https://orcid.org/0000-0002-1129-1785",
  },
  {
    _id: "69a699d45ffccdb5305738c4",
    type: "editor",
    name: "Dr Arif Hussain",
    role: "Editor 4",
    image: null,
    email: "email@gmail.com",
    linkedin: "",
    isActive: true,
    bio: "",
    institution:
      "Chairperson of the School of Life Sciences, Manipal Academy of Higher Education-MAHE, Dubai",
    interests: "Molecular Biology, Human Genetics, Toxicology, Cancer biology, Pharmacology",
    initials: "",
    profileLink: "https://scholar.google.co.in/citations?user=JXVVsZkAAAAJ&hl=en",
  },
  {
    _id: "69a69aa05ffccdb5305738d0",
    type: "editor",
    name: "Prof (Dr) A B Sharangi",
    role: "Editor 5",
    image: null,
    email: "example@gmail.com",
    linkedin: "",
    isActive: true,
    bio: "",
    institution:
      "Professor and Former Dean-Faculty of Horticulture, Bidhan Chandra Krishi Viswavidyalaya (Agricultural Univ)",
    interests:
      "Ph.D (BCKV), Post-doc (Melbourne), Fulbright Faculty (LSU, USA), Horticulture Specialist",
    initials: "AS",
    profileLink: "https://www.researchgate.net/profile/Amit-Sharangi",
  },
];

// Split once, at module scope, since the data never changes at runtime.
const EXECUTIVE_EDITORS = EDITORIALS_DATA.filter((item) => item.type === "topLeader");
const EDITORIAL_BOARD = EDITORIALS_DATA.filter((item) => item.type === "editor");

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

// Helper: derive initials when not explicitly provided.
const getInitials = (name, initials) => {
  if (initials) return initials;
  if (!name) return "ED";
  const cleanName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "");
  const parts = cleanName.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName.substring(0, 2).toUpperCase();
};

const EditorialBoard = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pb-16 scroll-mt-24" id="editorial-board">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3">
            <BadgeCheck size={12} />
            Meet Our Team
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#7A3E00] tracking-tight leading-tight">
            Editorial Board
          </h2>
          <div className="mt-2.5 h-[3px] w-14 rounded-full bg-[#10B981]" />
          <p className="mt-3 text-[#A75C1C] max-w-2xl text-sm sm:text-base leading-relaxed px-2">
            Our distinguished team of leading researchers ensures rigorous peer review and scientific excellence.
          </p>
        </div>

        {/* Chief Editor & Editor In-Chief Section (Top Leaders Layout) */}
        {EXECUTIVE_EDITORS.length > 0 && (
          <div className="space-y-6 md:space-y-8 mb-10 md:mb-16">
            {EXECUTIVE_EDITORS.map((leader) => (
              <div
                key={leader._id}
                className="group bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-transparent hover:border-[#10B981]/40 hover:shadow-[0_20px_45px_rgba(16,185,129,0.1)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Profile Image Section */}
                <div className="md:w-1/3 lg:w-1/4 bg-gradient-to-br from-[#FFF9F2] to-emerald-50/40 flex items-center justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-full md:h-72 overflow-hidden rounded-2xl shadow-inner border-4 border-white">
                    <img
                      src={leader.image || "https://via.placeholder.com/400x500?text=No+Image"}
                      alt={leader.name}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x500?text=Profile+Image";
                      }}
                    />
                    {leader.orcid && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-full p-1 shadow-md">
                        <OrcidIcon size={20} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio Content Section */}
                <div className="md:w-2/3 lg:w-3/4 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold mb-2.5 uppercase tracking-wider">
                      <BadgeCheck size={14} />
                      {leader.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#7A3E00] leading-tight">
                      {leader.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-5 text-justify line-clamp-6 md:line-clamp-none">
                    {leader.bio}
                  </p>

                  {/* Buttons & Links */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Mail size={18} /> Contact
                    </a>

                    {leader.orcid && (
                      <a
                        href={leader.orcid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white border-2 border-[#A6CE39]/40 hover:border-[#A6CE39] text-[#5C7A1E] hover:bg-[#A6CE39]/10 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      >
                        <OrcidIcon size={18} />
                        ORCID Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Section for Regular Editors */}
        {EDITORIAL_BOARD.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {EDITORIAL_BOARD.map((member) => (
              <div
                key={member._id}
                className="bg-[#FFFDF9] rounded-2xl shadow-md border border-transparent hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Green Header Card with Initials */}
                <div className="bg-gradient-to-r from-[#10B981] to-[#059669] h-20 relative flex justify-center items-end">
                  <div className="translate-y-1/2 w-16 h-16 bg-[#4ade80] rounded-full flex items-center justify-center border-4 border-[#FFFDF9] shadow-sm">
                    <span className="text-white text-xl font-bold">
                      {getInitials(member.name, member.initials)}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 pt-10 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-[#7A3E00] mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-[#10B981] font-bold text-xs text-center mb-4 uppercase tracking-tighter">
                    {member.role}
                  </p>

                  <div className="space-y-3 mb-6 text-sm text-gray-600 flex-1">
                    <p>
                      <span className="font-semibold text-[#8B4513]">Institution:</span>
                      <br />
                      {member.institution || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-[#8B4513]">Interests:</span>
                      <br />
                      {member.interests || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 mt-auto">
                    {/* View Profile Link */}
                    <a
                      href={member.profileLink && member.profileLink !== "#" ? member.profileLink : "#"}
                      target={member.profileLink && member.profileLink !== "#" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-transparent"
                    >
                      <ExternalLink size={16} />
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EditorialBoard;