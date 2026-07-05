"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import BecomeReviewer from "@/components/BecomeReviewer"; 

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <BecomeReviewer />}
      {!isDashboard && <Footer />}
    </>
  );
}