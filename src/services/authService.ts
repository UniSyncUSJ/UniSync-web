import apiClient from './apiClient';
import { tokenService } from './tokenService';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    // Other user properties
  };
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store the JWT token
      tokenService.setToken(token);
      
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  async register(credentials: RegisterCredentials) {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
      const { token, user } = response.data;
      
      // Store the JWT token
      tokenService.setToken(token);
      
      return { token, user };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout() {
    // Remove JWT token
    tokenService.removeToken();
  }
};