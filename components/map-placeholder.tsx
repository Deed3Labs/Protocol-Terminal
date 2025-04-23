"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Maximize2, Minimize2, Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Asset {
  id: string
  name: string
  description: string
  image: string
  price: string
  location: string
  category: string
  status: string
  coordinates?: { lat: number; lng: number }
  [key: string]: any
}

interface MapPlaceholderProps {
  assets: Asset[]
  selectedAssetId: string | null
  onAssetSelect: (id: string) => void
  onAssetDetails: (id: string) => void
}

export function MapPlaceholder({ assets, selectedAssetId, onAssetSelect, onAssetDetails }: MapPlaceholderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(5)
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate pseudo-random positions for assets that don't have coordinates
  const assetPositions = assets.map((asset) => {
    if (asset.coordinates) {
      return {
        id: asset.id,
        x: ((asset.coordinates.lng + 180) / 360) * 100, // Convert longitude to percentage
        y: ((90 - asset.coordinates.lat) / 180) * 100, // Convert latitude to percentage
        name: asset.name,
        price: asset.price,
        category: asset.category,
        status: asset.status,
      }
    } else {
      // Generate pseudo-random position if no coordinates
      const hash = asset.id.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)

      return {
        id: asset.id,
        x: Math.abs(hash % 80) + 10, // Between 10% and 90%
        y: Math.abs((hash >> 8) % 80) + 10, // Between 10% and 90%
        name: asset.name,
        price: asset.price,
        category: asset.category,
        status: asset.status,
      }
    }
  })

  // Draw the map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    if (!container) return

    // Set canvas size to match container
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // Draw background
    ctx.fillStyle = "#0e1015"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#1a1d23"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw asset markers
    assetPositions.forEach((asset) => {
      const x = (asset.x / 100) * canvas.width
      const y = (asset.y / 100) * canvas.height

      // Determine marker color based on category
      let markerColor = "#3b82f6" // Default blue
      if (asset.category === "real-estate") markerColor = "#10b981" // Green
      if (asset.category === "vehicles") markerColor = "#f59e0b" // Amber
      if (asset.category === "equipment") markerColor = "#8b5cf6" // Purple

      // Draw marker circle
      ctx.beginPath()
      ctx.arc(x, y, asset.id === selectedAssetId ? 10 : 6, 0, Math.PI * 2)
      ctx.fillStyle =
        asset.id === selectedAssetId || asset.id === hoveredAsset
          ? markerColor
          : asset.status === "pending"
            ? "#374151"
            : "#1f2937"
      ctx.fill()

      // Draw border
      ctx.strokeStyle = markerColor
      ctx.lineWidth = 2
      ctx.stroke()

      // Add pulse effect for selected asset
      if (asset.id === selectedAssetId) {
        ctx.beginPath()
        ctx.arc(x, y, 14, 0, Math.PI * 2)
        ctx.strokeStyle = markerColor
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })
  }, [assets, selectedAssetId, hoveredAsset, zoom])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if mouse is over any asset
    const hoveredAsset = assetPositions.find((asset) => {
      const assetX = (asset.x / 100) * canvas.width
      const assetY = (asset.y / 100) * canvas.height
      const distance = Math.sqrt(Math.pow(x - assetX, 2) + Math.pow(y - assetY, 2))
      return distance <= 10
    })

    setHoveredAsset(hoveredAsset?.id || null)

    // Change cursor if hovering over an asset
    canvas.style.cursor = hoveredAsset ? "pointer" : "default"
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicked on any asset
    const clickedAsset = assetPositions.find((asset) => {
      const assetX = (asset.x / 100) * canvas.width
      const assetY = (asset.y / 100) * canvas.height
      const distance = Math.sqrt(Math.pow(x - assetX, 2) + Math.pow(y - assetY, 2))
      return distance <= 10
    })

    if (clickedAsset) {
      onAssetSelect(clickedAsset.id)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 10))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1))
  }

  // Find the selected asset
  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId)

  return (
    <div
      className={`relative rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50" : "h-full"
      }`}
      ref={containerRef}
    >
      {/* Map canvas */}
      <canvas ref={canvasRef} className="w-full h-full" onMouseMove={handleMouseMove} onClick={handleClick} />

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-zinc-900/80 backdrop-blur-sm border-zinc-700"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-zinc-900/80 backdrop-blur-sm border-zinc-700"
          onClick={zoomIn}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-zinc-900/80 backdrop-blur-sm border-zinc-700"
          onClick={zoomOut}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Map overlay text */}
      <div className="absolute bottom-4 left-4 text-xs text-zinc-500">
        <div>Protocol Terminal Map View</div>
        <div>Zoom: {zoom}x</div>
      </div>

      {/* Hovered asset tooltip */}
      {hoveredAsset && !selectedAssetId && (
        <div
          className="absolute bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-md p-2 text-xs pointer-events-none"
          style={{
            left: `${((assetPositions.find((a) => a.id === hoveredAsset)?.x || 0) / 100) * (canvasRef.current?.width || 0)}px`,
            top: `${((assetPositions.find((a) => a.id === hoveredAsset)?.y || 0) / 100) * (canvasRef.current?.height || 0) - 40}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-medium">{assetPositions.find((a) => a.id === hoveredAsset)?.name}</div>
          <div>{assetPositions.find((a) => a.id === hoveredAsset)?.price}</div>
        </div>
      )}

      {/* Selected asset popup */}
      {selectedAsset && (
        <Card
          className="absolute bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-lg w-72 overflow-hidden"
          style={{
            left: `${((assetPositions.find((a) => a.id === selectedAssetId)?.x || 0) / 100) * (canvasRef.current?.width || 0)}px`,
            top: `${((assetPositions.find((a) => a.id === selectedAssetId)?.y || 0) / 100) * (canvasRef.current?.height || 0) - 10}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="relative h-32 bg-zinc-800">
            <img
              src={selectedAsset.image || "/placeholder.svg"}
              alt={selectedAsset.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={() => onAssetSelect("")}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium mb-1">{selectedAsset.name}</h3>
            <div className="text-xs text-zinc-400 mb-2">{selectedAsset.location}</div>
            <div className="flex justify-between text-sm mb-3">
              <div>
                <div className="text-xs text-zinc-500">Price</div>
                <div>{selectedAsset.price}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-500">Status</div>
                <div className={selectedAsset.status === "verified" ? "text-green-500" : "text-amber-500"}>
                  {selectedAsset.status === "verified" ? "Verified" : "Pending"}
                </div>
              </div>
            </div>
            <Button className="w-full text-xs h-8" onClick={() => onAssetDetails(selectedAsset.id)}>
              View Details
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
