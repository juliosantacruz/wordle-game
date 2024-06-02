import "./App.css";
import Header from "@/components/Header";
import Keyboard from "@/components/Keyboard";
import GuessRow from "@/components/GuessRow";
import { useEffect, useState } from "react";
import TheRules from "./components/TheRules";
import Stats from "@/components/Stats";
import { useGameStore, useWordleStore } from "./store/gameStore";
import AsideModal from "./components/AsideModal";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { theRules, stats, gameInit, handleKeyup } = useGameStore();
  const {isFirstTime} = useWordleStore()

  const currentWord = useGameStore((state) => state.word);
  const guessesArray = useGameStore((state) => state.guessArray);

  const currenGuess = useGameStore((state) => state.currentGuess);

  useEffect(() => {
    gameInit();
    window.addEventListener("keydown", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeyup);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center  bg-[#F9F9F9] dark:bg-[#262B3C]">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-col items-center m-[50px]">
          {guessesArray.map((_, index) => {
            return (
              <GuessRow
                key={"guess" + index}
                guess={guessesArray[index]}
                word={currentWord}
                isGuessed={index < currenGuess}
              />
            );
          })}
        </div>
        <p>{currentWord}</p>
        <p>{JSON.stringify(guessesArray)}</p>
        <Keyboard darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      {theRules||isFirstTime ? (
        <AsideModal children={<TheRules />} openModal={theRules||isFirstTime} />
      ) : null}
      {stats ? <AsideModal children={<Stats />} openModal={stats} /> : null}
    </>
  );
}

export default App;
