# 🍽️ Sistema de Gestión de Restaurantes

## 📋 Descripción

Sistema completo de gestión administrativa para restaurantes que permite administrar mesas, órdenes, almacén, menú, alertas y reportes de manera eficiente y profesional.

## ✨ Características Principales

### 🎯 **Gestión de Mesas**
- Control completo del estado de las mesas (Libre, Ocupada, Reservada, Mantenimiento)
- Visualización en tiempo real del estado de ocupación
- Gestión de capacidad y ubicación de cada mesa
- Historial de cambios de estado

### 📝 **Gestión de Órdenes**
- Creación rápida de órdenes por mesa
- Estados de seguimiento (Pendiente, En Preparación, Listo, Entregado, Cancelado)
- Cálculo automático de totales
- Notas especiales para cada orden
- Historial completo de órdenes

### 📦 **Gestión de Almacén**
- Control de inventario en tiempo real
- Alertas automáticas de stock bajo
- Categorización de productos
- Control de fechas de vencimiento
- Gestión de proveedores y precios

### 🍴 **Gestión de Menú**
- Administración completa de platos
- Control automático de disponibilidad basado en stock
- Categorización y precios
- Platos destacados
- Alertas cuando faltan ingredientes

### ⚠️ **Sistema de Alertas**
- Notificaciones en tiempo real
- Diferentes niveles de severidad
- Alertas de stock crítico
- Vencimientos próximos
- Gestión de alertas resueltas

### 📊 **Reportes y Estadísticas**
- Ventas por período
- Platos más populares
- Rendimiento por mesa
- Análisis de categorías
- Tendencias y crecimiento

### 🖥️ **Pantalla Completa**
- **Modo inmersivo** para todos los dispositivos
- **Detección automática** de tipo de dispositivo (Desktop, Tablet, Mobile)
- **Atajos de teclado** (F11 para alternar)
- **Botones accesibles** en navegación y esquina inferior
- **Guía de ayuda** integrada

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Entrar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Acceso al Sistema
- Abrir el navegador en: `http://localhost:3000`
- El sistema estará listo para usar

## 👥 Guía de Uso para Empleados

### 🏠 **Dashboard Principal**
- **Vista General**: Muestra estadísticas rápidas del restaurante
- **Módulos Principales**: Acceso directo a todas las funciones
- **Actividad Reciente**: Últimas acciones realizadas en el sistema
- **Rendimiento del Día**: Métricas de ocupación y satisfacción

### 🪑 **Gestión de Mesas**
1. **Ver Estado**: Consultar el estado actual de todas las mesas
2. **Cambiar Estado**: Usar el selector para cambiar el estado de una mesa
3. **Agregar Mesa**: Crear nuevas mesas con capacidad y ubicación
4. **Eliminar Mesa**: Remover mesas que ya no se usen

### 📋 **Gestión de Órdenes**
1. **Crear Orden**: Seleccionar mesa y agregar platos
2. **Seguir Estado**: Cambiar el estado según el progreso
3. **Ver Historial**: Consultar órdenes anteriores
4. **Notas Especiales**: Agregar instrucciones especiales

### 📦 **Gestión de Almacén**
1. **Ver Stock**: Consultar niveles de inventario
2. **Actualizar Stock**: Modificar cantidades disponibles
3. **Alertas**: Revisar productos con stock bajo
4. **Agregar Productos**: Registrar nuevos productos

### 🍽️ **Gestión de Menú**
1. **Ver Platos**: Consultar todos los platos disponibles
2. **Agregar Plato**: Crear nuevos platos con ingredientes
3. **Control Disponibilidad**: Activar/desactivar platos
4. **Destacar Platos**: Marcar platos especiales

### ⚠️ **Sistema de Alertas**
1. **Revisar Alertas**: Ver notificaciones pendientes
2. **Resolver Alertas**: Marcar como resueltas
3. **Filtros**: Filtrar por tipo y severidad
4. **Historial**: Ver alertas resueltas

