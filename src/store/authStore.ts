import { create } from 'zustand';
import type { User, BusinessProfile } from '../types';

interface AuthState {
  user: User | null;
  profile: BusinessProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: BusinessProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, profile: null, isAuthenticated: false }),
}));
