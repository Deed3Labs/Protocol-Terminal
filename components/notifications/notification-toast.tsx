"use client"

import { useEffect } from "react"
import { useNotifications, type Notification } from "./notification-provider"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotificationToast() {
  const { notifications, markAsRead, removeNotification } = useNotifications()

  // Only show the most recent unread notification as a toast
  const toastNotification = notifications.find((n) => !n.read)

  useEffect(() => {
    if (toastNotification) {
      // Auto-dismiss toast after 5 seconds
      const timer = setTimeout(() => {
        markAsRead(toastNotification.id)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toastNotification, markAsRead])

  const getNotificationIcon = (severity: Notification["severity"]) => {
    switch (severity) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getNotificationColor = (severity: Notification["severity"]) => {
    switch (severity) {
      case "info":
        return "border-blue-800 bg-blue-950/80"
      case "success":
        return "border-green-800 bg-green-950/80"
      case "warning":
        return "border-amber-800 bg-amber-950/80"
      case "error":
        return "border-red-800 bg-red-950/80"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            key={toastNotification.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`w-80 rounded-md border shadow-lg backdrop-blur-sm ${getNotificationColor(
              toastNotification.severity,
            )}`}
          >
            <div className="flex items-start gap-3 p-4">
              <div className="mt-0.5">{getNotificationIcon(toastNotification.severity)}</div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white">{toastNotification.title}</h4>
                <p className="mt-1 text-xs text-zinc-300">{toastNotification.message}</p>
                {toastNotification.action && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={toastNotification.action.onClick}
                    >
                      {toastNotification.action.label}
                    </Button>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 -mt-1 -mr-1"
                onClick={() => removeNotification(toastNotification.id)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
