"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Image from "next/image";

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
      alt: "Express Laundry",

      src: "/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.webp",
    },
    {
      alt: " Shoe Cleaning",

      src: "/images/light-blue-sneakers-and-backpack-2025-01-09-09-02-14-utc.webp",
    },
    {
      alt: "Luxury Shoe Cleaning",

      src: "/images/erik-mclean-AnRxcupEQT0-unsplash.webp",
    },
    {
      alt: "Commercial Laundry",
      src: "/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.webp",
    },
    {
      alt: "Carpet Cleaning",
      src: "/images/a-closeup-view-of-vacuuming-a-carpet-in-a-contempo-2024-12-13-14-23-46-utc.webp",
    },
    {
      alt: "Curtain Cleaning",
      src: "/images/white-transparent-curtain-closes-the-window-indoo-2025-01-15-12-40-54-utc.webp",
    },
    {
      alt: "Soft Toy Cleaning",
      src: "/images/stuffed-rabbit-in-washing-machine-2025-01-07-09-52-38-utc.webp",
    },
    {
      alt: "Steam Pressing",
      src: "/images/steam-pressing-banner.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full">
      {/* Curved top */}
      <div className="absolute top-[-70px] left-0 w-[calc(100vw+120px)] h-[120px] bg-white rounded-[45%] translate-x-[-60px] z-10" />

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={2} // default (mobile)
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 }, // show 5 on desktop
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="overflow-hidden relative z-0 pb-16"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className="relative cursor-grab">
            <Image
              src={service.src}
              alt={service.alt}
              width={500}
              height={450}
              className="w-full h-[400px] object-cover md:h-[450px]"
            />
            <div className="absolute z-50 w-full h-[25%] text-xl pt-2 font-medium bg-primary-green/70 text-white bottom-0 text-center">
              {service.alt}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Curved bottom */}
      <div className="absolute bottom-[-70px] left-0 w-[calc(100vw+120px)] h-[120px] bg-white rounded-[45%] translate-x-[-60px] z-10" />
    </div>
  );
}
