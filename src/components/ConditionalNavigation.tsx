'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Rutas donde NO queremos mostrar la navegación
  const excludedPaths = [
    '/', // Landing page (página principal)
    '/landing', // Landing page (ruta alternativa)
    '/auth/login', // Página de login
    '/auth/register', // Página de registro
  ]
  
  // Verificar si la ruta actual está en la lista de exclusiones
  const shouldShowNavigation = !excludedPaths.includes(pathname)
  
  // Si no debe mostrar la navegación, retornar null
  if (!shouldShowNavigation) {
    return null
  }
  
  // Si debe mostrar la navegación, retornar el componente Navigation
  return <Navigation />
}
