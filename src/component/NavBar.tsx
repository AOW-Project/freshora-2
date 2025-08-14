"use client"
import Link from "next/link"
import Image from "next/image" // Import the Image component
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
  // FaMapMarkerAlt,
  // FaClock,
  // FaEnvelope,
} from "react-icons/fa"
import { useCart } from "../app/context/cart-context"
import Image from "next/image"

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
  },
  {
    title: "Services",
    href: "/services",
    subItems: [
      { title: "Laundry", href: "/services/laundry" },
      { title: "Dry Cleaning", href: "/services/dry-cleaning" },
      { title: "Express Laundry Services", href: "/services/express-laundry-services" },
      { title: "Bag & Shoe Spa", href: "/services/bag-shoe-spa" },
      { title: "Luxury Shoe Cleaning Service", href: "/services/luxury-shoe-cleaning-service" },
      { title: "Commercial Laundry Service", href: "/services/commercial-laundry-service" },
      { title: "Carpet Cleaning Service", href: "/services/carpet-cleaning-service" },
      { title: "Curtain Cleaning Service", href: "/services/curtain-cleaning-service" },
      { title: "Soft Toy Cleaning Service", href: "/services/soft-toy-cleaning-service" },
    ],
  },
  // {
  //   title: "Blog",
  //   href: "/Blogs",
  //   subItems: [
  //     { title: "Latest News", href: "/blog/latest" },
  //     { title: "Tips & Tricks", href: "/blog/tips" },
  //   ],
  // },
  { title: "Prices", href: "/prices" },
  { title: "FAQ", href: "/FAQs" },
  { title: "Contacts", href: "/contact" },
]

const Navbar = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // const [showForm, setShowForm] = useState(false)
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

  return (
    <>
      <header
        className={`w-full bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        <div
          className={`hidden xl:block bg-gray-100 text-sm text-gray-700 transition-all duration-300 ${
            scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-6">
            <div className="text-sm">8494 Signal Hill Road Manassas, VA, 20110</div>
            <div className="flex gap-4 text-sm">
              <span>Mon-Fri 08:00 AM - 05:00 PM</span>
              <span>info@yourcompany.com</span>
            </div>
            <div className="flex gap-3 items-center text-sm">
              <span className="flex items-center gap-1">
                <FaPhoneAlt className="text-green-500" />
                <span>+971 50 925 9667</span>
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

        <div
          className={`max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-4 lg:px-6 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
        >
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/F.png"
              alt="Freshora Laundry Logo"
              width={40}
              height={40}
              className="sm:w-12 sm:h-12 transition-all duration-300"
              priority
            />
            <div
              className={`font-bold transition-all duration-300 ${scrolled ? "text-base sm:text-lg lg:text-xl" : "text-base sm:text-lg lg:text-xl xl:text-2xl"}`}
            >
              <span className="text-green-600">Freshora </span>
              <span className="text-black">Laundry</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-6 font-medium text-gray-700 relative">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center hover:text-green-600 transition-colors py-2 text-sm xl:text-base"
                >
                  {item.title}
                  {item.subItems && <FaChevronDown className="ml-1 text-xs" />}
                </Link>
                {item.subItems && openIndex === index && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-1 w-56 z-50 border border-gray-100">
                    {item.subItems.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        className="block px-4 py-3 text-sm hover:bg-green-50 hover:text-green-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:flex lg:hidden items-center text-xs sm:text-sm text-gray-600">
              <FaPhoneAlt className="text-green-500 mr-1" size={12} />
              <span className="hidden md:inline">+971 50 925 9667</span>
              <span className="md:hidden">Call</span>
            </div>

            <Link href="/cart" className="relative hover:text-green-600 transition-colors p-1.5 sm:p-2">
              <FaShoppingCart size={16} className="sm:w-5 sm:h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setShowForm(true)}
              className="hidden sm:block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
            >
              Schedule a Pickup
            </button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </header>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100">
                <Link href={item.href} className="block px-4 py-3 font-medium text-gray-700">
                  {item.title}
                </Link>
                {item.subItems && (
                  <div className="pl-6 pb-2">
                    {item.subItems.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        className="block py-1 text-sm text-gray-600 hover:text-green-600"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setShowForm(true);
                setMobileOpen(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3"
            >
              Schedule a Pickup
            </button>
          </div>
        )}
      </header>

      {/* Pickup Form Modal */}
      <PickupForm open={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}

export default Navbar