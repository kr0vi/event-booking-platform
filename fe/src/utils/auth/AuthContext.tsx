"use client";

import { api, getErrorMessage } from "@/utils/api";
import { ApiResponse, AuthUser } from "@/utils/interfaces";
import { createContext, useContext, useState } from "react";

const TOKEN_KEY = "event-platform-token";

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeUserFromToken(token: string): AuthUser | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }
    const parsed = JSON.parse(atob(payload));
    if (typeof parsed.id === "number") {
      return { id: parsed.id };
    }
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const stored = localStorage.getItem(TOKEN_KEY);
    return stored ? decodeUserFromToken(stored) : null;
  });

  const login = async (
    email: string,
    password: string,
  ): Promise<string | null> => {
    try {
      const { data } = await api.post<
        ApiResponse<null> & {
          token?: string;
        }
      >("/auth/login", {
        email,
        password,
      });

      if (!data.success || !data.token) {
        return data.message || "Login failed";
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(decodeUserFromToken(data.token));
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<string | null> => {
    try {
      const { data } = await api.post<ApiResponse<unknown>>("/auth/signup", {
        name,
        email,
        password,
      });

      if (!data.success) {
        return data.message || "Signup failed";
      }

      return await login(email, password);
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    token,
    user,
    isAuthenticated: Boolean(token),
    isBootstrapping: false,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
