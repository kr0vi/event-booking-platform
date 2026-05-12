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
  if (data.success) {
    setToken(data.token);
  }
  return data;
};

export const signup = async (email: string, password: string, name: string) => {
  const { data } = await api.post(
    process.env.NEXT_PUBLIC_API_SIGNUP_URL || "/auth/signup",
    { email, password, name },
  );

  if (data.success) {
    window.location.href = "/login";
  }

  return data;
};

// Me: fetch currently logged-in user from token.
export const getCurrentUser = async () => {
  const { data } = await api.get(
    process.env.NEXT_PUBLIC_API_ME_URL || "/auth/me",
  );
  return data.user;
};

// Logout here is frontend-only for demo.
// (Some apps also call backend logout endpoint.)
export const logout = () => {
  removeToken();
};

export const getHostEventAnalytics = async (eventId: string) => {
  const { data } = await api.get(`/host/events/${eventId}/analytics`);
  return data;
};

export const updateHostEvent = async (
  eventId: string,
  payload: Record<string, unknown>,
) => {
  const { data } = await api.patch(`/events/${eventId}`, payload);
  return data;
};

export const cancelHostEvent = async (eventId: string) => {
  const { data } = await api.post(`/events/${eventId}/cancel`);
  return data;
};

export const deleteHostEvent = async (eventId: string) => {
  const { data } = await api.post(`/events/${eventId}/delete`);
  return data;
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
