"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Building2, Car, MapPin, Tractor, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
}: AssetCardProps) {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id)
    }
  }

  const handleTransfer = () => {
    if (onTransfer) {
      onTransfer(id)
    }
  }

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(id)
    }
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(id)
    }
  }

  return (
    <Card
      className={cn("overflow-hidden h-full flex flex-col", className, {
        "border-2 border-green-500": isSelected,
      })}
    >
      <div className="aspect-square overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={status === "Verified" ? "default" : "outline"}>{status}</Badge>
        </div>
        {isSelectable ? (
          <div className="absolute top-2 left-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelect}
              className="h-5 w-5 border-2 border-white bg-black/50 data-[state=checked]:bg-green-500"
            />
          </div>
        ) : (
          onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 h-7 w-7 bg-black/50 hover:bg-black/70"
              onClick={handleToggleFavorite}
            >
              {favorite ? (
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              ) : (
                <Star className="h-3.5 w-3.5" />
              )}
            </Button>
          )
        )}
      </div>
      <CardHeader className={cn("p-4", compact ? "pb-2" : "")}>
        <div className="flex items-center gap-2 mb-1">
          {category === "real-estate" && <Building2 className="h-4 w-4 text-muted-foreground" />}
          {category === "vehicles" && <Car className="h-4 w-4 text-muted-foreground" />}
          {category === "equipment" && <Tractor className="h-4 w-4 text-muted-foreground" />}
          <CardDescription className="text-xs uppercase">{category.replace("-", " ")}</CardDescription>
        </div>
        <CardTitle className="line-clamp-1 text-base">{name}</CardTitle>
        {!compact && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className={cn("p-4 pt-0 flex-grow", compact ? "pb-2" : "")}>
        {!compact && <CardDescription className="line-clamp-2 mb-4">{description}</CardDescription>}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Token ID</div>
          <div className="truncate text-xs font-mono">{tokenId.substring(0, 6)}...</div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Value</div>
          <div className="font-bold text-sm">{price}</div>
        </div>
      </CardContent>
      <CardFooter className={cn("p-3 border-t border-zinc-800 mt-auto", compact ? "pt-2" : "")}>
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleViewDetails}>
            {compact ? "View" : "View Details"}
          </Button>
          {onTransfer && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={handleTransfer}>
              Transfer
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
