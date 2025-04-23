"use client"

import type React from "react"
import Image from "next/image"
import { Star, CheckCircle, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface AssetCardProps {
  id: string
  name: string
  description: string
  image: string
  price: string
  location: string
  category: string
  status: string
  tokenId: string
  className?: string
  favorite?: boolean
  isSelectable?: boolean
  isSelected?: boolean
  onSelect?: (id: string) => void
  onToggleFavorite?: (id: string) => void
  onViewDetails?: (id: string) => void
  onTransfer?: (id: string) => void
  compact?: boolean
  creator?: string
  edition?: string
  totalEditions?: string
}

export function AssetCard({
  id,
  name,
  description,
  image,
  price,
  location,
  category,
  status,
  tokenId,
  className,
  favorite = false,
  isSelectable = false,
  isSelected = false,
  onSelect,
  onToggleFavorite,
  onViewDetails,
  onTransfer,
  compact = false,
  creator = "Deed Protocol",
  edition = "1",
  totalEditions = "1",
}: AssetCardProps) {
  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onViewDetails) {
      onViewDetails(id)
    }
  }

  const handleTransfer = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onTransfer) {
      onTransfer(id)
    }
  }

  const handleToggleFavorite = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(id)
    }
  }

  const handleSelect = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onSelect) {
      onSelect(id)
    }
  }

  // Get status display text
  const getStatusDisplay = () => {
    switch (status.toLowerCase()) {
      case "verified":
        return "Completed"
      case "pending":
        return "Minting"
      default:
        return status
    }
  }

  // Get status color
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "verified":
        return "text-green-500"
      case "pending":
        return "text-amber-500"
      default:
        return "text-gray-400"
    }
  }

  // Get price display
  const getPriceDisplay = () => {
    if (status.toLowerCase() === "verified") {
      return price
    }
    return "Not for sale"
  }

  // Determine if the asset is minting
  const isMinting = status.toLowerCase() === "pending"

  // Determine if the asset is completed/verified
  const isCompleted = status.toLowerCase() === "verified"

  return (
    <div
      className={cn(
        "group overflow-hidden flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-xl cursor-pointer h-full",
        className,
        {
          "border-2 border-green-500": isSelected,
        },
      )}
      onClick={handleViewDetails}
    >
      {/* Image container */}
      <div className="aspect-square overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Edition overlay */}
        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14" className="mr-1">
            <path
              d="M17.8793 5.45082L13.4078 4.12173C12.2528 3.77843 11.0494 4.18265 10.3159 5.065H11.2653C13.5476 5.065 15.3979 6.93725 15.3979 9.2468V17.6104C15.3979 17.7097 15.3945 17.8082 15.3877 17.9058C16.568 17.8004 17.6098 16.9779 17.9599 15.7716L19.8796 9.15856C20.339 7.57576 19.4435 5.91574 17.8793 5.45082Z"
              fill="currentColor"
            ></path>
            <path
              d="M5.95186 6.8572C4.32159 6.8572 3 8.19452 3 9.8442V17.013C3 18.6627 4.32159 20 5.95186 20H10.6748C12.3051 20 13.6267 18.6627 13.6267 17.013V9.8442C13.6267 8.19452 12.3051 6.8572 10.6748 6.8572H5.95186Z"
              fill="currentColor"
            ></path>
          </svg>
          {edition} of {totalEditions}
        </div>

        {/* Action button overlay (for pending items) */}
        {isMinting && (
          <div className="absolute bottom-2 right-2">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-7 bg-white text-black hover:bg-white/90 font-medium rounded-full px-3"
              onClick={(e) => {
                e.stopPropagation()
                handleTransfer(e)
              }}
            >
              Mint Now
            </Button>
          </div>
        )}

        {/* Selection checkbox or favorite button */}
        {isSelectable ? (
          <div className="absolute top-2 left-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => handleSelect()}
              className="h-5 w-5 border-2 border-white bg-black/50 data-[state=checked]:bg-green-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                handleToggleFavorite(e)
              }}
            >
              {favorite ? (
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              ) : (
                <Star className="h-3.5 w-3.5" />
              )}
            </Button>
          )
        )}

        {/* Hover overlay with action buttons */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-8 bg-white text-black hover:bg-white/90 font-medium rounded-full px-4"
              onClick={(e) => {
                e.stopPropagation()
                handleViewDetails(e)
              }}
            >
              View Details
            </Button>
            {onTransfer && isCompleted && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 border-white text-white hover:bg-white/20 font-medium rounded-full px-4"
                onClick={(e) => {
                  e.stopPropagation()
                  handleTransfer(e)
                }}
              >
                Transfer
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* More options button */}
        <div className="flex justify-end mb-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-zinc-800"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Creator and title */}
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-zinc-400 flex items-center">
              {creator}
              <CheckCircle className="h-3 w-3 ml-1 text-blue-500 fill-blue-500" />
            </span>
          </div>
          <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
        </div>

        {/* Status and price */}
        <div className="mt-auto pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-zinc-500">{isCompleted ? "Price" : "Status"}</div>
            <div className={cn("text-sm", getStatusColor())}>{isCompleted ? price : getStatusDisplay()}</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-500">Highest bid</div>
            <div className="text-sm">{isCompleted ? "No bids yet" : "—"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
