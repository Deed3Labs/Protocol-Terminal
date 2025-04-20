"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTerminal } from "@/components/terminal/terminal-provider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Wallet,
  Settings,
  Star,
  Clock,
  ChevronDown,
  Copy,
  ExternalLink,
  Save,
  X,
  Plus,
  BarChart3,
  Building2,
  Car,
  Tractor,
} from "lucide-react"
import { AssetPerformanceTable } from "@/components/analytics/asset-performance-table"
import { AssetValueChart } from "@/components/analytics/asset-value-chart"
import { AssetDistributionChart } from "@/components/analytics/asset-distribution-chart"
import { TransactionLog } from "@/components/analytics/transaction-log"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ProfileView() {
  const { addToHistory } = useTerminal()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "assets" | "saved" | "transactions" | "settings">("overview")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const handleSave = () => {
    setIsEditing(false)
    addToHistory("profile --update")
  }

  // Sample user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    bio: "Blockchain enthusiast and real estate investor.",
    joinDate: "April 2023",
    totalAssets: 24,
    totalValue: "$4.25M",
    monthlyChange: "+3.2%",
    annualReturn: "+13.7%",
  }

  // Sample saved assets
  const savedAssets = [
    {
      id: "1",
      name: "Luxury Condo #42",
      category: "Real Estate",
      price: "$920,000",
      status: "Verified",
      saved: true,
    },
    {
      id: "2",
      name: "Tesla Model S",
      category: "Vehicles",
      price: "$95,000",
      status: "Verified",
      saved: true,
    },
    {
      id: "3",
      name: "Commercial Building",
      category: "Real Estate",
      price: "$2.65M",
      status: "Verified",
      saved: true,
    },
  ]

  return (
    <div className="terminal-content">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">User Profile</h1>
        {activeTab === "overview" && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        )}
      </div>

      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full mb-4 justify-between">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setActiveTab("overview")}>Overview</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("assets")}>My Assets</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("saved")}>Saved Assets</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("transactions")}>Transactions</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("settings")}>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
          <TabsList className="bg-zinc-900 p-0 h-8">
            <TabsTrigger
              value="overview"
              className={`text-xs px-3 h-8 ${activeTab === "overview" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
            >
              <User className="h-3.5 w-3.5 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className={`text-xs px-3 h-8 ${activeTab === "assets" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
            >
              <Building2 className="h-3.5 w-3.5 mr-2" />
              My Assets
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className={`text-xs px-3 h-8 ${activeTab === "saved" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
            >
              <Star className="h-3.5 w-3.5 mr-2" />
              Saved Assets
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className={`text-xs px-3 h-8 ${activeTab === "transactions" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
            >
              <Clock className="h-3.5 w-3.5 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className={`text-xs px-3 h-8 ${activeTab === "settings" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
            >
              <Settings className="h-3.5 w-3.5 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="terminal-card">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
                <span className="text-2xl">JD</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium">{userData.name}</h2>
                <p className="text-sm text-zinc-500">{userData.email}</p>
                <p className="text-xs text-zinc-500">Member since {userData.joinDate}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-zinc-900">
                    <Wallet className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                  <Badge variant="outline" className="bg-zinc-900">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Pro User
                  </Badge>
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm">
                      First Name
                    </label>
                    <Input id="first-name" defaultValue="John" className="terminal-input" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm">
                      Last Name
                    </label>
                    <Input id="last-name" defaultValue="Doe" className="terminal-input" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <Input id="email" defaultValue={userData.email} className="terminal-input" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm">
                    Bio
                  </label>
                  <Textarea id="bio" defaultValue={userData.bio} className="terminal-input" rows={3} />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mt-6">
                <div>
                  <div className="text-sm text-zinc-500">Bio</div>
                  <div className="text-sm">{userData.bio}</div>
                </div>

                <div>
                  <div className="text-sm text-zinc-500">Wallet Address</div>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs bg-zinc-900 px-2 py-1 rounded font-mono">
                      {userData.walletAddress.substring(0, 8)}...
                      {userData.walletAddress.substring(userData.walletAddress.length - 8)}
                    </code>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                      <span className="sr-only">View on Explorer</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="terminal-card">
              <div className="text-[10px] text-zinc-500 uppercase">Total Assets</div>
              <div className="text-lg font-mono mt-1">{userData.totalAssets}</div>
            </div>
            <div className="terminal-card">
              <div className="text-[10px] text-zinc-500 uppercase">Total Value</div>
              <div className="text-lg font-mono mt-1">{userData.totalValue}</div>
            </div>
            <div className="terminal-card">
              <div className="text-[10px] text-zinc-500 uppercase">Monthly Change</div>
              <div className="text-lg font-mono mt-1 text-green-500">{userData.monthlyChange}</div>
            </div>
            <div className="terminal-card">
              <div className="text-[10px] text-zinc-500 uppercase">Annual Return</div>
              <div className="text-lg font-mono mt-1 text-green-500">{userData.annualReturn}</div>
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">PORTFOLIO PERFORMANCE</h3>
            <div className="h-[300px]">
              <AssetValueChart detailed />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">ASSET ALLOCATION</h3>
              <div className="h-[250px]">
                <AssetDistributionChart />
              </div>
            </div>
            <div className="terminal-card">
              <h3 className="text-xs font-medium mb-4">RECENT TRANSACTIONS</h3>
              <TransactionLog limit={3} />
            </div>
          </div>
        </div>
      )}

      {/* My Assets Tab */}
      {activeTab === "assets" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">My Assets</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Asset
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Filter
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Assets</DropdownMenuItem>
                  <DropdownMenuItem>Real Estate</DropdownMenuItem>
                  <DropdownMenuItem>Vehicles</DropdownMenuItem>
                  <DropdownMenuItem>Equipment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="terminal-card">
            <AssetPerformanceTable detailed />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="terminal-card">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-zinc-400" />
                <h3 className="text-xs font-medium">REAL ESTATE</h3>
              </div>
              <div className="text-lg font-mono mt-1">$3.5M</div>
              <div className="text-xs text-green-500">+10.4% YTD</div>
            </div>
            <div className="terminal-card">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-4 w-4 text-zinc-400" />
                <h3 className="text-xs font-medium">VEHICLES</h3>
              </div>
              <div className="text-lg font-mono mt-1">$435K</div>
              <div className="text-xs text-red-500">-2.1% YTD</div>
            </div>
            <div className="terminal-card">
              <div className="flex items-center gap-2 mb-2">
                <Tractor className="h-4 w-4 text-zinc-400" />
                <h3 className="text-xs font-medium">EQUIPMENT</h3>
              </div>
              <div className="text-lg font-mono mt-1">$315K</div>
              <div className="text-xs text-green-500">+5.8% YTD</div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Assets Tab */}
      {activeTab === "saved" && (
        <div className="space-y-6">
          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">SAVED ASSETS</h3>
            <div className="space-y-4">
              {savedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {asset.category} • {asset.price}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{asset.status}</Badge>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">RECOMMENDED ASSETS</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <div className="font-medium">Office Building #7</div>
                  <div className="text-xs text-zinc-500 mt-1">Real Estate • $1.45M</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Verified</Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <div className="font-medium">Industrial Warehouse</div>
                  <div className="text-xs text-zinc-500 mt-1">Real Estate • $2.8M</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Pending</Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Luxury Yacht</div>
                  <div className="text-xs text-zinc-500 mt-1">Vehicles • $580K</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Verified</Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="space-y-6">
          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">TRANSACTION HISTORY</h3>
            <TransactionLog detailed />
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">ACCOUNT SETTINGS</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="display-name" className="text-sm">
                  Display Name
                </label>
                <Input id="display-name" defaultValue="John Doe" className="terminal-input" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email-settings" className="text-sm">
                  Email
                </label>
                <Input id="email-settings" defaultValue={userData.email} className="terminal-input" />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Input id="password" type="password" value="••••••••••••" className="terminal-input" />
              </div>

              <div className="flex justify-end">
                <Button>Save Account Settings</Button>
              </div>
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">NOTIFICATION PREFERENCES</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Email Notifications</div>
                  <div className="text-xs text-zinc-500">Receive updates via email</div>
                </div>
                <div className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-800 transition-colors duration-200 ease-in-out focus:outline-none">
                  <span className="translate-x-4 relative inline-block h-3 w-3 transform rounded-full bg-green-500 shadow transition duration-200 ease-in-out"></span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Push Notifications</div>
                  <div className="text-xs text-zinc-500">Receive alerts on your device</div>
                </div>
                <div className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-800 transition-colors duration-200 ease-in-out focus:outline-none">
                  <span className="translate-x-4 relative inline-block h-3 w-3 transform rounded-full bg-green-500 shadow transition duration-200 ease-in-out"></span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Price Alerts</div>
                  <div className="text-xs text-zinc-500">Get notified of significant price changes</div>
                </div>
                <div className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-800 transition-colors duration-200 ease-in-out focus:outline-none">
                  <span className="translate-x-4 relative inline-block h-3 w-3 transform rounded-full bg-green-500 shadow transition duration-200 ease-in-out"></span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Transaction Updates</div>
                  <div className="text-xs text-zinc-500">Notifications about your transactions</div>
                </div>
                <div className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-800 transition-colors duration-200 ease-in-out focus:outline-none">
                  <span className="translate-x-4 relative inline-block h-3 w-3 transform rounded-full bg-green-500 shadow transition duration-200 ease-in-out"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4">CONNECTED WALLETS</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-xs">ETH</span>
                  </div>
                  <div>
                    <div className="text-sm">Ethereum Wallet</div>
                    <div className="text-xs text-zinc-500">0x1a2b...3c4d</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-xs">SOL</span>
                  </div>
                  <div>
                    <div className="text-sm">Solana Wallet</div>
                    <div className="text-xs text-zinc-500">5e6f7...8g9h</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800">
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect New Wallet
                </Button>
              </div>
            </div>
          </div>

          <div className="terminal-card">
            <h3 className="text-xs font-medium mb-4 text-red-500">DANGER ZONE</h3>

            <div className="space-y-4">
              <div>
                <div className="text-sm">Delete Account</div>
                <div className="text-xs text-zinc-500 mb-2">
                  This will permanently delete your account and all associated data.
                </div>
                <Button variant="destructive" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
