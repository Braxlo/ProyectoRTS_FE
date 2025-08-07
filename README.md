# Sistema de Gestión de Restaurantes - Frontend

## 🚀 Características Implementadas

### 🔐 Sistema de Autenticación
- **Login Multi-tenant**: Sistema de autenticación que permite diferentes tipos de usuarios
  - **Administradores**: Acceso completo al sistema
  - **Empleados**: Acceso limitado con dominio específico del restaurante
- **Registro de Restaurantes**: Formulario completo para registrar nuevos restaurantes
- **Dominios Personalizados**: Cada restaurante puede configurar su dominio (ej: `pedro@DonJusto.com`)

### 🎨 Personalización
- **Configuración de Colores**: Sistema completo de personalización de colores
  - Paleta de colores predefinidos (Azul, Verde, Morado, Naranja, Rosa, Rojo)
  - Selector de colores personalizados
  - Vista previa en tiempo real
- **Configuración del Restaurante**: 
  - Nombre del restaurante
  - Dominio personalizado
  - Correo electrónico
  - Configuración de notificaciones

### 🌐 Landing Page
- **Diseño Moderno**: Landing page atractiva y profesional
- **Secciones Completas**:
  - Hero section con llamadas a la acción
  - Características del sistema
  - Beneficios y ventajas
  - Testimonios de clientes
  - Planes de precios
  - Información de contacto
- **Responsive Design**: Optimizada para todos los dispositivos

### 📊 Módulos del Sistema
- **Dashboard**: Vista general con estadísticas y métricas
- **Gestión de Mesas**: Administración de mesas y reservas
- **Gestión de Órdenes**: Creación y seguimiento de órdenes
- **Almacén**: Control de inventario y stock
- **Menú**: Administración de platos y precios
- **Alertas**: Sistema de notificaciones automáticas
- **Reportes**: Análisis y estadísticas del negocio

## 🛠 Tecnologías Utilizadas

- **Next.js 15**: Framework de React para el frontend
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Framework de CSS para estilos
- **Radix UI**: Componentes de UI accesibles
- **Lucide React**: Iconos modernos
- **React Hook Form**: Manejo de formularios

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Página de login
│   │   │   └── register/
│   │   │       └── page.tsx          # Página de registro
│   │   ├── configuracion/
│   │   │   └── page.tsx              # Página de configuración
│   │   ├── landing/
│   │   │   └── page.tsx              # Landing page
│   │   ├── mesas/
│   │   ├── ordenes/
│   │   ├── almacen/
│   │   ├── menu/
│   │   ├── alertas/
│   │   ├── reportes/
│   │   └── page.tsx                  # Dashboard principal
│   ├── components/
│   │   ├── ui/                       # Componentes de UI
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   └── Navigation.tsx            # Navegación principal
│   └── lib/
│       └── utils.ts                  # Utilidades
```

## 🚀 Instalación y Uso

1. **Instalar dependencias**:
```bash
npm install
   ```

2. **Ejecutar en desarrollo**:
   ```bash
npm run dev
```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

## 🎯 Funcionalidades Clave

### Sistema de Dominios
- Cada restaurante puede configurar su dominio personalizado
- Los empleados acceden con el formato: `nombre@dominio.com`
- Ejemplo: Si el restaurante "Don Justo" configura su dominio como "DonJusto", los empleados accederán con `pedro@DonJusto.com`

### Personalización de Colores
- Sistema completo de personalización de colores
- Aplicación en tiempo real de los cambios
- Paleta de colores predefinidos
- Selector de colores personalizados

### Landing Page Profesional
- Diseño moderno y atractivo
- Información completa del sistema
- Llamadas a la acción claras
- Testimonios y casos de uso
- Planes de precios transparentes

## 🔧 Configuración

### Variables de Entorno
Crear un archivo `.env.local` con las siguientes variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=RestaurantPro
```

### Personalización de Colores
Los colores se pueden personalizar desde la página de configuración:
- Color principal: Para botones y elementos destacados
- Color secundario: Para elementos secundarios y fondos

## 📱 Responsive Design
El sistema está completamente optimizado para:
- Dispositivos móviles
- Tablets
- Computadoras de escritorio
- Pantallas grandes

## 🔒 Seguridad
- Autenticación segura
- Validación de formularios
- Protección de rutas
- Manejo de errores

## 🎨 Diseño
- Interfaz moderna y intuitiva
- Diseño consistente en toda la aplicación
- Accesibilidad implementada
- Experiencia de usuario optimizada

## 📞 Soporte
Para soporte técnico o consultas:
- Email: info@restaurantpro.com
- Teléfono: +1 (555) 123-4567
- Documentación: [docs.restaurantpro.com](https://docs.restaurantpro.com)

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.
