"use client"
import { User, LogOut, LayoutDashboard, ChevronDown, Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/store/apiSlice";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { data: userData, isLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Submit", href: "/submit" },
    { name: "Editorial", href: "/editorial-board" },
    { name: "Guidelines", href: "/guidelines" },
    { name: "AI Policy", href: "/ai-policy" },
    { name: "Issue", href: "/issue" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16 md:h-20">

        {/* Logo Section - Responsive Widths */}
        <Link href="/" className="relative w-32 h-8 sm:w-40 sm:h-10 md:w-56 md:h-12 transition-transform active:scale-95">
          <Image src="/newLogo.png" alt="MPA Research Logo" fill className="object-contain" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <div className="flex items-center gap-4 xl:gap-6 border-r border-gray-100 pr-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[#854D0E] hover:text-[#22C55E] transition-all duration-300 text-[14px] xl:text-[15px] font-bold whitespace-nowrap">
                {link.name}
              </Link>
            ))}
          </div>

          <Link href="/menuscript-search" className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <Search className="text-[#854D0E]" size={20} />
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-4 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-[#22C55E] text-white p-1.5 rounded-full shadow-sm">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-bold text-gray-700 max-w-[120px] truncate">
                    {isLoading ? "..." : userData?.user?.name || userData?.name || "User"}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                    <Link href="/dashboard/my-profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                      <LayoutDashboard size={18} className="text-[#22C55E]" /> Dashboard
                    </Link>
                    <div className="h-px bg-gray-100 mx-2" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#854D0E] text-white hover:bg-[#A16207] hover:shadow-lg transition-all text-sm font-bold">
                <User size={18} /> Login
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Buttons */}
        <div className="lg:hidden flex items-center gap-2">
           <Link href="/menuscript-search" className="p-2 text-[#854D0E] hover:bg-gray-100 rounded-full transition-all">
            <Search size={22} />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-[#854D0E] hover:bg-gray-100 rounded-xl transition-all"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[110] transition-all duration-500 lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Sidebar Menu */}
        <div className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-[320px] bg-white z-[120] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-out lg:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Sidebar Top Header */}
          <div className="p-5 flex justify-between items-center border-b border-gray-50">
             <div className="relative w-32 h-8">
               <Image src="/newLogo.png" alt="Logo" fill className="object-contain" />
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100">
               <X size={20} />
             </button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* User Account Section */}
            <div className="p-6">
              {isLoggedIn ? (
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#22C55E] text-white p-2.5 rounded-xl shadow-lg shadow-green-100">
                      <User size={22} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Signed in as</span>
                      <span className="text-sm font-black text-gray-800 truncate">
                        {isLoading ? "Loading..." : userData?.user?.name || userData?.name || "User"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">Sign in to access your dashboard and submit articles.</p>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#854D0E] text-white text-sm font-black shadow-lg shadow-yellow-100 active:scale-95 transition-all"
                  >
                    <User size={18} /> Login to Account
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar">
              <span className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Main Menu</span>
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3.5 text-[15px] font-bold text-gray-700 hover:text-[#22C55E] hover:bg-gray-50 rounded-xl transition-all flex items-center justify-between group"
                  >
                    {link.name}
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#22C55E] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            {isLoggedIn && (
              <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex flex-col gap-3">
                <Link
                  href="/dashboard/my-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#22C55E] text-white font-black shadow-lg shadow-green-100 active:scale-95 transition-all"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white text-red-600 font-black border border-red-100 shadow-sm active:scale-95 transition-all"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;