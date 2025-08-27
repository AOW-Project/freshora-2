import type { Metadata } from "next";
import { CartProvider } from "@/app/context/cart-context";
import "./globals.css";
import Navbar from "@/component/NavBar";
import Footer from "@/component/Footer";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Freshora Laundry",
  description: "Your one-stop solution for all laundry needs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
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
