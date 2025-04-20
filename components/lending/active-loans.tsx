"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ActiveLoans() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="lending" className="w-full">
        <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start rounded-none p-0 h-auto">
          <TabsTrigger
            value="lending"
            className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-green-500 rounded-none border-r border-zinc-800 px-4 py-2"
          >
            Your Lending
          </TabsTrigger>
          <TabsTrigger
            value="borrowing"
            className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-green-500 rounded-none px-4 py-2"
          >
            Your Borrowing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lending" className="mt-4 space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono">Active Lending Positions</CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Assets you've supplied to the lending pool
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-xs">
                <div className="grid grid-cols-6 gap-2 p-3 border-b border-zinc-800 bg-zinc-800/50">
                  <div>Asset</div>
                  <div>Amount</div>
                  <div>Value (USD)</div>
                  <div>APY</div>
                  <div>Utilization</div>
                  <div></div>
                </div>

                <div className="grid grid-cols-6 gap-2 p-3 border-b border-zinc-800">
                  <div>ETH</div>
                  <div>32.5</div>
                  <div>$75,450</div>
                  <div className="text-green-500">3.2%</div>
                  <div>65%</div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs bg-transparent border-zinc-700 hover:bg-zinc-800"
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 p-3">
                  <div>USDC</div>
                  <div>50,000</div>
                  <div>$50,000</div>
                  <div className="text-green-500">5.1%</div>
                  <div>82%</div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs bg-transparent border-zinc-700 hover:bg-zinc-800"
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono">Supply New Assets</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-xs">
                <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-800 bg-zinc-800/50">
                  <div>Asset</div>
                  <div>Current APY</div>
                  <div>Liquidity</div>
                  <div></div>
                </div>

                <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-800">
                  <div>DEED-RE</div>
                  <div className="text-green-500">4.8%</div>
                  <div>$2.4M</div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs bg-transparent border-zinc-700 hover:bg-zinc-800"
                    >
                      Supply
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 p-3">
                  <div>WBTC</div>
                  <div className="text-green-500">2.1%</div>
                  <div>$5.7M</div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs bg-transparent border-zinc-700 hover:bg-zinc-800"
                    >
                      Supply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrowing" className="mt-4 space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono">Your Active Loans</CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Assets you've borrowed from the lending pool
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-xs">
                <div className="grid grid-cols-7 gap-2 p-3 border-b border-zinc-800 bg-zinc-800/50">
                  <div>Asset</div>
                  <div>Amount</div>
                  <div>Value (USD)</div>
                  <div>APR</div>
                  <div>Collateral</div>
                  <div>Health</div>
                  <div></div>
                </div>

                <div className="grid grid-cols-7 gap-2 p-3">
                  <div>DEED-RE</div>
                  <div>3</div>
                  <div>$45,200</div>
                  <div className="text-amber-500">2.8%</div>
                  <div>ETH (15)</div>
                  <div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      1.85
                    </Badge>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs bg-transparent border-zinc-700 hover:bg-zinc-800"
                    >
                      Repay
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono">Borrowing Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Total Collateral Value</span>
                    <span>$125,450</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Current Borrowing</span>
                    <span>$45,200</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Available to Borrow</span>
                    <span className="text-green-500">$55,160</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-xs">Apply for New Loan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
