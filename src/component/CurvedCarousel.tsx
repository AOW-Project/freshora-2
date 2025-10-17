"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

export default function CurvedCarousel() {
  const services = [
    {
      alt: "Laundry",

      src: "/images/women-sorting-clothes-in-the-laundry-2025-03-14-03-27-51-utc.webp",
    },
    {
      alt: "Dry Cleaning",

      src: "/images/iron-and-stack-of-shirts-on-ironing-board-space-f-2025-03-25-22-33-47-utc.webp",
    },
    {
      alt: "Express Laundry Service",

      src: "/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.webp",
    },
    {
      alt: " Shoe Cleaning",

      src: "/images/light-blue-sneakers-and-backpack-2025-01-09-09-02-14-utc.webp",
    },
    {
      alt: "Luxury Shoe Cleaning Service",

      src: "/images/erik-mclean-AnRxcupEQT0-unsplash.webp",
    },
    {
      alt: "Commercial Laundry Service",
      src: "/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.webp",
    },
    {
      alt: "Carpet Cleaning Service",
      src: "/images/a-closeup-view-of-vacuuming-a-carpet-in-a-contempo-2024-12-13-14-23-46-utc.webp",
    },
    {
      alt: "Curtain Cleaning Service",
      src: "/images/white-transparent-curtain-closes-the-window-indoo-2025-01-15-12-40-54-utc.webp",
    },
    {
      alt: "Soft Toy Cleaning Service",
      src: "/images/stuffed-rabbit-in-washing-machine-2025-01-07-09-52-38-utc.webp",
    },
    {
      alt: "Steam Pressing Service",
      src: "/images/steam-pressing-banner.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden w-screen">
      {/* Curved top */}
      <div className="absolute top-[-70px] left-0 w-[calc(100vw+120px)] h-[120px] bg-white rounded-[45%] translate-x-[-60px] z-10" />

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="overflow-hidden relative z-0 pb-16"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <img
              src={service.src}
              alt={service.alt}
              className="w-full h-[300px] object-cover md:h-[350px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Curved bottom */}
      <div className="absolute bottom-[-70px] left-0 w-[calc(100vw+120px)] h-[120px] bg-white rounded-[45%] translate-x-[-60px] z-10" />
    </div>
  );
}
