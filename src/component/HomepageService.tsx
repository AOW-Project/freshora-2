"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaTshirt, FaHandsWash, FaTools, FaBroom, FaShoePrints, FaBusinessTime, FaChild } from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { FaRug, FaWindowMaximize } from "react-icons/fa6";
import { useState, useEffect } from "react";
import clsx from "clsx";

const services = [
  { title: "Laundry", description: "Thorough washing using eco-friendly detergents to keep your clothes fresh and soft.", image: "/images/box02-img01.webp", icon: <FaBroom /> },
  { title: "Dry Cleaning", description: "Gentle dry cleaning for delicate fabrics, ensuring they maintain their quality and shape.", image: "/images/img01.jpg", icon: <FaTshirt /> },
  { title: "Express Laundry Service", description: "Quick turnaround laundry service with the same premium care.", image: "/images/img08.jpg", icon: <FaHandsWash /> },
  { title: "Bag & Shoe Spa", description: "Professional cleaning and restoration for handbags and shoes.", image: "/images/layout01-img01.jpg", icon: <MdIron /> },
  { title: "Luxury Shoe Cleaning Service", description: "Specialized treatment to clean and restore luxury shoes.", image: "/images/download.jfif", icon: <FaShoePrints /> },
  { title: "Commercial Laundry Service", description: "Large-scale laundry solutions for hotels, restaurants, and offices.", image: "/images/download.jfif", icon: <FaBusinessTime /> },
  { title: "Carpet Cleaning Service", description: "Deep cleaning for carpets, removing dirt, dust, and allergens.", image: "/images/download.jfif", icon: <FaRug /> },
  { title: "Curtain Cleaning Service", description: "Gentle cleaning for curtains to remove dust and stains while preserving fabric quality.", image: "/images/download.jfif", icon: <FaWindowMaximize /> },
  { title: "Soft Toy Cleaning Service", description: "Sanitizing and cleaning soft toys to make them safe and fresh for children.", image: "/images/download.jfif", icon: <FaChild /> },
];

export default function ServicesSlider() {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000); // shake duration
    }, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h4 className="text-green-600 font-medium mb-3 text-sm sm:text-base">[ Our Services ]</h4>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug">
            Dry Cleaning & Laundry, <br /> Free Delivery
          </h1>
        </div>

        {/* Slider */}
        <div className="relative">
          <button className="swiper-button-prev-custom absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full hover:bg-green-600 hover:text-white transition">
            <IoChevronBack size={20} />
          </button>
          <button className="swiper-button-next-custom absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full hover:bg-green-600 hover:text-white transition">
            <IoChevronForward size={20} />
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ prevEl: ".swiper-button-prev-custom", nextEl: ".swiper-button-next-custom" }}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
            {services.map((service, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative h-[450px]  overflow-hidden group"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

                  {/* Bottom text */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={clsx(
                          // ⬇️ unified icon circle + force svg size + block to remove baseline shift
                          "bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shrink-0 leading-none",
                          "[&>svg]:w-8 [&>svg]:h-8 [&>svg]:block",
                          "transition-transform duration-500",
                          shake && "animate-shake"
                        )}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed opacity-90">{service.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="custom-pagination mt-6 flex justify-center gap-2"></div>
      </div>
    </section>
  );
}
