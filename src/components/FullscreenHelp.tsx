'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  HelpCircle, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Keyboard, 
  MousePointer,
  Maximize2,
  Minimize2
} from 'lucide-react'

export default function FullscreenHelp() {
  const [isOpen, setIsOpen] = useState(false)

  const deviceInstructions = [
    {
      device: 'Desktop',
      icon: <Monitor className="h-5 w-5 text-blue-600" />,
      instructions: [
        'Haz clic en el botón "Pantalla Completa" en la esquina inferior derecha',
        'O usa el atajo de teclado F11',
        'O haz clic en el botón de la barra de navegación',
        'Para salir, presiona F11 o haz clic en "Salir"'
      ]
    },
    {
      device: 'Tablet',
      icon: <Tablet className="h-5 w-5 text-green-600" />,
      instructions: [
        'Haz clic en el botón "Pantalla Completa" en la esquina inferior derecha',
        'O usa el botón en el menú móvil',
        'Para salir, haz clic en "Salir" o usa el gesto de pellizco'
      ]
    },
    {
      device: 'Mobile',
      icon: <Smartphone className="h-5 w-5 text-purple-600" />,
      instructions: [
        'Haz clic en el botón "Pantalla" en la esquina inferior derecha',
        'O usa el botón en el menú móvil',
        'Para salir, haz clic en "Salir" o usa el gesto de pellizco',
        'En iOS, también puedes usar el gesto de deslizar hacia arriba'
      ]
    }
  ]

  const shortcuts = [
    { key: 'F11', description: 'Alternar pantalla completa' },
    { key: 'ESC', description: 'Salir de pantalla completa' },
    { key: 'Ctrl + F', description: 'Buscar en la página' },
    { key: 'Ctrl + R', description: 'Recargar página' }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="fixed bottom-4 left-4 z-50 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white shadow-lg transition-all duration-300"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Ayuda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5 text-blue-600" />
            Guía de Pantalla Completa
          </DialogTitle>
          <DialogDescription>
            Aprende a usar la función de pantalla completa en todos los dispositivos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información general */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¿Qué es Pantalla Completa?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                La función de pantalla completa te permite usar todo el espacio de tu pantalla para el sistema de gestión del restaurante, 
                ocultando barras de herramientas y elementos del navegador para una experiencia más inmersiva.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Maximize2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-800">Ventajas</p>
                  <p className="text-xs text-green-600">Más espacio de trabajo</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Minimize2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-800">Salir</p>
                  <p className="text-xs text-blue-600">Fácil de desactivar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instrucciones por dispositivo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instrucciones por Dispositivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceInstructions.map((device, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {device.icon}
                      <h3 className="font-semibold text-gray-900">{device.device}</h3>
                    </div>
                    <ul className="space-y-2">
                      {device.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Atajos de teclado */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Atajos de Teclado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="font-mono">
                      {shortcut.key}
                    </Badge>
                    <span className="text-sm text-gray-600">{shortcut.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consejos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consejos Útiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Mejor para trabajo intensivo</p>
                    <p className="text-xs text-yellow-700">Usa pantalla completa cuando necesites concentrarte en gestionar el restaurante</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Ideal para tablets en cocina</p>
                    <p className="text-xs text-blue-700">Los chefs pueden usar tablets en pantalla completa para ver órdenes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Perfecto para presentaciones</p>
                    <p className="text-xs text-green-700">Muestra reportes y estadísticas en pantalla completa</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 