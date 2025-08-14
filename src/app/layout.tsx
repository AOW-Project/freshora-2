// app/layout.tsx
// Server Component (no "use client" here)

import type { Metadata } from "next";
import { CartProvider } from "./context/cart-context";
import "./globals.css";
import Navbar from "@/component/NavBar";
import Footer from "@/component/Footer";
import AnimatedParticles from "@/component/AnimatedParticles"; 
// import { ToastProvider } from "@/components/ui/toast";
import { ToastProvider } from "@/components/ui/toaster";

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
          {/* ✅ Global particles - higher zIndex so they show above backgrounds */}
          <AnimatedParticles zIndex={5} />

          {/* ✅ Content wrapper with higher z-index than particles if needed */}
          <div className="relative z-10 min-h-screen">
            <Navbar />
            <main className="relative z-20">
          <ToastProvider>
                {children}
              </ToastProvider>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
