const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('pekeys-token');

const request = async (path, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Agregar token de autenticación si existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    headers,
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error en la petición');
  return data;
};

// ─── GAMES ────────────────────────────────────────────────────────────────────
export const getGames = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/games${query ? `?${query}` : ''}`);
};

export const getGameById = (id) => request(`/games/${id}`);

export const createGame = (gameData) =>
  request('/games', { method: 'POST', body: JSON.stringify(gameData) });

export const updateGame = (id, gameData) =>
  request(`/games/${id}`, { method: 'PUT', body: JSON.stringify(gameData) });

export const deleteGame = (id) =>
  request(`/games/${id}`, { method: 'DELETE' });

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const register = (username, email, password) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify({ username, email, password }) });

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────
export const checkout = (items) =>
  request('/checkout', { method: 'POST', body: JSON.stringify({ items }) });
