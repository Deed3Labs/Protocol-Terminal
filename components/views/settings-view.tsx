"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function SettingsView() {
  const { addToHistory } = useTerminal()
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [commandHistory, setCommandHistory] = useState(true)
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••••••••")

  const handleSave = () => {
    addToHistory("config --save")
    // In a real app, this would save the settings
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
      </div>
      <p className="text-sm text-zinc-400 mb-6">Configure your terminal preferences and account settings.</p>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="terminal-card space-y-6">
            <h3 className="text-sm font-medium">General Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-sm">
                    Notifications
                  </Label>
                  <p className="text-xs text-zinc-500">Receive alerts about your assets and transactions</p>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="command-history" className="text-sm">
                    Command History
                  </Label>
                  <p className="text-xs text-zinc-500">Save command history between sessions</p>
                </div>
                <Switch id="command-history" checked={commandHistory} onCheckedChange={setCommandHistory} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-blockchain" className="text-sm">
                  Default Blockchain
                </Label>
                <select
                  id="default-blockchain"
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                  <option value="binance">Binance Smart Chain</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <div className="terminal-card space-y-6">
            <h3 className="text-sm font-medium">Appearance Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-sm">
                    Dark Mode
                  </Label>
                  <p className="text-xs text-zinc-500">Use dark theme for terminal interface</p>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size" className="text-sm">
                  Font Size
                </Label>
                <select
                  id="font-size"
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color" className="text-sm">
                  Accent Color
                </Label>
                <select
                  id="accent-color"
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="terminal-card space-y-6">
            <h3 className="text-sm font-medium">Security Settings</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-sm">
                  Current Password
                </Label>
                <Input id="current-password" type="password" className="terminal-input" placeholder="••••••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm">
                  New Password
                </Label>
                <Input id="new-password" type="password" className="terminal-input" placeholder="••••••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm">
                  Confirm New Password
                </Label>
                <Input id="confirm-password" type="password" className="terminal-input" placeholder="••••••••••••" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor" className="text-sm">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-xs text-zinc-500">Enable 2FA for additional security</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Update Security Settings</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <div className="terminal-card space-y-6">
            <h3 className="text-sm font-medium">API Settings</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key" className="text-sm">
                  API Key
                </Label>
                <div className="flex">
                  <Input id="api-key" value={apiKey} className="terminal-input rounded-r-none" readOnly />
                  <Button className="rounded-l-none">Regenerate</Button>
                </div>
                <p className="text-xs text-zinc-500">Use this key to access the Deed Protocol API</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url" className="text-sm">
                  Webhook URL
                </Label>
                <Input id="webhook-url" className="terminal-input" placeholder="https://your-app.com/webhook" />
                <p className="text-xs text-zinc-500">Receive real-time updates about your assets</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="api-access" className="text-sm">
                    API Access
                  </Label>
                  <p className="text-xs text-zinc-500">Enable API access for third-party integrations</p>
                </div>
                <Switch id="api-access" defaultChecked />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save API Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
