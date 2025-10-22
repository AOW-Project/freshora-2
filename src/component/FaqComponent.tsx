"use client";

//import AnimatedParticles from "@/component/AnimatedParticles"
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const faqData = [
  {
    category: "Laundry Service ",
    questions: [
      {
        q: "Q1: How does Freshora’s laundry service work?",
        a: " We collect your clothes from your doorstep, sort them by fabric and color, wash with care, dry, fold, and deliver them back neatly packed. ",
      },
      {
        q: "Q2: Do you offer stain removal as part of the laundry service?",
        a: "Yes, our team uses safe and effective methods to remove stains while protecting fabric quality. ",
      },
      {
        q: "Q3: How long does the laundry process take?",
        a: "Standard laundry orders are usually completed within 24–48 hours, depending on the load size.",
      },
      {
        q: "Q4: Do you also offer dry cleaning for delicate clothes?",
        a: "Yes, we provide Dry Cleaning Services for fabrics that require special care like silk, wool, and designer wear. ",
      },
      {
        q: "Q5: How much does laundry service cost in Dubai? ",
        a: "Prices depend on the weight of laundry and type of clothing. We offer affordable per-kg rates — contact us for a custom quote. ",
      },
    ],
  },
  {
    category: "Dry Cleaning Service",
    questions: [
      {
        q: "Q1: What types of clothes need dry cleaning? ",
        a: " Yes, we use eco-friendly solvents and advanced techniques to protect fabric texture and color. ",
      },
      {
        q: "Q2: Is your dry cleaning safe for sensitive fabrics?",
        a: "Our dry cleaning includes cleaning, pressing, and packaging.",
      },
      {
        q: "Q3: How quickly can I get my dry-cleaned clothes back?",
        a: "Most dry-cleaning orders are ready within 24–48 hours. Express options are available. ",
      },
      {
        q: "Q4: Can I get urgent laundry done instead of dry cleaning?",
        a: "Yes, our Express Laundry Service is ideal if you need same-day or next-day delivery. ",
      },
      {
        q: "Q5: What is the price for dry cleaning in Dubai?",
        a: "Prices vary by garment type — for example, suits, gowns, and abayas have different rates. Contact us for a detailed price list. ",
      },
    ],
  },
  {
    category: "Express Laundry Service ",
    questions: [
      {
        q: "Q1: What is express laundry service? ",
        a: "It’s our urgent laundry option for customers who need clothes cleaned and returned within hours or on the same day.",
      },
      {
        q: "Q2: Is quality compromised in express service?",
        a: "Not at all. We maintain the same premium quality while speeding up the process. ",
      },
      {
        q: "Q3: When should I use express laundry? ",
        a: "If you have last-minute events, business meetings, or travel plans, express service ensures fresh clothes on time. ",
      },
      {
        q: "Q4: Do you also clean shoes and bags quickly?",
        a: "Yes, our Shoe & Bag Spa can refresh your footwear and accessories with professional care. ",
      },
      {
        q: "Q5: How much does express laundry cost in Dubai? ",
        a: ": Express services carry a small additional charge compared to regular laundry. Exact pricing depends on order size and urgency.  ",
      },
    ],
  },
  {
    category: "Shoe & Bag Spa ",
    questions: [
      {
        q: "Q1: What items can be cleaned in the Shoe & Bag Spa?",
        a: " We clean and restore all types of shoes and bags, including leather, suede, fabric, and luxury brands. ",
      },
      {
        q: "Q2: Will cleaning damage my leather shoes or handbags? ",
        a: "We handle various materials including leather, suede, canvas, and synthetic fabrics. ",
      },
      {
        q: "Q3:How long does it take to clean shoes or bags? ",
        a: "Typically 2–4 days, depending on the condition and material of the item.  ",
      },
      {
        q: "Q4: Do you also provide luxury shoe cleaning for branded footwear?",
        a: "Yes, our Luxury Shoe Cleaning Service is designed for high-end and designer shoes that need special care. ",
      },
      {
        q: "Q5: What are the charges for shoe and bag cleaning in Dubai? ",
        a: " Pricing depends on the brand, material, and condition. Standard cleaning is reasonably priced, while luxury care may cost slightly more. ",
      },
    ],
  },
  {
    category: "Luxury Shoe Cleaning Service ",
    questions: [
      {
        q: "Q1: What makes luxury shoe cleaning different? ",
        a: " We use advanced cleaning, conditioning, and restoration techniques to maintain the integrity of premium footwear.  ",
      },
      {
        q: "Q2: Do you clean all luxury brands? ",
        a: " Yes, we specialize in luxury shoes including Gucci, Prada, Louboutin, Chanel, and other designer brands. ",
      },
      {
        q: "Q3: Can you restore old or worn-out luxury shoes? ",
        a: " Yes, our service includes deep cleaning, polishing, and color restoration where possible.",
      },
      {
        q: "Q4: Do you also provide cleaning for handbags and accessories? ",
        a: " Yes, our Shoe & Bag Spa service covers both shoes and handbags for complete care.  ",
      },
      {
        q: "Q5: How much does luxury shoe cleaning cost in Dubai? ",
        a: " Pricing depends on the brand and material. High-end shoes usually start at a premium rate for specialized care.  ",
      },
    ],
  },
  {
    category: "Commercial Laundry Service  ",
    questions: [
      {
        q: "Q1: What businesses can benefit from your commercial laundry? ",
        a: " Hotels, restaurants, gyms, salons, and corporate offices trust us for consistent, professional laundry services.  ",
      },
      {
        q: "Q2: Do you handle bulk laundry orders?  ",
        a: "  Yes, we specialize in bulk orders and ensure timely pickup and delivery ",
      },
      {
        q: "Q3: How do you maintain hygiene in commercial laundry? ",

        a: " We follow strict cleaning protocols, high-temperature washing, and fabric-safe disinfectants.",
      },
      {
        q: "Q4: Do you also clean curtains for hotels and restaurants? ",
        a: "Yes, our Curtain Cleaning Service is available for both residential and commercial clients. ",
      },
      {
        q: "Q5: What are the commercial laundry charges in Dubai?  ",
        a: "  Prices are customized based on volume and service frequency. We offer affordable packages for businesses. ",
      },
    ],
  },

  {
    category: "Curtain Cleaning Service  ",
    questions: [
      {
        q: "Q1: Why is professional curtain cleaning important?  ",
        a: "  Curtains accumulate dust, dirt, and allergens, which can affect air quality. Professional cleaning keeps them fresh and vibrant.   ",
      },
      {
        q: "Q2: Can you clean all types of curtains? ",
        a: "  Yes, we handle all fabrics including cotton, silk, velvet, and blackout curtains.",
      },
      {
        q: "Q3: Do you remove and reinstall the curtains? ",

        a: " Yes, our team can take down, clean, and reinstall your curtains for total convenience. ",
      },
      {
        q: "Q4: Do you also clean carpets and rugs?  ",
        a: "Yes, our Carpet Cleaning Service ensures deep cleaning and restoration for home and office carpets.  ",
      },
      {
        q: "Q5: How much does curtain cleaning cost in Dubai?  ",
        a: "  Pricing depends on curtain size, fabric, and cleaning method. We provide competitive per-piece rates.  ",
      },
    ],
  },
  {
    category: "Carpet Cleaning Service   ",
    questions: [
      {
        q: "Q1: How often should carpets be professionally cleaned?   ",
        a: "  Ideally every 12–18 months, depending on foot traffic, pets, or spills.   ",
      },
      {
        q: "Q2: Do you remove tough stains and odors?  ",
        a: "  Yes, we use professional-grade stain removal and deodorizing treatments for long-lasting freshness.",
      },
      {
        q: "Q3: Is your carpet cleaning safe for kids and pets? ",

        a: "  Absolutely. We use eco-friendly and non-toxic cleaning solutions. ",
      },
      {
        q: "Q4: Do you also clean soft toys and plush items?  ",
        a: " Yes, our Soft Toy Cleaning Service is perfect for keeping kids’ toys clean and hygienic. ",
      },
      {
        q: "Q5: What is the cost of carpet cleaning in Dubai?   ",
        a: " Pricing depends on carpet size and condition. We offer per-square-meter rates for transparency. ",
      },
    ],
  },
  {
    category: "Soft Toy Cleaning Service    ",
    questions: [
      {
        q: "Q1: Why should soft toys be professionally cleaned?   ",
        a: "  Soft toys collect dust, bacteria, and allergens. Professional cleaning keeps them safe and hygienic for children.  ",
      },
      {
        q: " Q2: Do you guarantee that toys remain soft after cleaning? ",
        a: "   Yes, our gentle process ensures toys stay soft, cuddly, and safe. ",
      },
      {
        q: "Q3: How often should soft toys be cleaned? ",

        a: "   Every 3–6 months, depending on use and exposure to dust or spills.  ",
      },
      {
        q: "Q4: Do you also offer curtain and carpet cleaning for a healthier home?   ",
        a: "  Yes, our Curtain Cleaning and Carpet Cleaning services are ideal for a complete home refresh.  ",
      },
      {
        q: "Q5: What are the charges for soft toy cleaning in Dubai?",
        a: " Prices depend on toy size and fabric. We offer affordable rates with discounts for multiple toys.  ",
      },
    ],
  },
  {
    category: "Steam Pressing Service",
    questions: [
      {
        q: "Q1: Why should clothes be steam pressed instead of just ironed?   ",
        a: "  Steam pressing uses hot vapor to relax fabric fibers, giving clothes a smoother, longer-lasting finish without crushing the material like traditional ironing.  ",
      },
      {
        q: " Q2: Will my clothes stay crisp and fresh after steam pressing? ",
        a: "   Yes! Steam pressing restores shape, removes wrinkles, and keeps fabrics looking professionally pressed for days ",
      },
      {
        q: "Q3: How often should I get my garments steam pressed for the best results? ",

        a: "   For everyday wear, once every few washes keeps clothes fresh and wrinkle-free. For formal or office wear, steam pressing before each use is ideal.  ",
      },
      {
        q: "Q4: Do you also offer combo services with laundry and dry cleaning?   ",
        a: "  Absolutely. Freshora lets you combine laundry and steam pressing for convenience, so your clothes come back perfectly clean and pressed.  ",
      },
      {
        q: "Q5: What are the charges for steam pressing services in Dubai?",
        a: " Pricing depends on the garment type and quantity. Premium fabrics and delicate items may vary, ensuring each piece gets the care it deserves.  ",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // --- Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // --- Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/send-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", email: "", phone: "", message: "" });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500); // hide popup after 1.5s
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
        style={{
          backgroundImage: `url('/images/redesign/about-banner.png')`,
        }}
      >
        {" "}
        {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium flex flex-col justify-center items-center z-30">
          <p>
            We strive to help you achieve a welcoming,{" "}
            <span className="text-[#FFFF00]">
              effective cleaning practices, & personalized attention.
            </span>
          </p>
          <p className="text-[#FFFF00]">
            effective cleaning practices, & personalized attention.
          </p>
        </div>
      </div>
      {/* breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-6 py-5 ">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
          <Link
            href="/"
            className="hover:text-green-400 text-sm sm:text-base transition-colors"
          >
            Home
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <span className="text-green-400 text-sm sm:text-base">Contact</span>
        </nav>
      </div>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="my-10">
          <h2 className="text-3xl md:text-4xl text-primary-green font-medium  text-center ">
            Reliable Answers
            <span className="text-secondary-green">
              {" "}
              to Our Most Common Questions
            </span>
          </h2>
          <h3 className="text-xl my-3 font-medium text-gray-600 text-center">
            Frequently Asked Questions
          </h3>
        </div>

        {/* Accordion */}
        <div className="grid md:grid-cols-2 gap-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="relative">
              {/* question mark */}
              <div className="absolute left-0 top-0">
                <Image
                  src="/images/redesign/faq-question.svg"
                  alt="question mark"
                  height={100}
                  width={60}
                />
              </div>
              <h3 className="text-lg font-semibold text-primary-green pl-20">
                {category.category}
              </h3>
              <div className=" bg-[#F3F6F4] pl-14 pr-6 pb-4">
                <div className="space-y-2">
                  {category.questions.map((item, questionIndex) => {
                    const uniqueIndex = `${categoryIndex}-${questionIndex}`;
                    return (
                      <div
                        key={uniqueIndex}
                        className="border-b border-black bg-none"
                      >
                        <button
                          onClick={() => toggleAccordion(uniqueIndex)}
                          className="w-full flex justify-between items-center px-4 py-3 text-secondary-green text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium">{item.q}</span>
                          <span className="text-xl font-bold text-secondary-green ml-4 flex-shrink-0">
                            {openIndex === uniqueIndex ? "−" : "+"}
                          </span>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openIndex === uniqueIndex
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                            {item.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ask Your Question */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-medium mb-2 text-primary-green">
              Ask Your <span className="text-secondary-green">Question</span>
            </h3>
            <p className="text-gray-500">
              We look forward to helping you enjoy and maintain a clean, healthy
              environment.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4 relative"
          >
            {success && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-sm z-10 animate-fade">
                <p className="text-green-600 font-semibold text-lg">
                  ✅ Thank you for your question!
                </p>
              </div>
            )}

            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="border border-gray-400 rounded-sm p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="border border-gray-400 rounded-sm p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border border-gray-400 rounded-sm p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <textarea
              placeholder="Your question"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="border border-gray-400 rounded p-3 w-full md:col-span-2 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary-green text-white py-3 px-6 rounded-sm md:col-span-2 transition-colors font-medium disabled:opacity-50 cta-button"
            >
              {loading ? "Sending..." : "Submit Question"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
