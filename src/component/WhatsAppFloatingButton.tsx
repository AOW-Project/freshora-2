"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const whatsappNumber = "+971509259667"; // e.g. 919999999999

export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`
    fixed bottom-24 right-12 z-[1000]
    w-[60px] h-[60px] rounded-full
    flex items-center justify-center
    shadow-lg cursor-pointer bg-transparent
    transition-all duration-300 ease-out
    ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
    hover:scale-105
    group
  `}
    >
      {/* notification icon */}
      <div
        className="absolute top-1 right-0 rounded-full transform -translate-x-1/2 z-[1002]
      w-3 h-3
       bg-red-700 animate-pulse  group-hover:hidden"
      ></div>
      {/*Dialogue Box with Glow Effect */}
      <div
        className="
    absolute bottom-20 right-0 z-[1001]
    bg-[#DCF8C6] border border-[#DCF8C6]
    rounded-2xl shadow-lg
    px-4 py-2 text-[#075E54] font-medium text-sm
    whitespace-nowrap
    opacity-0 group-hover:opacity-100
    transform group-hover:translate-y-0 translate-y-3 group-hover:scale-100 scale-95
    transition-all duration-500 ease-out
    pointer-events-none
  "
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[#075E54]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-[#075E54] font-medium">Ask your questions</span>
        </div>

        {/* WhatsApp Chat Bubble Tail */}
        <div
          className="
        absolute top-full right-3  z-[1002]
      w-0 h-0
      border-l-[8px] border-l-transparent
      border-r-[8px] border-r-transparent
      border-t-[8px] border-[#DCF8C6]
    
    "
        ></div>
      </div>
      <Image
        src="/images/WhatsApp.svg.webp"
        alt="Chat on WhatsApp"
        width={60}
        height={60}
        priority
      />
    </a>
  );
}
