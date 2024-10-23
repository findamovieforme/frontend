// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  idToken: string | null;
  name: string | null;
  setTokens: (accessToken: string, idToken: string, name: string) => void;
  setName: (name: string) => void;
  clearTokens: () => void;
  logout: () => void;
  loading: boolean;
  rehydrate: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      accessToken: null,
      idToken: null,
      name: null,
      loading: true,


      // Set tokens and name together
      setTokens: (accessToken, idToken, name) => set({ accessToken, idToken, name }),

      // Set only the name
      setName: (name) => set({ name }),
      rehydrate: () => {
        const state = get();
        if (state.name !== undefined) set({ loading: false });
      },
      // Clear tokens and name
      clearTokens: () => set({ accessToken: null, idToken: null, name: null }),

      // Logout function that clears all user data from Zustand and localStorage
      logout: () => {
        set({ accessToken: null, idToken: null, name: null });
        localStorage.removeItem('auth-storage'); // Remove persisted state
      },
    }),
    {
      name: 'auth-storage', // Key in `localStorage`
      onRehydrateStorage: () => (state) => {
        if (state) state.rehydrate();
      },

    }
  )
);
