'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff, Building2, User, ChefHat } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    restaurantDomain: ''
  })
  
  const { login, isLoading, error } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent, userType: 'admin' | 'employee') => {
    e.preventDefault()
    
    try {
      // Construir el email completo para empleados
      let email = formData.email
      if (userType === 'employee' && formData.restaurantDomain) {
        // Si es empleado y no tiene @, agregar el dominio
        if (!email.includes('@')) {
          email = `${email}@${formData.restaurantDomain}.com`
        } else if (!email.includes('.')) {
          email = `${email}@${formData.restaurantDomain}.com`
        }
      }

      await login({
        email,
        password: formData.password,
        restaurantDomain: formData.restaurantDomain
      })

      // Redirigir al dashboard
      router.push('/dashboard')
    } catch (err: any) {
      // El error ya se maneja en el hook useAuth
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Gestión
          </h1>
          <p className="text-gray-600">
            Accede a tu cuenta para continuar
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Selecciona el tipo de cuenta y ingresa tus credenciales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="employee" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employee" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Empleado
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Administrador
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employee" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, 'employee')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-domain">Dominio del Restaurante</Label>
                    <div className="flex">
                      <Input
                        id="restaurant-domain"
                        placeholder="ej: DonJusto"
                        value={formData.restaurantDomain}
                        onChange={(e) => setFormData({...formData, restaurantDomain: e.target.value})}
                        className="rounded-r-none"
                        required
                      />
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        .com
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Ejemplo: pedro@DonJusto.com
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-employee">Correo Electrónico</Label>
                    <Input
                      id="email-employee"
                      type="email"
                      placeholder="tu-nombre@restaurante.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-employee">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password-employee"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <ChefHat className="mr-2 h-4 w-4" />
                        Acceder como Empleado
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-domain-admin">Dominio del Restaurante</Label>
                    <div className="flex">
                      <Input
                        id="restaurant-domain-admin"
                        placeholder="ej: DonJusto"
                        value={formData.restaurantDomain}
                        onChange={(e) => setFormData({...formData, restaurantDomain: e.target.value})}
                        className="rounded-r-none"
                        required
                      />
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        .com
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-admin">Correo Electrónico</Label>
                    <Input
                      id="email-admin"
                      type="email"
                      placeholder="admin@restaurante.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-admin">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password-admin"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <Building2 className="mr-2 h-4 w-4" />
                        Acceder como Administrador
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link href="/auth/register" className="text-blue-600 hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
