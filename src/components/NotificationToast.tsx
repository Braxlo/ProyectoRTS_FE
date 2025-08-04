'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle, Info, X, Clock, Users, Package } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: Date
  icon?: React.ReactNode
}

export default function NotificationToast() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simular notificaciones automáticas
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'info',
        title: 'Actualización del Sistema',
        message: 'Se han actualizado los datos del restaurante',
        timestamp: new Date(),
        icon: <Info className="h-4 w-4" />
      }
      
      if (Math.random() > 0.7) { // 30% de probabilidad
        addNotification(newNotification)
      }
    }, 30000) // Cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 4)]) // Máximo 5 notificaciones
    setIsVisible(true)
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    if (notifications.length <= 1) {
      setIsVisible(false)
    }
  }

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'error':
        return 'border-red-200 bg-red-50'
      case 'info':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
      case 'info':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  if (!isVisible || notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className={`border shadow-lg transition-all duration-300 ${getNotificationStyle(notification.type)}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getIconColor(notification.type).replace('text-', 'bg-').replace('-600', '-100')}`}>
                {notification.icon || <Info className={`h-4 w-4 ${getIconColor(notification.type)}`} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {notification.title}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getNotificationStyle(notification.type).replace('border-', 'border-').replace('bg-', 'bg-')}`}
                  >
                    {notification.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 