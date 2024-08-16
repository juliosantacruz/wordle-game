import React from "react";
import { Link } from "react-router-dom";
import jsLogo from "@/assets/logo_450x200_azul_trans.png";
import darkQuestion from "@/assets/icon/dark_question-circle-fill.png";
import lightQuestion from "@/assets/icon/light_question-circle-fill.png";
import lightChart from "@/assets/icon/light_Chart_duotone_line.png";
import darkChart from "@/assets/icon/dark_Chart_fill.png";
import lightUser from "@/assets/icon/lightUserIcon.svg";
import darkUser from "@/assets/icon/darkUserIcon.svg";
import darkLogin from "@/assets/icon/darkLoginIcon.svg";
import lightLogin from "@/assets/icon/lightLoginIcon.svg";
import darkLogout from "@/assets/icon/darkLogoutIcon.svg";
import lightLogout from "@/assets/icon/lightLogoutIcon.svg";
import darkRegister from "@/assets/icon/darkRegisterIcon.svg";
import lightRegister from "@/assets/icon/lightRegisterIcon.svg";

import { RoutesDirectory } from "@/routes/RoutesDirectory";
import { useUserStore } from "@/store/userStore";

export default function Menu({ showMenu }: { showMenu: boolean }) {
  const { darkMode, isLogin, setLogout } = useUserStore();

  return (
    <>
      <ul
        className={`${
          showMenu ? "" : "hidden"
        } flex flex-col max-w-[280px] w-8/12 bg-[#F3F3F3] dark:bg-[#262B3C]  border rounded-lg p-2 absolute z-30 top-[60px] right-4 sm:right-[140px] md:right-[30%]`}
      >
        <Link to={RoutesDirectory.THE_RULES}>
          <li className="flex pl-2 py-2 cursor-pointer hover:bg-slate-300 hover:rounded-md">
            <img
              src={darkMode ? darkQuestion : lightQuestion}
              className="h-[22px]"
              alt="Question Icon"
            />
            <span className="ml-2 dark:text-[white] text-[black]">
              Las Reglas
            </span>
          </li>
        </Link>

        {!isLogin ? (
          <>
            <Link to={RoutesDirectory.LOG_IN}>
              <li className="flex pl-2 py-2 cursor-pointer hover:bg-slate-300 hover:rounded-md">
                <img
                  src={darkMode ? darkLogin : lightLogin}
                  className="h-[22px]"
                  alt="Question Icon"
                />
                <span className="ml-2 dark:text-[white] text-[black]">
                  Iniciar Sesion
                </span>
              </li>
            </Link>
            <Link to={RoutesDirectory.SIGN_IN}>
              <li className="flex pl-2 py-2 cursor-pointer hover:bg-slate-300 hover:rounded-md">
                <img
                  src={darkMode ? darkRegister : lightRegister}
                  className="h-[22px]"
                  alt="Question Icon"
                />
                <span className="ml-2 dark:text-[white] text-[black]">
                  Registrate
                </span>
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to={RoutesDirectory.PROFILE}>
              <li className="flex pl-2 py-2 cursor-pointer hover:bg-slate-300 hover:rounded-md">
                <img
                  src={darkMode ? darkUser : lightUser}
                  className="h-[22px]"
                  alt="Question Icon"
                />
                <span className="ml-2 dark:text-[white] text-[black]">
                  Perfil
                </span>
              </li>
            </Link>
            <Link to={RoutesDirectory.SCORE}>
              <li className="flex pl-2 py-2 cursor-pointer hover:bg-slate-300 hover:rounded-md ">
                <img
                  src={darkMode ? darkChart : lightChart}
                  className="h-[22px]"
                  alt="Question Icon"
                />
                <span className="ml-2 dark:text-[white] text-[black]">
                  Puntaje
                </span>
              </li>
            </Link>
            <button onClick={setLogout}>
              <li className="flex pl-2 py-2 cursor-pointer hover:bg-slate-300 hover:rounded-md">
                <img
                  src={darkMode ? darkLogout : lightLogout}
                  className="h-[22px]"
                  alt="Question Icon"
                />
                <span className="ml-2 dark:text-[white] text-[black]">
                  Cerrar Sesion
                </span>
              </li>
            </button>
          </>
        )}

        <Link to={"https://juliosantacruz.dev"} target="_blank">
          <li className="flex justify-center items-center  cursor-pointer hover:bg-slate-300 hover:rounded-md">
            <div className="dark:bg-[#dadada] rounded-md p-1">
              <img src={jsLogo} alt="js logo" className="h-[42px]" />
            </div>
          </li>
        </Link>
      </ul>
    </>
  );
}
