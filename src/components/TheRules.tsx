import React from "react";
import GuessRowSample from "@/components/GuessRowSample";
import { useGameStore, useWordleStore } from "@/store/gameStore";

export default function TheRules() {
  const {setTheRules} = useGameStore()
  const {setIsFirstTime} = useWordleStore()

  const handleTheRules=()=>{
    setTheRules(false)
    setIsFirstTime()
  }

  return (
    <div className="w-full h-full max-w-[546px] max-h-[1018px] flex flex-col justify-between rounded-xl px-8 py-6 border bg-[#F3F3F3] dark:bg-[#262B3C] border-[#262B3C]  dark:border-[#F3F3F3] ">
      <div className="header text-center text-2xl md:text-[35px] font-semibold       dark:text-[white] text-[black]">
        Cómo jugar
      </div>
      <div className="intro sm:text-lg md:text-[19px] dark:text-[white] text-[black]">
        <p className="sm:my-2 md:my-4">Adivina la palabra oculta en cinco intentos.</p>
        <p className="sm:my-2 md:my-4">
          Cada intento debe ser una palabra válida de 5 letras.
        </p>
        <p className="sm:my-2 md:my-4">
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </p>
      </div>
      <div className="examples">
        <p className="font-semibold sm:text-lg md:text-[19px] sm:mb-2 md:mb-6 dark:text-[white] text-[black]">
          Ejemplos
        </p>
        <GuessRowSample className="mx-4" guess="gatos" word="ggggg" isGuessed />

        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-6 dark:text-[white] text-[black]">
          La letra <strong>G</strong> está en la palabra y en la posición
          correcta.
        </p>
        <GuessRowSample className="mx-4" guess="vocal" word="cffff" isGuessed />

        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-6 w-full text-nowrap dark:text-[white] text-[black]">
          La letra <strong>C</strong> está en la palabra pero en la posición
          incorrecta.
        </p>
        <GuessRowSample
          className="mx-4"
          guess="canto"
          word="gggog"
          isGuessed
          test
        />
        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-6 dark:text-[white] text-[black]">
          La letra <strong>O</strong> no está en la palabra.
        </p>
        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-6 dark:text-[white] text-[black]">
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>
        <p className="text-center sm:text-lg md:text-[19px] sm:my-2 md:my-6  dark:text-[white] text-[black]">
          ¡Una palabra nueva cada 5 minutos!
        </p>
      </div>
      <div className="footer flex justify-center">
        <button
        onClick={handleTheRules}
        className="text-white bg-[#6AAA64] w-[256px] h-[44px] rounded font-extrabold text-[28px]">
          !JUGAR¡
        </button>
      </div>
    </div>
  );
}
