// app/layout.tsx
// NOTE: "use client" has been removed. This is now a Server Component.

import type { Metadata } from "next";
import { CartProvider } from "./context/cart-context";
import "./globals.css";
import Navbar from "@/component/NavBar";
import Footer from "@/component/Footer";
// FIX: Import the new client component
import AnimatedParticles from "@/component/AnimatedParticles"; 

// FIX: Metadata can now be exported correctly.
export const metadata: Metadata = {
  title: "Freshora Laundry",
  description: "Your one-stop solution for all laundry needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* FIX: Particles now with proper z-index */}
          <AnimatedParticles zIndex={-10} />
          <div className="relative z-10 bg-gray-50 min-h-screen">
            <Navbar/>
            <main className="relative z-20">
              {children}
            </main>
            <Footer/>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}