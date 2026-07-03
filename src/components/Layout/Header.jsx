"use client"
import { User, LogOut, LayoutDashboard, ChevronDown, Menu, X, Search, Mail } from "lucide-react";
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

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <div className="w-full relative z-[100]">

      {/* 1. TOP UTILITY BAR - Optimized for small screens */}
      <div className="w-full bg-[#854D0E] text-white">
        <div className="max-w-7xl mx-auto px-4 h-9 sm:h-11 flex items-center justify-between gap-2 overflow-hidden">
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/submit"
              className="bg-white text-[#854D0E] text-[10px] sm:text-[12px] font-black px-3 py-1 rounded-full whitespace-nowrap"
            >
              Submit Now
            </Link>
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <a
              href="mailto:info@mparesearch.com"
              className="flex items-center gap-1.5 text-[10px] sm:text-[12px] font-bold text-white whitespace-nowrap"
            >
              <Mail size={13} className="flex-shrink-0" />
              <span className="hidden xs:inline">info@mparesearch.com</span>
              <span className="xs:hidden">Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - Sticky */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 shadow-sm z-[110]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16 md:h-20">

          {/* Logo - Fixed width on mobile to prevent squashing */}
          <Link href="/" className="relative w-28 h-7 sm:w-40 sm:h-10 md:w-56 md:h-12 flex-shrink-0">
            <Image src="/newLogo.png" alt="MPA Research Logo" fill className="object-contain" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <div className="flex items-center gap-4 xl:gap-6 border-r pr-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-[#854D0E] hover:text-[#22C55E] text-[14px] xl:text-[15px] font-bold whitespace-nowrap transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>

            <Link href="/menuscript-search" className="p-2 text-[#854D0E] hover:bg-gray-50 rounded-full">
              <Search size={20} />
            </Link>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-4 rounded-full border bg-gray-50 hover:bg-white transition-all"
                >
                  <div className="bg-[#22C55E] text-white p-1.5 rounded-full"><User size={16} /></div>
                  <span className="text-sm font-bold text-gray-700 max-w-[100px] truncate">
                    {isLoading ? "..." : userData?.user?.name || userData?.name || "User"}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                    <Link href="/dashboard/my-profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard size={18} className="text-[#22C55E]" /> Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-6 py-2.5 rounded-full bg-[#854D0E] text-white text-sm font-bold">
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Buttons - Fixed Spacing */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2">
            <Link href="/menuscript-search" className="p-2 text-[#854D0E] hover:bg-gray-50 rounded-full transition-all">
              <Search size={22} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#854D0E] hover:bg-gray-50 rounded-xl transition-all"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* 3. MOBILE SIDEBAR SYSTEM - Outside header content but inside header for sticky context */}
        <div 
          className={`fixed inset-0 z-[9999] lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <div 
            className={`absolute top-0 right-0 h-full w-[85%] max-w-[300px] bg-white shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-50 flex-shrink-0">
               <div className="relative w-28 h-7">
                 <Image src="/newLogo.png" alt="Logo" fill className="object-contain" />
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 text-gray-500 rounded-full">
                 <X size={20} />
               </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {/* User Section */}
              <div className="p-4">
                {isLoggedIn ? (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#22C55E] text-white p-2 rounded-lg shadow-sm">
                        <User size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Account</span>
                        <span className="text-sm font-black text-gray-800 truncate">
                          {isLoading ? "Loading..." : userData?.user?.name || userData?.name || "User"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#854D0E] text-white text-sm font-bold shadow-lg shadow-yellow-100/50"
                  >
                    <User size={18} /> Login to Account
                  </Link>
                )}
              </div>

              {/* Navigation */}
              <div className="px-2 pb-6">
                <span className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Main Menu</span>
                <div className="flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-[15px] font-bold text-gray-700 hover:text-[#22C55E] hover:bg-gray-50 rounded-lg transition-all flex items-center justify-between group"
                    >
                      {link.name}
                      <ChevronDown size={14} className="-rotate-90 text-gray-300 group-hover:text-[#22C55E]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions - Always visible if logged in */}
            {isLoggedIn && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/dashboard/my-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-[#22C55E] text-white font-bold shadow-md shadow-green-100"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-white text-red-600 font-bold border border-red-100 shadow-sm"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;