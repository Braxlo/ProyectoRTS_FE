'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Utensils, 
  Users, 
  Package, 
  Menu, 
  AlertTriangle, 
  BarChart3,
  Clock,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api'
import ProtectedRoute from '@/components/ProtectedRoute'

interface DashboardStats {
  tables: {
    total: number
    available: number
    occupied: number
  }
  orders: {
    total: number
    pending: number
    completed: number
  }
  inventory: {
    total: number
    lowStock: number
    critical: number
  }
  menu: {
    total: number
    available: number
    featured: number
  }
  revenue: {
    today: number
    week: number
    month: number
  }
}

export default function Dashboard() {
  const { user, restaurant } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getDashboardStats()
        if (response.data) {
          setStats(response.data)
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar estadísticas'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchDashboardStats()
    }
  }, [user])

  const modules = [
    {
      title: 'Gestión de Mesas',
      description: 'Administra las mesas del restaurante, estado y reservas',
      icon: Users,
      href: '/mesas',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      stats: stats ? {
        total: stats.tables.total,
        active: stats.tables.occupied,
        available: stats.tables.available
      } : { total: 0, active: 0, available: 0 }
    },
    {
      title: 'Gestión de Órdenes',
      description: 'Crea y gestiona órdenes de los clientes',
      icon: Menu,
      href: '/ordenes',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      stats: stats ? {
        total: stats.orders.total,
        pending: stats.orders.pending,
        completed: stats.orders.completed
      } : { total: 0, pending: 0, completed: 0 }
    },
    {
      title: 'Gestión de Almacén',
      description: 'Controla el inventario de productos y materias primas',
      icon: Package,
      href: '/almacen',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      stats: stats ? {
        total: stats.inventory.total,
        low: stats.inventory.lowStock,
        critical: stats.inventory.critical
      } : { total: 0, low: 0, critical: 0 }
    },
    {
      title: 'Gestión de Menú',
      description: 'Administra platos, precios y disponibilidad',
      icon: Utensils,
      href: '/menu',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      stats: stats ? {
        total: stats.menu.total,
        available: stats.menu.available,
        featured: stats.menu.featured
      } : { total: 0, available: 0, featured: 0 }
    },
    {
      title: 'Alertas de Stock',
      description: 'Monitorea niveles bajos de inventario',
      icon: AlertTriangle,
      href: '/alertas',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      stats: stats ? {
        total: stats.inventory.lowStock + stats.inventory.critical,
        critical: stats.inventory.critical,
        resolved: 0
      } : { total: 0, critical: 0, resolved: 0 }
    },
    {
      title: 'Reportes',
      description: 'Vista de estadísticas y reportes del restaurante',
      icon: BarChart3,
      href: '/reportes',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      stats: stats ? {
        revenue: stats.revenue.today,
        orders: stats.orders.total,
        growth: 12
      } : { revenue: 0, orders: 0, growth: 0 }
    }
  ]

  const quickStats = [
    {
      title: 'Ventas Hoy',
      value: stats ? `$${stats.revenue.today.toFixed(2)}` : '$0.00',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Órdenes Pendientes',
      value: stats ? stats.orders.pending.toString() : '0',
      change: '2 nuevas',
      trend: 'neutral',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Mesas Ocupadas',
      value: stats ? `${stats.tables.occupied}/${stats.tables.total}` : '0/0',
      change: stats ? `${Math.round((stats.tables.occupied / stats.tables.total) * 100)}%` : '0%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Stock Crítico',
      value: stats ? stats.inventory.critical.toString() : '0',
      change: 'Requiere atención',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ]

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Cargando dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Bienvenido, {user?.name} - {restaurant?.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-sm">
              {user?.role === 'admin' ? 'Administrador' : 'Empleado'}
            </Badge>
            {user?.position && (
              <Badge variant="secondary" className="text-sm">
                {user.position}
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link key={index} href={module.href}>
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${module.color}`}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {module.stats.total}
                      </div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Disponibles: {module.stats.available || module.stats.active || 0}
                    </span>
                    {module.stats.pending && (
                      <span className="text-orange-600">
                        Pendientes: {module.stats.pending}
                      </span>
                    )}
                    {module.stats.critical && (
                      <span className="text-red-600">
                        Críticos: {module.stats.critical}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones y eventos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Nueva orden creada</p>
                    <p className="text-sm text-gray-500">Mesa 3 - $45.50</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Hace 5 min</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Mesa liberada</p>
                    <p className="text-sm text-gray-500">Mesa 2 ahora disponible</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Hace 15 min</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Stock bajo</p>
                    <p className="text-sm text-gray-500">Queso Parmesano - 2kg restantes</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Hace 1 hora</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
