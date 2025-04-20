"use client"

import { RefreshCw } from "lucide-react"
import { useCryptoPrices, type CryptoPrice } from "@/hooks/use-crypto-prices"

export function CryptoMarketInfo() {
  const { ethereum, bitcoin, refresh } = useCryptoPrices()

  return (
    <div className="terminal-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Crypto Market</h3>
        <button
          onClick={refresh}
          className="text-zinc-500 hover:text-white transition-colors"
          aria-label="Refresh crypto prices"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        <CryptoMarketRow crypto={ethereum} />
        <CryptoMarketRow crypto={bitcoin} />
      </div>

      <div className="mt-3 text-xs text-zinc-500">Last updated: {new Date().toLocaleTimeString()}</div>
    </div>
  )
}

function CryptoMarketRow({ crypto }: { crypto: CryptoPrice }) {
  const { name, symbol, price, change24h } = crypto
  const isPositive = change24h >= 0

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
          <span className="text-xs">{symbol}</span>
        </div>
        <span>{name}</span>
      </div>

      <div className="flex items-center gap-3">
        <span>{formattedPrice}</span>
        <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "+" : ""}
          {change24h}%
        </span>
      </div>
    </div>
  )
}
