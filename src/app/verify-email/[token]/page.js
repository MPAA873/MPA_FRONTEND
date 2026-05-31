"use client";
import { useParams, useRouter } from "next/navigation";
import { useVerifyEmailQuery } from "@/store/apiSlice";
import { CheckCircle2, Loader2, XCircle, ShieldCheck, Mail } from "lucide-react";
import { useEffect } from "react";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token;

  const { data, error, isLoading } = useVerifyEmailQuery(token);

  useEffect(() => {
    if (data?.token) {
      // SAVE TOKEN
      localStorage.setItem("token", data.token);

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(data.user));

      // REDIRECT after a short delay for smooth experience
      const timer = setTimeout(() => {
        window.location.href = "/submit";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4 selection:bg-emerald-100">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-50/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-amber-50/50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 text-center">

          {/* Top Icon Badge */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center ring-8 ring-emerald-50/30">
              {isLoading ? (
                <Mail className="text-[#10B981] animate-pulse" size={40} />
              ) : data ? (
                <ShieldCheck className="text-[#10B981]" size={40} />
              ) : (
                <XCircle className="text-red-500" size={40} />
              )}
            </div>
          </div>

          {/* 1. Loading State */}
          {isLoading && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-[#432C0B] tracking-tight">
                  Verifying Account
                </h2>
                <p className="text-[#854D0E] font-medium opacity-80">
                  Securing your access to our scientific community...
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#10B981]" size={32} />
                <div className="w-48 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] animate-[loading_2s_ease-in-out_infinite] rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* 2. Success State */}
          {data && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-[#432C0B] tracking-tight">
                  Email Verified!
                </h2>
                <p className="text-[#854D0E] font-medium">
                  {data.message || "Welcome! Your account has been successfully activated."}
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-700 text-sm font-medium">
                Redirecting you to the submission portal...
              </div>

              <button
                onClick={() => router.push("/submit")}
                className="group relative w-full bg-[#10B981] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-[#059669] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started <CheckCircle2 size={20} />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          )}

          {/* 3. Error State */}
          {error && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-red-900 tracking-tight">
                  Verification Link Expired
                </h2>
                <p className="text-red-600/80 font-medium">
                  {error.data?.message || "This link is no longer valid or has already been used."}
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => router.push("/register")}
                  className="w-full bg-[#432C0B] text-white py-4 rounded-2xl font-bold hover:bg-[#2D1D07] transition-all shadow-lg shadow-stone-200"
                >
                  Request New Link
                </button>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-transparent text-[#713F12] py-2 font-semibold hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-sm text-[#854D0E]/60 font-medium">
          Advancing Scientific Excellence &copy; {new Date().getFullYear()}
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}