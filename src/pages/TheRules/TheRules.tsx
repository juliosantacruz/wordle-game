import React  from "react";
import GuessRowSample from "@/components/GuessRowSample";
import { useGameStore } from "@/store/gameStore";
import {useUserStore} from  '@/store/userStore'
import { Link } from "react-router-dom";
import { RoutesDirectory } from "@/routes/RoutesDirectory";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";


export default function TheRules() {
  const { setTheRules } = useGameStore();
  const { setIsFirstTime } = useUserStore();
  const navigate = useNavigate()

  const handleTheRules = () => {
    setTheRules(false);
    setIsFirstTime();
    navigate(RoutesDirectory.HOME)
  };

  return (
    <section className="w-screen  flex flex-col justify-start items-center h-screen border-2 bg-[#F3F3F3] p-4 dark:bg-[#262B3C]">
      <Header/>

    <div className=" w-full max-w-[420px]    flex flex-col justify-between rounded-xl px-4 py-4 border bg-[#F3F3F3] dark:bg-[#262B3C] border-[#262B3C]  dark:border-[#F3F3F3] ">
      <div className="header text-center text-2xl my-3 md:text-[30px] font-semibold dark:text-[white] text-[black]">
        Cómo jugar
      </div>
      <div className="intro sm:text-lg md:text-[19px] dark:text-[white] text-[black]">
        <p className="sm:my-2 md:my-1">
          Adivina la palabra oculta en cinco intentos.
        </p>
        <p className="sm:my-2 md:my-1">
          Cada intento debe ser una palabra válida.
        </p>
        <p className="sm:my-2 md:my-1">
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </p>
      </div>
      <div className="examples">
        <p className="font-semibold sm:text-lg md:text-[19px] sm:mb-2 md:mb-3 dark:text-[white] text-[black]">
          Ejemplos
        </p>
        <GuessRowSample className="mx-4" guess="gatos" word="ggggg" isGuessed />

        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-3 dark:text-[white] text-[black]">
          La letra <strong>G</strong> está en la palabra y en la posición
          correcta.
        </p>
        <GuessRowSample className="mx-4" guess="vocal" word="cffff" isGuessed />

        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-3 w-full  dark:text-[white] text-[black]">
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
        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-3 dark:text-[white] text-[black]">
          La letra <strong>O</strong> no está en la palabra.
        </p>
        <p className="sm:text-lg md:text-[19px] sm:my-2 md:my-3 dark:text-[white] text-[black]">
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>

      </div>
      <div className="footer flex justify-center gap-2 my-3">
        <Link
          to={RoutesDirectory.LOG_IN}
          className="flex items-center justify-center text-white bg-[#6aaa64] w-[200px] h-[32px] rounded font-extrabold text-[16px]"

        >
          Iniciar Sesion
        </Link>

        <Link
          to={RoutesDirectory.SIGN_IN}
          className="flex items-center justify-center text-white bg-[#6469aa]   w-[180px] h-[32px] rounded font-extrabold text-[16px]"
        >
          Registrar..!
        </Link>
      </div>
      <div className="footer flex justify-center">
        <button
          onClick={handleTheRules}
          className="text-black bg-[#6469aa00] w-[256px] h-[32px] rounded font-extrabold text-[16px] dark:text-[#ffffff]"

        >
          Jugar como Invitado..!
        </button>
      </div>
    </div>
    </section>
  );
}
