'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Clock, Package, Utensils } from 'lucide-react'

interface ReporteVentas {
  fecha: string
  ventas: number
  ordenes: number
  promedioOrden: number
}

interface PlatoPopular {
  nombre: string
  categoria: string
  cantidadVendida: number
  ingresos: number
  porcentaje: number
}

interface EstadisticaMesa {
  mesa: string
  ocupacion: number
  tiempoPromedio: number
  ingresos: number
  ordenes: number
}

export default function ReportesPage() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('hoy')

  const reporteVentas: ReporteVentas[] = [
    { fecha: '2024-01-15', ventas: 1250.50, ordenes: 45, promedioOrden: 27.79 },
    { fecha: '2024-01-14', ventas: 1180.30, ordenes: 42, promedioOrden: 28.10 },
    { fecha: '2024-01-13', ventas: 1350.75, ordenes: 48, promedioOrden: 28.14 },
    { fecha: '2024-01-12', ventas: 980.25, ordenes: 35, promedioOrden: 28.01 },
    { fecha: '2024-01-11', ventas: 1420.80, ordenes: 50, promedioOrden: 28.42 }
  ]

  const platosPopulares: PlatoPopular[] = [
    { nombre: 'Pasta Carbonara', categoria: 'Pasta', cantidadVendida: 25, ingresos: 399.75, porcentaje: 35 },
    { nombre: 'Pizza Margherita', categoria: 'Pizza', cantidadVendida: 18, ingresos: 341.82, porcentaje: 25 },
    { nombre: 'Ensalada César', categoria: 'Ensaladas', cantidadVendida: 15, ingresos: 187.50, porcentaje: 20 },
    { nombre: 'Sopa de Tomate', categoria: 'Sopas', cantidadVendida: 12, ingresos: 107.88, porcentaje: 15 },
    { nombre: 'Tiramisú', categoria: 'Postres', cantidadVendida: 8, ingresos: 63.92, porcentaje: 5 }
  ]

  const estadisticasMesas: EstadisticaMesa[] = [
    { mesa: 'Mesa 1', ocupacion: 85, tiempoPromedio: 45, ingresos: 320.50, ordenes: 8 },
    { mesa: 'Mesa 2', ocupacion: 92, tiempoPromedio: 52, ingresos: 450.75, ordenes: 10 },
    { mesa: 'Mesa 3', ocupacion: 78, tiempoPromedio: 38, ingresos: 280.25, ordenes: 6 },
    { mesa: 'Mesa 4', ocupacion: 88, tiempoPromedio: 48, ingresos: 380.00, ordenes: 9 }
  ]

  const ventasTotales = reporteVentas.reduce((sum, reporte) => sum + reporte.ventas, 0)
  const ordenesTotales = reporteVentas.reduce((sum, reporte) => sum + reporte.ordenes, 0)
  const promedioGeneral = ventasTotales / ordenesTotales
  const crecimientoVentas = ((reporteVentas[0].ventas - reporteVentas[4].ventas) / reporteVentas[4].ventas) * 100

  const getOcupacionColor = (ocupacion: number) => {
    if (ocupacion >= 90) return 'text-green-600'
    if (ocupacion >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getOcupacionIcon = (ocupacion: number) => {
    if (ocupacion >= 90) return <TrendingUp className="h-4 w-4" />
    if (ocupacion >= 75) return <Clock className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes y Estadísticas</h1>
          <p className="text-gray-600">Análisis detallado del rendimiento del restaurante</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Select value={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="semana">Esta Semana</SelectItem>
                <SelectItem value="mes">Este Mes</SelectItem>
                <SelectItem value="trimestre">Este Trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${ventasTotales.toFixed(2)}</div>
              <div className={`text-xs flex items-center gap-1 ${crecimientoVentas >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {crecimientoVentas >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(crecimientoVentas).toFixed(1)}% vs período anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Órdenes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ordenesTotales}</div>
              <div className="text-xs text-gray-600">
                Promedio: ${promedioGeneral.toFixed(2)} por orden
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocupación Promedio</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85.8%</div>
              <div className="text-xs text-gray-600">
                {estadisticasMesas.length} mesas activas
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.8 min</div>
              <div className="text-xs text-gray-600">
                Por mesa
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Día</CardTitle>
              <CardDescription>Evolución de las ventas en los últimos 5 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reporteVentas.map((reporte, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 text-sm text-gray-600">{reporte.fecha}</div>
                      <div className="text-sm font-medium">${reporte.ventas.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-500">{reporte.ordenes} órdenes</div>
                      <Progress value={(reporte.ventas / Math.max(...reporteVentas.map(r => r.ventas))) * 100} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platos Más Populares</CardTitle>
              <CardDescription>Los platos más vendidos del período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platosPopulares.map((plato, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{plato.nombre}</div>
                        <div className="text-xs text-gray-500">{plato.categoria}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">${plato.ingresos.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{plato.cantidadVendida} vendidos</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Mesa</CardTitle>
              <CardDescription>Estadísticas detalladas de cada mesa</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Ocupación</TableHead>
                    <TableHead>Tiempo</TableHead>
                    <TableHead>Ingresos</TableHead>
                    <TableHead>Órdenes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estadisticasMesas.map((mesa) => (
                    <TableRow key={mesa.mesa}>
                      <TableCell className="font-medium">{mesa.mesa}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${getOcupacionColor(mesa.ocupacion)}`}>
                            {getOcupacionIcon(mesa.ocupacion)}
                          </span>
                          <span className={`text-sm ${getOcupacionColor(mesa.ocupacion)}`}>
                            {mesa.ocupacion}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{mesa.tiempoPromedio} min</TableCell>
                      <TableCell className="text-sm">${mesa.ingresos.toFixed(2)}</TableCell>
                      <TableCell className="text-sm">{mesa.ordenes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análisis de Categorías</CardTitle>
              <CardDescription>Distribución de ventas por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Pasta</div>
                      <div className="text-sm text-gray-600">35% de las ventas</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$399.75</div>
                    <div className="text-sm text-gray-600">25 platos</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Pizza</div>
                      <div className="text-sm text-gray-600">25% de las ventas</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$341.82</div>
                    <div className="text-sm text-gray-600">18 platos</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-yellow-600" />
                    <div>
                      <div className="font-medium">Ensaladas</div>
                      <div className="text-sm text-gray-600">20% de las ventas</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$187.50</div>
                    <div className="text-sm text-gray-600">15 platos</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Otros</div>
                      <div className="text-sm text-gray-600">20% de las ventas</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$321.30</div>
                    <div className="text-sm text-gray-600">20 platos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Resumen Ejecutivo</CardTitle>
              <CardDescription>Puntos clave del rendimiento del restaurante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">${ventasTotales.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Ingresos Totales</div>
                  <div className="text-xs text-blue-600 mt-1">
                    {crecimientoVentas >= 0 ? '+' : ''}{crecimientoVentas.toFixed(1)}% vs anterior
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{ordenesTotales}</div>
                  <div className="text-sm text-gray-600">Órdenes Procesadas</div>
                  <div className="text-xs text-green-600 mt-1">
                    Promedio: ${promedioGeneral.toFixed(2)}
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">85.8%</div>
                  <div className="text-sm text-gray-600">Ocupación Promedio</div>
                  <div className="text-xs text-purple-600 mt-1">
                    {estadisticasMesas.length} mesas activas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 