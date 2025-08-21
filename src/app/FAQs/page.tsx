"use client"

import { Poppins } from "next/font/google"
import Link from "next/link"
import { useState } from "react"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const faqData = [
  {
    category: "Your First Order",
    questions: [
      {
        q: "What should I prepare for the first pickup?",
        a: "We aim to collect your clothes, clean them to a professional standard, and get them back to you within 48 hours.",
      },
      {
        q: "Can I add extra items to my order when you collect?",
        a: "Yes, just let us know when we arrive.",
      },
      {
        q: "Can I order by phone or email?",
        a: "Yes, you can place your order by phone or email.",
      },
      {
        q: "Where are my clothes cleaned?",
        a: "We clean your clothes to a professional standard in our own facility.",
      },
      {
        q: "Why do women's blouses cost more than men's shirts?",
        a: "Women's blouses may require different handling and pressing compared to men's shirts.",
      },
      {
        q: "Are there any fabrics you don't clean?",
        a: "We clean most fabrics, but delicate items may require special care.",
      },
      {
        q: "Are my clothes ever handled by other clients?",
        a: "No, your clothes are handled separately from others.",
      },
      {
        q: "How can I pay for the services?",
        a: "We accept all major payment methods.",
      },
    ],
  },
  {
    category: "Dry Cleaning",
    questions: [
      {
        q: "What if my clothes are damaged?",
        a: "We take utmost care, but if damage occurs, we'll contact you immediately.",
      },
      {
        q: "What is included in your service?",
        a: "Our dry cleaning includes cleaning, pressing, and packaging.",
      },
      {
        q: "Do you provide the cleaning supplies?",
        a: "Yes, we provide all necessary supplies.",
      },
    ],
  },
  {
    category: "Wash, Tumble Dry & Fold",
    questions: [
      {
        q: "Do I need to weigh my Wash, Tumble Dry & Fold bags?",
        a: "No, we weigh and record your laundry upon collection.",
      },
      {
        q: "What temperature do you wash the clothes at?",
        a: "We wash clothes at the recommended temperature for each fabric.",
      },
      {
        q: "Do I get to keep the bag?",
        a: "Yes, you keep the bag.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <> 
    <div>
      {/* Header Section */}
      <div
        className="relative h-64 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Laundry+Machines+Background')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-white mb-4">
            <Link href="/" className="hover:text-green-400">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-green-400">FAQs</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-white">FAQs</h1>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <p className={`text-green-600 font-medium mb-2 text-center ${poppins.className}`}>
            [ Frequently Asked Questions ]
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">Reliable Answers to Our Most Common Questions</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-2">
            We can answer as many as we can, save you time, water, heating and electricity.
          </p>
        </div>

        {/* Accordion */}
        <div className="grid md:grid-cols-2 gap-8">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category}>
              <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
              <div className="space-y-2">
                {category.questions.map((item, questionIndex) => {
                  const uniqueIndex = `${categoryIndex}-${questionIndex}`
                  return (
                    <div key={uniqueIndex} className="border rounded-md bg-white shadow-sm">
                      <button
                        onClick={() => toggleAccordion(uniqueIndex)}
                        className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium">{item.q}</span>
                        <span className="text-xl font-bold text-green-600 ml-4 flex-shrink-0">
                          {openIndex === uniqueIndex ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === uniqueIndex ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">{item.a}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ask Your Question */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Ask Your Question</h3>
            <p className="text-gray-500">
              We look forward to helping you enjoy and maintain a clean, healthy environment.
            </p>
          </div>
          <form className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <textarea
              placeholder="Your question"
              rows={4}
              className="border border-gray-300 rounded-md p-3 w-full md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md md:col-span-2 transition-colors font-medium"
            >
              Submit Question
            </button>
          </form>
        </div>
      </section>
    </div></>
   
  )
}
