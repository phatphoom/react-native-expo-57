import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, LoginRequest, RegisterRequest } from "@/types/auth";
import { AuthApi } from "../api/authApi";
import { useRouter } from "expo-router";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        // Fetch current profile with token
        const profile = await AuthApi.getProfile();
        setUser(profile);
      }
    } catch (error) {
      console.error("Auth verification failed", error);
      // Clean up invalid token
      await AsyncStorage.removeItem("authToken");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    const res = await AuthApi.login(data);
    const { token: newToken, user: newUser } = res.data;
    
    await AsyncStorage.setItem("authToken", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const register = async (data: RegisterRequest) => {
    // According to docs, register returns user but not token (usually), so they might need to login after
    // Let's call login if register is successful, or just wait for them to login
    await AuthApi.register(data);
    // Auto login after register
    await login({ email: data.email, password: data.password });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
