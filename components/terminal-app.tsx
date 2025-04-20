"use client"

import { useState, useEffect } from "react"
import { Circle } from "lucide-react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { TerminalHeader } from "@/components/terminal/terminal-header"
import { TerminalSidebar } from "@/components/terminal/terminal-sidebar"
import { TerminalFooter } from "@/components/terminal/terminal-footer"
import { AnalyticsView } from "@/components/views/analytics-view"
import { DashboardView } from "@/components/views/dashboard-view"
import { MyAssetsView } from "@/components/views/my-assets-view"
import { ProfileView } from "@/components/views/profile-view"
import { TokenizeView } from "@/components/views/tokenize-view"
import { TransferView } from "@/components/views/transfer-view"
import { ValidateView } from "@/components/views/validate-view"
import { WalletView } from "@/components/views/wallet-view"
import { SettingsView } from "@/components/views/settings-view"
import { AssetCategoryView } from "@/components/views/asset-category-view"
import { CommandPalette } from "@/components/terminal/command-palette"
import { LendingView } from "@/components/views/lending-view"

export function TerminalApp() {
  const {
    currentPath,
    setCurrentPath,
    isConnected,
    connect,
    activeView,
    setActiveView,
    isCommandPaletteOpen,
    closeCommandPalette,
  } = useTerminal()
  const [isLoading, setIsLoading] = useState(true)
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)

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
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
        if (window.innerWidth < 768) {
          // Default to hidden sidebar on mobile and small tablets
          setSidebarVisible(false)
        }
      } else {
        // On larger screens, always show sidebar (expanded or collapsed)
        setSidebarVisible(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", checkMobile)
    }
  }, [connect])

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

  const toggleSidebar = () => {
    if (window.innerWidth < 640) {
      setSidebarVisible(!sidebarVisible)
    } else if (window.innerWidth < 1024) {
      // For tablet view, toggle visibility instead of just collapsing
      setSidebarVisible(!sidebarVisible)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden terminal-window">
      <TerminalHeader onToggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
      <div className="flex flex-1 overflow-hidden h-[calc(100%-4rem)] relative">
        {/* Semi-transparent overlay for mobile/tablet */}
        {sidebarVisible && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ease-in-out"
            onClick={() => setSidebarVisible(false)}
            aria-hidden="true"
          />
        )}

        {sidebarVisible && (
          <TerminalSidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            onClose={() => setSidebarVisible(false)}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-hidden terminal-content-wrapper pb-8">
            {activeView === "dashboard" && <DashboardView />}
            {activeView === "analytics" && <AnalyticsView />}
            {activeView === "lending" && <LendingView />}
            {activeView === "collection" && <MyAssetsView />}
            {activeView === "tokenize" && <TokenizeView />}
            {activeView === "transfer" && <TransferView />}
            {activeView === "validate" && <ValidateView />}
            {activeView === "wallet" && <WalletView />}
            {activeView === "settings" && <SettingsView />}
            {activeView === "profile" && <ProfileView />}
            {(activeView === "real-estate" || activeView === "vehicles" || activeView === "equipment") && (
              <AssetCategoryView category={activeView} />
            )}
          </div>
          <TerminalFooter />
        </div>
      </div>
      <CommandPalette open={isCommandPaletteOpen} onOpenChange={closeCommandPalette} />
    </div>
  )
}
