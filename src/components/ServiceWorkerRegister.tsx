"use client"

import { useEffect } from "react"

/**
 * Registers the service worker for PWA offline support.
 * This component renders nothing — it only runs the registration side effect.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) => {
          console.error("Service worker registration failed:", error)
        })
    }
  }, [])

  return null
}
