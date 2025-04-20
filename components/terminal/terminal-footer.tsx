"use client"

import { useState, useEffect } from "react"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function TerminalFooter() {
  const { isConnected } = useTerminal()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="terminal-footer">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
          <span className="text-xs text-zinc-400">Connected</span>
        </div>
        <span className="text-xs text-zinc-500">v1.0.0</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-zinc-500">{currentTime.toLocaleTimeString()}</span>
        <span className="text-xs text-zinc-500">
          {isConnected ? "Blockchain: Connected" : "Blockchain: Disconnected"}
        </span>
      </div>
    </div>
  )
}
