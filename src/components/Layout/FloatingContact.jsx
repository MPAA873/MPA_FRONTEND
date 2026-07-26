"use client";

import React from "react";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";

const FloatingContact = () => {
  const message =
    "Hello MPA Research Team, I would like to know more about your journal, manuscript submission process, publication guidelines, and review timeline. Kindly assist me. Thank you.";

  const contactLinks = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={24} />,
      label: "Chat on WhatsApp",
      color: "bg-[#25D366]",
      link: `https://wa.me/918923580628?text=${encodeURIComponent(message)}`,
    },
    {
      id: "call",
      icon: <Phone size={22} />,
      label: "Call Now",
      color: "bg-[#007bff]",
      link: "tel:+918923580628",
    },
    {
      id: "email",
      icon: <Mail size={22} />,
      label: "Email Us",
      color: "bg-[#EA4335]",
      link: "mailto:info@mparesearch.com",
    },
  ];

  return (
    /* 
       pointer-events-none: Isse background ke clicks block nahi honge.
       z-[99999]: Sabse upar dikhega.
    */
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[99999] flex flex-col gap-2 items-end pointer-events-none">
      {contactLinks.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex items-center h-12 pointer-events-auto
            ${item.color} text-white
            rounded-l-full shadow-2xl
            transition-all duration-300 ease-in-out
            /* Default: Sirf 48px (Icon) dikhega. Hover/Touch: Expand hoga */
            w-12 hover:w-56 active:w-56
            cursor-pointer overflow-hidden
          `}
        >
          {/* Icon Section (Hamesha visible rahega) */}
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>

          {/* Label Section (Expansion ke waqt dikhega) */}
          <div className="flex items-center whitespace-nowrap opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pr-5">
            <span className="font-semibold text-[13px] md:text-sm tracking-wide ml-1">
              {item.label}
            </span>
            <ArrowRight size={14} className="ml-2 opacity-70" />
          </div>
        </a>
      ))}
    </div>
  );
};

export default FloatingContact;