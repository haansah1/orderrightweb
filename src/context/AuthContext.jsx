import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, signupUser } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const u = await getCurrentUser();
        if (u) setUser(u);
      } catch (e) {
        console.error("Auth init error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    setUser(res.user);
    return res;
  };

  const signup = async (name, email, password) => {
    const res = await signupUser(name, email, password);
    setUser(res.user);
    return res;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
