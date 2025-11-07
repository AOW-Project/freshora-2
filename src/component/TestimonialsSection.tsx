"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";

interface StarRatingProps {
  rating: number; // example: 4 or 3.5
  max?: number; // total stars, default = 5
}

function StarRating({ rating, max = 5 }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      // full star
      stars.push(<IoStarSharp key={i} className="text-yellow-500" />);
    } else if (i - rating < 1 && rating % 1 !== 0) {
      // half star (optional improvement: replace with half icon if you want)
      stars.push(
        <IoStarSharp key={i} className="text-yellow-500 opacity-50" />
      );
    } else {
      // empty star
      stars.push(<IoStarOutline key={i} className="text-yellow-500" />);
    }
  }

  return <div className="flex gap-1 absolute top-5 right-5">{stars}</div>;
}

interface Testimonial {
  email: string;
  title: string;
  quote: string;
  author: string;
  imageSrc: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      email: "teresa@gmail.com",
      title: "Professional, Reliable & Cost Effective",
      quote:
        "This was my first time coming to a Laundromat ever. I was greeted by a woman with a warm smile... She was so helpful and friendly.",
      author: "Kevin K.",
      imageSrc: "/images/blog-slider-img01.jpg",
      rating: 4,
    },
    {
      email: "alicemungula@gmail.com",
      title: "Very Pleased. Will Definitely be Back.",
      quote:
        "the customer service is always great, and I’ve never had a quality concern.",
      author: "Alice Munguia",
      imageSrc: "/images/blog-slider-img02.jpg",
      rating: 4,
    },
    {
      email: "lenabroughton@gmail.com",
      title: "Excellent and Superb Customer Service",
      quote:
        "The prices are pretty reasonable, and they have big washers so I can get a lot done at once. It’s not a bad place to hang out and do laundry.",
      author: "Lena Broughton",
      imageSrc: "/images/blog-slider-img03.jpg",
      rating: 4,
    },
    {
      email: "beverlygarmon@gmail.com",
      title: "The Quality of Work Was Excellent!",
      quote:
        "I was skeptical about leaving my clothes... and let me tell you I was beyond amazed by the quality they put into the process of washing drying and folding.",
      author: "Beverly Garmon",
      imageSrc: "/images/blog-slider-img04.jpg",
      rating: 4,
    },
  ];

  const handleThumbnailClick = (index: number) => {
    mainSwiper?.slideToLoop(index);
  };

  return (
    <>
      <section className="py-10 w-full ">
        <div className="w-full flex justify-center bg-white py-5">
          <h2 className="text-primary-green text-3xl font-medium">
            Testimonial
          </h2>
        </div>

        <div
          className="w-full bg-cover bg-center bg-fixed px-12 py-8"
          style={{
            backgroundImage: `url('/images/redesign/about-banner.png')`,
          }}
        >
          <div>
            <Swiper
              onSwiper={setMainSwiper}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1} // default (mobile)
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 }, // show 2 on tablets
                1024: { slidesPerView: 3 }, // show 3 on desktop
              }}
              modules={[Pagination, Autoplay]}
              className="content-swiper"
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full relative space-y-2 h-auto max-w-[600px] rounded bg-white  border-2 border-primary-green py-10 px-6">
                    <div className="flex gap-2 justify-items">
                      <div className=" relative w-14 h-14 rounded-full border overflow-hidden border-primary-green">
                        <Image
                          src={testimonial.imageSrc}
                          alt="-Beverly Garmon"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <h2 className="text-base font-medium ">
                          {testimonial.author}
                        </h2>
                        <p className="text-teal-950 text-sm font-normal">
                          {testimonial.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-zinc-600 text-sm sm:text-xl font-medium">
                        {testimonial.title}
                      </h4>
                      <p className="text-zinc-600 text-xs sm:text-base font-normal line-clamp-2">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                    {/* rating stars */}
                    <StarRating rating={testimonial.rating} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
