"use client"

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { MdLocationOn, MdAccessTime, MdEmail, MdPhone } from "react-icons/md"
import AnimatedParticles from "./AnimatedParticles"

export default function Footer() {
  return (
    <>
      {/* Map Section - Better responsive map */}
      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[350px] bg-gray-200 overflow-hidden">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.823998592543!2d-77.4510176846573!3d38.78872997958744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65c6c6b3b5b67%3A0x26c8b30125c405a!2s8494%20Signal%20Hill%20Rd%2C%20Manassas%2C%20VA%2020110%2C%20USA!5e0!3m2!1sen!2sin!4v1628472948212!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Map"
        ></iframe>
      </div>

      <footer className="bg-[#2d2d2d] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 text-sm">
            {/* Left Column - Better responsive company info */}
            <div className="md:col-span-2 lg:col-span-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                <span className="text-green-600">Freshora</span> <span className="text-white">Laundry</span>
              </h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                We are professionals in the laundry and dry cleaning business, which means we always stay up to date on
                the latest technologies and cleaning methods.
              </p>
              <div className="flex gap-3 sm:gap-4">
                <div className="bg-white text-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-colors">
                  <FaTwitter size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white text-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-colors">
                  <FaFacebookF size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white text-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-colors">
                  <FaLinkedinIn size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white text-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-colors">
                  <FaInstagram size={14} className="sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>

          {/* Middle Column - Contacts */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              <span className="text-green-600">Contacts</span>
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <MdLocationOn className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-sm sm:text-base">
                  Address : Shop no 4, Azizi riviera 42 , Meydan , Al Merkadh , Dubai UAE{" "}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MdAccessTime className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <div className="text-sm sm:text-base">
                  <p>Mon-Fri: 8am - 5pm</p>
                  <p>Sat-Sun: 10am - 5pm</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MdEmail className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-sm sm:text-base break-all">freshorappc@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MdPhone className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="font-bold text-sm sm:text-base">+971 50 925 9667</span>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              <span className="text-green-600">Newsletter Subscribe</span>
            </h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">Sign up and receive our special offers.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your e-mail address"
                className="w-full p-3 sm:p-4 text-black rounded bg-amber-50 text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base font-medium">
                Subscribe now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-white text-black text-sm py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
          <p className="text-center sm:text-left text-xs sm:text-sm">
            © {new Date().getFullYear()} <span className="text-green-600 font-medium">Freshora</span>Laundry. All Rights
            Reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm">
            <a href="#" className="hover:underline hover:text-green-600 transition-colors">
              Terms and Conditions
            </a>
            <a href="#" className="hover:underline hover:text-green-600 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

        {/* Floating Up Arrow - Better responsive scroll to top */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-green-500 p-2 sm:p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Scroll to top"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </footer>
    </>
  )
}
