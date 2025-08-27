"use client"

import { useMemo } from "react"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { MdLocationOn, MdAccessTime, MdEmail, MdPhone } from "react-icons/md"

export default function Footer() {
  // Compute year once to avoid unnecessary recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="bg-[#2d2d2d] text-white relative overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">
          {/* Left Column - Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-green-600">Freshora</span>{" "}
              <span className="text-white">Laundry</span>
            </h2>
            <p className="mb-6 text-sm sm:text-base leading-relaxed">
              We are professionals in laundry and dry cleaning, always staying up to date on the latest
              technologies and cleaning methods.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaTwitter, label: "Twitter" },
                { Icon: FaFacebookF, label: "Facebook" },
                { Icon: FaLinkedinIn, label: "LinkedIn" },
                { Icon: FaInstagram, label: "Instagram" },
              ].map(({ Icon, label }, idx) => (
                <button
                  key={idx}
                  aria-label={label}
                  className="bg-white text-black p-2.5 rounded-full hover:bg-green-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Middle Column - Contacts */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-600">Contacts</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MdLocationOn className="text-green-500 mt-1" size={18} />
                <span>Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE</span>
              </li>
              <li className="flex items-start gap-3">
                <MdAccessTime className="text-green-500 mt-1" size={18} />
                <div>
                  <p>Mon-Fri: 8am - 5pm</p>
                  <p>Sat-Sun: 10am - 5pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MdEmail className="text-green-500 mt-1" size={18} />
                <a
                  href="mailto:freshorappc@gmail.com"
                  className="hover:underline break-all"
                >
                  freshorappc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MdPhone className="text-green-500 mt-1" size={18} />
                <a href="tel:+971509259667" className="font-bold hover:underline">
                  +971 50 925 9667
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-600">Newsletter Subscribe</h3>
            <p className="mb-6">Sign up and receive our special offers.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your e-mail address"
                className="w-full p-3 rounded bg-amber-50 text-black text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded transition-colors text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Subscribe now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-white text-black text-sm py-5 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left text-xs sm:text-sm">
            © {currentYear} <span className="text-green-600 font-medium">Freshora</span> Laundry. All Rights Reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 text-xs sm:text-sm">
            <a href="#" className="hover:underline hover:text-green-600">
              Terms and Conditions
            </a>
            <a href="#" className="hover:underline hover:text-green-600">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  )
}
