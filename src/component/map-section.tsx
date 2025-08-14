"use client"

export default function MapSection() {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[350px] bg-gray-200 overflow-hidden">
      <iframe
        title="Our Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.823998592543!2d-77.4510176846573!3d38.78872997958744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65c6c6b3b5b67%3A0x26c8b30125c405a!2s8494%20Signal%20Hill%20Rd%2C%20Manassas%2C%20VA%2020110%2C%20USA!5e0!3m2!1sen!2sin!4v1628472948212!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Google Map showing Freshora Laundry location"
      />
    </div>
  )
}
