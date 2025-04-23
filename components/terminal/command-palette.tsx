"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import {
  BarChart3,
  Building2,
  FileCheck,
  Home,
  PlusCircle,
  Settings,
  Wallet,
  ArrowLeftRight,
  User,
  DollarSign,
  Search,
  Terminal,
  History,
  HelpCircle,
  RefreshCw,
  AlertCircle,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useTerminal } from "@/components/terminal/terminal-provider"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-black text-zinc-200", className)}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandDialogProps) {
  const { setActiveView, setCurrentPath, addToHistory, commandHistory } = useTerminal()
  const [search, setSearch] = React.useState("")
  const [pages, setPages] = React.useState<string[]>([])
  const [mounted, setMounted] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setMounted(true)
    if (open) {
      setSearch("")
    }
  }, [open])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  const runCommand = React.useCallback(
    (command: string, view: string) => {
      addToHistory(command)
      setActiveView(view as any)
      setCurrentPath(`/${view}`)
      onOpenChange(false)
    },
    [addToHistory, setActiveView, setCurrentPath, onOpenChange],
  )

  const handleSelect = (callback: () => void) => {
    callback()
    onOpenChange(false)
  }

  if (!mounted) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border border-zinc-800 bg-black shadow-lg overflow-hidden max-w-2xl sm:mx-4 mx-2 rounded-lg">
        <Command
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-zinc-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-1 [&_[cmdk-group]]:pb-1 [&_[cmdk-input-wrapper]_svg]:h-4 [&_[cmdk-input-wrapper]_svg]:w-4 [&_[cmdk-input]]:h-11 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4"
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1
            return 0
          }}
        >
          <div className="flex items-center border-b border-zinc-800 px-3 py-1" cmdk-input-wrapper="">
            <Terminal className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              ref={inputRef}
              value={search}
              onValueChange={setSearch}
              className="flex h-9 w-full rounded-md bg-transparent py-2 text-sm font-medium outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a command or search..."
            />
          </div>
          <div className="max-h-[350px] overflow-y-auto terminal-scrollbar">
            <CommandPrimitive.List>
              <CommandPrimitive.Empty className="py-8 text-center text-sm text-zinc-500">
                No results found. Try a different search term.
              </CommandPrimitive.Empty>

              <CommandPrimitive.Group heading="Navigation" className="mb-1 mt-1">
                <CommandPrimitive.Item
                  value="dashboard"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("cd /dashboard", "dashboard"))}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="analytics"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("analytics --view", "analytics"))}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="explore"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("explore --assets", "explore"))}
                >
                  <Search className="h-4 w-4" />
                  <span>Explore Assets</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="lending"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("lending --view", "lending"))}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Lending</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="collection"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("ls --assets", "collection"))}
                >
                  <Building2 className="h-4 w-4" />
                  <span>My Assets</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>

              <CommandPrimitive.Group heading="Actions" className="mb-1 mt-1">
                <CommandPrimitive.Item
                  value="tokenize"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("tokenize --new", "tokenize"))}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Tokenize Asset</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="transfer"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("transfer --asset", "transfer"))}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  <span>Transfer Asset</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="validate"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("validate --asset", "validate"))}
                >
                  <FileCheck className="h-4 w-4" />
                  <span>Validate Asset</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>

              <CommandPrimitive.Group heading="Account" className="mb-1 mt-1">
                <CommandPrimitive.Item
                  value="wallet"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("wallet --status", "wallet"))}
                >
                  <Wallet className="h-4 w-4" />
                  <span>Wallet</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="settings"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("config --edit", "settings"))}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="profile"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("profile --view", "profile"))}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="alerts"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("alerts --view", "alerts"))}
                >
                  <Bell className="h-4 w-4" />
                  <span>Alerts</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>

              {commandHistory.length > 0 && (
                <CommandPrimitive.Group heading="Recent Commands" className="mb-1 mt-1">
                  {commandHistory.slice(0, 5).map((command, index) => (
                    <CommandPrimitive.Item
                      key={index}
                      value={`history-${command}`}
                      className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                      onSelect={() => {
                        setSearch(command)
                        inputRef.current?.focus()
                      }}
                    >
                      <History className="h-4 w-4" />
                      <span>{command}</span>
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
              )}

              <CommandPrimitive.Group heading="Help" className="mb-1 mt-1">
                <CommandPrimitive.Item
                  value="help"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("help", "dashboard"))}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Documentation</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="refresh"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => window.location.reload())}
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh Terminal</span>
                </CommandPrimitive.Item>
                <CommandPrimitive.Item
                  value="report"
                  className="flex items-center gap-3 text-sm cursor-pointer rounded px-2 mx-1 aria-selected:bg-zinc-800 hover:bg-zinc-900 transition-colors"
                  onSelect={() => handleSelect(() => runCommand("report --issue", "dashboard"))}
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>Report Issue</span>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
