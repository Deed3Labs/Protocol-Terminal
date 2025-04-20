"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Circle } from "lucide-react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { TerminalHeader } from "@/components/terminal/terminal-header"
import { TerminalSidebar } from "@/components/terminal/terminal-sidebar"
import { TerminalFooter } from "@/components/terminal/terminal-footer"

interface TerminalLayoutProps {
  children: React.ReactNode
}

export function TerminalLayout({ children }: TerminalLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { openCommandPalette, currentPath, setCurrentPath, isConnected, connect } = useTerminal()
  const [isLoading, setIsLoading] = useState(true)
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Simulate terminal boot sequence
    const messages = [
      "Initializing Deed Protocol Terminal v1.0.0...",
      "Loading system modules...",
      "Establishing secure connection...",
      "Verifying blockchain access...",
      "Loading asset database...",
      "Initializing smart contract interfaces...",
      "Terminal ready.",
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < messages.length) {
        setBootMessages((prev) => [...prev, messages[index]])
        index++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setIsLoading(false)
          connect()
        }, 500)
      }
    }, 300)

    // Check if we should collapse sidebar on mobile
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", checkMobile)
    }
  }, [connect])

  useEffect(() => {
    setCurrentPath(pathname)
  }, [pathname, setCurrentPath])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Circle className="h-2 w-2 fill-red-500 text-red-500" />
            <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500" />
            <Circle className="h-2 w-2 fill-green-500 text-green-500" />
          </div>
          <span className="text-zinc-500">deed-protocol-terminal:~$</span>
        </div>
        <div className="space-y-1">
          {bootMessages.map((message, index) => (
            <div key={index} className="flex">
              <span className="text-green-500">&gt; {message}</span>
            </div>
          ))}
          {bootMessages.length < 7 && (
            <div className="flex items-center">
              <span className="text-green-500">&gt; </span>
              <span className="terminal-cursor">█</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen terminal-window">
      <TerminalHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-1 overflow-hidden">
        <TerminalSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto terminal-scrollbar bg-black">{children}</div>
        </div>
      </div>
      <TerminalFooter />
    </div>
  )
}
