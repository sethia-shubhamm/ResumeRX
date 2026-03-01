import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("rr_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("rr_user");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (identifier, password) => {
    const res = await axios.post("/api/auth/login", { identifier, password });
    const data = res.data;
    setUser(data.user);
    localStorage.setItem("rr_user", JSON.stringify(data.user));
    localStorage.setItem("rr_token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await axios.post("/api/auth/register", payload);
    const data = res.data;
    setUser(data.user);
    localStorage.setItem("rr_user", JSON.stringify(data.user));
    localStorage.setItem("rr_token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("rr_user");
    localStorage.removeItem("rr_token");
    delete axios.defaults.headers.common["Authorization"];
  }, []);

  // Restore axios auth header from storage on refresh
  useEffect(() => {
    const token = localStorage.getItem("rr_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
