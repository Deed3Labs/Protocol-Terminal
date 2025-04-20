"use client"

import { useState, useEffect } from "react"
import { AssetValueChart } from "@/components/analytics/asset-value-chart"
import { AssetDistributionChart } from "@/components/analytics/asset-distribution-chart"
import { AssetPerformanceTable } from "@/components/analytics/asset-performance-table"
import { MarketTrendsChart } from "@/components/analytics/market-trends-chart"
import { TransactionLog } from "@/components/analytics/transaction-log"
import { PortfolioSummary } from "@/components/analytics/portfolio-summary"
import { AlertsPanel } from "@/components/analytics/alerts-panel"
import { CommandLine } from "@/components/analytics/command-line"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, RefreshCw, Download, Clock, Calendar, ChevronDown } from "lucide-react"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/components/notifications/notification-provider"

export function AnalyticsTerminal() {
  const { addToHistory } = useTerminal()
  const { addNotification } = useNotifications()
  const [timeRange, setTimeRange] = useState<"1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all">("1m")
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "market" | "transactions" | "alerts">(
    "overview",
  )
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Simulate loading data
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)

            // Add initial notification when analytics loads
            addNotification({
              title: "Analytics Dashboard Ready",
              message: "Your portfolio data has been loaded and analyzed.",
              severity: "info",
              source: "analytics",
            })

            // Schedule some demo notifications
            setTimeout(() => {
              addNotification({
                title: "Unusual Market Activity",
                message: "We've detected unusual price movements in the real estate sector.",
                severity: "warning",
                source: "market-analysis",
                action: {
                  label: "View Details",
                  onClick: () => setActiveTab("market"),
                },
              })
            }, 30000)

            setTimeout(() => {
              addNotification({
                title: "Portfolio Milestone",
                message: "Your portfolio has reached $4.25M in total value!",
                severity: "success",
                source: "portfolio-tracker",
                action: {
                  label: "View Portfolio",
                  onClick: () => setActiveTab("portfolio"),
                },
              })
            }, 60000)
          }, 200)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [addNotification])

  const handleTabChange = (tab: "overview" | "portfolio" | "market" | "transactions" | "alerts") => {
    setActiveTab(tab)
    addToHistory(`view --section=${tab}`)
  }

  const handleTimeRangeChange = (range: "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all") => {
    setTimeRange(range)
    addToHistory(`timerange --set=${range}`)

    // Add notification when time range changes
    addNotification({
      title: "Time Range Updated",
      message: `Analytics view updated to ${range.toUpperCase()} time range.`,
      severity: "info",
      source: "analytics",
    })
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setLoadingProgress(0)
    addToHistory("refresh --data")

    // Add notification when data is refreshed
    addNotification({
      title: "Data Refresh Initiated",
      message: "Fetching the latest market and portfolio data...",
      severity: "info",
      source: "data-service",
    })
  }

  if (isLoading) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-green-500">Loading analytics data...</div>
            <div className="text-xs text-zinc-500">{loadingProgress}%</div>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="mt-4 text-xs text-zinc-500 font-mono">
            <div>$ fetching market data...</div>
            <div>$ loading portfolio metrics...</div>
            <div>$ analyzing asset performance...</div>
            <div>$ generating visualizations...</div>
            {loadingProgress > 80 && <div>$ preparing terminal interface...</div>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="terminal-content">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold tracking-tight mr-4">RWA Analytics Terminal</h1>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock className="h-3 w-3" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search analytics..."
              className="w-full sm:w-64 pl-8 h-8 bg-zinc-900 border-zinc-700 text-xs"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap"
            onClick={() => {
              addNotification({
                title: "Export Complete",
                message: "Your analytics data has been exported successfully.",
                severity: "success",
                source: "export-service",
              })
            }}
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as any)} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto justify-between">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleTabChange("overview")}>Overview</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTabChange("portfolio")}>Portfolio</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTabChange("market")}>Market</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTabChange("transactions")}>Transactions</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTabChange("alerts")}>Alerts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <TabsList className="bg-zinc-900 p-0 h-8">
              <TabsTrigger
                value="overview"
                className={`text-xs px-3 h-8 ${activeTab === "overview" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className={`text-xs px-3 h-8 ${activeTab === "portfolio" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
              >
                Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="market"
                className={`text-xs px-3 h-8 ${activeTab === "market" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
              >
                Market
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className={`text-xs px-3 h-8 ${
                  activeTab === "transactions" ? "bg-zinc-800 text-white" : "text-zinc-400"
                }`}
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className={`text-xs px-3 h-8 ${activeTab === "alerts" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
              >
                Alerts
              </TabsTrigger>
            </TabsList>
          )}

          {isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto justify-between">
                  {timeRange.toUpperCase()}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("1d")}>1D</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("1w")}>1W</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("1m")}>1M</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("3m")}>3M</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("6m")}>6M</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("1y")}>1Y</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeRangeChange("all")}>ALL</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${timeRange === "1d" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                onClick={() => handleTimeRangeChange("1d")}
              >
                1D
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${timeRange === "1w" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                onClick={() => handleTimeRangeChange("1w")}
              >
                1W
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${timeRange === "1m" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                onClick={() => handleTimeRangeChange("1m")}
              >
                1M
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${timeRange === "3m" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                onClick={() => handleTimeRangeChange("3m")}
              >
                3M
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${timeRange === "6m" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                onClick={() => handleTimeRangeChange("6m")}
              >
                6M
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${timeRange === "1y" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                onClick={() => handleTimeRangeChange("1y")}
              >
                1Y
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${timeRange === "all" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
                onClick={() => handleTimeRangeChange("all")}
              >
                ALL
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-zinc-500">
                <Calendar className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <PortfolioSummary />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="terminal-card lg:col-span-2">
              <h3 className="text-xs font-medium mb-4">PORTFOLIO PERFORMANCE</h3>
              <div className="h-[400px]">
                <AssetValueChart timeRange={timeRange} detailed />
              </div>
            </div>

            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">ASSET ALLOCATION</h3>
              <div className="h-[400px]">
                <AssetDistributionChart detailed />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">MARKET TRENDS</h3>
              <div className="h-[300px]">
                <MarketTrendsChart timeRange={timeRange} />
              </div>
            </div>

            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">RECENT TRANSACTIONS</h3>
              <TransactionLog limit={5} />
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">ASSET PERFORMANCE</h3>
            <AssetPerformanceTable />
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="terminal-card lg:col-span-2">
              <h3 className="text-xs font-medium mb-4">PORTFOLIO PERFORMANCE</h3>
              <div className="h-[500px]">
                <AssetValueChart timeRange={timeRange} detailed />
              </div>
            </div>

            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">ASSET ALLOCATION</h3>
              <div className="h-[500px]">
                <AssetDistributionChart detailed />
              </div>
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">DETAILED ASSET PERFORMANCE</h3>
            <AssetPerformanceTable detailed />
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-0 space-y-6">
          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">MARKET TRENDS</h3>
            <div className="h-[400px]">
              <MarketTrendsChart timeRange={timeRange} detailed />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">REAL ESTATE MARKET INDEX</h3>
              <div className="h-[300px]">
                <AssetValueChart category="real-estate" timeRange={timeRange} />
              </div>
            </div>

            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">VEHICLE MARKET INDEX</h3>
              <div className="h-[300px]">
                <AssetValueChart category="vehicles" timeRange={timeRange} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-0 space-y-6">
          <div className="terminal-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium">TRANSACTION HISTORY</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Filter className="h-3 w-3 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            <TransactionLog detailed />
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="mt-0 space-y-6">
          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">ALERTS & NOTIFICATIONS</h3>
            <AlertsPanel detailed />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <CommandLine />
      </div>
    </div>
  )
}
