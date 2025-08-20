"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
  FaPhoneAlt,
  FaShoppingCart,
  FaChevronDown,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import { useCart } from "../app/context/cart-context"



interface NavItem {
  title: string
  href: string
  subItems?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
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
      { title: "Carpet Cleaning Service", href: "/services/carpet-cleaning-service" },
      { title: "Curtain Cleaning Service", href: "/services/curtain-cleaning-service" },
      { title: "Soft Toy Cleaning Service", href: "/services/soft-toy-cleaning-service" },
    ],
  },
  { title: "Prices", href: "/prices" },
  { title: "FAQ", href: "/FAQs" },
  { title: "Contacts", href: "/contact" },
]

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems } = useCart()
  const [loginOpen, setLoginOpen] = useState(false)

  const handleDropdownEnter = (index: number) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setOpenDropdown(index)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null)
    }, 200) // 200ms delay before closing
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  return (
    <>
      {/* Header */}
      <header
        className={`w-full bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        {/* Top Info Bar */}
        <div
          className={`hidden xl:block bg-gray-100 text-sm text-gray-700 transition-all duration-300 ${
            scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-6">
            <div>Address : Shop no 4, Azizi riviera 42 , Meydan , Al Merkadh , Dubai UAE </div>
            <div className="flex gap-4">
              <span>Mon-Fri 08:00 AM - 05:00 PM</span>
              <span>freshorappc@gmail.com</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="flex items-center gap-1">
                <FaPhoneAlt className="text-green-500" />
                <span>+971 50 925 9667</span>
              </span>
              <div className="flex gap-2">
                <FaTwitter className="hover:text-green-500 cursor-pointer" />
                <FaFacebookF className="hover:text-green-500 cursor-pointer" />
                <FaLinkedinIn className="hover:text-green-500 cursor-pointer" />
                <FaInstagram className="hover:text-green-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-4 lg:px-6 transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/F.png"
              alt="Freshora Laundry Logo"
              width={40}
              height={40}
              className="sm:w-12 sm:h-12"
              priority
            />
            <div
              className={`font-bold transition-all duration-300 ${
                scrolled ? "text-base sm:text-lg lg:text-xl" : "text-base sm:text-lg lg:text-xl xl:text-2xl"
              }`}
            >
              <span className="text-green-600">Freshora </span>
              <span className="text-black">Laundry</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.subItems && handleDropdownEnter(index)}
                onMouseLeave={() => item.subItems && handleDropdownLeave()}
              >
                <Link href={item.href} className="flex items-center hover:text-green-600 transition-colors py-2">
                  {item.title}
                  {item.subItems && (
                    <FaChevronDown
                      className={`ml-1 text-xs transition-transform duration-200 ${
                        openDropdown === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </Link>

                {item.subItems && (
                  <div
                    className={`absolute top-full left-0 bg-white shadow-lg rounded-lg mt-1 w-56 z-50 border border-gray-100 transition-all duration-200 ${
                      openDropdown === index
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
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

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/cart" className="relative hover:text-green-600 p-1.5 sm:p-2">
              <FaShoppingCart size={16} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <Link href="/services">
              <button className="hidden sm:block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">
                Schedule a Pickup
              </button>
            </Link>
            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setMobileOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex flex-col">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100">
              <Link
                href={item.href}
                className="block px-4 py-3 font-medium text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
              {item.subItems && (
                <div className="pl-6 pb-2">
                  {item.subItems.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      href={sub.href}
                      className="block py-1 text-sm text-gray-600 hover:text-green-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/services">
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3"
            >
              Schedule a Pickup
            </button>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Navbar
