import axios from 'axios';
import Login from '../pages/Login';

const API_URL = 'http://localhost:3000/api/auth/';

export interface LoginCredentials {
      username: string;
      password: string;
}

export interface RegisterCredentials extend LoginCredentials {
      email: string;
      firstName: string;
      lastName: string;
}

const authService = {
      Login : async (credentials:   RegisterCredentials) => {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
      },

      register : async( )