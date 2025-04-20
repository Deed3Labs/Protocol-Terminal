"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, TrendingUp, TrendingDown, Info } from "lucide-react"

export function LendingDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono">Total Supplied</CardTitle>
            <CardDescription className="text-xs text-zinc-400">Your lending positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono text-green-500">$125,450</div>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+4.2% APY</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono">Total Borrowed</CardTitle>
            <CardDescription className="text-xs text-zinc-400">Your outstanding loans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono text-amber-500">$45,200</div>
            <div className="flex items-center mt-2 text-xs">
              <TrendingDown className="h-3 w-3 mr-1 text-amber-500" />
              <span className="text-amber-500">2.8% APR</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono">Health Factor</CardTitle>
            <CardDescription className="text-xs text-zinc-400">Collateral safety margin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono text-green-500">1.85</div>
            <div className="flex items-center mt-2 text-xs">
              <Info className="h-3 w-3 mr-1 text-zinc-400" />
              <span className="text-zinc-400">Safe (min: 1.05)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-amber-900/20 border-amber-800 text-amber-400">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-xs font-mono">Attention</AlertTitle>
        <AlertDescription className="text-xs">
          Market volatility detected. Consider increasing your collateral to maintain a healthy position.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono">Your Positions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xs">
              <div className="grid grid-cols-5 gap-2 p-3 border-b border-zinc-800 bg-zinc-800/50">
                <div>Asset</div>
                <div>Supplied</div>
                <div>APY</div>
                <div>Borrowed</div>
                <div>APR</div>
              </div>
              <div className="grid grid-cols-5 gap-2 p-3 border-b border-zinc-800">
                <div>ETH</div>
                <div>32.5</div>
                <div className="text-green-500">3.2%</div>
                <div>0</div>
                <div>-</div>
              </div>
              <div className="grid grid-cols-5 gap-2 p-3 border-b border-zinc-800">
                <div>USDC</div>
                <div>50,000</div>
                <div className="text-green-500">5.1%</div>
                <div>0</div>
                <div>-</div>
              </div>
              <div className="grid grid-cols-5 gap-2 p-3">
                <div>DEED-RE</div>
                <div>0</div>
                <div>-</div>
                <div>3</div>
                <div className="text-amber-500">2.8%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xs">
              <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-800 bg-zinc-800/50">
                <div>Type</div>
                <div>Asset</div>
                <div>Amount</div>
                <div>Date</div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-800">
                <div className="text-green-500">Supply</div>
                <div>ETH</div>
                <div>10.0</div>
                <div>2025-04-18</div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-800">
                <div className="text-amber-500">Borrow</div>
                <div>DEED-RE</div>
                <div>3.0</div>
                <div>2025-04-15</div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-3">
                <div className="text-green-500">Supply</div>
                <div>USDC</div>
                <div>50,000</div>
                <div>2025-04-10</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
