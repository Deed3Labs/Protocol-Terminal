"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export type NotificationSeverity = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  message: string
  severity: NotificationSeverity
  timestamp: Date
  read: boolean
  source: string
  persistent?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => string
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAllNotifications: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [sound, setSound] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize notification sound
    const notificationSound = new Audio("/notification-sound.mp3")
    setSound(notificationSound)

    // Load saved notifications from localStorage
    const savedNotifications = localStorage.getItem("terminal-notifications")
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications)
        // Convert string timestamps back to Date objects
        const restored = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
        setNotifications(restored)
        setUnreadCount(restored.filter((n: Notification) => !n.read).length)
      } catch (e) {
        console.error("Failed to parse saved notifications", e)
      }
    }

    // Demo notifications for testing
    setTimeout(() => {
      addNotification({
        title: "Market Alert",
        message: "Real estate market volatility detected. Consider reviewing your portfolio.",
        severity: "warning",
        source: "analytics",
      })
    }, 5000)
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("terminal-notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  // Update unread count when notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">): string => {
    const id = uuidv4()
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Play sound for new notifications
    if (sound && notification.severity !== "info") {
      sound.play().catch((e) => console.error("Failed to play notification sound", e))
    }

    return id
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearAllNotifications = () => {
    // Keep only persistent notifications
    setNotifications((prev) => prev.filter((notification) => notification.persistent))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        markAsRead,
        markAllAsRead,
        clearAllNotifications,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