### 📊 **Reportes**
1. **Ventas**: Consultar estadísticas de ventas
2. **Platos Populares**: Ver los más vendidos
3. **Rendimiento**: Analizar ocupación de mesas
4. **Exportar**: Descargar reportes

### 🖥️ **Pantalla Completa**
1. **Activar**: Haz clic en el botón "Pantalla Completa" en la esquina inferior derecha
2. **Atajo de Teclado**: Presiona F11 para alternar rápidamente
3. **Navegación**: Usa el botón en la barra de navegación
4. **Salir**: Presiona F11, ESC, o haz clic en "Salir"
5. **Ayuda**: Haz clic en el botón "Ayuda" para ver instrucciones detalladas

## 🎨 Características de Diseño

### 💻 **Interfaz Moderna**
- Diseño limpio y profesional
- Colores intuitivos para estados
- Iconos descriptivos
- Responsive para móviles y tablets

### ⚡ **Experiencia de Usuario**
- Navegación intuitiva
- Acciones rápidas
- Notificaciones en tiempo real
- Filtros y búsquedas eficientes

### 🔔 **Notificaciones**
- Alertas automáticas
- Diferentes tipos de notificación
- Auto-eliminación
- Historial de notificaciones

### 🖥️ **Pantalla Completa**
- **Detección automática** del tipo de dispositivo
- **Botones adaptativos** según el dispositivo
- **Indicadores visuales** del estado actual
- **Atajos de teclado** para acceso rápido
- **Guía de ayuda** integrada

## 🔧 Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Shadcn UI, Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Styling**: Tailwind CSS
- **Fullscreen API**: Navegador nativo

## 📱 Responsive Design

El sistema está optimizado para:
- **Desktop**: Pantallas grandes con navegación completa y pantalla completa
- **Tablet**: Navegación adaptada para pantallas medianas, ideal para cocina
- **Mobile**: Navegación móvil optimizada con botones táctiles

## 🖥️ Funcionalidad de Pantalla Completa

### **Compatibilidad**
- ✅ **Chrome/Edge**: Soporte completo
- ✅ **Firefox**: Soporte completo
- ✅ **Safari**: Soporte completo
- ✅ **Mobile Browsers**: Soporte limitado (depende del navegador)

### **Características por Dispositivo**

#### **Desktop**
- **Botón flotante**: Esquina inferior derecha
- **Navegación**: Botón en la barra superior
- **Atajo**: F11
- **Salida**: F11, ESC, o botón "Salir"

#### **Tablet**
- **Botón flotante**: Esquina inferior derecha
- **Menú móvil**: Opción en navegación
- **Salida**: Botón "Salir" o gesto de pellizco
- **Ideal para**: Cocina y gestión de órdenes

#### **Mobile**
- **Botón compacto**: "Pantalla" en esquina inferior
- **Menú móvil**: Opción en navegación
- **Salida**: Botón "Salir" o gesto de pellizco
- **iOS**: Gestos adicionales de deslizar

### **Casos de Uso**
- **Cocina**: Tablets en pantalla completa para ver órdenes
- **Caja**: Desktop en pantalla completa para facturación
- **Presentaciones**: Mostrar reportes y estadísticas
- **Trabajo intensivo**: Concentración sin distracciones

## 🔒 Seguridad

- Validación de datos en frontend
- Sanitización de inputs
- Manejo seguro de estados
- Protección contra XSS

## 🚀 Próximas Funcionalidades

- [ ] Autenticación de usuarios
- [ ] Roles y permisos
- [ ] Integración con backend
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Impresión de tickets
- [ ] Integración con POS
- [ ] Reportes avanzados
- [ ] Modo kiosko automático
- [ ] Gestos táctiles avanzados

## 📞 Soporte

Para soporte técnico o preguntas sobre el uso del sistema:
- **Email**: soporte@restauranteapp.com
- **Teléfono**: +1 (555) 123-4567
- **Horario**: Lunes a Viernes 9:00 AM - 6:00 PM

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ para la gestión eficiente de restaurantes**
