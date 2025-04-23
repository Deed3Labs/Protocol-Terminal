"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  LineChart,
  PieChart,
  RefreshCw,
  Shield,
  Server,
  Activity,
  Zap,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { AssetDistributionChart } from "@/components/analytics/asset-distribution-chart"
import { MarketTrendsChart } from "@/components/analytics/market-trends-chart"
import { TransactionLog } from "@/components/analytics/transaction-log"
import { AlertsPanel } from "@/components/analytics/alerts-panel"
import { ProtocolMetrics } from "@/components/analytics/protocol-metrics"
import { MarketIndicators } from "@/components/analytics/market-indicators"
import { SecurityAuditHistory } from "@/components/analytics/security-audit-history"

export function AnalyticsDashboard() {
  // Health metrics data
  const healthMetrics = [
    {
      name: "Network Uptime",
      value: "99.98%",
      change: "+0.01%",
      trend: "up",
      icon: Server,
    },
    {
      name: "Transaction Success Rate",
      value: "99.82%",
      change: "-0.03%",
      trend: "down",
      icon: Activity,
    },
    {
      name: "Security Score",
      value: "94/100",
      change: "+2",
      trend: "up",
      icon: Shield,
    },
    {
      name: "Response Time",
      value: "124ms",
      change: "-8ms",
      trend: "up",
      icon: Zap,
    },
  ]

  // Risk metrics data
  const riskMetrics = [
    {
      name: "Smart Contract Vulnerability",
      score: 15,
      level: "low",
      description: "Low risk of smart contract exploits based on recent audits",
      icon: Shield,
    },
    {
      name: "Liquidity Risk",
      score: 42,
      level: "medium",
      description: "Medium risk due to concentrated liquidity in specific pools",
      icon: AlertTriangle,
    },
    {
      name: "Oracle Manipulation",
      score: 28,
      level: "medium",
      description: "Multiple price feeds with moderate decentralization",
      icon: AlertOctagon,
    },
    {
      name: "Governance Attack",
      score: 12,
      level: "low",
      description: "Governance structure has strong security measures",
      icon: Shield,
    },
  ]

  // Security checks data
  const securityChecks = [
    {
      name: "Reentrancy Protection",
      status: "pass",
      details: "All contracts implement reentrancy guards",
    },
    {
      name: "Access Control",
      status: "pass",
      details: "Role-based access control properly implemented",
    },
    {
      name: "Oracle Security",
      status: "warning",
      details: "Using 2 oracles, recommend minimum of 3",
    },
    {
      name: "Dependency Audit",
      status: "fail",
      details: "Using outdated dependency with known vulnerability",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-terminal-green" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <Shield className="h-4 w-4 text-terminal-green" />
      case "medium":
        return <Info className="h-4 w-4 text-yellow-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "critical":
        return <AlertOctagon className="h-4 w-4 text-red-500" />
      default:
        return <Shield className="h-4 w-4 text-terminal-green" />
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-terminal-green"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-orange-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-terminal-green"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 font-mono">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-terminal-green">Protocol Analytics</h2>
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
            <CardTitle className="text-sm font-medium text-terminal-green">Total Protocol TVL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-green">$142.8M</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+8.4%</span>
              <span className="text-xs text-terminal-green/70 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black border-terminal-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-terminal-green">Daily Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-green">$12.5M</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+15.2%</span>
              <span className="text-xs text-terminal-green/70 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black border-terminal-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-terminal-green">Network Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-green">98%</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+2%</span>
              <span className="text-xs text-terminal-green/70 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-black border border-terminal-green grid grid-cols-5 mb-4">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="protocol"
            className="data-[state=active]:bg-terminal-green data-[state=active]:text-black"
          >
            Protocol
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
          <TabsTrigger value="health" className="data-[state=active]:bg-terminal-green data-[state=active]:text-black">
            Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green flex items-center">
                  <LineChart className="mr-2 h-4 w-4" /> Protocol Metrics
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-terminal-green hover:bg-terminal-green/10">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <ProtocolMetrics />
                </div>
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
                <div className="h-[300px]">
                  <AssetDistributionChart />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green">Market Indicators</CardTitle>
                <Button variant="ghost" size="sm" className="text-terminal-green hover:bg-terminal-green/10">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <MarketIndicators />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="protocol" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-black border-terminal-green">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-terminal-green">Protocol Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ProtocolMetrics />
                </div>
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
                <div className="h-[300px]">
                  <MarketTrendsChart />
                </div>
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

        <TabsContent value="health" className="mt-0">
          {/* Protocol Health Metrics Section */}
          <Card className="bg-black border-terminal-green mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">PROTOCOL HEALTH METRICS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthMetrics.map((metric) => (
                  <div key={metric.name} className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <metric.icon className="h-5 w-5 text-terminal-green mr-2" />
                      <div>
                        <p className="text-xs text-zinc-400">{metric.name}</p>
                        <p className="text-2xl font-mono">{metric.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {metric.trend === "up" && <ArrowUp className="h-3 w-3 text-green-500 mr-1" />}
                      {metric.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                      <span className={metric.trend === "up" ? "text-xs text-green-500" : "text-xs text-red-500"}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-terminal-green rounded-full"
                        style={{ width: metric.name === "Security Score" ? "94%" : "99%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Protocol Risk Assessment Section */}
          <Card className="bg-black border-terminal-green mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">PROTOCOL RISK ASSESSMENT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskMetrics.map((metric) => (
                  <div key={metric.name} className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        {getRiskIcon(metric.level)}
                        <h3 className="text-sm font-medium text-terminal-green ml-2">{metric.name}</h3>
                      </div>
                      <span className={`text-xs font-medium ${getRiskColor(metric.level)}`}>
                        {metric.level.toUpperCase()}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            metric.level === "low"
                              ? "bg-terminal-green"
                              : metric.level === "medium"
                                ? "bg-yellow-500"
                                : "bg-orange-500"
                          }`}
                          style={{ width: `${metric.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-terminal-green/70">Risk Score</span>
                        <span className="text-xs font-medium text-terminal-green">{metric.score}/100</span>
                      </div>
                    </div>
                    <p className="text-xs text-terminal-green/70">{metric.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Analysis Section */}
          <Card className="bg-black border-terminal-green mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">SECURITY ANALYSIS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityChecks.map((check) => (
                  <div key={check.name} className="bg-zinc-900 border border-zinc-800 p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(check.status)}
                        <span className="text-sm text-terminal-green">{check.name}</span>
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          check.status === "pass"
                            ? "text-terminal-green"
                            : check.status === "warning"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {check.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-terminal-green/70 mt-2">{check.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Audit History Section */}
          <Card className="bg-black border-terminal-green">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">SECURITY AUDIT HISTORY</CardTitle>
            </CardHeader>
            <CardContent>
              <SecurityAuditHistory />
            </CardContent>
          </Card>

          {/* Alerts & Notifications Section */}
          <Card className="bg-black border-terminal-green mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-terminal-green">ALERTS & NOTIFICATIONS</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertsPanel />
            </CardContent>
          </Card>
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
