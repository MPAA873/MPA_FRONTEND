"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useResetPasswordMutation } from "../../../store/apiSlice.js";
import { Lock, ShieldCheck, Timer, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ResetPassword() {
  const params = useParams();
  const router = useRouter();
  const token = params.token;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      const res = await resetPassword({ token, password }).unwrap();
      toast.success(res.message || "Password reset successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-white to-[#f0fdf4] flex items-center justify-center p-4">
      <Toaster position="top-center" />
      
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-emerald-100 w-full max-w-md relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">New Password</h2>
          <p className="text-gray-500 mt-2">Set a strong password for your account</p>
        </div>

        {/* Timer UI */}
        <div className={`flex items-center justify-center gap-2 mb-6 py-2 px-4 rounded-full mx-auto w-fit ${timeLeft < 60 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
          <Timer size={18} className={timeLeft < 60 ? "animate-pulse" : ""} />
          <span className="font-mono font-bold text-sm">
            Link expires in: {formatTime(timeLeft)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            disabled={isLoading || timeLeft === 0}
            className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transform transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Reset Password"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors">
            <ArrowLeft size={18} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}