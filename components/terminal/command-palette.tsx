"use client"

import { useState, useEffect } from "react"
import { Command as CommandPrimitive } from "cmdk"
import {
  BarChart3,
  Building2,
  Car,
  FileCheck,
  Home,
  PlusCircle,
  Settings,
  Tractor,
  Wallet,
  ArrowLeftRight,
  Search,
  X,
  HelpCircle,
} from "lucide-react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useTerminal } from "@/components/terminal/terminal-provider"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { setLastCommand, setActiveTab } = useTerminal()
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  const handleSelect = (command: string, tab: string) => {
    setLastCommand(command)
    setActiveTab(tab)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 bg-zinc-950 border-zinc-800 max-w-2xl overflow-hidden">
        <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden rounded-md bg-zinc-950 text-white">
          <div className="flex items-center border-b border-zinc-800 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-500" />
            <CommandPrimitive.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="ml-auto flex h-6 w-6 items-center justify-center rounded-md hover:bg-zinc-800"
            >
              <X className="h-4 w-4 text-zinc-500" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <CommandPrimitive.List className="space-y-1">
              <CommandPrimitive.Group heading="Navigation">
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("dashboard", "dashboard")}
                >
                  <Home className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Dashboard</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("portfolio", "portfolio")}
                >
                  <BarChart3 className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Portfolio</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("market --data", "market")}
                >
                  <BarChart3 className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Market Data</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>

              <CommandPrimitive.Group heading="Actions">
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("tokenize --new", "tokenize")}
                >
                  <PlusCircle className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Tokenize New Asset</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("transfer --asset", "transfer")}
                >
                  <ArrowLeftRight className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Transfer Asset</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("validate --asset", "validate")}
                >
                  <FileCheck className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Validate Asset</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>

              <CommandPrimitive.Group heading="Categories">
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("filter --category=real-estate", "real-estate")}
                >
                  <Building2 className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Real Estate</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("filter --category=vehicles", "vehicles")}
                >
                  <Car className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Vehicles</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("filter --category=equipment", "equipment")}
                >
                  <Tractor className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Equipment</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>

              <CommandPrimitive.Group heading="System">
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("wallet --status", "wallet")}
                >
                  <Wallet className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Wallet</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800"
                  onSelect={() => handleSelect("config --edit", "settings")}
                >
                  <Settings className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Settings</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-zinc-800">
                  <HelpCircle className="mr-2 h-4 w-4 text-zinc-500" />
                  <span>Help</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </div>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}
