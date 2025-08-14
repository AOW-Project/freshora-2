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
      <head>
        {/* Global styles for the particle animation */}
        <style>{`
            @keyframes float-up {
                0% {
                    transform: translateX(0) scale(0.5);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    bottom: 100%;
                    transform: translateX(calc(var(--left-end) - var(--left-start))) scale(1);
                    opacity: 0;
                }
            }
            .particle {
                position: absolute;
                bottom: -150px;
                left: var(--left-start);
                animation: float-up var(--duration) linear var(--delay) infinite;
                user-select: none;
                pointer-events: none;
            }
        `}</style>
      </head>
      <body>
        <CartProvider>
          {/* Call the global animation component here */}
          <AnimatedParticles />
          <div className="relative z-0 bg-gray-50">
            <Navbar/>
            <main>
              
              {children}
            </main>
            <Footer/>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}