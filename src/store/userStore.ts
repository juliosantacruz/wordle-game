/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserData = {
  username: string;
  email: string;
  userId: string | number;
};

type UserStore = {
  theRules: boolean;
  setTheRules: (value: boolean) => any;

  user: UserData;
  setUser: (user) => void;

  isLogin: boolean;
  setIsLogin: (user) => void;
  setLogout: () => void;

  isFirstTime: boolean;
  setIsFirstTime: () => void;

  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      theRules: false,
      setTheRules: (value: boolean) =>
        set((state) => ({
          ...state,
          theRules: value,
        })),

      user: {
        userId: "",
        username: "",
        email: "",
      },
      setUser: (user: any) => set(() => ({ user: user })),

      isLogin: false,
      setIsLogin: (value: boolean) =>
        set((state) => ({ ...state, isLogin: value })),
      setLogout: () =>
        set((state) => ({
          ...state,
          user: {
            userId: "",
            username: "",
            email: "",
          },
          isLogin: false,
        })),

      isFirstTime: true,
      setIsFirstTime: () =>
        set((state) => ({
          ...state,
          isFirstTime: false,
        })),

      darkMode: false,
      setDarkMode(value) {
        set((state) => ({
          ...state,
          darkMode: value,
        }));
      },
    }),
    {
      name: "wordleUser",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
