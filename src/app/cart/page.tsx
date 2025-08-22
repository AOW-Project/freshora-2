"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/cart-context";
import PickupForm from "@/component/SchedulePickupModal";
import { useState, useEffect } from "react";

// --- UPDATED: A more robust function to parse item strings ---
const parseFeatureString = (feature: string) => {
    // --- THIS IS THE FIX: The 's' flag at the end of the regex is removed ---
    const match = feature.match(/^(\d+)\s+(.*)/); 
    if (match) {
        // match[1] is the number (e.g., "6"), match[2] is the item name (e.g., "T-Shirts")
        return { quantity: parseInt(match[1], 10), name: match[2].trim() };
    }
    // This is a fallback for items that might not have a number (e.g., "Towel")
    return { quantity: 1, name: feature.trim() };
};

export default function CartPage() {
  const { cartItems, replaceCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, isLoading } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [packagePrice, setPackagePrice] = useState<number | null>(null);

  useEffect(() => {
    const processPackage = async () => {
      const storedPackage = localStorage.getItem("cartPackage");
      if (storedPackage) {
        try {
          const packageData = JSON.parse(storedPackage);
          
          setPackagePrice(packageData.price);
          
          const newCartItems = packageData.features.map((feature: string) => {
            const { quantity, name } = parseFeatureString(feature);
            return {
              id: `${packageData.id}-${name.replace(/\s+/g, '-')}`,
              name: name,
              price: 0,
              quantity: quantity,
              category: "Package Item",
              serviceType: "Monthly Package",
            };
          });

          await replaceCart(newCartItems);
          
          localStorage.removeItem("cartPackage");

        } catch (error) {
          console.error("Failed to process package from localStorage", error);
          localStorage.removeItem("cartPackage");
        }
      }
    };
    
    processPackage();
  }, []);

  const finalTotalPrice = packagePrice !== null ? packagePrice : getTotalPrice();

  if (isLoading && cartItems.length === 0 && packagePrice === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png')` }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <nav className="flex items-center space-x-2 text-white mb-4">
              <Link href="/" className="hover:text-green-400">Home</Link>
              <span className="px-2">/</span>
              <span className="text-green-400">Cart</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Shopping Cart</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="text-center py-16">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some items to your cart to get started.</p>
              <Link href="/services">
                <Button className="bg-green-600 hover:bg-green-700">Browse Services</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png')` }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <nav className="flex items-center space-x-2 text-white mb-4">
              <Link href="/" className="hover:text-green-400">Home</Link>
              <span className="px-2">/</span>
              <span className="text-green-400">Cart</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Shopping Cart</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/prices" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => { clearCart(); setPackagePrice(null); }} className="text-red-600 hover:text-red-700 bg-transparent">
                      Clear Cart
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">Package Item</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right self-stretch flex flex-col justify-between">
                           <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" disabled>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${finalTotalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-4 mt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">${finalTotalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button onClick={() => setCheckoutOpen(true)} className="w-full bg-green-600 hover:bg-green-700 mt-4" size="lg">
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <PickupForm open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}