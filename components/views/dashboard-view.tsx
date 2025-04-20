"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, FileCheck, PlusCircle, TrendingUp, Bell, Wallet, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { Badge } from "@/components/ui/badge"
import { AssetValueChart } from "@/components/analytics/asset-value-chart"
import { TransactionLog } from "@/components/analytics/transaction-log"
import { AlertsPanel } from "@/components/analytics/alerts-panel"

const metrics = [
  {
    name: "Total Assets",
    value: "24",
    change: "+3",
    trend: "up",
  },
  {
    name: "Total Value",
    value: "$4.2M",
    change: "+12%",
    trend: "up",
  },
  {
    name: "Pending Transfers",
    value: "3",
    change: "-1",
    trend: "down",
  },
  {
    name: "Verification Rate",
    value: "98%",
    change: "+2%",
    trend: "up",
  },
]

// Sample recent assets
const recentAssets = [
  {
    id: "1",
    name: "Luxury Condo #42",
    type: "Real Estate",
    value: "$920,000",
    date: "2025-04-18",
    status: "Verified",
  },
  {
    id: "2",
    name: "Tesla Model S",
    type: "Vehicle",
    value: "$95,000",
    date: "2025-04-15",
    status: "Pending",
  },
  {
    id: "3",
    name: "Commercial Building",
    type: "Real Estate",
    value: "$2.65M",
    date: "2025-04-10",
    status: "Verified",
  },
]

export function DashboardView() {
  const { addToHistory, setActiveView } = useTerminal()
  const [isLoading, setIsLoading] = useState(true)
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [welcomeIndex, setWelcomeIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const message =
      "Welcome to Deed Protocol Terminal. Manage your tokenized real-world assets with command-line efficiency."
    let index = 0

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setWelcomeMessage((prev) => prev + message[index])
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => setIsLoading(false), 500)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [])

  const handleAction = (action: string, view: string) => {
    addToHistory(action)
    setActiveView(view)
  }

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex flex-col space-y-4">
          <div className="text-green-500 font-mono">
            <span>{welcomeMessage}</span>
            <span className="terminal-cursor">█</span>
          </div>
          <div className="h-1 bg-zinc-800 w-full">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${(welcomeMessage.length / "Welcome to Deed Protocol Terminal. Manage your tokenized real-world assets with command-line efficiency.".length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
              <p className="text-sm text-zinc-400 mt-1">Welcome back, John Doe</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-zinc-500 hidden md:block">
                {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
              </div>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 mb-6 md:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.name} className="terminal-card">
                <div className="text-[10px] text-zinc-500 uppercase">{metric.name}</div>
                <div className="text-lg font-mono mt-1">{metric.value}</div>
                <div className="flex items-center mt-1">
                  {metric.trend === "up" && <ArrowUp className="h-3 w-3 text-green-500 mr-1" />}
                  {metric.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                  {metric.trend === "neutral" && <TrendingUp className="h-3 w-3 text-zinc-500 mr-1" />}
                  <span
                    className={cn(
                      "text-xs",
                      metric.trend === "up" && "text-green-500",
                      metric.trend === "down" && "text-red-500",
                      metric.trend === "neutral" && "text-zinc-500",
                    )}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="terminal-card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-medium">PORTFOLIO OVERVIEW</h3>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs bg-zinc-800 text-white">
                    1M
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-zinc-500">
                    3M
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-zinc-500">
                    6M
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-zinc-500">
                    1Y
                  </Button>
                </div>
              </div>
              <div className="h-[300px]">
                <AssetValueChart />
              </div>
            </div>

            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">QUICK ACTIONS</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 text-xs"
                  onClick={() => handleAction("tokenize --new", "tokenize")}
                >
                  <PlusCircle className="h-6 w-6 mb-1" />
                  Tokenize Asset
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 text-xs"
                  onClick={() => handleAction("transfer --asset", "transfer")}
                >
                  <ArrowUp className="h-6 w-6 mb-1" />
                  Transfer Asset
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 text-xs"
                  onClick={() => handleAction("validate --asset", "validate")}
                >
                  <FileCheck className="h-6 w-6 mb-1" />
                  Validate Asset
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 text-xs"
                  onClick={() => handleAction("wallet --connect", "wallet")}
                >
                  <Wallet className="h-6 w-6 mb-1" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">RECENT ASSETS</h3>
              <div className="space-y-4">
                {recentAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {asset.type} • {asset.value}
                      </div>
                    </div>
                    <div>
                      <Badge variant={asset.status === "Verified" ? "default" : "secondary"}>{asset.status}</Badge>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => handleAction("ls --assets", "collection")}
                >
                  View All Assets
                </Button>
              </div>
            </div>

            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">RECENT TRANSACTIONS</h3>
              <TransactionLog limit={3} />
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => handleAction("view --transactions", "analytics")}
              >
                View All Transactions
              </Button>
            </div>

            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">ALERTS & NOTIFICATIONS</h3>
              <AlertsPanel />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => handleAction("analytics --view", "analytics")}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              View Analytics
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => handleAction("profile --view", "profile")}
            >
              <User className="h-3.5 w-3.5" />
              View Profile
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
