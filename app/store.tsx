// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Amplify } from "aws-amplify";
import { AmplifyConfig } from "./amplify-config";
import { decodeJWT, signOut } from '@aws-amplify/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Amplify.configure(AmplifyConfig as any);

interface AuthState {
  accessToken: string | null;
  idToken: string | null;
  name: string | null;
  setTokens: (accessToken: string, idToken: string) => void;
  setName: (name: string) => void;
  clearTokens: () => void;
  logout: () => void;
  rehydrate: () => void;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

const getName = (idToken: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodedJWT: any = decodeJWT(idToken);
  return decodedJWT['payload']['cognito:username'];
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      accessToken: null,
      idToken: null,
      name: null,
      isAuthenticated: false,
      isHydrated: false,
      setTokens: (accessToken, idToken,) => {
        set({ accessToken, idToken, name: getName(idToken), isAuthenticated: true })
      },
      setName: (name) => set({ name }),
      rehydrate: () => get(),
      clearTokens: () => set({ accessToken: null, idToken: null, name: null }),
      logout: () => {
        set({ accessToken: null, idToken: null, name: null, isAuthenticated: false });
        signOut();
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.rehydrate();
          state.isHydrated = true;  // Set hydration status
          if (state.idToken) {
            state.name = getName(state.idToken);
          }

        }
      },
    }
  )
);
