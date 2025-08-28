import type { Metadata } from "next";
import { CartProvider } from "@/app/context/cart-context";
import "./globals.css";
import Navbar from "@/component/NavBar";
import Footer from "@/component/Footer";
import { ToastContainer } from "react-toastify";
import LastPageTracker from "@/component/LastPageTracker";

export const metadata: Metadata = {
  // Your existing title - it's great!
  title: "Laundry Service in Dubai | Freshora – Quality and Convenience",

  // Your existing description - also great!
  description: "Freshora offers top-notch Laundry Service in Dubai with doorstep pickup and delivery. Fast, eco-friendly, and reliable care for all your garments.",

  // Adding the meta keywords
  keywords: [
    "Laundry Service",
    "Laundry Service in Dubai",
    "Best Laundry Service in Dubai",
    "best laundry services",
    "detergents and professional laundry",
  ],

  // Adding the canonical URL
  alternates: {
    canonical: 'https://freshoralaundry.com/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="relative z-10 min-h-screen">
            <Navbar />
            <LastPageTracker />
            <main className="relative z-20">{children}</main>
            <Footer />
          </div>
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
