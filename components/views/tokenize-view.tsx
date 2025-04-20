"use client"

import type React from "react"

import { useState } from "react"
import { Upload, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function TokenizeView() {
  const { addToHistory } = useTerminal()
  const [step, setStep] = useState(1)
  const [assetType, setAssetType] = useState("real-estate")
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    value: "",
    location: "",
    propertyType: "residential",
    year: "",
    size: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      addToHistory(`upload --file="${file.name}" --type=image`)
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false)
        setPreviewUrl(URL.createObjectURL(file))
        addToHistory(`upload complete: ${file.name}`)
      }, 1500)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    addToHistory(`set --field=${field} --value="${value}"`)
  }

  const handleNext = () => {
    addToHistory(`proceed --step=${step + 1}`)
    setStep(step + 1)
  }

  const handleBack = () => {
    addToHistory(`back --step=${step - 1}`)
    setStep(step - 1)
  }

  const handleSubmit = () => {
    addToHistory(`tokenize --confirm --asset="${formData.name}" --type=${assetType} --value=${formData.value}`)
    setStep(4) // Success step
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Tokenize Real-World Asset</h1>
      </div>
      <p className="text-sm text-zinc-400 mb-6">
        Create a digital token representing your real-world asset by providing the necessary details and documentation.
      </p>

      <div className="mb-6">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                  s < step
                    ? "bg-green-500 text-black"
                    : s === step
                      ? "bg-primary text-black"
                      : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {s < step ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : s}
              </div>
              {s < 4 && (
                <div className={`h-0.5 w-6 sm:w-12 md:w-16 lg:w-24 ${s < step ? "bg-green-500" : "bg-zinc-800"}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop labels - hidden on small screens */}
        <div className="hidden sm:flex mt-2 text-xs text-zinc-500">
          <div className="w-6 sm:w-8 text-center">1</div>
          <div className="w-6 sm:w-12 md:w-16 lg:w-24 text-center">Asset Details</div>
          <div className="w-6 sm:w-8 text-center">2</div>
          <div className="w-6 sm:w-12 md:w-16 lg:w-24 text-center">Properties</div>
          <div className="w-6 sm:w-8 text-center">3</div>
          <div className="w-6 sm:w-12 md:w-16 lg:w-24 text-center">Documentation</div>
          <div className="w-6 sm:w-8 text-center">4</div>
          <div className="w-6 sm:w-12 md:w-16 lg:w-24 text-center">Complete</div>
        </div>

        {/* Mobile labels - only shown on small screens */}
        <div className="flex sm:hidden mt-2 justify-between text-[10px] text-zinc-500 px-1">
          <div className="text-center">Asset</div>
          <div className="text-center">Props</div>
          <div className="text-center">Docs</div>
          <div className="text-center">Done</div>
        </div>
      </div>

      {step === 1 && (
        <div className="terminal-card space-y-4">
          <div className="text-sm font-medium mb-4">Step 1: Basic Asset Information</div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400">Asset Type</label>
            <div className="flex gap-2">
              <Button
                variant={assetType === "real-estate" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => {
                  setAssetType("real-estate")
                  addToHistory(`set --type=real-estate`)
                }}
              >
                Real Estate
              </Button>
              <Button
                variant={assetType === "vehicles" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => {
                  setAssetType("vehicles")
                  addToHistory(`set --type=vehicles`)
                }}
              >
                Vehicles
              </Button>
              <Button
                variant={assetType === "equipment" ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => {
                  setAssetType("equipment")
                  addToHistory(`set --type=equipment`)
                }}
              >
                Equipment
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400">Asset Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter a name for your asset"
              className="terminal-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your asset in detail"
              rows={3}
              className="terminal-input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400">Estimated Value</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-zinc-800 bg-zinc-900 text-zinc-400">
                $
              </span>
              <Input
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className="rounded-l-none terminal-input"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="City, State, Country"
              className="terminal-input"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleNext} disabled={!formData.name || !formData.value}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="terminal-card space-y-4">
          <div className="text-sm font-medium mb-4">Step 2: Asset Properties</div>

          {assetType === "real-estate" && (
            <>
              <div className="space-y-2">
                <label className="text-xs text-zinc-400">Property Type</label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger className="terminal-input">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Year Built</label>
                  <Input
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    placeholder="Year"
                    className="terminal-input"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Size (sq ft/m)</label>
                  <Input
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    placeholder="Size"
                    className="terminal-input"
                    type="number"
                  />
                </div>
              </div>
            </>
          )}

          {assetType === "vehicles" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Make</label>
                  <Input
                    placeholder="Vehicle make"
                    className="terminal-input"
                    onChange={(e) => handleInputChange("make", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Model</label>
                  <Input
                    placeholder="Vehicle model"
                    className="terminal-input"
                    onChange={(e) => handleInputChange("model", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Year</label>
                  <Input
                    placeholder="Year"
                    className="terminal-input"
                    type="number"
                    onChange={(e) => handleInputChange("year", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">VIN/Serial Number</label>
                  <Input
                    placeholder="VIN/Serial"
                    className="terminal-input"
                    onChange={(e) => handleInputChange("vin", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-zinc-400">Condition</label>
                <Select defaultValue="excellent">
                  <SelectTrigger className="terminal-input">
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
            </>
          )}

          {assetType === "equipment" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Manufacturer</label>
                  <Input
                    placeholder="Manufacturer"
                    className="terminal-input"
                    onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Model</label>
                  <Input
                    placeholder="Model"
                    className="terminal-input"
                    onChange={(e) => handleInputChange("model", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Year</label>
                  <Input
                    placeholder="Year"
                    className="terminal-input"
                    type="number"
                    onChange={(e) => handleInputChange("year", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400">Hours Used</label>
                  <Input
                    placeholder="Hours"
                    className="terminal-input"
                    type="number"
                    onChange={(e) => handleInputChange("hours", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="terminal-card space-y-4">
          <div className="text-sm font-medium mb-4">Step 3: Documentation</div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400">Asset Images</label>
            <div className="mt-1 flex justify-center rounded-lg border border-dashed border-zinc-800 px-6 py-10">
              <div className="text-center">
                {previewUrl ? (
                  <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg">
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-zinc-500" />
                )}
                <div className="mt-4 flex text-sm leading-6 text-zinc-400">
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
                <p className="text-xs text-zinc-500">
                  PNG, JPG up to 10MB (add multiple images for complete documentation)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400">Legal Documentation</label>
            <div className="mt-1 flex justify-center rounded-lg border border-dashed border-zinc-800 px-6 py-10">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-zinc-500" />
                <div className="mt-4 flex text-sm leading-6 text-zinc-400">
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
                <p className="text-xs text-zinc-500">PDF, DOC up to 25MB (title deeds, certificates, etc.)</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Tokenize Asset</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="terminal-card">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-900 p-3">
              <Check className="h-8 w-8 text-green-300" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Asset Tokenized Successfully!</h2>
            <p className="mt-2 text-center text-zinc-400">
              Your asset has been successfully tokenized and added to the blockchain.
            </p>

            <div className="mt-6 w-full max-w-md border border-zinc-800 rounded-md p-4 font-mono text-xs">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-500">Asset Name:</span>
                <span>{formData.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-500">Token ID:</span>
                <span>0x8f4e...2a1b</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-500">Transaction Hash:</span>
                <span>0x7d3f...9c2e</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-500">Timestamp:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                View My Assets
              </Button>
              <Button onClick={() => (window.location.href = "/")}>Return to Dashboard</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
