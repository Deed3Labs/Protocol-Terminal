"use client"

import { useState, useEffect } from "react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { DashboardView } from "@/components/views/dashboard-view"
import { TokenizeView } from "@/components/views/tokenize-view"
import { TransferView } from "@/components/views/transfer-view"
import { ValidateView } from "@/components/views/validate-view"
import { PortfolioView } from "@/components/views/portfolio-view"
import { MarketView } from "@/components/views/market-view"
import { TransactionsView } from "@/components/views/transactions-view"
import { WalletView } from "@/components/views/wallet-view"
import { SettingsView } from "@/components/views/settings-view"
import { ProfileView } from "@/components/views/profile-view"
import { AssetCategoryView } from "@/components/views/asset-category-view"
import { LendingView } from "@/components/views/lending-view"
import { AssetDetailView } from "@/components/views/asset-detail-view"
import { AssetComparisonView } from "@/components/views/asset-comparison-view"

export function MainTerminal() {
  const { activeTab } = useTerminal()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-green-500 font-mono">Loading terminal view...</div>
          <div className="mt-2 h-1 w-48 bg-zinc-800">
            <div
              className="h-full bg-green-500 animate-[progress_1.5s_ease-in-out_infinite]"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      {activeTab === "dashboard" && <DashboardView />}
      {activeTab === "portfolio" && <PortfolioView />}
      {activeTab === "tokenize" && <TokenizeView />}
      {activeTab === "transfer" && <TransferView />}
      {activeTab === "validate" && <ValidateView />}
      {activeTab === "market" && <MarketView />}
      {activeTab === "transactions" && <TransactionsView />}
      {activeTab === "wallet" && <WalletView />}
      {activeTab === "settings" && <SettingsView />}
      {activeTab === "profile" && <ProfileView />}
      {activeTab === "lending" && <LendingView />}
      {activeTab === "asset-detail" && <AssetDetailView />}
      {activeTab === "asset-comparison" && <AssetComparisonView />}
      {(activeTab === "real-estate" ||
        activeTab === "vehicles" ||
        activeTab === "equipment" ||
        activeTab === "collection") && <AssetCategoryView category={activeTab} />}
    </div>
  )
}
