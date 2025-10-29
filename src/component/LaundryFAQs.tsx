"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface LaundryFAQsProps {
  faqs?: FAQItem[];
}

export default function LaundryFAQs({ faqs }: LaundryFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full mx-auto py-10">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">FAQs</h2>
        {faqs?.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 transition-all">
            <button
              className="flex w-full justify-between items-center py-4 pr-4 text-left cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-gray-800 font-medium">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={` pb-4 text-gray-600 transition-all duration-300 ${
                openIndex === index
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
