import "../../App.css";
import Header from "@/components/Header";
import Keyboard from "@/components/Keyboard";
import GuessRow from "@/components/GuessRow";
import { useEffect, useState } from "react";
import Stats from "@/components/Stats";
import { useGameStore } from "@/store/gameStore";
import { useUserStore } from "@/store/userStore";

import AsideModal from "@/components/AsideModal";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "@/routes/RoutesDirectory";
// import ReactGA from 'react-ga4';


function Wordle() {
  const [darkMode, setDarkMode] = useState(false);
  const { stats, handleKeyup, fetchData } = useGameStore();
  const { isFirstTime } = useUserStore();
  const currentWord = useGameStore((state) => state.word);
  const guessesArray = useGameStore((state) => state.guessArray);
  const currenGuess = useGameStore((state) => state.currentGuess);
  const isDev = import.meta.env.VITE_IS_DEV==='true'?true:false;
  const navigate = useNavigate()

  useEffect(()=>{

    if(isFirstTime){
      navigate(RoutesDirectory.THE_RULES)
    }
  })

  useEffect(() => {
    fetchData();

    // gameInit();
    window.addEventListener("keydown", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeyup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      <div className="max-w-[520px] h-screen w-screen mx-auto flex flex-col items-center justify-between bg-[#F9F9F9] dark:bg-[#262B3C]">
        <Header   />
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
        {isDev ? (
          <>
            <p>{currentWord}</p>
            <p>{JSON.stringify(guessesArray)}</p>
          </>
        ): null}

        <Keyboard darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>


      {stats ? <AsideModal children={<Stats />} openModal={stats} /> : null}
    </>
  );
}

export default Wordle;

