import { getImageUrl } from "@/api/wordList";
import { useGameStore } from "@/store/gameStore";
import React, { useEffect, useState } from "react";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default function Score() {
  const {
    setStats,
    gamesWon,
    gamesPlayed,
    wordData,
    lostGame,
    winGame,
    gameInit,
  } = useGameStore();
  const leTimer = true;
  const minutesTimer = 5;
  const secondsTimer = 60 * minutesTimer;
  const [timer, setTimer] = useState(secondsTimer);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout;
    if ((leTimer && lostGame) || (leTimer && winGame)) {
      setIsButtonDisabled(true);
      setTimer(5); // Reinicia el temporizador a 5 minutos
      interval = setInterval(() => {
        setTimer((prevTimer) => {
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

  const lePlay = () => {
    setStats(false);

    if (lostGame || winGame) {
      gameInit();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-[95%] h-[90%] max-w-[520px] max-h-[1018px] border border-black bg-[#F3F3F3] text-[#000000] dark:text-[#FFFFFF] dark:bg-[#262B3C] dark:border-[#939B9F] rounded-2xl">
      <h2 className="text-[35px] font-extrabold">Estadísticas</h2>

      <div className="score w-full flex justify-around my-2">
        <div className="stats flex flex-col items-center">
          <div className="value text-[35px] font-extrabold">{gamesPlayed}</div>
          <div className="title text-[21px]">Jugadas</div>
        </div>
        <div className="stats flex flex-col items-center">
          <div className="value text-[35px] font-extrabold">{gamesWon}</div>
          <div className="title text-[21px]">Victorias</div>
        </div>
      </div>
      {lostGame || winGame ? (
        <div className="nextGame flex flex-col items-center my-4 justify-center mx-8">
          <div className="title  text-[19px]">
            La palabra es:{" "}
            <span className="uppercase font-extrabold">{wordData.word}</span>

            <div className="word_data max-h-[320px] overflow-y-auto no-scrollbar">
            <p>{wordData.description}</p>
            {wordData.image ? (
              <img
                src={getImageUrl(wordData.image)}
                alt="word image"
                className="w-[340px] h-auto    mx-auto object-cover"
              />
            ) : null}

            </div>
            {wordData.url ? (
              <div className="w-full flex justify-center mt-4">
                <a
                  href={wordData.url}
                  target="_blank"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded inline-flex items-center "
                >
                  Ver Mas{" "}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="nextGame flex flex-col items-center my-4">
        <div className="title uppercase text-[19px]">siguiente palabra</div>
        <div className="timer font-bold text-[19px]">{formatTime(timer)}</div>
      </div>

      <button
        disabled={isButtonDisabled}
        onClick={lePlay}
        className="text-white bg-[#6AAA64] w-[263px] h-[50px] rounded font-extrabold text-[28px]"
      >
        Aceptar
      </button>
    </div>
  );
}
