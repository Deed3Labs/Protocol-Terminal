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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TokenizeForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [assetType, setAssetType] = useState("real-estate")

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
        <CardTitle>Asset Details</CardTitle>
        <CardDescription>Fill in the details for your real-world asset. All fields are required.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="real-estate" onValueChange={setAssetType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload Asset Images</Label>
              <div className="mt-1 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                <div className="text-center">
                  {previewUrl ? (
                    <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
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
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 10MB (add multiple images for complete documentation)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Asset Name</Label>
              <Input id="name" placeholder="Enter a name for your asset" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your asset in detail" rows={4} />
            </div>

            <TabsContent value="real-estate" className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="property-type">Property Type</Label>
                <Select defaultValue="residential">
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="State/Province" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Postal Code</Label>
                  <Input id="zip" placeholder="Postal code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Country" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="square-feet">Square Feet/Meters</Label>
                  <Input id="square-feet" type="number" placeholder="Size" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year-built">Year Built</Label>
                  <Input id="year-built" type="number" placeholder="Year" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" placeholder="Vehicle make" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="Vehicle model" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" type="number" placeholder="Year" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN/Serial Number</Label>
                  <Input id="vin" placeholder="VIN/Serial" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage/Hours</Label>
                  <Input id="mileage" type="number" placeholder="Mileage/Hours" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle-condition">Condition</Label>
                <Select defaultValue="excellent">
                  <SelectTrigger id="vehicle-condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input id="manufacturer" placeholder="Manufacturer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-model">Model</Label>
                  <Input id="equipment-model" placeholder="Model" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="equipment-year">Year</Label>
                  <Input id="equipment-year" type="number" placeholder="Year" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serial">Serial Number</Label>
                  <Input id="serial" placeholder="Serial number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Used</Label>
                  <Input id="hours" type="number" placeholder="Hours" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment-type">Equipment Type</Label>
                <Select defaultValue="construction">
                  <SelectTrigger id="equipment-type">
                    <SelectValue placeholder="Select equipment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <div className="space-y-2">
              <Label htmlFor="value">Estimated Value</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                  $
                </span>
                <Input id="value" type="number" className="rounded-l-none" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="legal-documents">Legal Documentation</Label>
              <div className="mt-1 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                    <label
                      htmlFor="document-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                    >
                      <span>Upload documents</span>
                      <Input
                        id="document-upload"
                        name="document-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PDF, DOC up to 25MB (title deeds, certificates, etc.)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownership">Ownership Information</Label>
              <Textarea
                id="ownership"
                placeholder="Provide details about current ownership, including any liens or encumbrances"
                rows={3}
              />
            </div>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Tokenize Asset</Button>
      </CardFooter>
    </Card>
  )
}
