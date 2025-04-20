"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface TerminalContextType {
  isConnected: boolean
  connect: () => void
  disconnect: () => void
  currentPath: string
  setCurrentPath: (path: string) => void
  lastCommand: string
  setLastCommand: (command: string) => void
  commandHistory: string[]
  addToHistory: (command: string) => void
  openCommandPalette: () => void
  closeCommandPalette: () => void
  isCommandPaletteOpen: boolean
  activeView: string
  setActiveView: (view: string) => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [currentPath, setCurrentPath] = useState("/")
  const [lastCommand, setLastCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [activeView, setActiveView] = useState<
    | "analytics"
    | "dashboard"
    | "tokenize"
    | "transfer"
    | "validate"
    | "collection"
    | "wallet"
    | "settings"
    | "profile"
    | "real-estate"
    | "vehicles"
    | "equipment"
  >("analytics")

  const connect = () => setIsConnected(true)
  const disconnect = () => setIsConnected(false)

  const addToHistory = (command: string) => {
    setCommandHistory((prev) => [...prev, command])
  }

  const openCommandPalette = () => setIsCommandPaletteOpen(true)
  const closeCommandPalette = () => setIsCommandPaletteOpen(false)

  return (
    <TerminalContext.Provider
      value={{
        isConnected,
        connect,
        disconnect,
        currentPath,
        setCurrentPath,
        lastCommand,
        setLastCommand,
        commandHistory,
        addToHistory,
        openCommandPalette,
        closeCommandPalette,
        isCommandPaletteOpen,
        activeView,
        setActiveView,
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
