"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Calendar, Download, LineChart, PieChart, RefreshCw } from "lucide-react"

// Import chart components
import { AssetValueChart } from "@/components/analytics/asset-value-chart"
import { AssetDistributionChart } from "@/components/analytics/asset-distribution-chart"
import { AssetPerformanceTable } from "@/components/analytics/asset-performance-table"
import { MarketTrendsChart } from "@/components/analytics/market-trends-chart"
import { TransactionLog } from "@/components/analytics/transaction-log"
import { PortfolioSummary } from "@/components/analytics/portfolio-summary"
import { AlertsPanel } from "@/components/analytics/alerts-panel"

export function AnalyticsDashboard() {
  return (
    <div className="flex flex-col gap-6 p-4 font-mono">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-terminal-green">Analytics Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
          >
            <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black border-terminal-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-terminal-green">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-green">$4,250,000</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+5.2%</span>
              <span className="text-xs text-terminal-green/70 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black border-terminal-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-terminal-green">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-green">$32,450</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+2.4%</span>
              <span className="text-xs text-terminal-green/70 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black border-terminal-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-terminal-green">Asset Appreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-green">+8.7%</div>
            <div className="flex items-center mt-1">
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-500">-1.3%</span>
              <span className="text-xs text-terminal-green/70 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-black border border-terminal-green grid grid-cols-4 mb-4">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-terminal-green data-[state=active]:text-black">
            Market
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
          >
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green flex items-center">
                  <LineChart className="mr-2 h-4 w-4" /> Asset Value Over Time
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-terminal-green hover:bg-terminal-green/10">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <AssetValueChart />
              </CardContent>
            </Card>

            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green flex items-center">
                  <PieChart className="mr-2 h-4 w-4" /> Asset Distribution
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-terminal-green hover:bg-terminal-green/10">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <AssetDistributionChart />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green">Asset Performance</CardTitle>
                <Button variant="ghost" size="sm" className="text-terminal-green hover:bg-terminal-green/10">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <AssetPerformanceTable />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green">Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <PortfolioSummary />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green">Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <MarketTrendsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green">Transaction Log</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionLog />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-black border-terminal-green">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionLog limit={5} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-black border-terminal-green">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertsPanel />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
