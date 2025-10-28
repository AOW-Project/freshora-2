"use client";

import Image from "next/image";

const coupon = {
  id: 1,
  title: "25% OFF",
  subtitle: "Launch Month Offer",
  address: "Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE",
  email: "freshorappc@gmail.com",
  expires: "November 30, 2025",
  note: "On your total bill!",
};

export default function CouponCarousel() {
  return (
    <div className="w-full bg-white px-4 mb-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="my-10">
          <h2 className="text-3xl md:text-4xl text-primary-green font-medium  text-center ">
            Special
            <span className="text-secondary-green"> Welcome Offer</span>
          </h2>
          <h3 className="text-xl my-3 font-medium text-gray-600 text-center">
            Money Saving Coupon
          </h3>
        </div>

        {/* --- SIMPLIFIED LAYOUT FOR A SINGLE COUPON --- */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl border-2 border-dashed border-gray-300 rounded shadow-lg bg-white flex relative p-2">
            {/* Left side */}
            <div className="w-1/3 bg-primary-green text-white py-8 px-4 text-center flex flex-col justify-center items-center rounded-l">
              <h3 className="text-4xl font-extrabold [text-shadow:_2px_2px_0_#000] ">
                {coupon.title}
              </h3>
              <p className="mt-2 font-medium">{coupon.subtitle}</p>
            </div>
            <div>
              <div className="flex flex-col justify-between items-start gap-2 px-6 py-4 border-b">
                <p className="text-xl font-medium text-primary-green">
                  On Your Total Bill !{" "}
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/F.png"
                    alt="logo"
                    width={24}
                    height={24}
                  />
                  <p className="text-xl font-bold text-primary-green font-roboto-condensed">
                    Freshora{" "}
                    <span className="text-secondary-green"> Laundry</span>
                  </p>
                </div>
                <span className="absolute text-xs text-gray-500 top-2 right-2">
                  Expires: {coupon.expires}
                </span>
                <span className="absolute text-xs text-gray-500 bottom-2 right-2">
                  T&C Apply
                </span>
              </div>
              <div className="flex">
                <div className=" px-6 py-4 text-left text-sm whitespace-pre-line text-gray-700">
                  {coupon.address}
                  <br />
                  {coupon.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
