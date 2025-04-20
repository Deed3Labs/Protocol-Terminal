"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MintForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false)
        setPreviewUrl(URL.createObjectURL(file))
      }, 1500)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT Details</CardTitle>
        <CardDescription>Fill in the details for your new NFT. All fields are required.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload Artwork</Label>
          <div className="mt-1 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
            <div className="text-center">
              {previewUrl ? (
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                </div>
              ) : (
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              )}
              <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                >
                  <span>{previewUrl ? "Change file" : "Upload a file"}</span>
                  <Input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
                {!previewUrl && <p className="pl-1">or drag and drop</p>}
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">NFT Name</Label>
          <Input id="name" placeholder="Enter a name for your NFT" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe your NFT" rows={4} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Price (ETH)</Label>
            <Input id="price" type="number" step="0.01" placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="royalty">Royalty (%)</Label>
            <Input id="royalty" type="number" step="1" placeholder="10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="collection">Collection</Label>
          <Select>
            <SelectTrigger id="collection">
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Collection</SelectItem>
              <SelectItem value="art">Digital Art</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="collectibles">Collectibles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="properties">Properties (Optional)</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Property name" />
            <Input placeholder="Property value" />
          </div>
          <Button variant="outline" size="sm" className="mt-2">
            + Add Property
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mint NFT</Button>
      </CardFooter>
    </Card>
  )
}
