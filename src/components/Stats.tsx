import { useGameStore } from "@/store/gameStore";
import React, { useEffect, useState } from "react";

const formatTime = (seconds:number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};


export default function Stats() {
  const { setStats, gamesWon, gamesPlayed, word, lostGame, winGame, gameInit } = useGameStore();

  const minutesTimer=5
  const secondsTimer = 60 * minutesTimer
  const [timer, setTimer] = useState(secondsTimer);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    let interval:string|number|NodeJS.Timeout;
    if (lostGame || winGame) {
      setIsButtonDisabled(true);
      setTimer(300); // Reinicia el temporizador a 5 minutos
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setIsButtonDisabled(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }

    return () => clearInterval(interval);
  }, [lostGame, winGame]);

  const lePlay =()=>{
    setStats(false)

    if(lostGame || winGame){
      gameInit()
    }

  }
  return (
    <div className="flex flex-col justify-center items-center w-[540px] h-[480px] border border-black bg-[#F3F3F3] text-[#000000] dark:text-[#FFFFFF] dark:bg-[#262B3C] dark:border-[#939B9F] rounded-2xl">
      <h2 className="text-[35px] font-extrabold">Estadísticas</h2>

      <div className="score w-full flex justify-around my-8">
        <div className="stats flex flex-col items-center">
          <div className="value text-[35px] font-extrabold">{gamesPlayed}</div>
          <div className="title text-[21px]">Jugadas</div>
        </div>
        <div className="stats flex flex-col items-center">
          <div className="value text-[35px] font-extrabold">{gamesWon}</div>
          <div className="title text-[21px]">Victorias</div>
        </div>
      </div>
      {lostGame ? (
        <div className="nextGame flex flex-col items-center my-4">
          <div className="title uppercase text-[19px]">
            La palabra era:{" "}
            <span className="uppercase font-extrabold">{word}</span>
          </div>
        </div>
      ) : null}

      <div className="nextGame flex flex-col items-center my-8">
        <div className="title uppercase text-[19px]">siguiente palabra</div>
        <div className="timer font-bold text-[19px]">{formatTime(timer)}</div>
      </div>

      <button
      disabled={isButtonDisabled}
        onClick={lePlay }
        className="text-white bg-[#6AAA64] w-[263px] h-[50px] rounded font-extrabold text-[28px]"
      >
        Aceptar
      </button>
    </div>
  );
}
