'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  Building2, 
  Mail, 
  Save, 
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface RestaurantConfig {
  name: string
  domain: string
  primaryColor: string
  secondaryColor: string
  email: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<RestaurantConfig>({
    name: 'Don Justo',
    domain: 'DonJusto',
    primaryColor: '#3b82f6',
    secondaryColor: '#1d4ed8',
    email: 'admin@donjusto.com',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const colorPresets = [
    { name: 'Azul', primary: '#3b82f6', secondary: '#1d4ed8' },
    { name: 'Verde', primary: '#10b981', secondary: '#059669' },
    { name: 'Morado', primary: '#8b5cf6', secondary: '#7c3aed' },
    { name: 'Naranja', primary: '#f59e0b', secondary: '#d97706' },
    { name: 'Rosa', primary: '#ec4899', secondary: '#db2777' },
    { name: 'Rojo', primary: '#ef4444', secondary: '#dc2626' },
  ]

  const handleColorChange = (primary: string, secondary: string) => {
    setConfig(prev => ({
      ...prev,
      primaryColor: primary,
      secondaryColor: secondary
    }))
    
    // Aplicar colores al CSS variables
    document.documentElement.style.setProperty('--primary', primary)
    document.documentElement.style.setProperty('--secondary', secondary)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      // Aquí iría la lógica para guardar la configuración
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage({
        type: 'success',
        text: 'Configuración guardada exitosamente'
      })
    } catch {
      setMessage({
        type: 'error',
        text: 'Error al guardar la configuración'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Aplicar colores al cargar la página
    document.documentElement.style.setProperty('--primary', config.primaryColor)
    document.documentElement.style.setProperty('--secondary', config.secondaryColor)
  }, [config.primaryColor, config.secondaryColor])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600">Personaliza tu sistema de gestión</p>
        </div>
      </div>

      {message && (
        <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuración del Restaurante */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Información del Restaurante
            </CardTitle>
            <CardDescription>
              Configura los datos básicos de tu restaurante
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Nombre del Restaurante</Label>
              <Input
                id="restaurant-name"
                value={config.name}
                onChange={(e) => setConfig({...config, name: e.target.value})}
                placeholder="Ej: Don Justo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurant-domain">Dominio del Restaurante</Label>
              <div className="flex">
                <Input
                  id="restaurant-domain"
                  value={config.domain}
                  onChange={(e) => setConfig({...config, domain: e.target.value})}
                  placeholder="Ej: DonJusto"
                  className="rounded-r-none"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  .com
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Los empleados accederán con: nombre@{config.domain}.com
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurant-email">Correo Electrónico</Label>
              <Input
                id="restaurant-email"
                type="email"
                value={config.email}
                onChange={(e) => setConfig({...config, email: e.target.value})}
                placeholder="admin@restaurante.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Personalización de Colores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Personalización de Colores
            </CardTitle>
            <CardDescription>
              Personaliza los colores de tu sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Colores Predefinidos</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleColorChange(preset.primary, preset.secondary)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      config.primaryColor === preset.primary 
                        ? 'border-blue-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="text-sm font-medium">{preset.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="primary-color">Color Principal</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value, config.secondaryColor)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={config.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value, config.secondaryColor)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Color Secundario</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={config.secondaryColor}
                  onChange={(e) => handleColorChange(config.primaryColor, e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={config.secondaryColor}
                  onChange={(e) => handleColorChange(config.primaryColor, e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configura cómo recibir notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-gray-500">
                  Recibe alertas importantes por correo electrónico
                </p>
              </div>
              <Switch
                checked={config.notifications.email}
                onCheckedChange={(checked) => 
                  setConfig({
                    ...config, 
                    notifications: {...config.notifications, email: checked}
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones SMS</Label>
                <p className="text-sm text-gray-500">
                  Recibe alertas críticas por mensaje de texto
                </p>
              </div>
              <Switch
                checked={config.notifications.sms}
                onCheckedChange={(checked) => 
                  setConfig({
                    ...config, 
                    notifications: {...config.notifications, sms: checked}
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones Push</Label>
                <p className="text-sm text-gray-500">
                  Recibe notificaciones en tiempo real
                </p>
              </div>
              <Switch
                checked={config.notifications.push}
                onCheckedChange={(checked) => 
                  setConfig({
                    ...config, 
                    notifications: {...config.notifications, push: checked}
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Vista Previa */}
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
            <CardDescription>
              Ve cómo se verá tu sistema con los colores seleccionados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: config.primaryColor,
                color: 'white'
              }}
            >
              <h3 className="font-semibold mb-2">Ejemplo de Botón Principal</h3>
              <p className="text-sm opacity-90">
                Este es un ejemplo de cómo se verán los elementos principales con el color seleccionado.
              </p>
            </div>
            
            <div className="mt-4 p-4 rounded-lg border bg-gray-50">
              <h3 className="font-semibold mb-2">Ejemplo de Contenido</h3>
              <p className="text-sm text-gray-600">
                Este es un ejemplo de contenido normal con el color secundario aplicado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
