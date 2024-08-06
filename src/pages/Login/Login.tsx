import React from "react";
import ImgLogo from "@/assets/Medmania_logo.jpeg";
import { Link } from "react-router-dom";
import { RoutesDirectory } from "@/routes/RoutesDirectory";
export default function Login() {
  return (
    <section className="flex flex-col h-screen border-2 bg-[#F3F3F3] p-4">
      <div className="logo-section flex justify-center items-center h-2/5 ">
        <div className="logo rounded-full overflow-hidden bg-black h-48 w-48">
          <img src={ImgLogo} alt="Logo" className="object-cover" />
        </div>
      </div>
      <div className="form-section h-3/5">
        <div className="input-container h-full flex flex-col justify-end items-center  gap-4 mb-6">
          <div className="input-form flex flex-col  max-w-[380px] w-full rounded-lg ">
            <label htmlFor="" className="p-1 font-semibold">Usuario:</label>
            <input type="text" className="border w-full p-2 rounded-lg " />
          </div>
          <div className="input-form  flex flex-col max-w-[380px] w-full ">
            <label htmlFor="" className="p-1 font-semibold">Contraseña:</label>
            <input type="password" className="border w-full p-2 rounded-lg "/>
          </div>
          <div className="btn-form flex justify-center w-full">
            <button className=" max-w-[380px] w-full h-10 rounded-lg cursor-pointer bg-[#6AAA64] text-[#fff] font-semibold shadow-lg shadow-slate-500">
              Iniciar Sesion
            </button>
          </div>
          <div className="btn-form flex flex-col items-center  justify-center w-full">
          <p className="text-sm">No tienes cuenta ? Registrate aqui.. </p>

            <Link to={RoutesDirectory.SIGN_IN} className=" max-w-[380px] w-full h-10 flex justify-center items-center rounded-lg cursor-pointer bg-[rgba(255,255,255,0.5)] text-[#000] shadow-lg shadow-slate-500 hover:bg-[#ceb02cb9] hover:text-[#fff]">
              Registrate
            </Link>
          </div>
          <div className="marginButton h-10"></div>
        </div>
      </div>
    </section>
  );
}
