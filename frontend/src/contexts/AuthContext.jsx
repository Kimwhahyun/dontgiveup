import { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authApi.login(credentials);
      const { accessToken, refreshToken, userId, username } = data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const userData = { userId, username };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const { data } = await authApi.register(userData);
      const { accessToken, refreshToken, userId, username } = data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const userInfo = { userId, username };
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    const { data } = await userApi.getProfile();
    const profile = data.data;
    setUser((prev) => ({ ...prev, ...profile }));
    return profile;
  }, []);

  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
