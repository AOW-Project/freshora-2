"use client";

export default function MapSection() {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[350px] bg-gray-200 overflow-hidden">
      <iframe
        title="Freshora Laundry Location"
        src="https://www.google.com/maps?q=Shop%20No%204%2C%20Azizi%20Riviera%2042%2C%20Meydan%2C%20Al%20Merkadh%2C%20Dubai%20UAE&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Google Map showing Freshora Laundry at Shop no 4, Azizi Riviera 42, Meydan, Dubai"
      />
    </div>
  );
}
