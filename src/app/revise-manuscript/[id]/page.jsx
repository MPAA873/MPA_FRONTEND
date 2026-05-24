"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload, FileCheck, X, CheckCircle, AlertCircle, Info, Loader2, Download } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useGetManuscriptByIdQuery, useSubmitRevisionMutation } from "@/store/apiSlice";
import { useEffect } from "react";

const ReviseManuscript = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
    }

    setReady(true);
  }, []);

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data: fetchRes, isLoading: isFetching } = useGetManuscriptByIdQuery(id, {
    skip: !ready,
  });
  const [submitRevision, { isLoading: isSubmitting }] = useSubmitRevisionMutation();

  const manuscript = fetchRes?.manuscript;

  // Logic to check if we are in the Final Proofreading stage
  const isProofing = manuscript?.status === "Final Script Sent";

  const [files, setFiles] = useState({
    manuscriptFile: null,
    coverLetter: null,
    figures: null,
    tables: null,
    ethicalDeclaration: null,
    aiReport: null,
    reviewChecklist: null,
  });

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [fileType]: file }));
    toast.success("File attached for upload!");
  };

  const removeFile = (fileType) => {
    setFiles((prev) => ({ ...prev, [fileType]: null }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!files.manuscriptFile) {
      toast.error("Manuscript file is required");
      return;
    }

    if (!files.reviewChecklist) {
      toast.error("Review checklist file is required");
      return;
    }
    const submissionToast = toast.loading(isProofing ? "Submitting final script..." : "Submitting your revisions...");

    try {
      const data = new FormData();
      if (files.manuscriptFile) data.append("manuscriptFile", files.manuscriptFile);
      if (files.coverLetter) data.append("coverLetter", files.coverLetter);
      if (files.figures) data.append("figures", files.figures);
      if (files.tables) data.append("tables", files.tables);
      if (files.ethicalDeclaration) data.append("ethicalDeclaration", files.ethicalDeclaration);
      if (files.aiReport) data.append("aiReport", files.aiReport);
      if (files.reviewChecklist) data.append("reviewChecklist", files.reviewChecklist);

      await submitRevision({ id, data }).unwrap();

      toast.success(isProofing ? "Final Script Approved Successfully!" : "Revisions Submitted Successfully!", { id: submissionToast });
      setTimeout(() => router.push("/#submit"), 2000);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit.", { id: submissionToast });
    }
  };

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#10B981] w-12 h-12" /></div>;
  }

  return (
    <div className="bg-[#FFFBEB]/40 min-h-screen py-12 px-4 md:px-8 font-sans">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#713F12] mb-6">
          {isProofing ? "Final Script " : "Revise Your "}<span className="text-[#10B981]">{isProofing ? "Proofreading" : "Manuscript"}</span>
        </h1>

        {/* Dynamic Feedback Section: Blue for Proofing, Orange for Revision */}
        <div className={`${isProofing ? 'bg-blue-50 border-blue-500' : 'bg-orange-50 border-orange-500'} border-l-4 p-6 rounded-r-2xl mb-8 shadow-sm`}>
          <h3 className={`${isProofing ? 'text-blue-800' : 'text-orange-800'} font-bold text-lg flex items-center gap-2 mb-2`}>
            {isProofing ? <><FileCheck size={20} /> Final Proof Review Required</> : <><AlertCircle /> Editorial Feedback (Please Fix the following)</>}
          </h3>
          <p className={`${isProofing ? 'text-blue-700' : 'text-orange-700'} whitespace-pre-wrap leading-relaxed text-sm`}>
            {isProofing
              ? "The editor has prepared your final manuscript in the journal template. Please download the file below, review it for any errors, and re-upload the final confirmed version here."
              : (manuscript?.revisionFeedback || "No specific feedback provided by admin.")}
          </p>

          {/* Action Button for Proofreading stage */}
          {isProofing && manuscript?.feedbackFile && (
            <div className="mt-4">
              <a
                href={manuscript.feedbackFile}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md"
              >
                <Download size={18} /> Download Templated Manuscript
              </a>
            </div>
          )}
        </div>

        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-emerald-50">
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-xl flex items-start gap-3 text-sm">
            <Info className="flex-shrink-0 mt-0.5" size={18} />
            <p>
              {isProofing
                ? "Please upload the final templated manuscript here. If you have corrections, edit the file and upload. If everything is correct, re-upload the same file to confirm."
                : "Your text data (Title, Abstract, etc.) is safe. You only need to upload the specific files that the editor requested to be changed."}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: "manuscriptFile", label: "Manuscript", sub: "PDF, DOCX", exist: manuscript?.files?.manuscriptFile },
                { id: "reviewChecklist", label: "Review Feedback Checklist", sub: "PDF, DOCX", exist: manuscript?.files?.reviewChecklist },
                { id: "coverLetter", label: "Cover Letter", sub: "PDF, DOCX", exist: manuscript?.files?.coverLetter },
                {
                  id: "figures",
                  label: "Figures",
                  sub: "Images/ZIP",
                  exist: manuscript?.files?.figures?.length > 0
                },
                { id: "tables", label: "Tables", sub: "Excel/Word", exist: manuscript?.files?.tables },
                { id: "ethicalDeclaration", label: "Ethical Dec.", sub: "PDF", exist: manuscript?.files?.ethicalDeclaration },
                { id: "aiReport", label: "AI Report", sub: "PDF", exist: manuscript?.files?.aiReport },
              ].map((item) => (
                <div key={item.id} className={`relative border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center ${files[item.id] ? "border-[#10B981] bg-emerald-50" : "border-emerald-200 bg-emerald-50/20 hover:border-[#10B981]"}`}>
                  {!files[item.id] ? (
                    <>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, item.id)} />
                      <div className="bg-white p-3 rounded-full shadow-sm mb-3"><Upload size={20} className="text-[#10B981]" /></div>
                      <p className="text-[#713F12] text-sm font-semibold">Upload {isProofing ? "Final" : "New"} {item.label}</p>
                      {item.exist && <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mt-2">File already exists</span>}
                    </>
                  ) : (
                    <div className="flex flex-col items-center w-full z-20">
                      <FileCheck className="text-[#10B981] mb-2" size={24} />
                      <p className="text-[#713F12] text-xs font-medium truncate w-full px-2">{files[item.id].name}</p>
                      <button type="button" onClick={() => removeFile(item.id)} className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1">
                        <X size={12} /> Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button type="submit" disabled={isSubmitting} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg ${isSubmitting ? "bg-emerald-300 cursor-not-allowed text-white" : "bg-[#10B981] text-white hover:bg-[#059669]"}`}>
              {isSubmitting ? (
                <><Loader2 className="animate-spin" /> {isProofing ? "Submitting Final Approval..." : "Submitting Revisions..."}</>
              ) : (
                <><CheckCircle size={20} /> {isProofing ? "Confirm & Submit Final Script" : "Submit Revisions"}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviseManuscript;