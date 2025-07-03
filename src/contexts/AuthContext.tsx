import { use, useContext, useEffect } from "react";

{createContext, useContext, useState, useEffect} from "react";

import { tokenService } from "../services/tokenService";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

interface User{
      id: string;
      username:string;
      password:string;

}

interface AuthContextType {
      user: User | null;
      isAuthenticated: boolean;
      setUser: React.Dispatch<React.SetStateAction<User | null>>;
      Login: (username: string, password: string) => Promise<void>;
      register:(username:string, email: string, password: string) => Promise<void>;
      logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = React.FC<{children: React.ReactNode}> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);
      const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

      useEffect(() => {
            const checkAuth = async () => {
                  const hasValidToken = tokenService.hasValidToken();
                  setIsAuthenticated(hasValidToken);

                  if (hasValidToken) {
                        try {
                              const userData = await userService.getUser();
                              setUser(userData);
                        } catch (error) {
                              console.error("Failed to fetch user data:", error);
                              setUser(null);
                        }
                  } else {
                        setUser(null);
                  }
            };

            checkAuth();
      },[]);
      const Login = async (username: string, password: string) => {
            try {
                  const userData = await authService.login(username, password);
                  setUser(userData);
                  setIsAuthenticated(true);