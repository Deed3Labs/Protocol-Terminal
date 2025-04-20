"use client"

import { useState, useEffect } from "react"
import { Circle, Command, Menu } from "lucide-react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { Button } from "@/components/ui/button"

interface TerminalHeaderProps {
  onToggleSidebar?: () => void
}

export function TerminalHeader({ onToggleSidebar }: TerminalHeaderProps) {
  const { isConnected, openCommandPalette, currentPath } = useTerminal()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketStatus, setMarketStatus] = useState<"open" | "closed">("open")
  const [ethPrice, setEthPrice] = useState("$3,245.78")
  const [ethChange, setEthChange] = useState("+2.4%")
  const [btcPrice, setBtcPrice] = useState("$52,341.20")
  const [btcChange, setBtcChange] = useState("+1.2%")
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

  // Simulate price updates
  useEffect(() => {
    const priceTimer = setInterval(() => {
      // Random ETH price fluctuation
      const ethBasePrice = 3245.78
      const ethFluctuation = Math.random() * 20 - 10
      const newEthPrice = ethBasePrice + ethFluctuation
      const ethPercentChange = (ethFluctuation / ethBasePrice) * 100

      setEthPrice(`${newEthPrice.toFixed(2)}`)
      setEthChange(`${ethPercentChange > 0 ? "+" : ""}${ethPercentChange.toFixed(2)}%`)

      // Random BTC price fluctuation
      const btcBasePrice = 52341.2
      const btcFluctuation = Math.random() * 100 - 50
      const newBtcPrice = btcBasePrice + btcFluctuation
      const btcPercentChange = (btcFluctuation / btcBasePrice) * 100

      setBtcPrice(`${newBtcPrice.toFixed(2)}`)
      setBtcChange(`${btcPercentChange > 0 ? "+" : ""}${btcPercentChange.toFixed(2)}%`)
    }, 5000)

    return () => clearInterval(priceTimer)
  }, [])

  return (
    <div className="terminal-header w-full">
      <div className="flex items-center gap-1 sm:gap-2">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 md:h-8 md:w-8 -ml-2 text-zinc-400 hover:text-white flex items-center justify-center"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5 md:h-4 md:w-4" />
          </Button>
        )}
        <div className="flex items-center gap-1 hidden md:flex">
          <Circle className="h-2 w-2 fill-red-500 text-red-500" />
          <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500" />
          <Circle className="h-2 w-2 fill-green-500 text-green-500" />
        </div>
        <span className="text-zinc-500 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
          deed-protocol-terminal:~$
        </span>
        <span className={`text-xs ${isConnected ? "text-green-500" : "text-red-500"} hidden xs:inline-block`}>
          {isConnected ? "CONNECTED" : "DISCONNECTED"}
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto scrollbar-hide ml-auto">
        {!isMobile && (
          <>
            <div className="hidden md:flex items-center gap-1 whitespace-nowrap">
              <span className="text-zinc-500 text-xs">ETH:</span>
              <span className={`text-xs ${ethChange.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {ethPrice}
              </span>
              <span className={`text-xs ${ethChange.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {ethChange}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1 whitespace-nowrap">
              <span className="text-zinc-500 text-xs">BTC:</span>
              <span className={`text-xs ${btcChange.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {btcPrice}
              </span>
              <span className={`text-xs ${btcChange.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {btcChange}
              </span>
            </div>
          </>
        )}
        <div className="hidden sm:flex items-center gap-1 whitespace-nowrap">
          <span className="text-zinc-500 text-xs">Market:</span>
          <span className={`text-xs ${marketStatus === "open" ? "text-green-500" : "text-red-500"}`}>
            {marketStatus === "open" ? "OPEN" : "CLOSED"}
          </span>
        </div>
        <div className="text-zinc-500 text-xs whitespace-nowrap hidden md:block">
          {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 sm:h-7 sm:px-2 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap text-xs"
          onClick={openCommandPalette}
        >
          <Command className="h-3.5 w-3.5 mr-1 sm:mr-1" />
          <span className="hidden sm:inline-block">Command</span>
          <kbd className="ml-1 sm:ml-2 pointer-events-none inline-flex h-5 sm:h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 sm:px-1.5 text-[10px] sm:text-[10px] font-medium text-zinc-400">
            ⌘K
          </kbd>
        </Button>
      </div>
    </div>
  )
}
