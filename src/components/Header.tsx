import React, { useEffect, useState } from "react";
import lightIcon from "@/assets/icon/light_Sky Switch - Light.png";
// import lightChart from "@/assets/icon/light_Chart_duotone_line.png";

import darkIcon from "@/assets/icon/dark_Sky Switch - Dark.png";
// import darkChart from "@/assets/icon/dark_Chart_fill.png";
// import { useGameStore } from "@/store/gameStore";
import darkMenu from "@/assets/icon/menuBlack.svg";
import lightMenu from "@/assets/icon/menuLight.svg";
import Menu from "./Menu";

type Props = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};
export default function Header({ darkMode, setDarkMode }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  // const { setTheRules, setStats } = useGameStore();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };


  useEffect(() => {
    if (darkMode) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <nav className="flex items-center justify-between w-full max-w-[638px] sm:h-[64px] md:h-[74px] mb-2 rounded-[15px] bg-[#F3F3F3] dark:bg-gray-800 p-4 ">
        <div className="flex justify-center  ">
          <button onClick={() => setDarkMode(!darkMode)}>
            {" "}
            <img
              src={darkMode ? darkIcon : lightIcon}
              className="h-[22px]"
              alt="IconDarkMode"
            />
          </button>
        </div>

        <div className="sm:text-xl md:text-2xl lg:sm:text-4xl  font-bold  font text-[#202537] dark:text-[#DADCE0] ">
          MEDMania
        </div>

        <div className="flex justify-center  ">
          <div className="flex items-center gap-2 ">
            <button onClick={handleMenu}>
              <img
                src={darkMode ? darkMenu : lightMenu}
                className="h-[22px]"
                alt="IconDarkMode"
              />
            </button>
          </div>
        </div>
        <Menu showMenu={showMenu} />
      </nav>
    </>
  );
}
