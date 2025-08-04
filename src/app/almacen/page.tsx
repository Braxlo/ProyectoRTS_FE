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
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Package, Plus, AlertTriangle, TrendingUp, TrendingDown, Edit, Trash2 } from 'lucide-react'

interface Producto {
  id: number
  nombre: string
  categoria: string
  stockActual: number
  stockMinimo: number
  stockMaximo: number
  unidad: string
  precioCompra: number
  proveedor: string
  fechaVencimiento: string
  activo: boolean
  ultimaActualizacion: string
}

export default function AlmacenPage() {
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: 'Tomates',
      categoria: 'Verduras',
      stockActual: 25,
      stockMinimo: 10,
      stockMaximo: 100,
      unidad: 'kg',
      precioCompra: 2.50,
      proveedor: 'Proveedor A',
      fechaVencimiento: '2024-02-15',
      activo: true,
      ultimaActualizacion: '2024-01-15 14:30'
    },
    {
      id: 2,
      nombre: 'Pollo',
      categoria: 'Carnes',
      stockActual: 8,
      stockMinimo: 15,
      stockMaximo: 50,
      unidad: 'kg',
      precioCompra: 8.99,
      proveedor: 'Proveedor B',
      fechaVencimiento: '2024-01-20',
      activo: true,
      ultimaActualizacion: '2024-01-15 15:45'
    },
    {
      id: 3,
      nombre: 'Queso Parmesano',
      categoria: 'Lácteos',
      stockActual: 5,
      stockMinimo: 8,
      stockMaximo: 30,
      unidad: 'kg',
      precioCompra: 12.99,
      proveedor: 'Proveedor C',
      fechaVencimiento: '2024-03-01',
      activo: true,
      ultimaActualizacion: '2024-01-15 16:00'
    }
  ])

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: 'Verduras',
    stockActual: 0,
    stockMinimo: 10,
    stockMaximo: 100,
    unidad: 'kg',
    precioCompra: 0,
    proveedor: '',
    fechaVencimiento: ''
  })

  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroStock, setFiltroStock] = useState('todos')

  const categorias = ['Verduras', 'Carnes', 'Lácteos', 'Granos', 'Especias', 'Bebidas', 'Otros']

  const getStockStatus = (producto: Producto) => {
    const porcentaje = (producto.stockActual / producto.stockMaximo) * 100
    if (producto.stockActual <= producto.stockMinimo) {
      return { color: 'text-red-600', bg: 'bg-red-100', status: 'Crítico' }
    } else if (porcentaje <= 30) {
      return { color: 'text-orange-600', bg: 'bg-orange-100', status: 'Bajo' }
    } else if (porcentaje <= 70) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Normal' }
    } else {
      return { color: 'text-green-600', bg: 'bg-green-100', status: 'Alto' }
    }
  }

  const getStockProgress = (producto: Producto) => {
    return (producto.stockActual / producto.stockMaximo) * 100
  }

  const productosFiltrados = productos.filter(producto => {
    const cumpleCategoria = filtroCategoria === 'todas' || producto.categoria === filtroCategoria
    const cumpleStock = filtroStock === 'todos' || 
      (filtroStock === 'bajo' && producto.stockActual <= producto.stockMinimo) ||
      (filtroStock === 'normal' && producto.stockActual > producto.stockMinimo && producto.stockActual <= producto.stockMaximo * 0.7) ||
      (filtroStock === 'alto' && producto.stockActual > producto.stockMaximo * 0.7)
    
    return cumpleCategoria && cumpleStock
  })

  const agregarProducto = () => {
    const producto: Producto = {
      id: productos.length + 1,
      nombre: nuevoProducto.nombre,
      categoria: nuevoProducto.categoria,
      stockActual: nuevoProducto.stockActual,
      stockMinimo: nuevoProducto.stockMinimo,
      stockMaximo: nuevoProducto.stockMaximo,
      unidad: nuevoProducto.unidad,
      precioCompra: nuevoProducto.precioCompra,
      proveedor: nuevoProducto.proveedor,
      fechaVencimiento: nuevoProducto.fechaVencimiento,
      activo: true,
      ultimaActualizacion: new Date().toLocaleString()
    }
    setProductos([...productos, producto])
    setNuevoProducto({
      nombre: '',
      categoria: 'Verduras',
      stockActual: 0,
      stockMinimo: 10,
      stockMaximo: 100,
      unidad: 'kg',
      precioCompra: 0,
      proveedor: '',
      fechaVencimiento: ''
    })
  }

  const actualizarStock = (id: number, nuevaCantidad: number) => {
    setProductos(productos.map(producto => 
      producto.id === id 
        ? { ...producto, stockActual: nuevaCantidad, ultimaActualizacion: new Date().toLocaleString() }
        : producto
    ))
  }

  const toggleActivo = (id: number) => {
    setProductos(productos.map(producto => 
      producto.id === id 
        ? { ...producto, activo: !producto.activo, ultimaActualizacion: new Date().toLocaleString() }
        : producto
    ))
  }

  const eliminarProducto = (id: number) => {
    setProductos(productos.filter(producto => producto.id !== id))
  }

  const productosBajos = productos.filter(p => p.stockActual <= p.stockMinimo)
  const valorTotalInventario = productos.reduce((sum, p) => sum + (p.stockActual * p.precioCompra), 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Almacén</h1>
          <p className="text-gray-600">Controla el inventario de productos y materias primas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productos.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{productosBajos.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${valorTotalInventario.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {productos.filter(p => p.activo).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Inventario de Productos</CardTitle>
                    <CardDescription>Lista de todos los productos en almacén</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Producto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                        <DialogDescription>
                          Completa la información del nuevo producto
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="nombre">Nombre del Producto</Label>
                          <Input
                            id="nombre"
                            value={nuevoProducto.nombre}
                            onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
                            placeholder="Ej: Tomates"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="categoria">Categoría</Label>
                          <Select value={nuevoProducto.categoria} onValueChange={(value) => setNuevoProducto({...nuevoProducto, categoria: value})}>
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="stockActual">Stock Actual</Label>
                            <Input
                              id="stockActual"
                              type="number"
                              value={nuevoProducto.stockActual}
                              onChange={(e) => setNuevoProducto({...nuevoProducto, stockActual: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="unidad">Unidad</Label>
                            <Select value={nuevoProducto.unidad} onValueChange={(value) => setNuevoProducto({...nuevoProducto, unidad: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg">kg</SelectItem>
                                <SelectItem value="g">g</SelectItem>
                                <SelectItem value="l">l</SelectItem>
                                <SelectItem value="ml">ml</SelectItem>
                                <SelectItem value="unidad">unidad</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="stockMinimo">Stock Mínimo</Label>
                            <Input
                              id="stockMinimo"
                              type="number"
                              value={nuevoProducto.stockMinimo}
                              onChange={(e) => setNuevoProducto({...nuevoProducto, stockMinimo: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="stockMaximo">Stock Máximo</Label>
                            <Input
                              id="stockMaximo"
                              type="number"
                              value={nuevoProducto.stockMaximo}
                              onChange={(e) => setNuevoProducto({...nuevoProducto, stockMaximo: parseFloat(e.target.value)})}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="precioCompra">Precio de Compra</Label>
                          <Input
                            id="precioCompra"
                            type="number"
                            step="0.01"
                            value={nuevoProducto.precioCompra}
                            onChange={(e) => setNuevoProducto({...nuevoProducto, precioCompra: parseFloat(e.target.value)})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="proveedor">Proveedor</Label>
                          <Input
                            id="proveedor"
                            value={nuevoProducto.proveedor}
                            onChange={(e) => setNuevoProducto({...nuevoProducto, proveedor: e.target.value})}
                            placeholder="Nombre del proveedor"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                          <Input
                            id="fechaVencimiento"
                            type="date"
                            value={nuevoProducto.fechaVencimiento}
                            onChange={(e) => setNuevoProducto({...nuevoProducto, fechaVencimiento: e.target.value})}
                          />
                        </div>
                        <Button onClick={agregarProducto} className="w-full">
                          Agregar Producto
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
                  <Select value={filtroStock} onValueChange={setFiltroStock}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="bajo">Stock Bajo</SelectItem>
                      <SelectItem value="normal">Stock Normal</SelectItem>
                      <SelectItem value="alto">Stock Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Activo</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productosFiltrados.map((producto) => {
                      const stockStatus = getStockStatus(producto)
                      const stockProgress = getStockProgress(producto)
                      return (
                        <TableRow key={producto.id}>
                          <TableCell className="font-medium">{producto.nombre}</TableCell>
                          <TableCell>{producto.categoria}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{producto.stockActual} {producto.unidad}</span>
                                <span className="text-gray-500">/ {producto.stockMaximo}</span>
                              </div>
                              <Progress value={stockProgress} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={stockStatus.bg + ' ' + stockStatus.color}>
                              {stockStatus.status}
                            </Badge>
                          </TableCell>
                          <TableCell>${producto.precioCompra.toFixed(2)}</TableCell>
                          <TableCell>{producto.proveedor}</TableCell>
                          <TableCell>
                            <Switch
                              checked={producto.activo}
                              onCheckedChange={() => toggleActivo(producto.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Actualizar Stock - {producto.nombre}</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="nuevoStock">Nuevo Stock</Label>
                                      <Input
                                        id="nuevoStock"
                                        type="number"
                                        defaultValue={producto.stockActual}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            const input = e.target as HTMLInputElement
                                            actualizarStock(producto.id, parseFloat(input.value))
                                          }
                                        }}
                                      />
                                    </div>
                                    <Button onClick={() => {
                                      const input = document.getElementById('nuevoStock') as HTMLInputElement
                                      actualizarStock(producto.id, parseFloat(input.value))
                                    }}>
                                      Actualizar Stock
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => eliminarProducto(producto.id)}
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
                <CardTitle>Alertas de Stock</CardTitle>
                <CardDescription>Productos con stock bajo</CardDescription>
              </CardHeader>
              <CardContent>
                {productosBajos.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay productos con stock bajo</p>
                ) : (
                  <div className="space-y-3">
                    {productosBajos.map((producto) => (
                      <div key={producto.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="font-medium text-red-800">{producto.nombre}</div>
                        <div className="text-sm text-red-600">
                          Stock: {producto.stockActual} {producto.unidad} / Mínimo: {producto.stockMinimo} {producto.unidad}
                        </div>
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