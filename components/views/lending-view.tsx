"use client"

import { useState } from "react"
import { AlertTriangle, ArrowDown, ArrowUp, CircleCheck, DollarSign, Info, Wallet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function LendingView() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for charts
  const lendingHistoryData = [
    { date: "2025-03-01", supplied: 80000, borrowed: 30000 },
    { date: "2025-03-08", supplied: 95000, borrowed: 35000 },
    { date: "2025-03-15", supplied: 110000, borrowed: 42000 },
    { date: "2025-03-22", supplied: 105000, borrowed: 48000 },
    { date: "2025-03-29", supplied: 115000, borrowed: 42000 },
    { date: "2025-04-05", supplied: 120000, borrowed: 45000 },
    { date: "2025-04-12", supplied: 125450, borrowed: 45200 },
  ]

  const healthFactorData = [
    { date: "2025-03-01", factor: 2.1 },
    { date: "2025-03-08", factor: 2.05 },
    { date: "2025-03-15", factor: 1.95 },
    { date: "2025-03-22", factor: 1.75 },
    { date: "2025-03-29", factor: 1.9 },
    { date: "2025-04-05", factor: 1.82 },
    { date: "2025-04-12", factor: 1.85 },
  ]

  const assetDistribution = [
    { name: "ETH", value: 32.5, color: "#627EEA" },
    { name: "USDC", value: 50, color: "#2775CA" },
    { name: "DEED-RE", value: 17.5, color: "#FF6B4A" },
  ]

  const interestRateData = [
    { date: "2025-03-01", supply: 3.8, borrow: 5.2 },
    { date: "2025-03-08", supply: 3.9, borrow: 5.4 },
    { date: "2025-03-15", supply: 4.0, borrow: 5.5 },
    { date: "2025-03-22", supply: 4.1, borrow: 5.6 },
    { date: "2025-03-29", supply: 4.2, borrow: 5.7 },
    { date: "2025-04-05", supply: 4.2, borrow: 5.8 },
    { date: "2025-04-12", supply: 4.2, borrow: 5.8 },
  ]

  return (
    <div className="terminal-content p-4 overflow-auto h-full">
      <div className="mb-6">
        <h1 className="text-xl font-mono text-green-500 mb-1">Lending Terminal</h1>
        <p className="text-sm text-zinc-400">Borrow against your assets or supply liquidity to earn interest</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-black border border-zinc-800 mb-4">
          <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800/50 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="borrow" className="data-[state=active]:bg-zinc-800/50 data-[state=active]:text-white">
            Borrow
          </TabsTrigger>
          <TabsTrigger value="lend" className="data-[state=active]:bg-zinc-800/50 data-[state=active]:text-white">
            Lend
          </TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-zinc-800/50 data-[state=active]:text-white">
            Market
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-transparent border-zinc-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-zinc-400">Total Supplied</CardTitle>
                <CardDescription className="text-xs text-zinc-500">Your lending positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono text-green-500">$125,450</div>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>+4.2% APY</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-zinc-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-zinc-400">Total Borrowed</CardTitle>
                <CardDescription className="text-xs text-zinc-500">Your outstanding loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono text-amber-500">$45,200</div>
                <div className="flex items-center text-xs text-amber-500 mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>2.8% APR</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-zinc-800 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-zinc-400">Health Factor</CardTitle>
                <CardDescription className="text-xs text-zinc-500">Collateral safety margin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono text-green-500">1.85</div>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <CircleCheck className="h-3 w-3 mr-1" />
                  <span>Safe (min: 1.05)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="bg-amber-950/30 border-amber-800 text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-sm font-mono">Attention</AlertTitle>
            <AlertDescription className="text-xs">
              Market volatility detected. Consider increasing your collateral to maintain a healthy position.
            </AlertDescription>
          </Alert>

          {/* Lending History Chart */}
          <Card className="bg-transparent border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-zinc-400">Lending History</CardTitle>
              <CardDescription className="text-xs text-zinc-500">Supply and borrow trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={lendingHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
                    <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
                      labelStyle={{ color: "#999" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />
                    <Area
                      type="monotone"
                      dataKey="supplied"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                      name="Supplied"
                    />
                    <Area
                      type="monotone"
                      dataKey="borrowed"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.3}
                      name="Borrowed"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Health Factor Chart */}
            <Card className="bg-transparent border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-zinc-400">Health Factor Trend</CardTitle>
                <CardDescription className="text-xs text-zinc-500">Collateral safety over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={healthFactorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
                      <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
                        labelStyle={{ color: "#999" }}
                      />
                      <Line type="monotone" dataKey="factor" stroke="#10B981" strokeWidth={2} name="Health Factor" />
                      <Line
                        type="monotone"
                        dataKey={() => 1.05}
                        stroke="#EF4444"
                        strokeDasharray="3 3"
                        name="Minimum Safe"
                        strokeWidth={1}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Asset Distribution Chart */}
            <Card className="bg-transparent border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-zinc-400">Asset Distribution</CardTitle>
                <CardDescription className="text-xs text-zinc-500">Your lending portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {assetDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}`, ""]}
                        contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
                        labelStyle={{ color: "#999" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-zinc-400">Your Positions</h3>
            <div className="border border-zinc-800 rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-zinc-900/50">
                  <tr>
                    <th className="text-left p-2 text-zinc-400 font-normal">Asset</th>
                    <th className="text-right p-2 text-zinc-400 font-normal">Supplied</th>
                    <th className="text-right p-2 text-zinc-400 font-normal">APY</th>
                    <th className="text-right p-2 text-zinc-400 font-normal">Borrowed</th>
                    <th className="text-right p-2 text-zinc-400 font-normal">APR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr className="bg-transparent">
                    <td className="p-2 text-white">ETH</td>
                    <td className="p-2 text-right text-white">32.5</td>
                    <td className="p-2 text-right text-green-500">3.2%</td>
                    <td className="p-2 text-right text-white">0</td>
                    <td className="p-2 text-right text-zinc-500">-</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="p-2 text-white">USDC</td>
                    <td className="p-2 text-right text-white">50,000</td>
                    <td className="p-2 text-right text-green-500">5.1%</td>
                    <td className="p-2 text-right text-white">0</td>
                    <td className="p-2 text-right text-zinc-500">-</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="p-2 text-white">DEED-RE</td>
                    <td className="p-2 text-right text-white">0</td>
                    <td className="p-2 text-right text-zinc-500">-</td>
                    <td className="p-2 text-right text-white">3</td>
                    <td className="p-2 text-right text-amber-500">2.8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-zinc-400">Recent Transactions</h3>
            <div className="border border-zinc-800 rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-zinc-900/50">
                  <tr>
                    <th className="text-left p-2 text-zinc-400 font-normal">Type</th>
                    <th className="text-left p-2 text-zinc-400 font-normal">Asset</th>
                    <th className="text-right p-2 text-zinc-400 font-normal">Amount</th>
                    <th className="text-right p-2 text-zinc-400 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr className="bg-transparent">
                    <td className="p-2 text-green-500">Supply</td>
                    <td className="p-2 text-white">ETH</td>
                    <td className="p-2 text-right text-white">10.0</td>
                    <td className="p-2 text-right text-zinc-500">2025-04-18</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="p-2 text-amber-500">Borrow</td>
                    <td className="p-2 text-white">DEED-RE</td>
                    <td className="p-2 text-right text-white">3.0</td>
                    <td className="p-2 text-right text-zinc-500">2025-04-15</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="p-2 text-green-500">Supply</td>
                    <td className="p-2 text-white">USDC</td>
                    <td className="p-2 text-right text-white">50,000</td>
                    <td className="p-2 text-right text-zinc-500">2025-04-10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Borrow Tab */}
        <TabsContent value="borrow" className="space-y-4">
          <Card className="bg-transparent border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-normal text-zinc-400">Borrow Assets</CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Use your supplied assets as collateral to borrow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Asset to Borrow</label>
                    <div className="flex items-center border border-zinc-800 rounded-md p-2">
                      <select className="w-full bg-transparent text-white outline-none">
                        <option value="eth">ETH</option>
                        <option value="usdc">USDC</option>
                        <option value="deed-re">DEED-RE</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Amount</label>
                    <div className="flex items-center border border-zinc-800 rounded-md p-2">
                      <input type="text" placeholder="0.0" className="w-full bg-transparent text-white outline-none" />
                      <Button variant="outline" size="sm" className="ml-2 h-7 px-2 text-xs">
                        MAX
                      </Button>
                    </div>
                    <div className="text-xs text-zinc-500">Available: 15.5 ETH</div>
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-md p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Health Factor After</span>
                    <span className="text-green-500">1.65</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Liquidation Threshold</span>
                    <span className="text-amber-500">1.05</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Borrow APR</span>
                    <span className="text-white">2.8%</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Wallet className="h-4 w-4 mr-2" />
                  Borrow Asset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interest Rate Chart */}
          <Card className="bg-transparent border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-zinc-400">Interest Rate Trends</CardTitle>
              <CardDescription className="text-xs text-zinc-500">Supply and borrow rates over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={interestRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
                    <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
                      labelStyle={{ color: "#999" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />
                    <Line type="monotone" dataKey="supply" stroke="#10B981" strokeWidth={2} name="Supply APY" />
                    <Line type="monotone" dataKey="borrow" stroke="#F59E0B" strokeWidth={2} name="Borrow APR" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lend Tab */}
        <TabsContent value="lend" className="space-y-4">
          <Card className="bg-transparent border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-normal text-zinc-400">Supply Assets</CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Earn interest by supplying assets to the protocol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Asset to Supply</label>
                    <div className="flex items-center border border-zinc-800 rounded-md p-2">
                      <select className="w-full bg-transparent text-white outline-none">
                        <option value="eth">ETH</option>
                        <option value="usdc">USDC</option>
                        <option value="deed-re">DEED-RE</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Amount</label>
                    <div className="flex items-center border border-zinc-800 rounded-md p-2">
                      <input type="text" placeholder="0.0" className="w-full bg-transparent text-white outline-none" />
                      <Button variant="outline" size="sm" className="ml-2 h-7 px-2 text-xs">
                        MAX
                      </Button>
                    </div>
                    <div className="text-xs text-zinc-500">Wallet Balance: 5.2 ETH</div>
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-md p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Supply APY</span>
                    <span className="text-green-500">3.2%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Collateral Usage</span>
                    <span className="text-white">Enabled</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Supply Asset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Liquidity Chart */}
          <Card className="bg-transparent border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-zinc-400">Market Liquidity</CardTitle>
              <CardDescription className="text-xs text-zinc-500">Available liquidity by asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "ETH", value: 1250, color: "#627EEA" },
                        { name: "USDC", value: 3500, color: "#2775CA" },
                        { name: "DEED-RE", value: 750, color: "#FF6B4A" },
                        { name: "BTC", value: 500, color: "#F7931A" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: "ETH", value: 1250, color: "#627EEA" },
                        { name: "USDC", value: 3500, color: "#2775CA" },
                        { name: "DEED-RE", value: 750, color: "#FF6B4A" },
                        { name: "BTC" },
                        { name: "DEED-RE", value: 750, color: "#FF6B4A" },
                        { name: "BTC", value: 500, color: "#F7931A" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}`, ""]}
                      contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
                      labelStyle={{ color: "#999" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px", color: "#999" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market" className="space-y-4">
          <div className="border border-zinc-800 rounded-md overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="text-left p-2 text-zinc-400 font-normal">Asset</th>
                  <th className="text-right p-2 text-zinc-400 font-normal">Total Supply</th>
                  <th className="text-right p-2 text-zinc-400 font-normal">Supply APY</th>
                  <th className="text-right p-2 text-zinc-400 font-normal">Total Borrowed</th>
                  <th className="text-right p-2 text-zinc-400 font-normal">Borrow APR</th>
                  <th className="text-center p-2 text-zinc-400 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr className="bg-transparent">
                  <td className="p-2 text-white">ETH</td>
                  <td className="p-2 text-right text-white">1,250 ETH</td>
                  <td className="p-2 text-right text-green-500">3.2%</td>
                  <td className="p-2 text-right text-white">850 ETH</td>
                  <td className="p-2 text-right text-amber-500">4.5%</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Supply
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Borrow
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-transparent">
                  <td className="p-2 text-white">USDC</td>
                  <td className="p-2 text-right text-white">3.5M USDC</td>
                  <td className="p-2 text-right text-green-500">5.1%</td>
                  <td className="p-2 text-right text-white">2.8M USDC</td>
                  <td className="p-2 text-right text-amber-500">6.2%</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Supply
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Borrow
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-transparent">
                  <td className="p-2 text-white">DEED-RE</td>
                  <td className="p-2 text-right text-white">750 DEED-RE</td>
                  <td className="p-2 text-right text-green-500">2.8%</td>
                  <td className="p-2 text-right text-white">320 DEED-RE</td>
                  <td className="p-2 text-right text-amber-500">3.5%</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Supply
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Borrow
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-transparent">
                  <td className="p-2 text-white">BTC</td>
                  <td className="p-2 text-right text-white">45 BTC</td>
                  <td className="p-2 text-right text-green-500">2.5%</td>
                  <td className="p-2 text-right text-white">32 BTC</td>
                  <td className="p-2 text-right text-amber-500">3.2%</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Supply
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Borrow
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Card className="bg-transparent border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-zinc-400">Market Information</CardTitle>
              <CardDescription className="text-xs text-zinc-500">Protocol statistics and health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-zinc-800 rounded-md p-3">
                  <div className="text-xs text-zinc-400 mb-1">Total Value Locked</div>
                  <div className="text-lg font-mono text-white">$8.45M</div>
                </div>
                <div className="border border-zinc-800 rounded-md p-3">
                  <div className="text-xs text-zinc-400 mb-1">Total Borrowed</div>
                  <div className="text-lg font-mono text-white">$5.2M</div>
                </div>
                <div className="border border-zinc-800 rounded-md p-3">
                  <div className="text-xs text-zinc-400 mb-1">Utilization Rate</div>
                  <div className="text-lg font-mono text-white">61.5%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-zinc-900/50 border-zinc-800">
            <Info className="h-4 w-4" />
            <AlertTitle className="text-sm font-mono">Market Information</AlertTitle>
            <AlertDescription className="text-xs">
              All lending and borrowing operations are secured by smart contracts on the blockchain. Interest rates are
              determined algorithmically based on supply and demand.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
