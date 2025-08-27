"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LastPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/cart") {
      // Save last non-cart page
      sessionStorage.setItem("prevPage", pathname);
    }
  }, [pathname]);

  return null; // doesn't render anything
}
