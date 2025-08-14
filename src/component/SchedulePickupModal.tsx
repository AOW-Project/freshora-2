"use client";

import { useState, useEffect } from "react";
import { FaTshirt, FaHandsWash, FaTools } from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SchedulePickupModalProps {
  onClose: () => void;
}

export default function SchedulePickupModal({ onClose }: SchedulePickupModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [shake, setShake] = useState(false);

  // Shake animation trigger every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000); // stop shaking after 1s
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setTimeout(onClose, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        {/* Loader overlay */}
        {status === "loading" && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl sm:rounded-2xl">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-emerald-500 mb-4"></div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Scheduling your pickup...
            </p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-30"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Schedule Your Pickup
        </h2>

        {/* Icons with shake animation */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className={`border p-4 flex flex-col items-center justify-center transition-transform ${shake ? "animate-shake" : ""}`}>
            <FaTshirt size={40} className="text-emerald-500" />
            <p className="mt-2 text-sm">Laundry</p>
          </Card>
          <Card className={`border p-4 flex flex-col items-center justify-center transition-transform ${shake ? "animate-shake" : ""}`}>
            <FaHandsWash size={40} className="text-emerald-500" />
            <p className="mt-2 text-sm">Wash</p>
          </Card>
          <Card className={`border p-4 flex flex-col items-center justify-center transition-transform ${shake ? "animate-shake" : ""}`}>
            <MdIron size={40} className="text-emerald-500" />
            <p className="mt-2 text-sm">Iron</p>
          </Card>
          <Card className={`border p-4 flex flex-col items-center justify-center transition-transform ${shake ? "animate-shake" : ""}`}>
            <FaTools size={40} className="text-emerald-500" />
            <p className="mt-2 text-sm">Repair</p>
          </Card>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            placeholder="Address"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg"
          >
            Confirm Pickup
          </Button>
        </form>
      </div>

      {/* Shake animation style */}
      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
