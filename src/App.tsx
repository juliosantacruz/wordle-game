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
  const { theRules, stats, gameInit, handleKeyup, fetchData, isLoading } =
    useGameStore();
  const { isFirstTime } = useWordleStore();

  const currentWord = useGameStore((state) => state.word);
  const guessesArray = useGameStore((state) => state.guessArray);

  const currenGuess = useGameStore((state) => state.currentGuess);

  useEffect(() => {
    fetchData();

    // gameInit();
    window.addEventListener("keydown", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeyup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.log(isLoading);

  return (
    <>

        <>
          <div className="max-w-[520px] h-screen w-screen mx-auto flex flex-col items-center justify-between bg-[#F9F9F9] dark:bg-[#262B3C]">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="w-full flex flex-col items-center my-[50px] px-2   ">
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

          {theRules || isFirstTime ? (
            <AsideModal
              children={<TheRules />}
              openModal={theRules || isFirstTime}
            />
          ) : null}
          {stats ? <AsideModal children={<Stats />} openModal={stats} /> : null}
        </>

    </>
  );
}

export default App;
