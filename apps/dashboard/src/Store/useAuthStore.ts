import { create } from "zustand";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  logoutUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  logoutUser: () => set({ user: null, loading: false }),
  setLoading: (loading) => set({ loading }),
}));
