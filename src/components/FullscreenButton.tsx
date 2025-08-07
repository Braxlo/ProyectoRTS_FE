'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Maximize2, Minimize2, Monitor, Tablet, Smartphone } from 'lucide-react'

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

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType('mobile')
      } else if (width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
      window.removeEventListener('resize', handleResize)
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

  const handleKeyPress = (event: KeyboardEvent) => {
    // Atajo de teclado F11 para pantalla completa
    if (event.key === 'F11') {
      event.preventDefault()
      toggleFullscreen()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'tablet':
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getButtonText = () => {
    if (deviceType === 'mobile') {
      return isFullscreen ? 'Salir' : 'Pantalla'
    }
    return isFullscreen ? 'Salir' : 'Pantalla Completa'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* Indicador de dispositivo */}
      <Badge 
        variant="secondary" 
        className="bg-blue-100 text-blue-800 border-blue-200 text-xs px-2 py-1"
      >
        {getDeviceIcon()}
        <span className="ml-1 capitalize">{deviceType}</span>
      </Badge>

      {/* Botón de pantalla completa */}
      <Button
        variant="outline"
        size={deviceType === 'mobile' ? 'sm' : 'default'}
        onClick={toggleFullscreen}
        className={`
          bg-white/95 backdrop-blur-sm border-gray-300 hover:bg-white 
          shadow-lg transition-all duration-300 hover:scale-105
          ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-2'}
          ${isFullscreen ? 'bg-green-50 border-green-300 text-green-700' : ''}
        `}
        title={isFullscreen ? "Salir de pantalla completa (F11)" : "Pantalla completa (F11)"}
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4 mr-2" />
        ) : (
          <Maximize2 className="h-4 w-4 mr-2" />
        )}
        {getButtonText()}
      </Button>

      {/* Indicador de atajo de teclado (solo en desktop) */}
      {deviceType === 'desktop' && (
        <Badge 
          variant="outline" 
          className="bg-gray-100 text-gray-600 border-gray-200 text-xs px-2 py-1"
        >
          F11
        </Badge>
      )}
    </div>
  )
} 