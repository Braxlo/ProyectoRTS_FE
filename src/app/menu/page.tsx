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
import { Switch } from '@/components/ui/switch'
import { Utensils, Plus, Edit, Trash2, DollarSign, Clock, Star, AlertTriangle } from 'lucide-react'

interface Ingrediente {
  id: number
  nombre: string
  cantidad: number
  unidad: string
  stockDisponible: number
}

interface Plato {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  ingredientes: Ingrediente[]
  tiempoPreparacion: number
  disponible: boolean
  destacado: boolean
  imagen?: string
  ultimaActualizacion: string
}

export default function MenuPage() {
  const [platos, setPlatos] = useState<Plato[]>([
    {
      id: 1,
      nombre: 'Pasta Carbonara',
      descripcion: 'Pasta con salsa cremosa, panceta y queso parmesano',
      precio: 15.99,
      categoria: 'Pasta',
      ingredientes: [
        { id: 1, nombre: 'Pasta', cantidad: 200, unidad: 'g', stockDisponible: 5000 },
        { id: 2, nombre: 'Queso Parmesano', cantidad: 50, unidad: 'g', stockDisponible: 5000 },
        { id: 3, nombre: 'Panceta', cantidad: 100, unidad: 'g', stockDisponible: 2000 }
      ],
      tiempoPreparacion: 20,
      disponible: true,
      destacado: true,
      ultimaActualizacion: '2024-01-15 14:30'
    },
    {
      id: 2,
      nombre: 'Ensalada César',
      descripcion: 'Lechuga romana, crutones, parmesano y aderezo César',
      precio: 12.50,
      categoria: 'Ensaladas',
      ingredientes: [
        { id: 4, nombre: 'Lechuga Romana', cantidad: 150, unidad: 'g', stockDisponible: 3000 },
        { id: 5, nombre: 'Crutones', cantidad: 30, unidad: 'g', stockDisponible: 1000 },
        { id: 2, nombre: 'Queso Parmesano', cantidad: 30, unidad: 'g', stockDisponible: 5000 }
      ],
      tiempoPreparacion: 10,
      disponible: true,
      destacado: false,
      ultimaActualizacion: '2024-01-15 15:45'
    },
    {
      id: 3,
      nombre: 'Pizza Margherita',
      descripcion: 'Pizza tradicional con tomate, mozzarella y albahaca',
      precio: 18.99,
      categoria: 'Pizza',
      ingredientes: [
        { id: 6, nombre: 'Masa de Pizza', cantidad: 250, unidad: 'g', stockDisponible: 8000 },
        { id: 7, nombre: 'Salsa de Tomate', cantidad: 100, unidad: 'ml', stockDisponible: 5000 },
        { id: 8, nombre: 'Mozzarella', cantidad: 150, unidad: 'g', stockDisponible: 4000 }
      ],
      tiempoPreparacion: 25,
      disponible: true,
      destacado: true,
      ultimaActualizacion: '2024-01-15 16:00'
    }
  ])

  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: 'Pasta',
    tiempoPreparacion: 15,
    ingredientes: [] as Ingrediente[]
  })

  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState('todos')

  const categorias = ['Pasta', 'Pizza', 'Ensaladas', 'Carnes', 'Pescados', 'Postres', 'Bebidas', 'Entrantes']

  const ingredientesDisponibles: Ingrediente[] = [
    { id: 1, nombre: 'Pasta', cantidad: 0, unidad: 'g', stockDisponible: 5000 },
    { id: 2, nombre: 'Queso Parmesano', cantidad: 0, unidad: 'g', stockDisponible: 5000 },
    { id: 3, nombre: 'Panceta', cantidad: 0, unidad: 'g', stockDisponible: 2000 },
    { id: 4, nombre: 'Lechuga Romana', cantidad: 0, unidad: 'g', stockDisponible: 3000 },
    { id: 5, nombre: 'Crutones', cantidad: 0, unidad: 'g', stockDisponible: 1000 },
    { id: 6, nombre: 'Masa de Pizza', cantidad: 0, unidad: 'g', stockDisponible: 8000 },
    { id: 7, nombre: 'Salsa de Tomate', cantidad: 0, unidad: 'ml', stockDisponible: 5000 },
    { id: 8, nombre: 'Mozzarella', cantidad: 0, unidad: 'g', stockDisponible: 4000 }
  ]

  const verificarDisponibilidad = (plato: Plato) => {
    return plato.ingredientes.every(ingrediente => 
      ingrediente.stockDisponible >= ingrediente.cantidad
    )
  }

  const platosFiltrados = platos.filter(plato => {
    const cumpleCategoria = filtroCategoria === 'todas' || plato.categoria === filtroCategoria
    const cumpleDisponibilidad = filtroDisponibilidad === 'todos' || 
      (filtroDisponibilidad === 'disponible' && plato.disponible) ||
      (filtroDisponibilidad === 'no_disponible' && !plato.disponible)
    
    return cumpleCategoria && cumpleDisponibilidad
  })

  const agregarPlato = () => {
    const platoCompleto: Plato = {
      id: platos.length + 1,
      nombre: nuevoPlato.nombre,
      descripcion: nuevoPlato.descripcion,
      precio: nuevoPlato.precio,
      categoria: nuevoPlato.categoria,
      ingredientes: nuevoPlato.ingredientes,
      tiempoPreparacion: nuevoPlato.tiempoPreparacion,
      disponible: false, // Se calculará después
      destacado: false,
      ultimaActualizacion: new Date().toLocaleString()
    }
    
    const plato: Plato = {
      ...platoCompleto,
      disponible: verificarDisponibilidad(platoCompleto)
    }
    
    setPlatos([...platos, plato])
    setNuevoPlato({
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: 'Pasta',
      tiempoPreparacion: 15,
      ingredientes: []
    })
  }

  const toggleDisponibilidad = (id: number) => {
    setPlatos(platos.map(plato => 
      plato.id === id 
        ? { ...plato, disponible: !plato.disponible, ultimaActualizacion: new Date().toLocaleString() }
        : plato
    ))
  }

  const toggleDestacado = (id: number) => {
    setPlatos(platos.map(plato => 
      plato.id === id 
        ? { ...plato, destacado: !plato.destacado, ultimaActualizacion: new Date().toLocaleString() }
        : plato
    ))
  }

  const eliminarPlato = (id: number) => {
    setPlatos(platos.filter(plato => plato.id !== id))
  }

  const agregarIngrediente = (ingredienteId: number, cantidad: number) => {
    const ingrediente = ingredientesDisponibles.find(i => i.id === ingredienteId)
    if (!ingrediente) return

    const nuevoIngrediente: Ingrediente = {
      ...ingrediente,
      cantidad
    }

    setNuevoPlato({
      ...nuevoPlato,
      ingredientes: [...nuevoPlato.ingredientes, nuevoIngrediente]
    })
  }

  const platosDisponibles = platos.filter(p => p.disponible)
  const platosDestacados = platos.filter(p => p.destacado)
  const valorTotalMenu = platos.reduce((sum, p) => sum + p.precio, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Menú</h1>
          <p className="text-gray-600">Administra los platos, precios y disponibilidad del menú</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Platos</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platos.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <Utensils className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{platosDisponibles.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Destacados</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{platosDestacados.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${valorTotalMenu.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Platos del Menú</CardTitle>
                    <CardDescription>Lista de todos los platos y su estado actual</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Plato
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Plato</DialogTitle>
                        <DialogDescription>
                          Completa la información del nuevo plato
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="nombre">Nombre del Plato</Label>
                            <Input
                              id="nombre"
                              value={nuevoPlato.nombre}
                              onChange={(e) => setNuevoPlato({...nuevoPlato, nombre: e.target.value})}
                              placeholder="Ej: Pasta Carbonara"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="categoria">Categoría</Label>
                            <Select value={nuevoPlato.categoria} onValueChange={(value) => setNuevoPlato({...nuevoPlato, categoria: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categorias.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="descripcion">Descripción</Label>
                          <Input
                            id="descripcion"
                            value={nuevoPlato.descripcion}
                            onChange={(e) => setNuevoPlato({...nuevoPlato, descripcion: e.target.value})}
                            placeholder="Descripción del plato..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="precio">Precio</Label>
                            <Input
                              id="precio"
                              type="number"
                              step="0.01"
                              value={nuevoPlato.precio}
                              onChange={(e) => setNuevoPlato({...nuevoPlato, precio: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="tiempoPreparacion">Tiempo de Preparación (min)</Label>
                            <Input
                              id="tiempoPreparacion"
                              type="number"
                              value={nuevoPlato.tiempoPreparacion}
                              onChange={(e) => setNuevoPlato({...nuevoPlato, tiempoPreparacion: parseInt(e.target.value)})}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Agregar Ingrediente</Label>
                          <div className="flex gap-2">
                            <Select onValueChange={(value) => {
                              const [ingredienteId, cantidad] = value.split('-')
                              agregarIngrediente(parseInt(ingredienteId), parseInt(cantidad))
                            }}>
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Seleccionar ingrediente" />
                              </SelectTrigger>
                              <SelectContent>
                                {ingredientesDisponibles.map((ingrediente) => (
                                  <SelectItem key={`${ingrediente.id}-100`} value={`${ingrediente.id}-100`}>
                                    {ingrediente.nombre} - {ingrediente.stockDisponible} {ingrediente.unidad}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {nuevoPlato.ingredientes.length > 0 && (
                          <div>
                            <Label>Ingredientes del Plato</Label>
                            <div className="mt-2 space-y-2">
                              {nuevoPlato.ingredientes.map((ingrediente, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span>{ingrediente.cantidad} {ingrediente.unidad} {ingrediente.nombre}</span>
                                  <span className="text-sm text-gray-500">
                                    Stock: {ingrediente.stockDisponible} {ingrediente.unidad}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <Button onClick={agregarPlato} className="w-full">
                          Agregar Plato
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las categorías</SelectItem>
                      {categorias.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filtroDisponibilidad} onValueChange={setFiltroDisponibilidad}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Disponibilidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="no_disponible">No Disponible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plato</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Tiempo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Destacado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {platosFiltrados.map((plato) => {
                      const disponible = verificarDisponibilidad(plato)
                      return (
                        <TableRow key={plato.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{plato.nombre}</div>
                              <div className="text-sm text-gray-500">{plato.descripcion}</div>
                            </div>
                          </TableCell>
                          <TableCell>{plato.categoria}</TableCell>
                          <TableCell>${plato.precio.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{plato.tiempoPreparacion} min</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {disponible ? 'Disponible' : 'No Disponible'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={plato.destacado}
                              onCheckedChange={() => toggleDestacado(plato.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleDisponibilidad(plato.id)}
                              >
                                {plato.disponible ? 'Desactivar' : 'Activar'}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => eliminarPlato(plato.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Platos Destacados</CardTitle>
                <CardDescription>Platos especiales del menú</CardDescription>
              </CardHeader>
              <CardContent>
                {platosDestacados.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay platos destacados</p>
                ) : (
                  <div className="space-y-3">
                    {platosDestacados.map((plato) => (
                      <div key={plato.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <div className="font-medium text-yellow-800">{plato.nombre}</div>
                        </div>
                        <div className="text-sm text-yellow-700">${plato.precio.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Alertas de Ingredientes</CardTitle>
                <CardDescription>Platos que pueden no estar disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                {platos.filter(p => !verificarDisponibilidad(p)).length === 0 ? (
                  <p className="text-gray-500 text-sm">Todos los platos tienen ingredientes suficientes</p>
                ) : (
                  <div className="space-y-3">
                    {platos.filter(p => !verificarDisponibilidad(p)).map((plato) => (
                      <div key={plato.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <div className="font-medium text-red-800">{plato.nombre}</div>
                        </div>
                        <div className="text-sm text-red-700">Faltan ingredientes</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 