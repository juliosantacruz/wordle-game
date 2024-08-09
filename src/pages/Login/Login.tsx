import React, { useState } from "react";
import ImgLogo from "@/assets/Medmania_logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { RoutesDirectory } from "@/routes/RoutesDirectory";
import Header from "@/components/Header";
import { LogInServer } from "@/api/services";
import { useUserStore } from "@/store/userStore";

type FormLogin = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const {setIsLogin,setUser} = useUserStore()
  const [error, setError] = useState(false)
  const [loading, setloading] = useState(false)

  const [formData, setFormData] = useState<FormLogin>({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("se envio", formData);
    setloading(true)
    const response = await LogInServer(formData)

    if(response ){
      setIsLogin(true)
      setUser(response)
      setError(false)
      setloading(false)
      navigate(RoutesDirectory.HOME)
    }

    if (response===undefined){

      setError(true)
      setloading(false)
    }



    console.log(response)
  };

  return (
    <section className="flex flex-col h-screen border-2 bg-[#F3F3F3] p-4 dark:bg-[#262B3C] dark:text-[#ffffff]">
      <Header/>
      <div className="logo-section flex justify-center items-center h-2/5 ">
        <div className="logo rounded-full overflow-hidden bg-black h-48 w-48">
          <img src={ImgLogo} alt="Logo" className="object-cover" />
        </div>
      </div>
      <div className="form-section h-3/5">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="input-container h-full flex flex-col justify-end items-center  gap-4 mb-6"
          >
          {
            loading&&
            <p className="text-sm text-blue-700">{"cargando....."}</p>
          }
          <div className="input-form flex flex-col  max-w-[380px] w-full rounded-lg ">
            <label htmlFor="" className="p-1 font-semibold">
              Usuario:
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              type="text"
              className="border w-full p-2 rounded-lg "
            />
          </div>
          <div className="input-form  flex flex-col max-w-[380px] w-full ">
            <label htmlFor="" className="p-1 font-semibold">
              Contraseña:
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              type="password"
              className="border w-full p-2 rounded-lg "
            />
          </div>
          {
        error&&
        <p className="text-sm text-red-700">{"-> Contraseña o usuario no coincide, por favor verifique"}</p>
      }
          <div className="btn-form flex justify-center w-full">
            <button
              type="submit"
              className=" max-w-[380px] w-full h-10 rounded-lg cursor-pointer bg-[#6AAA64] text-[#fff] font-semibold shadow-lg shadow-slate-500 hover:bg-[#6aaa64e7]"
            >
              Iniciar Sesion
            </button>
          </div>
          <div className="btn-form flex flex-col items-center  justify-center w-full">
            <p className="text-sm">No tienes cuenta ? Registrate aqui.. </p>

            <Link
              to={RoutesDirectory.SIGN_IN}
              className=" max-w-[380px] w-full h-10 flex justify-center items-center rounded-lg cursor-pointer bg-[rgba(255,255,255,0.5)] text-[#000] shadow-lg shadow-slate-500 hover:bg-[#ceb02cb9] hover:text-[#fff] dark:text-[#ffffff]"
            >
              Registrate
            </Link>
          </div>
          <div className="marginButton h-10"></div>
        </form>
      </div>
    </section>
  );
}
