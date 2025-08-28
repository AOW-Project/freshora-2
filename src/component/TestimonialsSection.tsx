// components/TestimonialsSection.tsx

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
    label: string;
    title: string;
    quote: string;
    author: string;
    imageSrc: string;
}

const TestimonialsSection = () => {
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials: Testimonial[] = [
        {
            label: "[ Our Testimonials ]",
            title: "Professional, Reliable & Cost Effective",
            quote: "This was my first time coming to a Laundromat ever. I was greeted by a woman with a warm smile... She was so helpful and friendly.",
            author: "- Teresa and Kevin K.",
            imageSrc: "/images/blog-slider-img01.jpg"
        },
        {
            label: "[ Our Testimonials ]",
            title: "Very Pleased. Will Definitely be Back.",
            quote: "the customer service is always great, and I’ve never had a quality concern.",
            author: "- Alice Munguia",
            imageSrc: "/images/blog-slider-img02.jpg"
        },
        {
            label: "[ Our Testimonials ]",
            title: "Excellent and Superb Customer Service",
            quote: "The prices are pretty reasonable, and they have big washers so I can get a lot done at once. It’s not a bad place to hang out and do laundry.",
            author: "- Lena Broughton",
            imageSrc: "/images/blog-slider-img03.jpg"
        },
        {
            label: "[ Our Testimonials ]",
            title: "The Quality of Work Was Excellent!",
            quote: "I was skeptical about leaving my clothes... and let me tell you I was beyond amazed by the quality they put into the process of washing drying and folding.",
            author: "- Beverly Garmon",
            imageSrc: "/images/blog-slider-img04.jpg"
        }
    ];

    const handleThumbnailClick = (index: number) => {
        mainSwiper?.slideToLoop(index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Main two-column grid using Tailwind CSS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    {/* Left Side: 2x2 Image Grid using Tailwind CSS */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-[420px]">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="relative cursor-pointer rounded-lg overflow-hidden" 
                                onClick={() => handleThumbnailClick(index)}
                            >
                                <Image 
                                    src={testimonial.imageSrc} 
                                    alt={testimonial.author} 
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover"
                                />
                                {activeIndex !== index && <div className="inactive-thumb-overlay" />}
                                {activeIndex === index && (
                                    <div className="active-thumb-overlay">
                                        <Quote className="quote-icon" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Text Content Slider */}
                    <div>
                        <Swiper
                            onSwiper={setMainSwiper}
                            loop={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            modules={[Pagination, Autoplay]}
                            className="content-swiper"
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <div className="title-block">
                                        <div className="title-block__label">{testimonial.label}</div>
                                        <h4 className="title-block__title">{testimonial.title}</h4>
                                    </div>
                                    <blockquote>
                                       {/* After */}
<p className="quote-text">&ldquo;{testimonial.quote}&rdquo;</p>
                                        <p className="author-text">{testimonial.author}</p>
                                    </blockquote>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;