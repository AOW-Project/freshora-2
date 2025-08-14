'use client';

import React, { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import Link from 'next/link';

// The array of slide data
const slides = [
  {
    image: "/images/slider1.webp",
    alt: "A woman smiling while holding a basket of fresh laundry",
    subtitle: "Free Pickup & Delivery",
    title: "Professional Laundry & Dry Cleaning",
    description: "We are professionals in the laundry and dry cleaning business, which means we always stay up to date on the latest technologies, cleaning methods, and solutions for dealing with stains or delicate fabrics.",
    buttonText: "Schedule a Pickup",
    buttonLink: "/schedule-pickup"
  },
  {
    image: "/images/img07.jpg",
    alt: "A laundry professional handing clean clothes to a customer",
    subtitle: "25+ Years of Experience",
    title: "Quality Care For Your Clothes",
    description: "We maintain the highest standards of business integrity by following local and national regulations and environmental safety rules. We are passionate about the way you think about laundry!",
    buttonText: "Our Services",
    buttonLink: "/services"
  },
  {
    image: "/images/img09.jpg",
    alt: "A woman professionally steaming a blue shirt",
    subtitle: "Perfectly Pressed, Every Time",
    title: "Expert Ironing Services",
    description: "Our professional ironing service ensures your garments are wrinkle-free, crisp, and ready to wear for any occasion. We handle everything with precision and care.",
    buttonText: "View Pricing",
    buttonLink: "/prices"
  },
  {
    image: "/images/img07.jpg",
    alt: "A happy customer receiving their clean clothes",
    subtitle: "Your Happiness, Guaranteed",
    title: "100% Customer Satisfaction",
    description: "We pride ourselves on delivering a service that exceeds expectations. If you're not completely satisfied with the results, we promise to make it right.",
    buttonText: "Read Testimonials",
    buttonLink: "/testimonials"
  }
];


// --- AnimatedParticles component ---
const AnimatedParticles = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);
    const particles = useMemo(() => {
        const starImages = ['/images/stars-01.png', '/images/stars-02.png', '/images/stars-03.png', '/images/stars-04.png', '/images/stars-05.png'];
        const bubbleImages = ['/images/bubbles-01.png', '/images/bubbles-02.png', '/images/bubbles-03.png', '/images/bubbles-04.png', '/images/bubbles-05.png', '/images/bubbles-06.png', '/images/bubbles-07.png', '/images/bubbles-08.png', '/images/bubbles-09.png', '/images/bubbles-10.png', '/images/bubbles-11.png'];
        return Array.from({ length: 25 }).map((_, i) => {
            const isStar = Math.random() > 0.6;
            const imageArray = isStar ? starImages : bubbleImages;
            const src = imageArray[Math.floor(Math.random() * imageArray.length)];
            const size = Math.floor(Math.random() * (isStar ? 40 : 80) + 20);
            return { id: i, src, alt: isStar ? 'star' : 'bubble', width: size, height: size, style: { '--left-start': `${Math.random() * 100}%`, '--left-end': `${Math.random() * 100}%`, '--delay': `${Math.random() * 20}s`, '--duration': `${Math.random() * 20 + 15}s`, } as React.CSSProperties };
        });
    }, []);
    if (!isMounted) { return null; }
    
    // FIX: The z-index was changed from -z-10 to z-10 to ensure particles appear above the background image.
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10" aria-hidden="true">
            {particles.map(p => (<Image key={p.id} src={p.src} alt={p.alt} width={p.width} height={p.height} className="particle" style={p.style} />))}
        </div>
    );
};

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [preloaderVisible, setPreloaderVisible] = useState(true);

    useEffect(() => {
        const preloaderTimer = setTimeout(() => setPreloaderVisible(false), 500);
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => { clearTimeout(preloaderTimer); clearInterval(slideInterval); };
    }, []);

    return (
        <>
            <style>{`
                @keyframes float-up {
                    0% {
                        transform: translateX(0) scale(0.5);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        bottom: 100%;
                        transform: translateX(calc(var(--left-end) - var(--left-start))) scale(1);
                        opacity: 0;
                    }
                }
                .particle {
                    position: absolute;
                    bottom: -150px;
                    left: var(--left-start);
                    animation: float-up var(--duration) linear var(--delay) infinite;
                    user-select: none;
                    pointer-events: none;
                }
            `}</style>

            <section id="js-mainSlider" className="relative w-full h-[550px] md:h-[650px] lg:h-[700px] bg-gray-800 overflow-hidden">

                {preloaderVisible && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white z-50 text-4xl font-bold text-gray-800">
                        <span className="text-green-600">Freshora</span>Laundry
                    </div>
                )}
                
                {/* Background Images and Overlay Container */}
                <div className="absolute inset-0 w-full h-full z-0">
                    {slides.map((slide, index) => (
                        // FIX: Removed z-10 from the active slide to let the particle layer sit on top.
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                            <Image src={slide.image} alt={slide.alt} fill priority={index === 0} className="object-cover" />
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    ))}
                </div>
                
                {/* Particles are now on a layer (z-10) above the background (z-0) */}
                <AnimatedParticles />
                
                {/* Text content is on the top layer (z-20) */}
                <div className="relative z-20 flex h-full items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl text-white text-center lg:text-left">
                        <p className={`font-semibold text-base md:text-lg mb-3 text-white transition-all duration-700 ease-out ${currentSlide !== null ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} style={{ transitionDelay: '200ms' }}>
                            {slides[currentSlide].subtitle}
                        </p>
                        <h2 className={`font-bold text-3xl md:text-5xl leading-tight mb-4 transition-all duration-700 ease-out ${currentSlide !== null ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} style={{ transitionDelay: '400ms', color: '#52b765' }}>
                            {slides[currentSlide].title}
                        </h2>
                        <p className={`text-sm md:text-base leading-relaxed mx-auto lg:mx-0 mb-6 max-w-xl transition-all duration-700 ease-out ${currentSlide !== null ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} style={{ transitionDelay: '600ms' }}>
                            {slides[currentSlide].description}
                        </p>
                        <div className={`transition-all duration-700 ease-out ${currentSlide !== null ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} style={{ transitionDelay: '800ms' }}>
                            <Link href={slides[currentSlide].buttonLink} className="relative inline-block bg-green-600 hover:bg-white text-white hover:text-green-600 font-semibold px-6 py-3 rounded group overflow-hidden border-2 border-transparent hover:border-green-600 transition-all duration-300">
                                <span className="relative z-10">{slides[currentSlide].buttonText}</span>
                                <span className="absolute top-0 left-[-150%] h-full w-[200%] block transform -skew-x-45 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[150%] transition-all duration-700 ease-in-out z-0"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
