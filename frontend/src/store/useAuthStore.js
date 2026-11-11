import { create } from 'zustand';
import { setAuthToken } from '../services/api';
import {
  registerUser,
  loginUser,
  fetchCurrentUser,
} from '../services/authService';
import {
  saveToken,
  getStoredToken,
  removeStoredToken,
} from '../utils/tokenStorage';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitializing: true,
  isLoading: false,
  error: null,
  lastVerifiedAt: null,

  clearError: () => set({ error: null }),

  initializeAuth: async () => {
    set({ isInitializing: true, error: null });
    try {
      const storedToken = await getStoredToken();
      if (!storedToken) {
        setAuthToken(null);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isInitializing: false,
        });
        return null;
      }

      setAuthToken(storedToken);
      const data = await fetchCurrentUser();
      set({
        user: data.user,
        token: storedToken,
        isAuthenticated: true,
        isInitializing: false,
        lastVerifiedAt: new Date().toISOString(),
      });
      return data.user;
    } catch (error) {
      await removeStoredToken();
      setAuthToken(null);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isInitializing: false,
      });
      return null;
    }
  },

  register: async ({ username, email, password, confirmPassword }) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerUser({
        username,
        email,
        password,
        confirmPassword,
      });
      await saveToken(data.token);
      setAuthToken(data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        lastVerifiedAt: new Date().toISOString(),
      });
      return { success: true, user: data.user };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Registration failed.',
      });
      return { success: false, message: error.message };
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginUser({ email, password });
      await saveToken(data.token);
      setAuthToken(data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        lastVerifiedAt: new Date().toISOString(),
      });
      return { success: true, user: data.user };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Login failed.',
      });
      return { success: false, message: error.message };
    }
  },

  refreshProfile: async () => {
    const currentToken = get().token;
    if (!currentToken) {
      return { success: false, message: 'No active session token.' };
    }
    set({ isLoading: true, error: null });
    try {
      const data = await fetchCurrentUser();
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        lastVerifiedAt: new Date().toISOString(),
      });
      return { success: true, user: data.user };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      return { success: false, message: error.message };
    }
  },

  logout: async () => {
    await removeStoredToken();
    setAuthToken(null);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      lastVerifiedAt: null,
    });
  },
}));

export default useAuthStore;
