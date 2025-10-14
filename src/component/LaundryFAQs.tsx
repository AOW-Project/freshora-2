"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does a professional laundry service work?",
    answer:
      "Most laundry services offer an easy process — you schedule a pickup, they collect your clothes, wash and press them using professional-grade equipment, and then deliver them back fresh and neatly folded. Everything can be managed online or through a mobile app for convenience.",
  },
  {
    question: "Is professional laundry service expensive?",
    answer:
      "Not necessarily. While prices vary depending on fabric type and service level, the time, water, and electricity you save often make it cost-effective. Many services also offer affordable packages and discounts for regular customers.",
  },
  {
    question: "Are my clothes safe with a laundry service?",
    answer:
      "Yes. Professional laundries use fabric-specific detergents, correct washing temperatures, and gentle drying methods to protect your clothes. Items are also tagged and tracked to ensure nothing gets misplaced.",
  },
  {
    question: "What types of clothing can be sent for laundry?",
    answer:
      "You can send almost any type of clothing — from everyday wear like shirts and trousers to delicate fabrics such as silk or wool. Some services also handle household items like bedsheets, curtains, and blankets.",
  },
  {
    question: "Do laundry services use eco-friendly products?",
    answer:
      "Many modern laundry providers prioritize sustainability by using biodegradable detergents, energy-efficient machines, and water-recycling systems to minimize environmental impact.",
  },
  {
    question: "How long does it take to get my clothes back?",
    answer:
      "Turnaround time typically ranges between 24 to 48 hours, depending on the service and your location. Some offer express or same-day delivery for urgent needs.",
  },
  {
    question: "Can I schedule recurring pickups?",
    answer:
      "Absolutely. Most services allow you to set recurring weekly or biweekly pickups, so your laundry routine stays effortless and consistent without having to book every time.",
  },
];

export default function LaundryFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full mx-auto py-10">
      <div className="">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 transition-all ">
            <button
              className="flex w-full justify-between items-center py-4 pr-4 text-left cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-gray-800 font-medium">
                Q. {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`px-5 pb-4 text-gray-600 transition-all duration-300 ${
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
