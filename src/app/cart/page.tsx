"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/cart-context";
import PickupForm from "@/component/SchedulePickupModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const parseFeatureString = (feature: string) => {
  const match = feature.match(/^(\d+)\s+(.*)/);
  if (match) {
    return { quantity: parseInt(match[1], 10), name: match[2].trim() };
  }
  return { quantity: 1, name: feature.trim() };
};

export default function CartPage() {
  const {
    cartItems,
    replaceCart,
    clearCart,
    getTotalPrice,
    isLoading,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [packagePrice, setPackagePrice] = useState<number | null>(null);

  const router = useRouter();

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
              id: `${packageData.id}-${name.replace(/\s+/g, "-")}`,
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
  }, [replaceCart]);

  const finalTotalPrice =
    packagePrice !== null ? packagePrice : getTotalPrice();

  if (isLoading && cartItems.length === 0 && packagePrice === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div
          className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
          style={{
            backgroundImage: `url('/images/redesign/about-banner.png')`,
          }}
        >
          {" "}
          {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
          <div className="text-white text-base sm:text-2xl md:text-3xl font-medium flex flex-col justify-center items-center z-30">
            <p className="text-center">
              We Offer a Full Range of Professional Laundry Services,
              <span className="text-[#FFFF00]">
                Ensuring Freshness & Care for Every Fabric.
              </span>
            </p>
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 py-5 bg-white ">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
            <Link
              href="/"
              className="hover:text-green-400 text-sm sm:text-base transition-colors"
            >
              Home
            </Link>
            <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
            <span className="text-green-400 capitalize">Your Cart</span>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="text-center py-16">
            <CardContent>
              <h2 className="text-2xl font-bold text-secondary-green mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add some items to your cart to get started.
              </p>
              <Link href="/services">
                <Button className="bg-secondary-green cta-button rounded">
                  Browse Services
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <div
          className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
          style={{
            backgroundImage: `url('/images/redesign/about-banner.png')`,
          }}
        >
          {" "}
          {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
          <div className="text-white text-base sm:text-2xl md:text-3xl font-medium flex flex-col justify-center items-center z-30">
            <p className="text-center">
              We Offer a Full Range of Professional Laundry Services,
              <span className="text-[#FFFF00]">
                Ensuring Freshness & Care for Every Fabric.
              </span>
            </p>
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 py-5 bg-white ">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
            <Link
              href="/"
              className="hover:text-green-400 text-sm sm:text-base transition-colors"
            >
              Home
            </Link>
            <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
            <span className="text-green-400 capitalize">Your Cart</span>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </button>

          {/* --- RESPONSIVE LAYOUT FIX --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-500">
                      Cart Items (
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        clearCart();
                        setPackagePrice(null);
                      }}
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-b"
                      >
                        {/* Item Details */}
                        <div className="flex flex-col items-start">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {item.serviceType} ( {item.category} )
                          </p>
                        </div>

                        {/* Wrapper for controls on mobile */}
                        <div className="w-full sm:w-auto flex items-center justify-evenly gap-6">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 bg-primary-green"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus
                                color="white"
                                className="h-4 w-4 rounded"
                              />
                            </Button>
                            <span className="font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 bg-primary-green"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus color="white" className="h-4 w-4 rounded" />
                            </Button>
                          </div>

                          <div className="text-right flex items-center justify-evenly">
                            <p className="font-semibold text-gray-800">
                              AED {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 p-1 h-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24">
              <Card className="rounded shadow-none">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>AED {finalTotalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-4 mt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">
                          AED {finalTotalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setCheckoutOpen(true)}
                      className="w-full bg-green-600 hover:bg-green-700 mt-4 rounded"
                      size="lg"
                    >
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
  );
}
