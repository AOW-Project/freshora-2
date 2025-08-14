"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  FaPhoneAlt,
  FaShoppingCart,
  FaChevronDown,
  FaChevronRight,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa"
import PickupForm from "./SchedulePickupModal"
import { useCart } from "../app/context/cart-context"

interface NavItem {
  title: string
  href: string
  subItems?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    // subItems: [
    //   { title: "Our Story", href: "/about/story" },
    //   { title: "Team", href: "/about/team" },
    // ],
  },
  {
    title: "Services",
    href: "/services",
    subItems: [
      { title: "Laundry", href: "/services/laundry-services" },
      { title: "Dry Cleaning", href: "/services/dry-cleaning-services" },
      { title: "Express Laundry Services", href: "/services/express-laundry-services" },
      { title: "Bag & Shoe Spa", href: "/services/shoe-bag-spa" },
      { title: "Luxury Shoe Cleaning Service", href: "/services/luxury-shoe-cleaning" },
      { title: "Commercial Laundry Service", href: "/services/commercial-laundry-service" },
      { title: "Carpet Cleaning Service", href: "/services/curtain-cleaning-service" },
      { title: "Curtain Cleaning Service", href: "/services/carpet-cleaning-service" },
      { title: "Soft Toy Cleaning Service", href: "/services/soft-toy-cleaning-service" },
    ],
  },
  {
    title: "Blog",
    href: "/Blogs",
    // subItems: [
    //   { title: "Latest News", href: "/blog/latest" },
    //   { title: "Tips & Tricks", href: "/blog/tips" },
    // ],
  },
  { title: "Prices", href: "/prices" },
  { title: "FAQ", href: "/FAQs" },
  { title: "Contacts", href: "/contact" },
]

const Navbar = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [expandedMobileItem, setExpandedMobileItem] = useState<number | null>(null)
  const { getTotalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileOpen && !(event.target as Element).closest(".mobile-sidebar")) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileOpen])
  let closeTimeout: NodeJS.Timeout | null = null;

  return (
    <>
      <header
        className={`w-full bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        {/* Top Info Bar - Hidden when scrolled on desktop */}
        <div
          className={`bg-gray-100 text-xs sm:text-sm text-gray-700 hidden lg:block ${scrolled ? "hidden lg:hidden" : "block"}`}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 py-2 px-4 sm:px-6">
            <div className="text-xs sm:text-sm">8494 Signal Hill Road Manassas, VA, 20110</div>
            <div className="hidden lg:flex gap-4 text-xs">
              <span>Mon-Fri 08:00 AM - 05:00 PM</span>
              <span>info@yourcompany.com</span>
            </div>
            <div className="flex gap-2 sm:gap-3 items-center text-xs sm:text-sm">
              <span className="flex items-center gap-1">
                <FaPhoneAlt className="text-green-500" />
                <span className="hidden sm:inline">+971 50 925 9667</span>
                <span className="sm:hidden">Call</span>
              </span>
              <div className="flex gap-2">
                <FaTwitter className="cursor-pointer hover:text-green-500 transition-colors" />
                <FaFacebookF className="cursor-pointer hover:text-green-500 transition-colors" />
                <FaLinkedinIn className="cursor-pointer hover:text-green-500 transition-colors" />
                <FaInstagram className="cursor-pointer hover:text-green-500 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
        >
          {/* Logo */}
          <div
            className={`font-bold transition-all duration-300 ${scrolled ? "text-lg sm:text-xl" : "text-lg sm:text-xl lg:text-2xl"}`}
          >
            <span className="text-green-600">Pro</span>
            <span className="text-black">Laundry</span>
          </div>

          {/* Desktop Nav */}
         <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-medium text-gray-700 relative">
  {navItems.map((item, index) => (
    <div
      key={index}
      className="relative group"
      onMouseEnter={() => {
        if (closeTimeout) clearTimeout(closeTimeout);
        setOpenIndex(index);
      }}
      onMouseLeave={() => {
        closeTimeout = setTimeout(() => {
          setOpenIndex(null);
        }, 200); // 200ms delay
      }}
    >
      <Link href={item.href} className="flex items-center hover:text-green-600 transition-colors py-2">
        {item.title}
        {item.subItems && <FaChevronDown className="ml-1 text-xs" />}
      </Link>
      {item.subItems && openIndex === index && (
        <div
          className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-1 w-56 z-50 border border-gray-100"
          onMouseEnter={() => {
            if (closeTimeout) clearTimeout(closeTimeout);
          }}
          onMouseLeave={() => {
            closeTimeout = setTimeout(() => {
              setOpenIndex(null);
            }, 200);
          }}
        >
          {item.subItems.map((sub, subIndex) => (
            <Link
              key={subIndex}
              href={sub.href}
              className="block px-4 py-3 text-sm hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              {sub.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  ))}
</nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile Phone Number - Show only on mobile */}
            <div className="lg:hidden flex items-center text-sm text-gray-600">
              <FaPhoneAlt className="text-green-500 mr-1" size={12} />
              <span>+971 50 925 9667</span>
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative hover:text-green-600 transition-colors p-2">
              <FaShoppingCart size={18} className="sm:w-5 sm:h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Schedule Pickup Button */}
            <button
              onClick={() => setShowForm(true)}
              className="hidden md:block bg-green-600 hover:bg-green-700 text-white font-semibold px-3 lg:px-4 py-2 rounded text-sm lg:text-base transition-colors"
            >
              <span className="hidden lg:inline">Schedule a Pickup</span>
              <span className="lg:hidden">Schedule</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-white/20 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`mobile-sidebar fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-300 ease-in-out overflow-y-auto ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="text-xl font-bold">
                <span className="text-green-600">Pro</span>
                <span className="text-black">Laundry</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FaTimes size={16} />
                <span className="ml-2 text-sm">Close</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-4">
              {navItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex-1 block px-4 py-3 font-medium text-gray-700 hover:text-green-600 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.subItems && (
                      <button
                        onClick={() => setExpandedMobileItem(expandedMobileItem === index ? null : index)}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <FaChevronRight
                          className={`text-gray-400 transition-transform duration-300 ease-in-out ${
                            expandedMobileItem === index ? "rotate-90" : ""
                          }`}
                          size={12}
                        />
                      </button>
                    )}
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      item.subItems && expandedMobileItem === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.subItems && (
                      <div className="bg-gray-50 border-t border-gray-100">
                        {item.subItems.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sub.href}
                            className="block py-3 px-8 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="px-4 py-6 bg-gray-50 border-t border-gray-200">
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" size={14} />
                  <span>8494 Signal Hill Road Manassas, VA, 20110</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-green-500 flex-shrink-0" size={14} />
                  <span>Mon-Fri 08:00 AM - 05:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-green-500 flex-shrink-0" size={14} />
                  <span>info@yourlaundrysite.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-green-500 flex-shrink-0" size={14} />
                  <span>1 (800) 765-43-21</span>
                </div>
              </div>
            </div>

            {/* Schedule Pickup Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowForm(true)
                  setMobileOpen(false)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded transition-colors"
              >
                Schedule a Pickup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pickup Form Modal */}
      <PickupForm open={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}

export default Navbar