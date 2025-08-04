'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Users, 
  Menu, 
  Package, 
  Utensils, 
  AlertTriangle, 
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Tipos para las APIs de pantalla completa
interface FullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
  msRequestFullscreen?: () => Promise<void>
}

interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>
  mozCancelFullScreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, badge: null },
  { name: 'Mesas', href: '/mesas', icon: Users, badge: '12' },
  { name: 'Órdenes', href: '/ordenes', icon: Menu, badge: '8' },
  { name: 'Almacén', href: '/almacen', icon: Package, badge: '3' },
  { name: 'Menú', href: '/menu', icon: Utensils, badge: null },
  { name: 'Alertas', href: '/alertas', icon: AlertTriangle, badge: '5' },
  { name: 'Reportes', href: '/reportes', icon: BarChart3, badge: null },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        // Entrar en pantalla completa con tipos seguros
        const element = document.documentElement as FullscreenElement
        if (element.requestFullscreen) {
          await element.requestFullscreen()
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen()
        } else if (element.mozRequestFullScreen) {
          await element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen()
        }
      } else {
        // Salir de pantalla completa con tipos seguros
        const doc = document as FullscreenDocument
        if (doc.exitFullscreen) {
          await doc.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen()
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen()
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen()
        }
      }
    } catch (error) {
      console.error('Error al cambiar pantalla completa:', error)
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                RestauranteApp
              </h1>
              <h1 className="text-lg font-bold text-gray-900 sm:hidden">
                RestApp
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:ml-8 lg:flex lg:space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 mr-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="hidden xl:inline">{item.name}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 text-xs ${
                          isActive 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side - User menu and notifications */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Fullscreen Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900"
              title={isFullscreen ? "Salir de pantalla completa (F11)" : "Pantalla completa (F11)"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              <span className="hidden xl:inline text-xs">
                {isFullscreen ? 'Salir' : 'Pantalla'}
              </span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm hidden lg:block">
                  <p className="font-medium text-gray-900">Administrador</p>
                  <p className="text-gray-500">Gerente</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Settings className="h-4 w-4 text-gray-600" />
                </Button>
                <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm">
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`h-4 w-4 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                {item.name}
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-auto text-xs ${
                      isActive 
                        ? 'bg-blue-200 text-blue-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
          
          {/* Mobile Fullscreen Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toggleFullscreen()
              setIsMobileMenuOpen(false)
            }}
            className="w-full mt-2 justify-start"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 mr-3" />
            ) : (
              <Maximize2 className="h-4 w-4 mr-3" />
            )}
            {isFullscreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
          </Button>
        </div>
      </div>
    </nav>
  )
} 