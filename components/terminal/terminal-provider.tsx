"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode, type Dispatch, type SetStateAction } from "react"
import type { AssetType } from "../../types"

interface TerminalContextType {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  activeView:
    | "dashboard"
    | "analytics"
    | "portfolio"
    | "tokenize"
    | "validate"
    | "market"
    | "transactions"
    | "wallet"
    | "settings"
    | "profile"
    | "my-assets"
    | "transfer"
    | "alerts"
    | "lending"
    | "asset-detail"
    | "asset-comparison"
    | "real-estate"
    | "vehicles"
    | "equipment"
    | "collection"
  setActiveView: Dispatch<SetStateAction<TerminalContextType["activeView"]>>
  selectedAssets: AssetType[]
  setSelectedAssets: Dispatch<SetStateAction<AssetType[]>>
  isSidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  isAlertsOpen: boolean
  setAlertsOpen: Dispatch<SetStateAction<boolean>>
  isSettingsOpen: boolean
  setSettingsOpen: Dispatch<SetStateAction<boolean>>
  isProfileOpen: boolean
  setProfileOpen: Dispatch<SetStateAction<boolean>>
  isAssetDetailOpen: boolean
  setAssetDetailOpen: Dispatch<SetStateAction<boolean>>
  selectedAsset: AssetType | null
  setSelectedAsset: Dispatch<SetStateAction<AssetType | null>>
  isTransferModalOpen: boolean
  setTransferModalOpen: Dispatch<SetStateAction<boolean>>
  lastCommand: string
  setLastCommand: Dispatch<SetStateAction<string>>
  currentPath: string
  setCurrentPath: Dispatch<SetStateAction<string>>
  commandHistory: string[]
  addToHistory: (command: string) => void
  isConnected: boolean
  connect: () => void
  disconnect: () => void
  isCommandPaletteOpen: boolean
  openCommandPalette: () => void
  closeCommandPalette: () => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

interface TerminalProviderProps {
  children: ReactNode
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [activeView, setActiveView] = useState<TerminalContextType["activeView"]>("dashboard")
  const [selectedAssets, setSelectedAssets] = useState<AssetType[]>([])
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [isAlertsOpen, setAlertsOpen] = useState<boolean>(false)
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false)
  const [isAssetDetailOpen, setAssetDetailOpen] = useState<boolean>(false)
  const [selectedAsset, setSelectedAsset] = useState<AssetType | null>(null)
  const [isTransferModalOpen, setTransferModalOpen] = useState<boolean>(false)
  const [lastCommand, setLastCommand] = useState<string>("")
  const [currentPath, setCurrentPath] = useState<string>("/")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false)

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
        activeTab,
        setActiveTab,
        activeView,
        setActiveView,
        selectedAssets,
        setSelectedAssets,
        isSidebarOpen,
        setSidebarOpen,
        isAlertsOpen,
        setAlertsOpen,
        isSettingsOpen,
        setSettingsOpen,
        isProfileOpen,
        setProfileOpen,
        isAssetDetailOpen,
        setAssetDetailOpen,
        selectedAsset,
        setSelectedAsset,
        isTransferModalOpen,
        setTransferModalOpen,
        lastCommand,
        setLastCommand,
        currentPath,
        setCurrentPath,
        commandHistory,
        addToHistory,
        isConnected,
        connect,
        disconnect,
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

export const useTerminal = () => {
  const context = useContext(TerminalContext)
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider")
  }
  return context
}
