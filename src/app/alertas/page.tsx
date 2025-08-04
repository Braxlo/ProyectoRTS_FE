'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, Bell, Package, TrendingDown, Clock, CheckCircle, XCircle } from 'lucide-react'

interface Alerta {
  id: number
  tipo: 'stock_bajo' | 'stock_critico' | 'vencimiento_proximo' | 'producto_agotado'
  producto: string
  mensaje: string
  severidad: 'baja' | 'media' | 'alta' | 'critica'
  fechaCreacion: string
  fechaResolucion?: string
  resuelta: boolean
  accionRequerida: string
}

interface ProductoAlerta {
  id: number
  nombre: string
  categoria: string
  stockActual: number
  stockMinimo: number
  stockMaximo: number
  unidad: string
  diasParaVencimiento: number
  ultimaActualizacion: string
}

export default function AlertasPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: 1,
      tipo: 'stock_critico',
      producto: 'Pollo',
      mensaje: 'Stock crítico: Solo quedan 8 kg de pollo',
      severidad: 'critica',
      fechaCreacion: '2024-01-15 14:30',
      resuelta: false,
      accionRequerida: 'Realizar pedido urgente al proveedor'
    },
    {
      id: 2,
      tipo: 'stock_bajo',
      producto: 'Queso Parmesano',
      mensaje: 'Stock bajo: 5 kg de queso parmesano',
      severidad: 'alta',
      fechaCreacion: '2024-01-15 15:45',
      resuelta: false,
      accionRequerida: 'Programar pedido para esta semana'
    },
    {
      id: 3,
      tipo: 'vencimiento_proximo',
      producto: 'Leche',
      mensaje: 'Vencimiento próximo: La leche vence en 3 días',
      severidad: 'media',
      fechaCreacion: '2024-01-15 16:00',
      resuelta: true,
      fechaResolucion: '2024-01-15 17:30',
      accionRequerida: 'Usar prioritariamente en preparaciones'
    }
  ])

  const [productosAlerta, setProductosAlerta] = useState<ProductoAlerta[]>([
    {
      id: 1,
      nombre: 'Pollo',
      categoria: 'Carnes',
      stockActual: 8,
      stockMinimo: 15,
      stockMaximo: 50,
      unidad: 'kg',
      diasParaVencimiento: 5,
      ultimaActualizacion: '2024-01-15 14:30'
    },
    {
      id: 2,
      nombre: 'Queso Parmesano',
      categoria: 'Lácteos',
      stockActual: 5,
      stockMinimo: 8,
      stockMaximo: 30,
      unidad: 'kg',
      diasParaVencimiento: 15,
      ultimaActualizacion: '2024-01-15 15:45'
    },
    {
      id: 3,
      nombre: 'Tomates',
      categoria: 'Verduras',
      stockActual: 12,
      stockMinimo: 10,
      stockMaximo: 100,
      unidad: 'kg',
      diasParaVencimiento: 8,
      ultimaActualizacion: '2024-01-15 16:00'
    }
  ])

  const [filtroSeveridad, setFiltroSeveridad] = useState('todas')
  const [filtroEstado, setFiltroEstado] = useState('pendientes')

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'critica':
        return 'bg-red-100 text-red-800'
      case 'alta':
        return 'bg-orange-100 text-orange-800'
      case 'media':
        return 'bg-yellow-100 text-yellow-800'
      case 'baja':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeveridadIcon = (severidad: string) => {
    switch (severidad) {
      case 'critica':
        return <AlertTriangle className="h-4 w-4" />
      case 'alta':
        return <TrendingDown className="h-4 w-4" />
      case 'media':
        return <Clock className="h-4 w-4" />
      case 'baja':
        return <Package className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'stock_critico':
        return 'bg-red-50 text-red-700'
      case 'stock_bajo':
        return 'bg-orange-50 text-orange-700'
      case 'vencimiento_proximo':
        return 'bg-yellow-50 text-yellow-700'
      case 'producto_agotado':
        return 'bg-red-50 text-red-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  const alertasFiltradas = alertas.filter(alerta => {
    const cumpleSeveridad = filtroSeveridad === 'todas' || alerta.severidad === filtroSeveridad
    const cumpleEstado = filtroEstado === 'todas' || 
      (filtroEstado === 'pendientes' && !alerta.resuelta) ||
      (filtroEstado === 'resueltas' && alerta.resuelta)
    
    return cumpleSeveridad && cumpleEstado
  })

  const resolverAlerta = (id: number) => {
    setAlertas(alertas.map(alerta => 
      alerta.id === id 
        ? { ...alerta, resuelta: true, fechaResolucion: new Date().toLocaleString() }
        : alerta
    ))
  }

  const eliminarAlerta = (id: number) => {
    setAlertas(alertas.filter(alerta => alerta.id !== id))
  }

  const alertasPendientes = alertas.filter(a => !a.resuelta)
  const alertasCriticas = alertas.filter(a => a.severidad === 'critica' && !a.resuelta)
  const productosConStockBajo = productosAlerta.filter(p => p.stockActual <= p.stockMinimo)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Alertas</h1>
          <p className="text-gray-600">Monitorea y gestiona las alertas del restaurante en tiempo real</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alertas</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{alertasPendientes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Críticas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{alertasCriticas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos Bajos</CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{productosConStockBajo.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Alertas del Sistema</CardTitle>
                    <CardDescription>Lista de todas las alertas y su estado actual</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={filtroSeveridad}
                      onChange={(e) => setFiltroSeveridad(e.target.value)}
                    >
                      <option value="todas">Todas las severidades</option>
                      <option value="critica">Crítica</option>
                      <option value="alta">Alta</option>
                      <option value="media">Media</option>
                      <option value="baja">Baja</option>
                    </select>
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={filtroEstado}
                      onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                      <option value="todas">Todas</option>
                      <option value="pendientes">Pendientes</option>
                      <option value="resueltas">Resueltas</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alerta</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Severidad</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertasFiltradas.map((alerta) => (
                      <TableRow key={alerta.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{alerta.producto}</div>
                            <div className="text-sm text-gray-500">{alerta.mensaje}</div>
                            <div className="text-xs text-gray-400 mt-1">{alerta.accionRequerida}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTipoColor(alerta.tipo)}>
                            {alerta.tipo.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeveridadColor(alerta.severidad)}>
                            {getSeveridadIcon(alerta.severidad)}
                            <span className="ml-1 capitalize">{alerta.severidad}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{alerta.fechaCreacion}</TableCell>
                        <TableCell>
                          <Badge className={alerta.resuelta ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {alerta.resuelta ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resuelta
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 mr-1" />
                                Pendiente
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {!alerta.resuelta && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => resolverAlerta(alerta.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => eliminarAlerta(alerta.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Productos con Stock Bajo</CardTitle>
                <CardDescription>Productos que requieren atención inmediata</CardDescription>
              </CardHeader>
              <CardContent>
                {productosConStockBajo.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay productos con stock bajo</p>
                ) : (
                  <div className="space-y-4">
                    {productosConStockBajo.map((producto) => {
                      const porcentajeStock = (producto.stockActual / producto.stockMaximo) * 100
                      const diasRestantes = producto.diasParaVencimiento
                      
                      return (
                        <div key={producto.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{producto.nombre}</div>
                            <Badge className={porcentajeStock <= 20 ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                              {porcentajeStock <= 20 ? 'Crítico' : 'Bajo'}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Stock: {producto.stockActual} {producto.unidad} / {producto.stockMaximo} {producto.unidad}
                          </div>
                          <Progress value={porcentajeStock} className="h-2 mb-2" />
                          <div className="text-xs text-gray-500">
                            Mínimo: {producto.stockMinimo} {producto.unidad} | 
                            Vence en: {diasRestantes} días
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Resumen de Alertas</CardTitle>
                <CardDescription>Estadísticas de alertas por tipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Stock Crítico</span>
                    <Badge className="bg-red-100 text-red-800">
                      {alertas.filter(a => a.tipo === 'stock_critico' && !a.resuelta).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Stock Bajo</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      {alertas.filter(a => a.tipo === 'stock_bajo' && !a.resuelta).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vencimiento Próximo</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {alertas.filter(a => a.tipo === 'vencimiento_proximo' && !a.resuelta).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Productos Agotados</span>
                    <Badge className="bg-red-100 text-red-800">
                      {alertas.filter(a => a.tipo === 'producto_agotado' && !a.resuelta).length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 