const TOKE_KEY = "token";

export const getToken = () => {
  return localStorage.getItem(TOKE_KEY);
}

export const setToken = (token: string) => {
  localStorage.setItem(TOKE_KEY, token);
}

export const removeToken = () => {
  localStorage.removeItem(TOKE_KEY);
}