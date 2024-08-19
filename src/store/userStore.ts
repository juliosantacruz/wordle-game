/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserData = {
  username: string;
  email: string;
  userId: string | number;
  profileId: string | number,
  jwtTokens:{access:string, refresh:string}
};

type UserStore = {
  stats: boolean;
  setStats: (value: boolean) => void;

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
      stats: false,
      setStats: (value: boolean) =>
        set((state) => ({
          ...state,
          stats: value,
        })),
      theRules: false,
      setTheRules: (value: boolean) =>
        set((state) => ({
          ...state,
          theRules: value,
        })),

      user: {
        userId: "",
        profileId:'',
        username: "",
        email: "",
        jwtTokens:{access:'', refresh:''}
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
            profileId:'',
            username: "",
            email: "",
            jwtTokens:{access:'', refresh:''}
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
