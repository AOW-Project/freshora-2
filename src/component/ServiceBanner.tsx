import React from "react";

const BannerSection = () => {
  return (
    <div
      className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
      style={{
        backgroundImage: `url('/images/redesign/about-banner.png')`,
      }}
    >
      {" "}
      {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
      <div className="text-white text-base sm:text-2xl md:text-3xl space-y-5 font-medium flex flex-col justify-center text-center items-center z-30">
        <p>
          We Offer a Full Range of Professional Laundry Services,{" "}
          <span className="text-[#FFFF00]">
            Ensuring Freshness & Care for Every Fabric
          </span>
        </p>
        <button className="text-white border-2 rounded-full px-8 py-3 bg-secondary-green hover:bg-primary-green transition-colors ease-in-out duration-500 border-[#FFFF00] text-xl font-medium cursor-pointer">
          <p className="uppercase">Specials Welcome Offer</p>
          <p className="text-base font-normal">Click here</p>
        </button>
      </div>
    </div>
  );
};

export default BannerSection;
