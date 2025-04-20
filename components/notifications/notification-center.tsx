"use client"

import { useState, useEffect } from "react"
import { useNotifications, type Notification } from "./notification-provider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check, X, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } =
    useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  // Close notification center when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(".notification-center")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleNotificationCenter = () => {
    setIsOpen(!isOpen)
  }

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
  }

  const handleRemoveNotification = (id: string) => {
    removeNotification(id)
  }

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
        return "border-blue-800 bg-blue-950/30"
      case "success":
        return "border-green-800 bg-green-950/30"
      case "warning":
        return "border-amber-800 bg-amber-950/30"
      case "error":
        return "border-red-800 bg-red-950/30"
    }
  }

  return (
    <div className="notification-center relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative h-8 w-8 rounded-full p-0"
        onClick={toggleNotificationCenter}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 p-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium">Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => markAllAsRead()}>
                    <Check className="mr-1 h-3 w-3" />
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => clearAllNotifications()}>
                  <X className="mr-1 h-3 w-3" />
                  Clear all
                </Button>
              </div>
            </div>

            <ScrollArea className="max-h-[70vh] overflow-y-auto p-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-zinc-500">
                  <Bell className="mb-2 h-8 w-8 opacity-20" />
                  <p className="text-sm">No notifications</p>
                  <p className="text-xs">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`relative flex gap-3 rounded-md border p-3 ${
                        notification.read
                          ? "border-zinc-800 bg-zinc-900/50"
                          : getNotificationColor(notification.severity)
                      }`}
                    >
                      <div className="mt-0.5">{getNotificationIcon(notification.severity)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${notification.read ? "text-zinc-300" : "text-white"}`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-zinc-500">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">{notification.message}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] uppercase text-zinc-500">{notification.source}</span>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Mark read
                              </Button>
                            )}
                            {notification.action && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={notification.action.onClick}
                              >
                                {notification.action.label}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleRemoveNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Dismiss</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
