"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function TokenizeForm() {
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

      <div className="terminal-card p-6">
        <div className="text-center">
          <p className="text-zinc-400">Tokenize form interface would be displayed here.</p>
          <p className="text-zinc-500 text-sm mt-2">
            This is a placeholder for the tokenization form that would normally be displayed.
          </p>
        </div>
      </div>
    </div>
  )
}
