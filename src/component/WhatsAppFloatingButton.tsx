"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const whatsappNumber = "+971509259667"; // e.g. 919999999999

export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, [visible]);

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`
    fixed bottom-20 right-10 sm:bottom-24 sm:right-12 z-[1000]
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
       bg-red-700 animate-pulse group-hover:hidden"
      ></div>

      {/* Circular Text Around Icon */}
      <svg
        className="absolute inset-0 w-[140px] h-[140px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        viewBox="0 0 200 200"
      >
        <defs>
          <path
            id="circlePath"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text className="fill-[#075E54] text-[24px] font-medium">
          <textPath href="#circlePath" startOffset="0%">
            Ask your questions • Ask your questions •
          </textPath>
        </text>
      </svg>

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
