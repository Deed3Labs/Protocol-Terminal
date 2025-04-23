"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type ActiveView =
  | "dashboard"
  | "analytics"
  | "portfolio"
  | "market"
  | "transactions"
  | "alerts"
  | "settings"
  | "profile"
  | "wallet"
  | "tokenize"
  | "transfer"
  | "validate"
  | "lending"
  | "asset-detail"
  | "asset-comparison"
  | "real-estate"
  | "vehicles"
  | "equipment"
  | "collection"
  | "explore"

interface TerminalContextType {
  currentPath: string
  setCurrentPath: (path: string) => void
  commandHistory: string[]
  addToHistory: (command: string) => void
  clearHistory: () => void
  isConnected: boolean
  connect: () => void
  disconnect: () => void
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void
  isCommandPaletteOpen: boolean
  openCommandPalette: () => void
  closeCommandPalette: () => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState("/home")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  useEffect(() => {
    // Set active view based on pathname
    if (pathname === "/") {
      setActiveView("dashboard")
    } else if (pathname === "/analytics") {
      setActiveView("analytics")
    } else if (pathname === "/collection") {
      setActiveView("collection")
    } else if (pathname === "/mint") {
      setActiveView("tokenize")
    } else if (pathname === "/transfer") {
      setActiveView("transfer")
    } else if (pathname === "/validate") {
      setActiveView("validate")
    } else if (pathname === "/lending") {
      setActiveView("lending")
    } else if (pathname === "/explore") {
      setActiveView("explore")
    }
  }, [pathname])

  const addToHistory = (command: string) => {
    setCommandHistory((prev) => [...prev, command])
  }

  const clearHistory = () => {
    setCommandHistory([])
  }

  const connect = () => {
    setIsConnected(true)
  }

  const disconnect = () => {
    setIsConnected(false)
  }

  const openCommandPalette = () => {
    setIsCommandPaletteOpen(true)
  }

  const closeCommandPalette = () => {
    setIsCommandPaletteOpen(false)
  }

  return (
    <TerminalContext.Provider
      value={{
        currentPath,
        setCurrentPath,
        commandHistory,
        addToHistory,
        clearHistory,
        isConnected,
        connect,
        disconnect,
        activeView,
        setActiveView,
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider")
  }
  return context
}
