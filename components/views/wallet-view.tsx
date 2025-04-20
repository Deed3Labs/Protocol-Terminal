"use client"

import { useState } from "react"
import { Copy, ExternalLink, QrCode, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function WalletView() {
  const { addToHistory } = useTerminal()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    addToHistory("wallet --refresh")
    setTimeout(() => {
      setIsRefreshing(false)
      addToHistory("wallet balance updated")
    }, 1500)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    addToHistory(`copy --text="${text}"`)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Wallet</h1>
        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
      <p className="text-sm text-zinc-400 mb-6">Manage your connected wallets and view your balances.</p>

      <div className="terminal-card mb-6">
        <h3 className="text-xs font-medium mb-4">CONNECTED WALLET</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="text-xs">ETH</span>
            </div>
            <div>
              <div className="text-sm font-medium">Ethereum Wallet</div>
              <div className="text-xs text-zinc-500">Connected via MetaMask</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <QrCode className="h-3.5 w-3.5 mr-1" />
            Show QR
          </Button>
        </div>

        <div className="space-y-2 border border-zinc-800 rounded-md p-3 font-mono">
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500">Address:</div>
            <div className="flex items-center gap-1">
              <div className="text-xs">0x1a2b...3c4d</div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleCopy("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t")}
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">View on Explorer</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500">ETH Balance:</div>
            <div className="text-xs">3.45 ETH</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500">USD Value:</div>
            <div className="text-xs">$11,203.45</div>
          </div>
        </div>
      </div>

      <div className="terminal-card mb-6">
        <h3 className="text-xs font-medium mb-4">TOKENS</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <span className="text-xs">DEED</span>
              </div>
              <div>
                <div className="text-sm">Deed Protocol</div>
                <div className="text-xs text-zinc-500">ERC-20</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">1,250 DEED</div>
              <div className="text-xs text-zinc-500">$3,750.00</div>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <span className="text-xs">USDC</span>
              </div>
              <div>
                <div className="text-sm">USD Coin</div>
                <div className="text-xs text-zinc-500">ERC-20</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">5,000 USDC</div>
              <div className="text-xs text-zinc-500">$5,000.00</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <span className="text-xs">WETH</span>
              </div>
              <div>
                <div className="text-sm">Wrapped Ethereum</div>
                <div className="text-xs text-zinc-500">ERC-20</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">1.5 WETH</div>
              <div className="text-xs text-zinc-500">$4,875.00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="terminal-card">
        <h3 className="text-xs font-medium mb-4">RECENT TRANSACTIONS</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div>
              <div className="text-sm">Sent ETH</div>
              <div className="text-xs text-zinc-500">To: 0x8f7d...e92a</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-500">-0.5 ETH</div>
              <div className="text-xs text-zinc-500">2 hours ago</div>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div>
              <div className="text-sm">Received USDC</div>
              <div className="text-xs text-zinc-500">From: 0x3a1c...b47d</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-500">+1,000 USDC</div>
              <div className="text-xs text-zinc-500">Yesterday</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm">Swap ETH for DEED</div>
              <div className="text-xs text-zinc-500">Uniswap V3</div>
            </div>
            <div className="text-right">
              <div className="text-sm">1 ETH → 400 DEED</div>
              <div className="text-xs text-zinc-500">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
