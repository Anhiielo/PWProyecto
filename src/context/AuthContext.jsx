import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar, restaurar sesión desde localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('pekeys-token');
    const savedUser = localStorage.getItem('pekeys-user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    setCurrentUser(res.user);
    setToken(res.token);
    localStorage.setItem('pekeys-token', res.token);
    localStorage.setItem('pekeys-user', JSON.stringify(res.user));
    return res.user;
  };

  const register = async (username, email, password) => {
    const res = await registerApi(username, email, password);
    setCurrentUser(res.user);
    setToken(res.token);
    localStorage.setItem('pekeys-token', res.token);
    localStorage.setItem('pekeys-user', JSON.stringify(res.user));
    return res.user;
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('pekeys-token');
    localStorage.removeItem('pekeys-user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
