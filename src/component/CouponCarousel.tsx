'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add as needed
  display: 'swap',
});

const coupons = [
  {
    id: 1,
    title: '5% OFF',
    subtitle: 'Laundry Services with 25 AED Order',
    address: 'Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE',
    email: 'freshorappc@gmail.com',
    expires: '5/31/2020',
    note: "Don't Spend ALL DAY. Doing Laundry!",
  },
  {
    id: 2,
    title: 'FREE DRY',
    subtitle: 'With Dry Cleaning Services',
    address: 'Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE',
    email: 'freshorappc@gmail.com',
    expires: '5/31/2020',
    note: "Don't Spend ALL DAY. Doing Laundry!",
  },
  {
    id: 3,
    title: '10% OFF',
    subtitle: 'On orders above 50 AED',
    address: 'Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE',
    email: 'freshorappc@gmail.com',
    expires: '6/30/2020',
    note: 'Grab your discount now!',
  },
  {
    id: 4,
    title: '20% OFF',
    subtitle: 'First-time Customer',
    address: 'Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE',
    email: 'freshorappc@gmail.com',
    expires: '7/31/2020',
    note: 'Welcome offer!',
  },
];

export default function CouponCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 2) % coupons.length);
    }, 6000);

    return () => resetTimeout();
  }, [current]);

  const totalSlides = Math.ceil(coupons.length / 2);

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className={`text-green-600 font-medium mb-2 text-center ${poppins.className}`}>[ Money savings coupon ]</p>
        <h2 className="text-3xl font-semibold mb-8">Specials & Coupons</h2>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(current / 2) * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, index) => {
              const first = coupons[index * 2];
              const second = coupons[index * 2 + 1];
              return (
                <div key={index} className="flex flex-shrink-0 w-full gap-6 justify-center">
                  {[first, second]
                    .filter(Boolean)
                    .map((coupon) => (
                      <div
                        key={coupon.id}
                        className="w-full max-w-md border border-dashed border-gray-300 rounded-lg shadow bg-white"
                      >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                          <div className="flex items-center gap-2">
                            <Image src="/images/F.png" alt="logo" width={24} height={24} />
                            <span className="text-xl font-bold text-gray-700">Freshora Laundry</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            Expires: {coupon.expires}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex h-full">
                          <div className="w-1/2 px-6 py-4 text-left text-sm whitespace-pre-line text-gray-700">
                            {coupon.address}
                            <br />
                            {coupon.email}
                          </div>
                          <div className="w-1/2 bg-green-500 text-white py-8 px-4 text-center rounded-r-lg">
                            <h3 className="text-3xl font-extrabold">{coupon.title}</h3>
                            <p className="mt-2 font-medium">{coupon.subtitle}</p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between px-6 py-3 text-sm text-gray-600 border-t">
                          <div className="flex items-center gap-2">
                            <span>🖨️</span>
                            <span className="text-green-600 font-medium">Print Coupon</span>
                          </div>
                          <p className="text-right">{coupon.note}</p>
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i * 2)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                current / 2 === i ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Subscribe Button */}
        {/* <div className="flex justify-end mt-10">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">
            Subscribe Now
          </button>
        </div> */}
      </div>
    </div>
  );
}
