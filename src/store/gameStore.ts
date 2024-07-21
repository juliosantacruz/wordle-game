/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
// import wordsList from "@/mock/wordsList.json";
import { createJSONStorage, persist } from "zustand/middleware";
import { getWordList } from "@/api/wordList";
type WordData = {
  word: string;
  description: string;
  url: string;
  image: string;
  category: string;
};
type UxStore = {
  isFirstTime: boolean;
  setIsFirstTime: () => void;
};
type Store = {
  theRules: boolean;
  setTheRules: (value: boolean) => any;
  stats: boolean;
  setStats: (value: boolean) => void;

  wordsList: any[];
  wordData: WordData;
  isLoading: boolean;
  word: string;
  guessArray: string[];
  currentGuess: number;
  gamesWon: number;
  gamesPlayed: number;
  lostGame: boolean;
  winGame: boolean;
  win: { win: boolean };
  lost: { lost: boolean };

  keypadGuess: {
    allGuesses: string[];
    setAllGuesses: () => void;
    inexactGuesses: string[];
    setInexactGuesses: () => void;
    exactGuesses: string[];
    setExactGuesses: () => void;
    resetKeyboard: () => void;
  };

  gameInit: () => void;
  fetchData: () => void;
  submitGuess: () => void;

  handleKeyup: (e: KeyboardEvent) => void;
};

export const useGameStore = create<Store>()((set, get) => ({
  // Ux States
  theRules: false,
  setTheRules: (value: boolean) =>
    set((state) => ({
      ...state,
      theRules: value,
    })),
  stats: false,
  setStats: (value: boolean) =>
    set((state) => ({
      ...state,
      stats: value,
    })),

  fetchData: async () => {
    set({ isLoading: true });

    try {
      const data = await getWordList();
      set((state) => ({
        ...state,
        wordsList: data,
        wordData:
        data[Math.round(Math.random() * data.length)],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
      get().gameInit();
    }
  },

  // Game State
  wordsList: [],
  isLoading: false,
  wordData: undefined,
  word: "",

  guessArray: ["", "", "", "", ""],
  currentGuess: 0,
  gamesWon: 0,
  gamesPlayed: 0,
  lostGame: false,
  winGame: false,
  get numberOfGuesses() {
    return get().guessArray.length;
  },

  win: {
    get win() {
      const isWin = get().guessArray[get().currentGuess - 1] === get().word;
      if (isWin) {
        set((state) => ({
          ...state,
          gamesWon: state.gamesWon + 1,
          gamesPlayed: state.gamesPlayed + 1,
          winGame: true,
          stats: true,
        }));
      }
      return isWin;
    },
  },

  lost: {
    get lost() {
      const isLost = get().currentGuess === 5 ? true : false;
      if (isLost) {
        set((state) => ({
          ...state,
          gamesPlayed: state.gamesPlayed + 1,
          lostGame: true,
          stats: true,
        }));
      }
      return isLost;
    },
  },

  keypadGuess: {
    allGuesses: [""],
    setAllGuesses: () =>
      set((state) => ({
        ...state,
        keypadGuess: {
          ...state.keypadGuess,
          allGuesses: state.guessArray.join("").split(""),
        },
      })),
    inexactGuesses: [""],
    setInexactGuesses() {
      const inexactLetter = get()
        .word.split("")
        .filter((letter) => get().keypadGuess.allGuesses.includes(letter));
      set((state) => ({
        ...state,
        keypadGuess: {
          ...state.keypadGuess,
          inexactGuesses: inexactLetter,
        },
      }));
    },
    exactGuesses: [""],
    setExactGuesses: () => {
      const wordGame = get().word.split("");
      const exactLetters = wordGame.filter((letter, i) => {
        return get()
          .guessArray.slice(0, get().currentGuess - 1)
          .map((word) => word[i])
          .includes(letter);
      });
      set((state) => ({
        ...state,
        keypadGuess: {
          ...state.keypadGuess,
          exactGuesses: [...get().keypadGuess.exactGuesses, ...exactLetters],
        },
      }));
    },
    resetKeyboard: () => {
      set((state) => ({
        ...state,
        keypadGuess: {
          ...state.keypadGuess,
          allGuesses: [""],
          inexactGuesses: [""],
          exactGuesses: [""],
        },
      }));
    },
  },
  gameInit: () =>
    set((state) => ({
      ...state,
      word: state.wordData.word.toLowerCase(),
      guessArray: ["", "", "", "", ""],
      currentGuess: 0,
      lostGame: false,
      winGame: false,
      keypadGuess: {
        ...state.keypadGuess,
        allGuesses: [""],
        inexactGuesses: [""],
        exactGuesses: [""],
      },
    })),
  submitGuess: () => {
    console.log("submit");
    if (get().guessArray[get().currentGuess].length === get().word.length) {
      get().keypadGuess.setAllGuesses();
      get().keypadGuess.setInexactGuesses();
      get().keypadGuess.setExactGuesses();
      set((state) => ({
        ...state,
        currentGuess: state.currentGuess + 1,
      }));
      console.log("gano?", get().win.win);
      console.log("perdio?", get().lost.lost);
    }
  },

  handleKeyup: (e) => {
    if (get().winGame || get().lostGame) {
      return;
    }
    if (e.key === "Enter") {
      get().submitGuess();
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      const lastCharIndex = get().guessArray[get().currentGuess].length - 1;
      const leGuess = get().guessArray[get().currentGuess];
      const updatedGuess = leGuess.slice(0, lastCharIndex);
      set((state) => ({
        ...state,
        guessArray: state.guessArray.map((guess, index) => {
          return index === state.currentGuess ? updatedGuess : guess;
        }),
      }));

      return;
    }
    if (
      get().guessArray[get().currentGuess].length < get().word.length &&
      e.key.match(/^[A-z]$/)
    ) {
      const stringTest = (get().guessArray[get().currentGuess] +=
        e.key.toLowerCase());

      set((state) => ({
        ...state,
        guessArray: state.guessArray.map((guess, index) => {
          return index === state.currentGuess ? stringTest : guess;
        }),
      }));
    }
  },
}));

export const useWordleStore = create<UxStore>()(
  persist(
    (set) => ({
      isFirstTime: true,
      setIsFirstTime: () =>
        set((state) => ({
          ...state,
          isFirstTime: false,
        })),
    }),
    {
      name: "wordleUX",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
