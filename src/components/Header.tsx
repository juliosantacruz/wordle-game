import React, { useEffect } from "react";
import lightIcon from "@/assets/icon/light_Sky Switch - Light.png";
import lightChart from "@/assets/icon/light_Chart_duotone_line.png";
import lightQuestion from "@/assets/icon/light_question-circle-fill.png";

import darkIcon from "@/assets/icon/dark_Sky Switch - Dark.png";
import darkChart from "@/assets/icon/dark_Chart_fill.png";
import darkQuestion from "@/assets/icon/dark_question-circle-fill.png";
import { useGameStore } from "@/store/gameStore";
import darkMenu from '@/assets/icon/menuBlack.svg'
import lightMenu from '@/assets/icon/menuLight.svg'


type Props={
  darkMode:boolean,
  setDarkMode:(value:boolean)=>void,
}
export default function Header({darkMode, setDarkMode }:Props) {
  const { setTheRules,setStats} = useGameStore()

  const showStats=()=>{
    setStats(true)

  }

  const showTheRules=()=>{
    setTheRules(true)
  }

  useEffect(()=>{
    if(darkMode){
      document.querySelector('html')?.classList.add('dark')
    }else{
      document.querySelector('html')?.classList.remove('dark')

    }
  },[darkMode])
  return (
    <nav className="flex items-center justify-between w-full max-w-[638px] sm:h-[64px] md:h-[74px] mb-2 rounded-[15px] bg-[#F3F3F3] dark:bg-gray-800 p-4 ">
      <div className="w-[70px]">
        <button onClick={showTheRules}>
          <img
            src={darkMode ? darkQuestion : lightQuestion}
            className="h-[22px]"
            alt="Question Icon"
          />
        </button>
      </div>

      <div className="sm:text-xl md:text-2xl lg:sm:text-4xl  font-bold  font text-[#202537] dark:text-[#DADCE0] ">MEDMania</div>

      <div className="w-[70px]">
        <div className="flex items-center gap-2 ">
          {/* <button onClick={showStats}>
            {" "}
            <img
              src={darkMode ? darkChart : lightChart}
              className="h-[22px]"
              alt="Chart Icon"
            />
          </button>
          <button onClick={()=>setDarkMode(!darkMode)}>
            {" "}
            <img
              src={darkMode ? darkIcon : lightIcon}
              className="h-[22px]"
              alt="IconDarkMode"
            />
          </button> */}
          <button >

          <img
              src={darkMode ? darkMenu : lightMenu}
              className="h-[22px]"
              alt="IconDarkMode"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
