"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Check, AlertTriangle, Info, X } from "lucide-react"

interface AlertsPanelProps {
  detailed?: boolean
}

export function AlertsPanel({ detailed = false }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      type: "warning",
      title: "Market Volatility Alert",
      message: "Vehicle market showing increased volatility. Consider reviewing your vehicle assets.",
      date: "2025-04-19",
      read: false,
    },
    {
      id: "alert-2",
      type: "info",
      title: "New Regulation Update",
      message: "New regulations for tokenized real estate coming into effect on May 1, 2025.",
      date: "2025-04-18",
      read: false,
    },
    {
      id: "alert-3",
      type: "success",
      title: "Asset Transfer Complete",
      message: "Transfer of 'Luxury Condo #42' has been successfully completed.",
      date: "2025-04-18",
      read: true,
    },
    {
      id: "alert-4",
      type: "warning",
      title: "Verification Required",
      message: "Your 'Construction Excavator' asset requires re-verification by April 30.",
      date: "2025-04-15",
      read: false,
    },
    {
      id: "alert-5",
      type: "info",
      title: "Portfolio Analysis Ready",
      message: "Your monthly portfolio analysis report is now available.",
      date: "2025-04-10",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
  }

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-zinc-400" />
          <span className="text-sm">{alerts.filter((alert) => !alert.read).length} unread notifications</span>
        </div>
        {alerts.some((alert) => !alert.read) && (
          <Button variant="outline" size="sm" className="h-7 text-xs">
            Mark all as read
          </Button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">
          <p>No alerts or notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 border rounded-md flex items-start gap-3 ${
                alert.read ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-700 bg-zinc-900"
              }`}
            >
              <div className="mt-0.5">
                {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                {alert.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
                {alert.type === "success" && <Check className="h-5 w-5 text-green-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-medium ${alert.read ? "text-zinc-400" : "text-white"}`}>
                      {alert.title}
                    </h4>
                    <Badge
                      variant={
                        alert.type === "warning" ? "destructive" : alert.type === "info" ? "secondary" : "default"
                      }
                      className="text-[10px] px-1 py-0"
                    >
                      {alert.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-zinc-500">{alert.date}</span>
                </div>
                <p className={`text-xs mt-1 ${alert.read ? "text-zinc-500" : "text-zinc-400"}`}>{alert.message}</p>
                <div className="flex items-center justify-end mt-2 gap-2">
                  {!alert.read && (
                    <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => markAsRead(alert.id)}>
                      Mark as read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => dismissAlert(alert.id)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {detailed && (
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <h4 className="text-xs font-medium mb-2">NOTIFICATION SETTINGS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <Button variant="outline" size="sm" className="justify-start h-7 text-xs">
              <Bell className="h-3 w-3 mr-2" />
              Configure Notifications
            </Button>
            <Button variant="outline" size="sm" className="justify-start h-7 text-xs">
              <AlertTriangle className="h-3 w-3 mr-2" />
              Alert Thresholds
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
