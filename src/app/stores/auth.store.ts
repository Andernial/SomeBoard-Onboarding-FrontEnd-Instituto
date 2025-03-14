import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type authStore = {
 token?: string;
 addToken: (token: string) => void;
 removeToken: () => void;
};

export const useAuthStorage = create<authStore>()(
 persist(
  (set, _get) => ({
   token: undefined,
   addToken: (token: string) =>
    set(() => ({
     token,
    })),
   removeToken: () => set(() => ({ token: undefined })),
  }),
  {
   name: 'auth-storage',
   storage: createJSONStorage(() => localStorage),
  },
 ),
);
