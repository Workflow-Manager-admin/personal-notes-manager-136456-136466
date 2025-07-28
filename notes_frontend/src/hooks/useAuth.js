import { useState, useEffect, useCallback } from 'react';
import { getMe, login, register } from '../services/api';

// PUBLIC_INTERFACE
export function useAuth() {
  /**
   * React hook to manage authentication (JWT token and user).
   * Persists token in localStorage.
   */
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(!!token);

  useEffect(() => {
    if (token) {
      setAuthLoading(true);
      getMe(token)
        .then(u => setUser(u))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        })
        .finally(() => setAuthLoading(false));
    }
  }, [token]);

  // PUBLIC_INTERFACE
  const loginUser = useCallback(async ({ email, password }) => {
    const data = await login({ email, password });
    setToken(data.access_token);
    localStorage.setItem('token', data.access_token);
    setUser(await getMe(data.access_token));
    return data.access_token;
  }, []);

  // PUBLIC_INTERFACE
  const registerUser = useCallback(async ({ email, password }) => {
    await register({ email, password });
    return await loginUser({ email, password });
  }, [loginUser]);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  return { token, user, authLoading, loginUser, logout, registerUser };
}
