import type { Metadata } from "next";
import { CartProvider } from "@/app/context/cart-context";
// import { ToastProvider } from "@/app/hooks/use-toast";
import "./globals.css";
import Navbar from "@/component/NavBar";
import Footer from "@/component/Footer";
import AnimatedParticles from "@/component/AnimatedParticles";
import MissingItemsNotifier from "@/component/MissingItemsNotifier"; 
import { ToastContainer } from "react-toastify";// ✅ now imported from client component

export const metadata: Metadata = {
  title: "Freshora Laundry",
  description: "Your one-stop solution for all laundry needs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          
            <AnimatedParticles zIndex={5} />
            <MissingItemsNotifier />
            <div className="relative z-10 min-h-screen">
              <Navbar />
              <main className="relative z-20">{children}</main>
              <Footer />
            </div>
            <ToastContainer /> 
        </CartProvider>
      </body>
    </html>
  );
}