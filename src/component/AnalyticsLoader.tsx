"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export default function AnalyticsLoader() {
  useEffect(() => {
    // ✅ Hardcoded credentials (instead of .env)
    const GA_ID = "G-RNHPFY4CMF" // Your GA4 ID
    // const ADS_ID = "AW-XXXXXXXXX" // (Optional) Google Ads ID
    // const ADS_PHONE = "+971XXXXXXXXX" // (Optional) Phone conversion

    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || []

    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }

    // Load GA script
    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    script.async = true
    document.head.appendChild(script)

    gtag("js", new Date())

    // ✅ GA4 Config
    gtag("config", GA_ID)

    // ✅ Optional: Google Ads Conversion Tracking
    // gtag("config", ADS_ID, {
    //   phone_conversion_number: ADS_PHONE,
    // })

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
