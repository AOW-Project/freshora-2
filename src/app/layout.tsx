import type { Metadata } from "next";
//import Script from 'next/script'; // Import the Next.js Script component
import { CartProvider } from "@/app/context/cart-context";
import "./globals.css";
import Navbar from "@/component/NavBar";
import Footer from "@/component/Footer";
import { ToastContainer } from "react-toastify";
import LastPageTracker from "@/component/LastPageTracker";
import WhatsAppFloatingButton from "@/component/WhatsAppFloatingButton";
import AnalyticsLoader from "@/component/AnalyticsLoader";
import { Roboto, Roboto_Condensed } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  // Your existing title - it's great!
  title: "Laundry Service in Dubai | Freshora Laundry Experts",

  // Your existing description - also great!
  description:
    "Freshora offers top-notch Laundry Service in Dubai with doorstep pickup and delivery. Fast, eco-friendly, and reliable care for all your garments.",

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
    canonical: "https://freshoralaundry.com",
  },

  // This is the recommended way to add Google Site Verification
  verification: {
    google: "rA4Z54HNZDzcvU8-4_PtJfHLlncS2jKC6m92KXo7nA0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoCondensed.variable}`}
    >
      {/* The <head> tag is managed by Next.js, so you don't need to add it here */}
      <body className="font-roboto">
        <CartProvider>
          <div className="relative z-10 min-h-screen">
            <Navbar />
            <LastPageTracker />
            <link
              rel="preload"
              href="/images/a-basket-of-laundry-and-public-laundromat-2024-11-27-17-08-56-utc.webp"
              as="image"
              fetchPriority="high"
            />
            <main className="relative z-20">
              {children}
              <WhatsAppFloatingButton />
            </main>
            <Footer />
          </div>
          <ToastContainer />
          <AnalyticsLoader />
        </CartProvider>

        {/* Use the Next.js Script component for Google Analytics */}
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RNHPFY4CMF"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RNHPFY4CMF');
            `,
          }}
        /> */}
      </body>
    </html>
  );
}
