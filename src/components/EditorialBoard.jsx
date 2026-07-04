"use client";
import React from "react";
import { useGetEditorialsQuery } from "../store/apiSlice";
import { Mail, ExternalLink, ShieldCheck, BadgeCheck } from "lucide-react";

const ORCID_BY_NAME = [
  { match: "pratibha", url: "https://orcid.org/0000-0001-7029-8517" },
  { match: "fahad", url: "https://orcid.org/0000-0003-3449-7978" },
];

const resolveOrcid = (person) => {
  if (person?.orcid) return person.orcid;
  const name = (person?.name || "").toLowerCase();
  const found = ORCID_BY_NAME.find((entry) => name.includes(entry.match));
  return found?.url || null;
};


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

const EditorialBoard = () => {
  // 1. Fetch data using RTK Query
  const { data: response, isLoading, isError } = useGetEditorialsQuery();

  // Extract the array of data from the API response
  const editorials = response?.data || [];

  // 2. Separate Top Leaders and Regular Editors based on the type
  // Fallback: If 'type' is somehow missing but 'bio' exists, we consider them Top Leaders
  const executiveEditors = editorials
    .filter((item) => item.type === "topLeader" || (!item.type && item.bio))
    .sort((a, b) => {
      const order = {
        "Chief Editor": 1,
        "Editor In-Chief": 2,
      };

      return (order[a.role] || 99) - (order[b.role] || 99);
    });

  // Filter regular editors who have type === "editor"
  const editorialBoard = editorials.filter((item) => item.type === "editor");

  // Helper function to extract initials if they are not provided by the backend
  const getInitials = (name, initials) => {
    if (initials) return initials;
    if (!name) return "ED";
    // Remove titles like Dr. or Prof. before getting initials
    const cleanName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "");
    const parts = cleanName.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return cleanName.substring(0, 2).toUpperCase();
  };

  // Show a loading screen while the API fetches data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-[#10B981]/20 border-t-[#10B981] rounded-full animate-spin" />
          <p className="text-lg text-[#7A3E00] font-bold text-center">
            Loading Editorial Board...
          </p>
        </div>
      </div>
    );
  }

  // Show an error message if the API call fails
  if (isError) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center px-4">
        <p className="text-xl text-red-500 font-bold text-center">
          Failed to load Editorial Board data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] pb-16 scroll-mt-24" id="editorial-board">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <div className="flex items-center gap-2 text-[#10B981] bg-white px-4 py-1.5 rounded-full shadow-sm border border-emerald-100 mb-5">
            <ShieldCheck size={15} />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Board Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#7A3E00] tracking-tight leading-tight">
            Editorial Board
          </h2>
          <div className="mt-3 h-[3px] w-16 rounded-full bg-[#10B981]" />
          <p className="mt-5 text-[#A75C1C] max-w-2xl text-base md:text-lg leading-relaxed px-2">
            Our distinguished team of leading researchers ensures rigorous peer review and scientific excellence.
          </p>
        </div>

        {/* ✅ Chief Editor & Editor In-Chief Section (Top Leaders Layout) */}
        {executiveEditors.length > 0 && (
          <div className="space-y-8 md:space-y-10 mb-16 md:mb-24">
            {executiveEditors.map((leader) => {
              const orcidUrl = resolveOrcid(leader);

              return (
                <div
                  key={leader._id}
                  className="group bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-transparent hover:border-[#10B981]/40 hover:shadow-[0_20px_45px_rgba(16,185,129,0.1)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Profile Image Section */}
                  <div className="md:w-1/3 lg:w-1/4 bg-gradient-to-br from-[#FFF9F2] to-emerald-50/40 flex items-center justify-center p-8 sm:p-10 border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-full md:h-80 overflow-hidden rounded-2xl shadow-inner border-4 border-white">
                      <img
                        src={leader.image || "https://via.placeholder.com/400x500?text=No+Image"}
                        alt={leader.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Profile+Image" }}
                      />
                      {orcidUrl && (
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-full p-1 shadow-md">
                          <OrcidIcon size={20} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio Content Section */}
                  <div className="md:w-2/3 lg:w-3/4 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider">
                        <BadgeCheck size={14} />
                        {leader.role}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#7A3E00] leading-tight">
                        {leader.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6 text-justify">
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

                      {orcidUrl && (
                        <a
                          href={orcidUrl}
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
              );
            })}
          </div>
        )}

        {/* ✅ Grid Section for Regular Editors */}
        {editorialBoard.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {editorialBoard.map((member) => {
              const memberOrcid = resolveOrcid(member);

              return (
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
                        <span className="font-semibold text-[#8B4513]">Institution:</span><br />
                        {member.institution || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#8B4513]">Interests:</span><br />
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

                      {memberOrcid && (
                        <a
                          href={memberOrcid}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white border-2 border-[#A6CE39]/40 hover:border-[#A6CE39] hover:bg-[#A6CE39]/10 text-[#5C7A1E] text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <OrcidIcon size={15} />
                          ORCID
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default EditorialBoard;