import { create } from "zustand";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  adminSite: string[];
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logoutUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({ user, isAuthenticated: !!user, loading: false, error: null }),
  logoutUser: () =>
    set({ user: null, isAuthenticated: false, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
