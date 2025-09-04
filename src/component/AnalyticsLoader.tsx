"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export default function AnalyticsLoader() {
  useEffect(() => {
    const GA_ID = "G-RNHPFY4CMF" // Your GA4 ID

    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || []

    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }

    gtag("js", new Date())
    gtag("config", GA_ID)

    // ✅ FIX: Defer script loading until after the page is fully interactive
    const loadScript = () => {
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      script.async = true
      document.head.appendChild(script)
    }

    // Use requestIdleCallback for modern browsers, with a fallback to a simple timeout
    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadScript)
    } else {
      setTimeout(loadScript, 2000) // Fallback for older browsers
    }

  }, [])

  return null
}