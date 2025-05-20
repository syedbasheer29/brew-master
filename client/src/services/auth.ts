import axios from 'axios';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role: 'user' | 'admin';
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name?: string;
}

interface ResetPasswordData {
  email: string;
  token: string;
  newPassword: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class AuthService {
  private token: string | null = null;
  private refreshTimeout: NodeJS.Timeout | null = null;

  constructor() {
    // Initialize token from localStorage
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.setupRefreshToken();
    }
  }

  private setupRefreshToken() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    // Refresh token 5 minutes before expiry
    this.refreshTimeout = setTimeout(() => {
      this.refreshToken();
    }, 24 * 60 * 60 * 1000 - 5 * 60 * 1000); // 24 hours - 5 minutes
  }

  async login({ email, password }: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        email,
        password,
      });
      this.handleAuthResponse(response.data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
      this.handleAuthResponse(response.data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<void> {
    window.location.href = `${API_URL}/auth/google`;
  }

  async loginWithFacebook(): Promise<void> {
    window.location.href = `${API_URL}/auth/facebook`;
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, data);
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  async refreshToken(): Promise<void> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/refresh-token`,
        {},
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      );
      this.handleAuthResponse(response.data);
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  private handleAuthResponse(data: AuthResponse): void {
    this.token = data.token;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.setupRefreshToken();
    // Set default authorization header for all future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  }

  private handleError(error: any): void {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.logout();
          throw new Error('Invalid credentials');
        case 403:
          throw new Error('Access denied');
        case 429:
          throw new Error('Too many attempts. Please try again later');
        default:
          throw new Error(error.response.data.message || 'An error occurred');
      }
    }
    throw error;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
}

export const authService = new AuthService(); 