import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/components/Layout/ReduxProvider";
import CookieConsent from "@/components/Layout/CookieConsent";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import FloatingContact from "@/components/Layout/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://mparesearch.com"),
  title: {
    default: "MPA Research - Publish Your Manuscript",
    template: "%s | MPA Research",
  },
  description: "MPA Research is an international, peer-reviewed, open access multidisciplinary journal dedicated to publishing high-quality research. Join thousands of researchers publishing their work with MPA Research.",
  keywords: ["peer-reviewed journal", "open access", "research publication", "academic journal", "multidisciplinary research"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "MPA Research",
    title: "MPA Research - Publish Your Manuscript",
    description: "An international, peer-reviewed, open access multidisciplinary journal dedicated to publishing high-quality research.",
    url: "https://mparesearch.com",
    locale: "en_US",
    images: [
      {
        url: "/newLogo.png",
        width: 1200,
        height: 630,
        alt: "MPA Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MPA Research - Publish Your Manuscript",
    description: "An international, peer-reviewed, open access multidisciplinary journal dedicated to publishing high-quality research.",
    images: ["/newLogo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>

          <LayoutWrapper>
            {children}
          </LayoutWrapper>

          <FloatingContact />

          <ScrollToTop />

          <CookieConsent />
        </ReduxProvider>
      </body>
    </html>
  );
}