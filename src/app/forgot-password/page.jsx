"use client";

import { useState } from "react";
import { useForgotPasswordMutation } from "../../store/apiSlice.js";
import { Mail, ArrowLeft, Send, Loader2, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);
      setIsSent(true);
    } catch (err) {
      toast.error(err.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFDF5] via-white to-[#F0FDF4] flex items-center justify-center p-4">
      <Toaster position="top-center" />
      
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white w-full max-w-md transition-all">
        {!isSent ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Forgot Password?</h2>
              <p className="text-gray-500 mt-2">No worries, we'll send you reset instructions.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transform transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : (
                  <>Send Reset Link <Send size={18} /></>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Check your email</h2>
            <p className="text-gray-500 mt-3 mb-8">
              We have sent a password reset link to <br /><span className="font-semibold text-emerald-600">{email}</span>
            </p>
            <button 
              onClick={() => setIsSent(false)}
              className="text-emerald-600 font-bold hover:underline"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        )}

        <div className="mt-8 text-center border-t pt-6">
          <Link href="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors">
            <ArrowLeft size={18} /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}