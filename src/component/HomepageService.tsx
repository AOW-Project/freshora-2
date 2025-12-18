import CurvedCarousel from "./CurvedCarousel";

export default function ServicesSlider() {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto ">
        {/* Heading */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl  font-medium text-primary-green">
            Dry Cleaning & Laundry,{" "}
            <span className="text-secondary-green"> Free Delivery</span>
          </h2>
          <h2 className="text-xl font-medium text-[#606060] text-center my-3">
            Our Services
          </h2>
        </div>
        {/* Slider */}
        <CurvedCarousel />
      </div>
    </section>
  );
}
