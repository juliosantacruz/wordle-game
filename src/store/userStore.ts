/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type UserData = {
  username:string
  email:string
}

type UserStore={
  user:UserData
  isFirstTime: boolean;
  setIsFirstTime: () => void;

  darkMode:boolean;
  setDarkMode: (value: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist((set,get)=>({
    user:{
      username:'',
      email:''
    },
    isFirstTime: true,
    setIsFirstTime: () =>
      set((state) => ({
        ...state,
        isFirstTime: false,
      })),

    darkMode:false,
    setDarkMode(value) {
      set((state)=>({
        ...state,
        darkMode:value
      }))
    },
}),{
  name:'wordleUser',
  storage: createJSONStorage(()=> localStorage)
}))
