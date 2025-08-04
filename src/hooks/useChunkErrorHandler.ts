'use client'

import { useEffect } from 'react'

export function useChunkErrorHandler() {
  useEffect(() => {
    const handleChunkError = (event: ErrorEvent) => {
      // Detectar errores de carga de chunks
      if (event.message.includes('Loading chunk') || event.message.includes('ChunkLoadError')) {
        console.error('Chunk load error detected:', event)
        
        // Mostrar notificación al usuario
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
        notification.innerHTML = `
          <div class="flex items-center gap-2">
            <span>Error de carga detectado</span>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">×</button>
          </div>
          <p class="text-sm mt-1">Recargando página...</p>
        `
        document.body.appendChild(notification)
        
        // Recargar la página después de un breve delay
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Detectar promesas rechazadas relacionadas con chunks
      if (event.reason && typeof event.reason === 'string' && 
          (event.reason.includes('Loading chunk') || event.reason.includes('ChunkLoadError'))) {
        console.error('Chunk load promise rejection:', event.reason)
        
        // Recargar la página
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    }

    // Agregar event listeners
    window.addEventListener('error', handleChunkError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleChunkError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])
} 