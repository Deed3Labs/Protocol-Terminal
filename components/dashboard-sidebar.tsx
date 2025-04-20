"use client"

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
  Banknote,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-full flex-col gap-2 p-4 overflow-y-auto">
        <div className="flex flex-col gap-1">
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/" && "bg-muted text-foreground",
              )}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/mint"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/mint" && "bg-muted text-foreground",
              )}
            >
              <PlusCircle className="h-5 w-5" />
              Tokenize Asset
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/transfer"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/transfer" && "bg-muted text-foreground",
              )}
            >
              <ArrowLeftRight className="h-5 w-5" />
              Transfer Asset
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/validate"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/validate" && "bg-muted text-foreground",
              )}
            >
              <FileCheck className="h-5 w-5" />
              Validate Asset
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/collection"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/collection" && "bg-muted text-foreground",
              )}
            >
              <Building2 className="h-5 w-5" />
              My Assets
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/analytics"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/analytics" && "bg-muted text-foreground",
              )}
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/lending"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/lending" && "bg-muted text-foreground",
              )}
            >
              <Banknote className="h-5 w-5" />
              Lending
            </Link>
          </Button>
        </div>
        <div className="mt-6 pt-6 border-t">
          <h3 className="px-3 text-xs font-medium text-muted-foreground mb-2">Asset Categories</h3>
          <div className="flex flex-col gap-1">
            <Button asChild variant="ghost" className="justify-start">
              <Link
                href="/category/real-estate"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/category/real-estate" && "bg-muted text-foreground",
                )}
              >
                <Building2 className="h-5 w-5" />
                Real Estate
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link
                href="/category/vehicles"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/category/vehicles" && "bg-muted text-foreground",
                )}
              >
                <Car className="h-5 w-5" />
                Vehicles
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link
                href="/category/equipment"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/category/equipment" && "bg-muted text-foreground",
                )}
              >
                <Tractor className="h-5 w-5" />
                Equipment
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/wallet"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/wallet" && "bg-muted text-foreground",
              )}
            >
              <Wallet className="h-5 w-5" />
              Wallet
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                pathname === "/settings" && "bg-muted text-foreground",
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
