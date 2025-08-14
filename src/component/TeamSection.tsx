"use client"

import Image from 'next/image';
import React, { useCallback, useRef, useState, useEffect } from 'react';

// Define the type for a team member
type TeamMember = {
  name: string
  title: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Justin Stein",
    title: "Service Manager",
    image: "/images/pesonal-info-img01.jpg",
  },
  {
    name: "Amy Hellickson",
    title: "Wash Expert",
    image: "/images/pesonal-info-img02.jpg",
  },
  {
    name: "Charles Rock",
    title: "Operations Manager",
    image: "/images/pesonal-info-img03.jpg",
  },
  {
    name: "Sarah Johnson",
    title: "Quality Control",
    image: "/images/pesonal-info-img01.jpg",
  },
  {
    name: "Mike Davis",
    title: "Dry Cleaning Specialist",
    image: "/images/pesonal-info-img02.jpg",
  },
  {
    name: "Lisa Chen",
    title: "Customer Service Lead",
    image: "/images/pesonal-info-img03.jpg",
  },
  {
    name: "Robert Wilson",
    title: "Maintenance Supervisor",
    image: "/images/pesonal-info-img03.jpg",
  },
  {
    name: "Emma Thompson",
    title: "Pickup & Delivery",
    image: "/images/pesonal-info-img01.jpg",
  },
  {
    name: "David Martinez",
    title: "Stain Removal Expert",
    image: "/images/pesonal-info-img02.jpg",
  },
]

const TeamSection: React.FC = () => {
  const membersPerSlide = 3
  const totalSlides = Math.ceil(teamMembers.length / membersPerSlide)
  const [currentSlide, setCurrentSlide] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    resetTimeout()
    timeoutRef.current = setTimeout(nextSlide, 5000)

    return () => {
      resetTimeout()
    }
  }, [currentSlide, nextSlide])

  const getCurrentSlideMembers = () => {
    const startIndex = currentSlide * membersPerSlide
    const endIndex = Math.min(startIndex + membersPerSlide, teamMembers.length)
    return teamMembers.slice(startIndex, endIndex)
  }

  return (
    <section className="bg-white py-16 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-green-600 font-semibold mb-2">[ Our Team ]</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Laundry Specialists</h2>
        <p className="text-gray-600 mb-12">
          Our team&apos;s goal each day is to earn your business with each visit and to make your experience with us the
          absolute best.
        </p>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
            {getCurrentSlideMembers().map((member, index) => (
              <div key={`${currentSlide}-${index}`} className="flex flex-col items-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="rounded-full object-cover"
                />
                <h3 className="mt-4 font-semibold text-gray-900 text-xl">{member.name}</h3>
                <p className="text-gray-500">{member.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                slideIndex === currentSlide ? "bg-green-500" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection;