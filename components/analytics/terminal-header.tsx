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
    <div className="terminal-header">
      <div className="flex items-center gap-2">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 mr-1 text-zinc-400 hover:text-white"
            onClick={onToggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <div className="flex items-center gap-1">
          <Circle className="h-2 w-2 fill-red-500 text-red-500" />
          <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500" />
          <Circle className="h-2 w-2 fill-green-500 text-green-500" />
        </div>
        <span className="text-zinc-500">deed-protocol-terminal:~$</span>
        <span className={`text-xs ${isConnected ? "text-green-500" : "text-red-500"}`}>
          {isConnected ? "CONNECTED" : "DISCONNECTED"}
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
        {!isMobile && (
          <>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-zinc-500">ETH:</span>
              <span className={ethChange.startsWith("+") ? "text-green-400" : "text-red-400"}>{ethPrice}</span>
              <span className={ethChange.startsWith("+") ? "text-green-500" : "text-red-500"}>{ethChange}</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-zinc-500">BTC:</span>
              <span className={btcChange.startsWith("+") ? "text-green-400" : "text-red-400"}>{btcPrice}</span>
              <span className={btcChange.startsWith("+") ? "text-green-500" : "text-red-500"}>{btcChange}</span>
            </div>
          </>
        )}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-zinc-500">Market:</span>
          <span className={marketStatus === "open" ? "text-green-500" : "text-red-500"}>
            {marketStatus === "open" ? "OPEN" : "CLOSED"}
          </span>
        </div>
        <div className="text-zinc-500 whitespace-nowrap hidden sm:block">
          {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300 ml-auto whitespace-nowrap"
          onClick={openCommandPalette}
        >
          <Command className="h-3 w-3 mr-1" />
          {!isMobile && "Command"}
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 text-[10px] font-medium text-zinc-400">
            ⌘K
          </kbd>
        </Button>
      </div>
    </div>
  )
}
