"use client";

import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
      <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading Service Details...
        </p>
      </div>
    </div>
  );
}