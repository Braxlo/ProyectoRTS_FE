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
import { Users, Plus, Edit, Trash2, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

interface Mesa {
  id: number
  numero: string
  capacidad: number
  estado: 'libre' | 'ocupada' | 'reservada' | 'mantenimiento'
  ubicacion: string
  ultimaActualizacion: string
  tiempoOcupacion?: number
  ordenesActivas?: number
}

export default function MesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>([
    {
      id: 1,
      numero: 'Mesa 1',
      capacidad: 4,
      estado: 'libre',
      ubicacion: 'Terraza',
      ultimaActualizacion: '2024-01-15 14:30'
    },
    {
      id: 2,
      numero: 'Mesa 2',
      capacidad: 6,
      estado: 'ocupada',
      ubicacion: 'Interior',
      ultimaActualizacion: '2024-01-15 15:45',
      tiempoOcupacion: 45,
      ordenesActivas: 2
    },
    {
      id: 3,
      numero: 'Mesa 3',
      capacidad: 2,
      estado: 'reservada',
      ubicacion: 'Terraza',
      ultimaActualizacion: '2024-01-15 16:00'
    },
    {
      id: 4,
      numero: 'Mesa 4',
      capacidad: 8,
      estado: 'libre',
      ubicacion: 'Interior',
      ultimaActualizacion: '2024-01-15 16:30'
    }
  ])

  const [nuevaMesa, setNuevaMesa] = useState({
    numero: '',
    capacidad: 4,
    ubicacion: 'Interior'
  })

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'libre':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'ocupada':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'reservada':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'mantenimiento':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'libre':
        return <CheckCircle className="h-4 w-4" />
      case 'ocupada':
        return <XCircle className="h-4 w-4" />
      case 'reservada':
        return <Clock className="h-4 w-4" />
      case 'mantenimiento':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const agregarMesa = () => {
    const mesa: Mesa = {
      id: mesas.length + 1,
      numero: nuevaMesa.numero,
      capacidad: nuevaMesa.capacidad,
      estado: 'libre',
      ubicacion: nuevaMesa.ubicacion,
      ultimaActualizacion: new Date().toLocaleString()
    }
    setMesas([...mesas, mesa])
    setNuevaMesa({ numero: '', capacidad: 4, ubicacion: 'Interior' })
  }

  const cambiarEstado = (id: number, nuevoEstado: Mesa['estado']) => {
    setMesas(mesas.map(mesa => 
      mesa.id === id 
        ? { ...mesa, estado: nuevoEstado, ultimaActualizacion: new Date().toLocaleString() }
        : mesa
    ))
  }

  const eliminarMesa = (id: number) => {
    setMesas(mesas.filter(mesa => mesa.id !== id))
  }

  const mesasLibres = mesas.filter(m => m.estado === 'libre').length
  const mesasOcupadas = mesas.filter(m => m.estado === 'ocupada').length
  const mesasReservadas = mesas.filter(m => m.estado === 'reservada').length
  const ocupacionPromedio = Math.round((mesasOcupadas / mesas.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Mesas</h1>
              <p className="text-gray-600">Administra las mesas del restaurante de forma eficiente</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Users className="h-4 w-4 mr-1" />
                {mesas.length} Mesas Totales
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Mesas</p>
                  <p className="text-3xl font-bold text-gray-900">{mesas.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Mesas Libres</p>
                  <p className="text-3xl font-bold text-green-600">{mesasLibres}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Mesas Ocupadas</p>
                  <p className="text-3xl font-bold text-red-600">{mesasOcupadas}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Ocupación</p>
                  <p className="text-3xl font-bold text-blue-600">{ocupacionPromedio}%</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Mesas del Restaurante</CardTitle>
                    <CardDescription>Estado actual de todas las mesas</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Mesa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Agregar Nueva Mesa</DialogTitle>
                        <DialogDescription>
                          Completa la información de la nueva mesa
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="numero" className="font-medium">Número de Mesa</Label>
                          <Input
                            id="numero"
                            value={nuevaMesa.numero}
                            onChange={(e) => setNuevaMesa({...nuevaMesa, numero: e.target.value})}
                            placeholder="Ej: Mesa 5"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="capacidad" className="font-medium">Capacidad</Label>
                          <Select value={nuevaMesa.capacidad.toString()} onValueChange={(value) => setNuevaMesa({...nuevaMesa, capacidad: parseInt(value)})}>
                            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2 personas</SelectItem>
                              <SelectItem value="4">4 personas</SelectItem>
                              <SelectItem value="6">6 personas</SelectItem>
                              <SelectItem value="8">8 personas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="ubicacion" className="font-medium">Ubicación</Label>
                          <Select value={nuevaMesa.ubicacion} onValueChange={(value) => setNuevaMesa({...nuevaMesa, ubicacion: value})}>
                            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Interior">Interior</SelectItem>
                              <SelectItem value="Terraza">Terraza</SelectItem>
                              <SelectItem value="Barra">Barra</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={agregarMesa} 
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                          Agregar Mesa
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Mesa</TableHead>
                      <TableHead className="font-semibold text-gray-700">Capacidad</TableHead>
                      <TableHead className="font-semibold text-gray-700">Ubicación</TableHead>
                      <TableHead className="font-semibold text-gray-700">Estado</TableHead>
                      <TableHead className="font-semibold text-gray-700">Información</TableHead>
                      <TableHead className="font-semibold text-gray-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mesas.map((mesa) => (
                      <TableRow key={mesa.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                              {mesa.numero.split(' ')[1]}
                            </div>
                            <span>{mesa.numero}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-50">
                            {mesa.capacidad} personas
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{mesa.ubicacion}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getEstadoColor(mesa.estado)} border`}>
                            {getEstadoIcon(mesa.estado)}
                            <span className="ml-1 capitalize">{mesa.estado}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            <div>Actualizado: {mesa.ultimaActualizacion}</div>
                            {mesa.tiempoOcupacion && (
                              <div className="text-orange-600">
                                Tiempo: {mesa.tiempoOcupacion} min
                              </div>
                            )}
                            {mesa.ordenesActivas && (
                              <div className="text-blue-600">
                                Órdenes: {mesa.ordenesActivas}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select 
                              value={mesa.estado} 
                              onValueChange={(value: Mesa['estado']) => cambiarEstado(mesa.id, value)}
                            >
                              <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="libre">Libre</SelectItem>
                                <SelectItem value="ocupada">Ocupada</SelectItem>
                                <SelectItem value="reservada">Reservada</SelectItem>
                                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => eliminarMesa(mesa.id)}
                              className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
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

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Resumen Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Disponibles</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{mesasLibres}</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-800">Ocupadas</span>
                  </div>
                  <Badge className="bg-red-100 text-red-800">{mesasOcupadas}</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Reservadas</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">{mesasReservadas}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Todas las Mesas
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Historial de Reservas
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reportar Problema
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 