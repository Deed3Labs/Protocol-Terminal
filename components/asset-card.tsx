import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Building2, Car, MapPin, Tractor } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
}: AssetCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
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
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center gap-2 mb-1">
          {category === "real-estate" && <Building2 className="h-4 w-4 text-muted-foreground" />}
          {category === "vehicles" && <Car className="h-4 w-4 text-muted-foreground" />}
          {category === "equipment" && <Tractor className="h-4 w-4 text-muted-foreground" />}
          <CardDescription className="text-xs uppercase">{category.replace("-", " ")}</CardDescription>
        </div>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2 mb-4">{description}</CardDescription>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Token ID</div>
          <div className="truncate text-sm font-medium">{tokenId}</div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Value</div>
          <div className="font-bold">{price}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full">
          <Link href={`/asset/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
