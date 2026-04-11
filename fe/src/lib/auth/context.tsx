"use client";
import { getCurrentUser, logout } from "@/utils/api";
import { getToken } from "./token";
import { createContext, useCallback, useEffect, useState } from "react";

type AuthContextValue = {
  user: { id: number; email: string; name: string } | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded: !loading,
        isSignedIn: !!user,
        refresh: loadUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
