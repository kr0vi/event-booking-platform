import { getToken, removeToken, setToken } from "@/lib/auth/token";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((cofig) => {
  const token = getToken();
  if (token) {
    cofig.headers.Authorization = `Bearer ${token}`;
  }
  return cofig;
});

export const login = async (email: string, password: string) => {
  const { data } = await api.post(
    process.env.NEXT_PUBLIC_API_LOGIN_URL || "/auth/login",
    {
      email,
      password,
    },
  );
  if (data.sucess) {
    setToken(data.token);
  }
  return data;
};

export const signup = async (email: string, password: string, name: string) => {
  const { data } = await api.post(process.env.NEXT_PUBLIC_API_SIGNUP_URL || "/auth/signup", { email, password, name });

  if (data.success) {
    window.location.href = "/login";
  }

  return data;
};


// Me: fetch currently logged-in user from token.
export const getCurrentUser = async () => {
  const { data } = await api.get(process.env.NEXT_PUBLIC_API_ME_URL || "/auth/me");
  return data.user;
};

// Logout here is frontend-only for demo.
// (Some apps also call backend logout endpoint.)
export const logout = () => {
  removeToken();
};



export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") {
      return message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
