// src/context/AuthContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthAPI } from "../api/endpoints";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(() => localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh"));
  const [user, setUser] = useState(null);

  const isAuthed = !!access;

  const login = async ({ username, password }) => {
    const data = await AuthAPI.login(username, password);
    const a = data?.access;
    const r = data?.refresh;
    if (!a || !r) throw new Error("Invalid credentials or token payload");
    localStorage.setItem("access", a);
    localStorage.setItem("refresh", r);
    setAccess(a);
    setRefresh(r);
    try {
      const me = await AuthAPI.me(); // if available
      setUser(me || null);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
    setRefresh(null);
    setUser(null);
    window.location.href = "/login";
  };

  const value = useMemo(
    () => ({ access, refresh, user, isAuthed, login, logout }),
    [access, refresh, user, isAuthed]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
