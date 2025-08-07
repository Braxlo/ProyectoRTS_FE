'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { apiClient, LoginRequest, LoginResponse } from '@/lib/api'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'employee'
  position?: string
  restaurantId: number
}

interface Restaurant {
  id: number
  name: string
  domain: string
  primaryColor: string
  secondaryColor: string
}

interface AuthContextType {
  user: User | null
  restaurant: Restaurant | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar la página
    const checkAuth = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          const storedUser = apiClient.getUser()
          const storedRestaurant = apiClient.getRestaurant()
          
          if (storedUser && storedRestaurant) {
            setUser(storedUser)
            setRestaurant(storedRestaurant)
          } else {
            // Si hay token pero no hay datos de usuario, intentar obtener el perfil
            try {
              const profile = await apiClient.getProfile()
              if (profile.data) {
                setUser(profile.data.user)
                setRestaurant(profile.data.restaurant)
              }
            } catch (error) {
              // Si falla, limpiar la autenticación
              apiClient.logout()
            }
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        apiClient.logout()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiClient.login(credentials)
      
      setUser(response.user)
      setRestaurant(response.restaurant)
      
      // Aplicar colores del restaurante
      if (response.restaurant) {
        document.documentElement.style.setProperty(
          '--primary-color',
          response.restaurant.primaryColor
        )
        document.documentElement.style.setProperty(
          '--secondary-color',
          response.restaurant.secondaryColor
        )
      }
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
    setRestaurant(null)
    setError(null)
    
    // Limpiar colores personalizados
    document.documentElement.style.removeProperty('--primary-color')
    document.documentElement.style.removeProperty('--secondary-color')
  }

  const value: AuthContextType = {
    user,
    restaurant,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
