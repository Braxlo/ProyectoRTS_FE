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
  XCircle
} from 'lucide-react'

export default function Dashboard() {
  const modules = [
    {
      title: 'Gestión de Mesas',
      description: 'Administra las mesas del restaurante, estado y reservas',
      icon: Users,
      href: '/mesas',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      stats: { total: 12, active: 8, available: 5 }
    },
    {
      title: 'Gestión de Órdenes',
      description: 'Crea y gestiona órdenes de los clientes',
      icon: Menu,
      href: '/ordenes',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      stats: { total: 25, pending: 8, completed: 17 }
    },
    {
      title: 'Gestión de Almacén',
      description: 'Controla el inventario de productos y materias primas',
      icon: Package,
      href: '/almacen',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      stats: { total: 45, low: 15, critical: 3 }
    },
    {
      title: 'Gestión de Menú',
      description: 'Administra platos, precios y disponibilidad',
      icon: Utensils,
      href: '/menu',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      stats: { total: 32, available: 28, featured: 5 }
    },
    {
      title: 'Alertas de Stock',
      description: 'Monitorea niveles bajos de inventario',
      icon: AlertTriangle,
      href: '/alertas',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      stats: { total: 8, critical: 3, resolved: 5 }
    },
    {
      title: 'Reportes',
      description: 'Vista de estadísticas y reportes del restaurante',
      icon: BarChart3,
      href: '/reportes',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      stats: { revenue: 1250, orders: 45, growth: 12 }
    }
  ]

  const quickStats = [
    {
      title: 'Ventas Hoy',
      value: '$1,250.50',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Órdenes Pendientes',
      value: '8',
      change: '2 nuevas',
      trend: 'neutral',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Mesas Ocupadas',
      value: '8/12',
      change: '67%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Stock Crítico',
      value: '3',
      change: 'Requiere atención',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Panel de Control
              </h1>
              <p className="text-gray-600 text-lg">
                Bienvenido al sistema de gestión del restaurante
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Sistema Activo
              </Badge>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modules.map((module) => (
            <Link key={module.href} href={module.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-sm hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${module.color} shadow-lg`}>
                      <module.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {module.stats.total} total
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-4 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {module.stats.revenue ? (
                      <>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="font-semibold text-green-700">${module.stats.revenue}</div>
                          <div className="text-xs text-green-600">Ingresos</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="font-semibold text-blue-700">{module.stats.orders}</div>
                          <div className="text-xs text-blue-600">Órdenes</div>
                        </div>
                      </>
                    ) : module.stats.active ? (
                      <>
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="font-semibold text-blue-700">{module.stats.active}</div>
                          <div className="text-xs text-blue-600">Activas</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="font-semibold text-green-700">{module.stats.available}</div>
                          <div className="text-xs text-green-600">Disponibles</div>
                        </div>
                      </>
                    ) : module.stats.pending ? (
                      <>
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <div className="font-semibold text-orange-700">{module.stats.pending}</div>
                          <div className="text-xs text-orange-600">Pendientes</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="font-semibold text-green-700">{module.stats.completed}</div>
                          <div className="text-xs text-green-600">Completadas</div>
                        </div>
                      </>
                    ) : module.stats.low ? (
                      <>
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <div className="font-semibold text-orange-700">{module.stats.low}</div>
                          <div className="text-xs text-orange-600">Bajos</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded-lg">
                          <div className="font-semibold text-red-700">{module.stats.critical}</div>
                          <div className="text-xs text-red-600">Críticos</div>
                        </div>
                      </>
                    ) : module.stats.available ? (
                      <>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="font-semibold text-green-700">{module.stats.available}</div>
                          <div className="text-xs text-green-600">Disponibles</div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <div className="font-semibold text-purple-700">{module.stats.featured}</div>
                          <div className="text-xs text-purple-600">Destacados</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center p-2 bg-red-50 rounded-lg">
                          <div className="font-semibold text-red-700">{module.stats.critical}</div>
                          <div className="text-xs text-red-600">Críticas</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="font-semibold text-green-700">{module.stats.resolved}</div>
                          <div className="text-xs text-green-600">Resueltas</div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nueva orden completada</p>
                    <p className="text-xs text-gray-500">Mesa 2 - $45.50</p>
                  </div>
                  <span className="text-xs text-gray-400">2 min</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Stock bajo detectado</p>
                    <p className="text-xs text-gray-500">Queso Parmesano</p>
                  </div>
                  <span className="text-xs text-gray-400">5 min</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mesa liberada</p>
                    <p className="text-xs text-gray-500">Mesa 4 ahora disponible</p>
                  </div>
                  <span className="text-xs text-gray-400">8 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Rendimiento del Día
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ocupación de Mesas</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tiempo Promedio de Servicio</span>
                  <span className="text-sm font-medium">28 min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfacción del Cliente</span>
                  <span className="text-sm font-medium">4.8/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
