'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Menu, Plus, Clock, CheckCircle, XCircle, DollarSign, Users } from 'lucide-react'

interface Plato {
  id: number
  nombre: string
  precio: number
  categoria: string
  disponible: boolean
}

interface ItemOrden {
  plato: Plato
  cantidad: number
  precioUnitario: number
  subtotal: number
}

interface Orden {
  id: number
  mesa: string
  items: ItemOrden[]
  estado: 'pendiente' | 'en_preparacion' | 'listo' | 'entregado' | 'cancelado'
  total: number
  horaCreacion: string
  horaEntrega?: string
  notas: string
}

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState<Orden[]>([
    {
      id: 1,
      mesa: 'Mesa 2',
      items: [
        {
          plato: { id: 1, nombre: 'Pasta Carbonara', precio: 15.99, categoria: 'Pasta', disponible: true },
          cantidad: 2,
          precioUnitario: 15.99,
          subtotal: 31.98
        }
      ],
      estado: 'en_preparacion',
      total: 31.98,
      horaCreacion: '2024-01-15 15:30',
      notas: 'Sin queso parmesano'
    },
    {
      id: 2,
      mesa: 'Mesa 1',
      items: [
        {
          plato: { id: 2, nombre: 'Ensalada César', precio: 12.50, categoria: 'Ensaladas', disponible: true },
          cantidad: 1,
          precioUnitario: 12.50,
          subtotal: 12.50
        }
      ],
      estado: 'listo',
      total: 12.50,
      horaCreacion: '2024-01-15 15:15',
      horaEntrega: '2024-01-15 15:45'
    }
  ])

  const [nuevaOrden, setNuevaOrden] = useState({
    mesa: '',
    items: [] as ItemOrden[],
    notas: ''
  })

  const platosDisponibles: Plato[] = [
    { id: 1, nombre: 'Pasta Carbonara', precio: 15.99, categoria: 'Pasta', disponible: true },
    { id: 2, nombre: 'Ensalada César', precio: 12.50, categoria: 'Ensaladas', disponible: true },
    { id: 3, nombre: 'Pizza Margherita', precio: 18.99, categoria: 'Pizza', disponible: true },
    { id: 4, nombre: 'Sopa de Tomate', precio: 8.99, categoria: 'Sopas', disponible: true },
    { id: 5, nombre: 'Tiramisú', precio: 7.99, categoria: 'Postres', disponible: true }
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'en_preparacion':
        return 'bg-blue-100 text-blue-800'
      case 'listo':
        return 'bg-green-100 text-green-800'
      case 'entregado':
        return 'bg-gray-100 text-gray-800'
      case 'cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Clock className="h-4 w-4" />
      case 'en_preparacion':
        return <Menu className="h-4 w-4" />
      case 'listo':
        return <CheckCircle className="h-4 w-4" />
      case 'entregado':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelado':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const cambiarEstado = (id: number, nuevoEstado: Orden['estado']) => {
    setOrdenes(ordenes.map(orden => {
      if (orden.id === id) {
        const horaEntrega = nuevoEstado === 'entregado' ? new Date().toLocaleString() : orden.horaEntrega
        return { ...orden, estado: nuevoEstado, horaEntrega }
      }
      return orden
    }))
  }

  const agregarItem = (platoId: number, cantidad: number) => {
    const plato = platosDisponibles.find(p => p.id === platoId)
    if (!plato) return

    const item: ItemOrden = {
      plato,
      cantidad,
      precioUnitario: plato.precio,
      subtotal: plato.precio * cantidad
    }

    setNuevaOrden({
      ...nuevaOrden,
      items: [...nuevaOrden.items, item]
    })
  }

  const crearOrden = () => {
    if (!nuevaOrden.mesa || nuevaOrden.items.length === 0) return

    const total = nuevaOrden.items.reduce((sum, item) => sum + item.subtotal, 0)
    const orden: Orden = {
      id: ordenes.length + 1,
      mesa: nuevaOrden.mesa,
      items: nuevaOrden.items,
      estado: 'pendiente',
      total,
      horaCreacion: new Date().toLocaleString(),
      notas: nuevaOrden.notas
    }

    setOrdenes([...ordenes, orden])
    setNuevaOrden({ mesa: '', items: [], notas: '' })
  }

  const eliminarOrden = (id: number) => {
    setOrdenes(ordenes.filter(orden => orden.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Órdenes</h1>
          <p className="text-gray-600">Administra las órdenes del restaurante</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Órdenes</CardTitle>
              <Menu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ordenes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {ordenes.filter(o => o.estado === 'pendiente').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Preparación</CardTitle>
              <Menu className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {ordenes.filter(o => o.estado === 'en_preparacion').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Listas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {ordenes.filter(o => o.estado === 'listo').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Órdenes Activas</CardTitle>
                <CardDescription>Lista de todas las órdenes y su estado actual</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Orden #</TableHead>
                      <TableHead>Mesa</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ordenes.map((orden) => (
                      <TableRow key={orden.id}>
                        <TableCell className="font-medium">#{orden.id}</TableCell>
                        <TableCell>{orden.mesa}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {orden.items.map((item, index) => (
                              <div key={index}>
                                {item.cantidad}x {item.plato.nombre}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>${orden.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getEstadoColor(orden.estado)}>
                            {getEstadoIcon(orden.estado)}
                            <span className="ml-1 capitalize">{orden.estado.replace('_', ' ')}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{orden.horaCreacion}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select value={orden.estado} onValueChange={(value: Orden['estado']) => cambiarEstado(orden.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pendiente">Pendiente</SelectItem>
                                <SelectItem value="en_preparacion">En Preparación</SelectItem>
                                <SelectItem value="listo">Listo</SelectItem>
                                <SelectItem value="entregado">Entregado</SelectItem>
                                <SelectItem value="cancelado">Cancelado</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => eliminarOrden(orden.id)}
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
                <CardTitle>Nueva Orden</CardTitle>
                <CardDescription>Crea una nueva orden</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mesa">Mesa</Label>
                  <Select value={nuevaOrden.mesa} onValueChange={(value) => setNuevaOrden({...nuevaOrden, mesa: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mesa 1">Mesa 1</SelectItem>
                      <SelectItem value="Mesa 2">Mesa 2</SelectItem>
                      <SelectItem value="Mesa 3">Mesa 3</SelectItem>
                      <SelectItem value="Mesa 4">Mesa 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Agregar Plato</Label>
                  <div className="flex gap-2 mt-2">
                    <Select onValueChange={(value) => {
                      const [platoId, cantidad] = value.split('-')
                      agregarItem(parseInt(platoId), parseInt(cantidad))
                    }}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Seleccionar plato" />
                      </SelectTrigger>
                      <SelectContent>
                        {platosDisponibles.map((plato) => (
                          <SelectItem key={`${plato.id}-1`} value={`${plato.id}-1`}>
                            {plato.nombre} - ${plato.precio}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {nuevaOrden.items.length > 0 && (
                  <div>
                    <Label>Items en la Orden</Label>
                    <div className="mt-2 space-y-2">
                      {nuevaOrden.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>{item.cantidad}x {item.plato.nombre}</span>
                          <span>${item.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 font-bold">
                        Total: ${nuevaOrden.items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="notas">Notas</Label>
                  <Input
                    id="notas"
                    value={nuevaOrden.notas}
                    onChange={(e) => setNuevaOrden({...nuevaOrden, notas: e.target.value})}
                    placeholder="Notas especiales..."
                  />
                </div>

                <Button 
                  onClick={crearOrden} 
                  className="w-full"
                  disabled={!nuevaOrden.mesa || nuevaOrden.items.length === 0}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Orden
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 