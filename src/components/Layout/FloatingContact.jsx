"use client";

import React from "react";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";

const FloatingContact = () => {
  const message =
    "Hello MPA Research Team, I would like to know more about your journal, manuscript submission process, publication guidelines, and review timeline. Kindly assist me. Thank you.";

  const contactLinks = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={24} className="text-white" />,
      label: "Chat on WhatsApp",
      color: "bg-[#25D366]",
      link: `https://wa.me/918923580628?text=${encodeURIComponent(message)}`,
    },
    {
      id: "call",
      icon: <Phone size={22} className="text-white" />,
      label: "Call Now",
      color: "bg-[#007bff]",
      link: "tel:+918923580628",
    },
    {
      id: "email",
      icon: <Mail size={22} className="text-white" />,
      label: "Email Us",
      color: "bg-[#EA4335]",
      link: "mailto:info@mparesearch.com",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[99999] flex flex-col gap-1 items-end">
      {contactLinks.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
  group flex items-center h-12 min-w-[48px]
  ${item.color} text-white
  rounded-l-lg shadow-lg
  transition-all duration-300 ease-in-out
  md:translate-x-[calc(100%-48px)]
  md:hover:translate-x-0
  cursor-pointer
`}
        >
          {/* Icon Section (Always Visible) */}
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>

          {/* Label Section (Visible on Hover) */}
          <span className="whitespace-nowrap px-4 font-medium text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.label}
          </span>

          {/* Subtle Right Arrow on Hover */}
          <ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-70" />
        </a>
      ))}
    </div>
  );
};

export default FloatingContact;