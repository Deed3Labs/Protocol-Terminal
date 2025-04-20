"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, Building2, Car, FileCheck, PlusCircle, Tractor, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AssetGrid } from "@/components/asset-grid"
import { cn } from "@/lib/utils"
import { useTerminal } from "@/components/terminal/terminal-provider"

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

export function DashboardView() {
  const { addToHistory, setActiveView } = useTerminal()
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [welcomeIndex, setWelcomeIndex] = useState(0)

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    addToHistory(`filter --category=${tab}`)
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
          <div className="mb-8">
            <h1 className="text-xl font-bold tracking-tight">RWA Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Manage your tokenized real-world assets, mint new tokens, and validate existing ones.
            </p>
          </div>

          <div className="grid gap-4 mb-8 md:grid-cols-4">
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

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleTabChange("all")}
              >
                All Assets
              </Button>
              <Button
                variant={activeTab === "real-estate" ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleTabChange("real-estate")}
              >
                <Building2 className="h-3.5 w-3.5 mr-1" />
                Real Estate
              </Button>
              <Button
                variant={activeTab === "vehicles" ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleTabChange("vehicles")}
              >
                <Car className="h-3.5 w-3.5 mr-1" />
                Vehicles
              </Button>
              <Button
                variant={activeTab === "equipment" ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleTabChange("equipment")}
              >
                <Tractor className="h-3.5 w-3.5 mr-1" />
                Equipment
              </Button>
            </div>

            <div className="mt-6">
              <AssetGrid category={activeTab === "all" ? undefined : activeTab} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => setActiveView("tokenize")}>
              <PlusCircle className="h-3.5 w-3.5" />
              Tokenize New Asset
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => setActiveView("validate")}>
              <FileCheck className="h-3.5 w-3.5" />
              Validate Asset
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
