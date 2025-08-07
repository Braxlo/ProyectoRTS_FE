'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Utensils, 
  Users, 
  Package, 
  Menu, 
  AlertTriangle, 
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
  Zap,
  Shield,
  TrendingUp,
  Smartphone
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: 'Gestión de Mesas',
      description: 'Administra mesas, reservas y estado en tiempo real',
      color: 'bg-blue-500'
    },
    {
      icon: Menu,
      title: 'Gestión de Órdenes',
      description: 'Crea y gestiona órdenes de manera eficiente',
      color: 'bg-green-500'
    },
    {
      icon: Package,
      title: 'Control de Almacén',
      description: 'Monitorea inventario y evita pérdidas',
      color: 'bg-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Reportes Avanzados',
      description: 'Analiza ventas y rendimiento del negocio',
      color: 'bg-purple-500'
    },
    {
      icon: AlertTriangle,
      title: 'Alertas Inteligentes',
      description: 'Notificaciones automáticas de stock bajo',
      color: 'bg-red-500'
    },
    {
      icon: Utensils,
      title: 'Gestión de Menú',
      description: 'Administra platos, precios y disponibilidad',
      color: 'bg-indigo-500'
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Operación Eficiente',
      description: 'Reduce tiempos de espera y mejora la experiencia del cliente'
    },
    {
      icon: TrendingUp,
      title: 'Aumento de Ventas',
      description: 'Optimiza procesos y maximiza los ingresos'
    },
    {
      icon: Shield,
      title: 'Control Total',
      description: 'Mantén el control de todos los aspectos de tu restaurante'
    },
    {
      icon: Smartphone,
      title: 'Acceso Móvil',
      description: 'Gestiona tu restaurante desde cualquier dispositivo'
    }
  ]

  const testimonials = [
    {
      name: 'María González',
      role: 'Propietaria - Restaurante La Esquina',
      content: 'Este sistema revolucionó la forma en que gestionamos nuestro restaurante. La eficiencia aumentó un 40%.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Gerente - Don Justo',
      content: 'La gestión de inventario y las alertas automáticas nos han ayudado a reducir pérdidas significativamente.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      role: 'Chef Ejecutiva - Sabor & Arte',
      content: 'La interfaz es intuitiva y nos permite enfocarnos en lo que más importa: la calidad de nuestros platos.',
      rating: 5
    }
  ]

  const pricingPlans = [
    {
      name: 'Básico',
      price: '$29',
      period: '/mes',
      description: 'Perfecto para restaurantes pequeños',
      features: [
        'Hasta 5 usuarios',
        'Gestión de mesas',
        'Órdenes básicas',
        'Reportes básicos',
        'Soporte por email'
      ],
      popular: false
    },
    {
      name: 'Profesional',
      price: '$79',
      period: '/mes',
      description: 'Ideal para restaurantes medianos',
      features: [
        'Hasta 15 usuarios',
        'Todas las funciones básicas',
        'Gestión de almacén',
        'Alertas automáticas',
        'Reportes avanzados',
        'Soporte prioritario'
      ],
      popular: true
    },
    {
      name: 'Empresarial',
      price: '$149',
      period: '/mes',
      description: 'Para cadenas de restaurantes',
      features: [
        'Usuarios ilimitados',
        'Todas las funciones',
        'Múltiples ubicaciones',
        'API personalizada',
        'Soporte 24/7',
        'Implementación personalizada'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">RestaurantPro</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Características</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Precios</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contacto</a>
              <Link href="/auth/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Registrarse</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            🚀 Sistema de Gestión #1 para Restaurantes
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Revoluciona tu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Restaurante
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sistema completo de gestión que optimiza operaciones, aumenta ventas y mejora la experiencia del cliente. 
            Diseñado específicamente para restaurantes de todos los tamaños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para tu restaurante
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramientas poderosas diseñadas para simplificar la gestión de tu negocio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir RestaurantPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las ventajas que te harán destacar en el mercado
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restaurantes que ya confían en nuestro sistema
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planes que se adaptan a tu negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para tu restaurante
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Más Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    {plan.popular ? 'Comenzar Ahora' : 'Seleccionar Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Contáctanos para obtener más información o comenzar tu prueba gratuita
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">info@restaurantpro.com</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Teléfono</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
            <p className="text-gray-600">Ciudad de México, México</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">RestaurantPro</span>
              </div>
              <p className="text-gray-400">
                Sistema de gestión completo para restaurantes. Optimiza operaciones y aumenta ventas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estado</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RestaurantPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
