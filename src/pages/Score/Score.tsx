import { getImageUrl, setUserScore } from "@/api/wordList";
import Header from "@/components/Header";
import { RoutesDirectory } from "@/routes/RoutesDirectory";
import { useGameStore } from "@/store/gameStore";
import { useUserStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Score() {
  const [score, setScore]=useState()
  const [totalScore, setTotalScore]=useState(0)
  const {  user } = useUserStore()
  const {

    gamesPlayed,
    wordData,
    lostGame,
    winGame,
  } = useGameStore();
  const navigate = useNavigate()

  useEffect(() => {
    const totalScoreArr = []
    const scoreData =async(token)=>{
      const data = await setUserScore(token)
      setScore(data)
      if(data!== undefined){
        data.map((elemento)=> totalScoreArr.push(elemento.score))
        const value = totalScoreArr.reduce((a,b)=>a+b)
        setTotalScore(value)
      }
    }
    scoreData(user.jwtTokens.access)
  }, [user.jwtTokens.access]);

  console.log(totalScore, score)


  const lePlay = () => {
    navigate(RoutesDirectory.HOME)

  };
  return (
    <section className="flex flex-col justify-start items-center h-screen border-2 bg-[#F3F3F3] p-4 dark:bg-[#262B3C] dark:text-[#ffffff]">
      <Header/>

    <div className="flex flex-col justify-center items-center w-[95%] h-[90%] max-w-[520px] max-h-[1018px] border border-black bg-[#F3F3F3] text-[#000000] dark:text-[#FFFFFF] dark:bg-[#262B3C] dark:border-[#939B9F] rounded-2xl">
      <h2 className="text-[35px] font-extrabold">Estadísticas</h2>

      <div className="score w-full flex justify-around my-2">
        <div className="stats flex flex-col items-center">
          <div className="value text-[35px] font-extrabold">{gamesPlayed}</div>
          <div className="title text-[21px]">Jugadas</div>
        </div>
        <div className="stats flex flex-col items-center">
          <div className="value text-[35px] font-extrabold">{totalScore}</div>
          <div className="title text-[21px]">Puntaje Total</div>
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



      <button
        onClick={lePlay}
        className="text-white bg-[#6AAA64] w-[263px] h-[50px] rounded font-extrabold text-[28px]"
      >
        Aceptar
      </button>
    </div>
    </section>

  );
}
