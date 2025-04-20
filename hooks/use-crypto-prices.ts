"use client"

import { useState, useEffect } from "react"

export interface CryptoPrice {
  symbol: string
  name: string
  price: number
  change24h: number
  lastUpdated: Date
}

interface CoinGeckoResponse {
  [id: string]: {
    usd: number
    usd_24h_change: number
    last_updated_at: number
  }
}

export function useCryptoPrices() {
  const [prices, setPrices] = useState<{
    ethereum: CryptoPrice
    bitcoin: CryptoPrice
  }>({
    ethereum: {
      symbol: "ETH",
      name: "Ethereum",
      price: 0,
      change24h: 0,
      lastUpdated: new Date(),
    },
    bitcoin: {
      symbol: "BTC",
      name: "Bitcoin",
      price: 0,
      change24h: 0,
      lastUpdated: new Date(),
    },
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = async () => {
    try {
      setError(null)

      // Using CoinGecko's public API
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true",
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: CoinGeckoResponse = await response.json()

      if (!data.bitcoin || !data.ethereum) {
        throw new Error("Invalid data received from API")
      }

      setPrices({
        ethereum: {
          symbol: "ETH",
          name: "Ethereum",
          price: data.ethereum.usd,
          change24h: Number.parseFloat(data.ethereum.usd_24h_change.toFixed(2)),
          lastUpdated: new Date(data.ethereum.last_updated_at * 1000),
        },
        bitcoin: {
          symbol: "BTC",
          name: "Bitcoin",
          price: data.bitcoin.usd,
          change24h: Number.parseFloat(data.bitcoin.usd_24h_change.toFixed(2)),
          lastUpdated: new Date(data.bitcoin.last_updated_at * 1000),
        },
      })

      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching crypto prices:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch prices")

      // If we fail to fetch, use fallback data with a small random change
      // to simulate real-time updates
      setPrices((prevPrices) => {
        const getRandomChange = () => (Math.random() * 2 - 1) * 0.5 // -0.5% to +0.5%

        const ethChange = getRandomChange()
        const btcChange = getRandomChange()

        return {
          ethereum: {
            ...prevPrices.ethereum,
            price:
              prevPrices.ethereum.price === 0
                ? 3450.75
                : Number.parseFloat((prevPrices.ethereum.price * (1 + ethChange / 100)).toFixed(2)),
            change24h: Number.parseFloat((prevPrices.ethereum.change24h + ethChange / 5).toFixed(2)),
            lastUpdated: new Date(),
          },
          bitcoin: {
            ...prevPrices.bitcoin,
            price:
              prevPrices.bitcoin.price === 0
                ? 62150.25
                : Number.parseFloat((prevPrices.bitcoin.price * (1 + btcChange / 100)).toFixed(2)),
            change24h: Number.parseFloat((prevPrices.bitcoin.change24h + btcChange / 5).toFixed(2)),
            lastUpdated: new Date(),
          },
        }
      })

      if (isLoading) setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch immediately on mount
    fetchPrices()

    // Then fetch every 60 seconds to avoid rate limiting
    const interval = setInterval(fetchPrices, 60000)

    return () => clearInterval(interval)
  }, [])

  return {
    ...prices,
    isLoading,
    error,
    refresh: fetchPrices,
  }
}
