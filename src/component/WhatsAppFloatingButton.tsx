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
      title="Need Help? Chat on WhatsApp"
      className={`
        fixed bottom-24 right-12 z-[1000]
        w-[60px] h-[60px] rounded-full
        flex items-center justify-center
        shadow-lg cursor-pointer bg-transparent
        transition-all duration-300 ease-out
        ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        hover:scale-105
      `}
    >
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
