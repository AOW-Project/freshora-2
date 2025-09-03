'use client';

import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// --- UPDATED COUPON DATA ---
const coupon = {
  id: 1,
  title: '50% OFF',
  subtitle: 'Launch Month Offer',
  address: 'Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE',
  email: 'freshorappc@gmail.com',
  expires: 'October 15, 2025',
  note: 'On your total bill!',
};

export default function CouponCarousel() {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className={`text-green-600 font-medium mb-2 text-center ${poppins.className}`}>[ Money savings coupon ]</p>
        <h2 className="text-3xl font-semibold mb-8">Specials & Coupons</h2>

        {/* --- SIMPLIFIED LAYOUT FOR A SINGLE COUPON --- */}
        <div className="flex justify-center">
          <div
            className="w-full max-w-md border border-dashed border-gray-300 rounded-lg shadow-lg bg-white"
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
              <div className="w-1/2 bg-green-500 text-white py-8 px-4 text-center flex flex-col justify-center items-center rounded-r-lg">
                <h3 className="text-3xl font-extrabold">{coupon.title}</h3>
                <p className="mt-2 font-medium">{coupon.subtitle}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-600 border-t">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-75">
                <span>🖨️</span>
                <span className="text-green-600 font-medium">Print Coupon</span>
              </div>
              <p className="text-right">{coupon.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}