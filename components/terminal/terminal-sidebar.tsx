"use client"

import { useRouter, usePathname } from "next/navigation"
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
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TerminalSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  onClose?: () => void
}

export function TerminalSidebar({ collapsed = false, onToggle, onClose }: TerminalSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { setCurrentPath, setLastCommand, activeView, setActiveView } = useTerminal()

  const handleNavigation = (view: string, command: string) => {
    setLastCommand(command)
    setActiveView(view)
    if (window.innerWidth < 640) {
      onClose?.()
    }
  }

  // Render collapsed sidebar
  if (collapsed) {
    return (
      <div
        className={cn(
          "terminal-sidebar-collapsed transition-all duration-300 ease-in-out",
          "w-12 border-r border-zinc-800 bg-black p-2 flex flex-col items-center overflow-y-auto",
          "md:static fixed inset-y-0 left-0 z-40",
        )}
      >
        <div className="flex items-center justify-between w-full mb-4">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white" onClick={onToggle}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-zinc-400 hover:text-white md:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <TooltipProvider>
          <div className="flex flex-col gap-1 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "dashboard" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("dashboard", "cd /dashboard")}
                >
                  <Home className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "analytics" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("analytics", "analytics --view")}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "lending" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("lending", "lending --view")}
                >
                  <DollarSign className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Lending</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "collection" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("collection", "ls --assets")}
                >
                  <Building2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">My Assets</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "tokenize" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("tokenize", "tokenize --new")}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Tokenize Asset</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "transfer" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("transfer", "transfer --asset")}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Transfer Asset</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "validate" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("validate", "validate --asset")}
                >
                  <FileCheck className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Validate Asset</TooltipContent>
            </Tooltip>
          </div>

          <div className="mt-auto flex flex-col gap-1 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "wallet" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("wallet", "wallet --status")}
                >
                  <Wallet className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Wallet</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "settings" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("settings", "config --edit")}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", activeView === "profile" && "bg-zinc-800 text-white")}
                  onClick={() => handleNavigation("profile", "profile --view")}
                >
                  <User className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    )
  }

  // Render expanded sidebar
  return (
    <div
      className={cn(
        "terminal-sidebar transition-all duration-300 ease-in-out",
        "w-48 border-r border-zinc-800 bg-black p-2 flex flex-col overflow-y-auto",
        "md:static fixed inset-y-0 left-0 z-40",
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-green-500 font-mono text-xs">DEED PROTOCOL</span>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white" onClick={onToggle}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-zinc-400 hover:text-white md:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "dashboard" && "terminal-tab-active")}
          onClick={() => handleNavigation("dashboard", "cd /dashboard")}
        >
          <Home className="h-3.5 w-3.5 mr-2" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "analytics" && "terminal-tab-active")}
          onClick={() => handleNavigation("analytics", "analytics --view")}
        >
          <BarChart3 className="h-3.5 w-3.5 mr-2" />
          Analytics
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "lending" && "terminal-tab-active")}
          onClick={() => handleNavigation("lending", "lending --view")}
        >
          <DollarSign className="h-3.5 w-3.5 mr-2" />
          Lending
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "collection" && "terminal-tab-active")}
          onClick={() => handleNavigation("collection", "ls --assets")}
        >
          <Building2 className="h-3.5 w-3.5 mr-2" />
          My Assets
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "tokenize" && "terminal-tab-active")}
          onClick={() => handleNavigation("tokenize", "tokenize --new")}
        >
          <PlusCircle className="h-3.5 w-3.5 mr-2" />
          Tokenize Asset
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "transfer" && "terminal-tab-active")}
          onClick={() => handleNavigation("transfer", "transfer --asset")}
        >
          <ArrowLeftRight className="h-3.5 w-3.5 mr-2" />
          Transfer Asset
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "validate" && "terminal-tab-active")}
          onClick={() => handleNavigation("validate", "validate --asset")}
        >
          <FileCheck className="h-3.5 w-3.5 mr-2" />
          Validate Asset
        </Button>
      </div>
      <div className="mt-6 pt-6 border-t border-zinc-800">
        <h3 className="px-2 text-[10px] font-medium text-zinc-500 mb-2">ASSET CATEGORIES</h3>
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn("justify-start text-xs terminal-tab", activeView === "real-estate" && "terminal-tab-active")}
            onClick={() => handleNavigation("real-estate", "filter --category=real-estate")}
          >
            <Building2 className="h-3.5 w-3.5 mr-2" />
            Real Estate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("justify-start text-xs terminal-tab", activeView === "vehicles" && "terminal-tab-active")}
            onClick={() => handleNavigation("vehicles", "filter --category=vehicles")}
          >
            <Car className="h-3.5 w-3.5 mr-2" />
            Vehicles
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("justify-start text-xs terminal-tab", activeView === "equipment" && "terminal-tab-active")}
            onClick={() => handleNavigation("equipment", "filter --category=equipment")}
          >
            <Tractor className="h-3.5 w-3.5 mr-2" />
            Equipment
          </Button>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-1 pt-6 border-t border-zinc-800">
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "wallet" && "terminal-tab-active")}
          onClick={() => handleNavigation("wallet", "wallet --status")}
        >
          <Wallet className="h-3.5 w-3.5 mr-2" />
          Wallet
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "settings" && "terminal-tab-active")}
          onClick={() => handleNavigation("settings", "config --edit")}
        >
          <Settings className="h-3.5 w-3.5 mr-2" />
          Settings
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start text-xs terminal-tab", activeView === "profile" && "terminal-tab-active")}
          onClick={() => handleNavigation("profile", "profile --view")}
        >
          <User className="h-3.5 w-3.5 mr-2" />
          Profile
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start text-xs terminal-tab text-red-400 hover:text-red-300"
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
