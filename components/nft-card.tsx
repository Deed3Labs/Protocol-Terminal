import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface NftCardProps {
  id: string
  name: string
  description: string
  image: string
  price: string
  owner: string
  className?: string
}

export function NftCard({ id, name, description, image, price, owner, className }: NftCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Owner</div>
          <div className="truncate text-sm font-medium">{owner}</div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Price</div>
          <div className="font-bold">{price} ETH</div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full">
          <Link href={`/nft/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
