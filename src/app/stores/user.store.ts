import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type userStorage = {
 id: string;
 name: string;
 addUser: (user: { name: string; id: string }) => void;
 removeUser: () => void;
};

export const useUserStorage = create<userStorage>()(
 persist(
  (set, _get) => ({
   id: '',
   name: '',
   addUser: (user: { name: string; id: string }) =>
    set(() => ({
     name: user.name,
     id: user.id,
    })),
   removeUser: () => set(() => ({ name: '', id: '' })),
  }),
  {
   name: 'user-storage', 
   storage: createJSONStorage(() => localStorage), 
  },
 ),
);
