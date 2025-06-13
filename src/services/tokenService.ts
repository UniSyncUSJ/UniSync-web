import jwtDecode from 'jwt-decode'; 

interface DecodedToken {
  sub: string;
  exp: number;
  // Other JWT claims
}

export const tokenService = {
  // Store JWT token
  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  // Retrieve JWT token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Remove JWT token
  removeToken: () => {
    localStorage.removeItem('token');
  },

  // Decode and verify JWT token
  decodeToken: (): DecodedToken | null => {
    const token = tokenService.getToken();
    if (!token) return null;
    
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (): boolean => {
    const decoded = tokenService.decodeToken();
    if (!decoded) return true;
    
    // Check if expiration time is past current time
    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp < Date.now() / 1000;
  },

  // Check if we have a valid token
  hasValidToken: (): boolean => {
    return !!tokenService.getToken() && !tokenService.isTokenExpired();
  }
};
