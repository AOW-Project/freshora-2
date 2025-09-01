"use client";
import React, { useEffect, useState } from "react";

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
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="28" cy="28" r="28" fill="#25D366" />
        <path
          d="M39.5 33.5c-.5-.25-2.75-1.35-3.18-1.5-.43-.15-.75-.25-1.07.25-.31.5-1.23 1.5-1.5 1.82-.28.31-.56.34-1.06.12-.5-.25-2.12-.78-4.04-2.5-1.49-1.33-2.5-2.97-2.8-3.47-.29-.5-.03-.77.22-1 .23-.23.5-.6.75-.9.25-.31.33-.53.5-.88.17-.34.08-.65-.04-.9-.12-.25-1.07-2.57-1.47-3.52-.39-.94-.8-.81-1.07-.82-.28-.01-.6-.01-.92-.01-.32 0-.84.12-1.28.59-.44.47-1.68 1.64-1.68 4.01 0 2.37 1.72 4.66 1.96 4.99.24.33 3.39 5.18 8.22 6.82 1.15.38 2.05.6 2.75.77 1.16.28 2.22.24 3.06.15.93-.1 2.75-1.12 3.14-2.2.39-1.08.39-2.01.28-2.2-.11-.19-.41-.31-.91-.56z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
