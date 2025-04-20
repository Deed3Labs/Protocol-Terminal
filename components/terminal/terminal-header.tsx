"use client"

import { Circle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { NotificationCenter } from "@/components/notifications/notification-center"

interface TerminalHeaderProps {
  onToggleSidebar: () => void
  sidebarVisible: boolean
}

export function TerminalHeader({ onToggleSidebar, sidebarVisible }: TerminalHeaderProps) {
  const { openCommandPalette, currentPath, isConnected, connect, disconnect } = useTerminal()

  return (
    <header className="h-12 sm:h-12 md:h-12 border-b border-zinc-800 bg-black flex items-center justify-between px-3 text-zinc-400">
      <div className="flex items-center gap-3">
        {/* Colored dots - hidden on mobile and tablet */}
        <div className="hidden md:flex items-center gap-1.5">
          <Circle className="h-2.5 w-2.5 fill-red-500 text-red-500" />
          <Circle className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
          <Circle className="h-2.5 w-2.5 fill-green-500 text-green-500" />
        </div>
        {/* Larger hamburger menu button for touch devices */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          onClick={onToggleSidebar}
        >
          {sidebarVisible ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>
        <div className="text-xs sm:text-sm font-mono">deed-protocol-terminal:~{currentPath}</div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <NotificationCenter />
        <Button
          variant="ghost"
          size="sm"
          className="h-7 sm:h-8 px-2 text-xs"
          onClick={() => (isConnected ? disconnect() : connect())}
        >
          {isConnected ? "Connected" : "Connect Wallet"}
        </Button>
        <Button variant="ghost" size="sm" className="h-7 sm:h-8 px-2 text-xs" onClick={openCommandPalette}>
          ⌘K
        </Button>
      </div>
    </header>
  )
}
