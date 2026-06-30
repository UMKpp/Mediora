"use client";

const TOKEN_KEY = "medioraAuthToken";
const USER_KEY = "medioraCurrentUser";
const USER_AUTH_KEY = "medioraUserAuthenticated";
const ADMIN_AUTH_KEY = "medioraAdminAuthenticated";

export function saveSession({ token, user }) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.localStorage.setItem(USER_AUTH_KEY, user?.role === "User" || user?.role === "Admin" ? "true" : "false");
  window.localStorage.setItem(ADMIN_AUTH_KEY, user?.role === "Admin" ? "true" : "false");
}

export function getSession() {
  const token = window.localStorage.getItem(TOKEN_KEY);
  const user = JSON.parse(window.localStorage.getItem(USER_KEY) || "null");
  return { token, user };
}

export function isUserSession() {
  const { token, user } = getSession();
  return Boolean(token && (user?.role === "User" || user?.role === "Admin"));
}

export function isAdminSession() {
  const { token, user } = getSession();
  return Boolean(token && user?.role === "Admin");
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(USER_AUTH_KEY);
  window.localStorage.removeItem(ADMIN_AUTH_KEY);
}
