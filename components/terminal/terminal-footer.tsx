"use client"

import { useState, useEffect } from "react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { useCryptoPrices } from "@/hooks/use-crypto-prices"
import { CryptoPriceDisplay } from "@/components/crypto/crypto-price-display"

export function TerminalFooter() {
  const { isConnected } = useTerminal()
  const [currentTime, setCurrentTime] = useState(new Date())
  const cryptoPrices = useCryptoPrices()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      clearInterval(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <div className="terminal-footer fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-black py-1.5 px-3 flex items-center justify-between text-xs">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
          <span className="text-xs text-zinc-400">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
        <span className="text-xs text-zinc-500 hidden xs:inline-block">v1.0.0</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        {/* Crypto prices */}
        <div className="flex items-center gap-3">
          <CryptoPriceDisplay crypto={cryptoPrices.ethereum} isLoading={cryptoPrices.isLoading} compact={isMobile} />
          <CryptoPriceDisplay crypto={cryptoPrices.bitcoin} isLoading={cryptoPrices.isLoading} compact={isMobile} />
        </div>

        {/* Market status */}
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-zinc-500 text-xs">Market:</span>
          <span className="text-green-500 text-xs">OPEN</span>
        </div>

        {/* Time */}
        <span className="text-zinc-500 text-xs whitespace-nowrap">
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
