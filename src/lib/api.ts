// Configuración de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Tipos para las respuestas de la API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  restaurantDomain: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'employee';
    position?: string;
    restaurantId: number;
  };
  restaurant: {
    id: number;
    name: string;
    domain: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

// Tipo para la respuesta real del backend
interface BackendLoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'employee';
    position?: string;
    restaurantId: number;
    restaurant: {
      id: number;
      name: string;
      domain: string;
      primaryColor: string;
      secondaryColor: string;
    };
  };
}

export interface RegisterRestaurantRequest {
  name: string;
  description: string;
  domain: string;
  address: string;
  phone: string;
  email: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}

export interface RegisterEmployeeRequest {
  name: string;
  email: string;
  password: string;
  position: string;
  role: 'employee';
  restaurantDomain: string;
}

// Clase para manejar las llamadas a la API
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autenticación si existe
    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Error en la solicitud');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos de autenticación
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.request<BackendLoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // El backend devuelve la respuesta directamente
      const loginData = (response.data || response) as BackendLoginResponse;
      
      if (!loginData || !loginData.access_token) {
        throw new Error('Respuesta inválida del servidor');
      }
      
      // Guardar datos en localStorage
      this.setToken(loginData.access_token);
      this.setUser(loginData.user);
      this.setRestaurant(loginData.user.restaurant);
      
      return {
        token: loginData.access_token,
        user: {
          id: loginData.user.id,
          name: loginData.user.name,
          email: loginData.user.email,
          role: loginData.user.role,
          position: loginData.user.position,
          restaurantId: loginData.user.restaurantId
        },
        restaurant: loginData.user.restaurant
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async registerRestaurant(data: RegisterRestaurantRequest): Promise<ApiResponse> {
    return this.request('/auth/register/restaurant', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async registerEmployee(data: RegisterEmployeeRequest): Promise<ApiResponse> {
    return this.request('/auth/register/employee', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<ApiResponse> {
    return this.request('/auth/profile');
  }

  // Métodos para restaurantes
  async getRestaurantProfile(): Promise<ApiResponse> {
    return this.request('/restaurants/profile');
  }

  async getDashboardStats(): Promise<ApiResponse> {
    return this.request('/restaurants/dashboard/stats');
  }

  async updateRestaurantColors(colors: { primaryColor: string; secondaryColor: string }): Promise<ApiResponse> {
    return this.request('/restaurants/colors', {
      method: 'PUT',
      body: JSON.stringify(colors),
    });
  }

  // Métodos para mesas
  async getTables(): Promise<ApiResponse> {
    return this.request('/tables');
  }

  async getTableStats(): Promise<ApiResponse> {
    return this.request('/tables/stats');
  }

  async createTable(data: Record<string, unknown>): Promise<ApiResponse> {
    return this.request('/tables', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTable(id: number, data: Record<string, unknown>): Promise<ApiResponse> {
    return this.request(`/tables/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateTableStatus(id: number, status: string): Promise<ApiResponse> {
    return this.request(`/tables/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteTable(id: number): Promise<ApiResponse> {
    return this.request(`/tables/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos para menú
  async getMenu(): Promise<ApiResponse> {
    return this.request('/menu');
  }

  async getMenuStats(): Promise<ApiResponse> {
    return this.request('/menu/stats');
  }

  async getMenuByCategory(category: string): Promise<ApiResponse> {
    return this.request(`/menu/category/${category}`);
  }

  async createMenuItem(data: Record<string, unknown>): Promise<ApiResponse> {
    return this.request('/menu', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMenuItem(id: number, data: Record<string, unknown>): Promise<ApiResponse> {
    return this.request(`/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async toggleMenuItemAvailability(id: number): Promise<ApiResponse> {
    return this.request(`/menu/${id}/toggle-availability`, {
      method: 'PUT',
    });
  }

  async toggleMenuItemFeatured(id: number): Promise<ApiResponse> {
    return this.request(`/menu/${id}/toggle-featured`, {
      method: 'PUT',
    });
  }

  async deleteMenuItem(id: number): Promise<ApiResponse> {
    return this.request(`/menu/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos para órdenes
  async getOrders(): Promise<ApiResponse> {
    return this.request('/orders');
  }

  async getOrderStats(): Promise<ApiResponse> {
    return this.request('/orders/stats');
  }

  async createOrder(data: Record<string, unknown>): Promise<ApiResponse> {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrderStatus(id: number, status: string): Promise<ApiResponse> {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteOrder(id: number): Promise<ApiResponse> {
    return this.request(`/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos para inventario
  async getInventory(): Promise<ApiResponse> {
    return this.request('/inventory');
  }

  async getInventoryStats(): Promise<ApiResponse> {
    return this.request('/inventory/stats');
  }

  async getLowStockItems(): Promise<ApiResponse> {
    return this.request('/inventory/low-stock');
  }

  async getExpiringItems(): Promise<ApiResponse> {
    return this.request('/inventory/expiring');
  }

  async createInventoryItem(data: Record<string, unknown>): Promise<ApiResponse> {
    return this.request('/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInventoryItem(id: number, data: Record<string, unknown>): Promise<ApiResponse> {
    return this.request(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateInventoryStock(id: number, stock: number): Promise<ApiResponse> {
    return this.request(`/inventory/${id}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ currentStock: stock }),
    });
  }

  async deleteInventoryItem(id: number): Promise<ApiResponse> {
    return this.request(`/inventory/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de utilidad para manejo de tokens y datos de usuario
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private setUser(user: Record<string, unknown>): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private setRestaurant(restaurant: Record<string, unknown>): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('restaurant', JSON.stringify(restaurant));
    }
  }

  public getUser(): Record<string, unknown> | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  public getRestaurant(): Record<string, unknown> | null {
    if (typeof window !== 'undefined') {
      const restaurant = localStorage.getItem('restaurant');
      return restaurant ? JSON.parse(restaurant) : null;
    }
    return null;
  }

  public logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('restaurant');
    }
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

// Instancia global del cliente API
export const apiClient = new ApiClient(API_BASE_URL);
