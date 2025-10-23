import Link from "next/link";
import OrderTracker from "../../component/order-tracker";

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      {/* Header Section */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
        style={{
          backgroundImage: `url('/images/redesign/about-banner.png')`,
        }}
      >
        {" "}
        {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium flex flex-col justify-center items-center z-30">
          <p>
            Please Enter Your Track Number to
            <span className="text-[#FFFF00]">Check Your Laundry Status</span>
          </p>
        </div>
      </div>
      {/* breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-6 py-5 ">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
          <Link
            href="/"
            className="hover:text-green-400 text-sm sm:text-base transition-colors"
          >
            Home
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <span className="text-green-400 text-sm sm:text-base">
            Track Your Order
          </span>
        </nav>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="my-10">
          <h2 className="text-3xl md:text-4xl text-primary-green font-medium  text-center ">
            Track
            <span className="text-secondary-green"> Your Order</span>
          </h2>
          <h3 className="text-xl my-3 font-medium text-gray-600 text-center">
            Enter your order number to track your laundry service
          </h3>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-sm p-6">
          <OrderTracker />
        </div>
      </div>
    </div>
  );
}
