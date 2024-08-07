/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ImgLogo from "@/assets/Medmania_logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { RoutesDirectory } from "@/routes/RoutesDirectory";
import Header from "@/components/Header";
import { RegisterServer } from "@/api/services";
import { useUserStore } from "@/store/userStore";

type FormRegister = {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  is_admin: boolean;
};

const formDataDefault = {
  username: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone:'',
  is_admin:false
};

export default function Register() {
  const [error, setError]=useState(false)
  const [formData, setFormData] = useState<FormRegister>(formDataDefault);
  const {setIsLogin,setUser} = useUserStore()
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await RegisterServer(formData )
    if(data && 'response' in data && (data.response as Response).ok){
      setError(false)
      setIsLogin(true)
      setUser(data.login)
      navigate(RoutesDirectory.HOME)
    }else{
      setError(true)

    }
  };

  return (
    <section className="flex flex-col  h-screen border-2 bg-[#F3F3F3] p-4 dark:bg-[#262B3C] dark:text-[#ffffff]">
      <Header/>
      <div className="logo-section flex justify-center items-center h-1/3 ">
        <div className="logo rounded-full overflow-hidden bg-black h-48 w-48">
          <img src={ImgLogo} alt="Logo" className="object-cover" />
        </div>
      </div>
      <div className="form-section h-2/3">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="input-container h-full flex flex-col justify-end items-center  gap-2 mb-6"
        >
          <div className="input-form flex flex-col  max-w-[380px] w-full rounded-lg ">
            <label htmlFor="" className="pl-1 font-semibold">
              Nombre:
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              type="text"
              className="border w-full p-2 rounded-lg "
            />
          </div>
          <div className="input-form flex flex-col  max-w-[380px] w-full rounded-lg ">
            <label htmlFor="" className="pl-1 font-semibold">
              Apellido:
            </label>
            <input
              required
              name="lastname"
              value={formData.lastname}
              onChange={(e) => handleChange(e)}
              type="text"
              className="border w-full p-2 rounded-lg "
            />
          </div>
          <div className="input-form flex flex-col  max-w-[380px] w-full rounded-lg ">
            <label htmlFor="" className="pl-1 font-semibold">
              Usuario:
            </label>
            <input
              required
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              type="text"
              className="border w-full p-2 rounded-lg "
            />
          </div>
          <div className="input-form flex flex-col  max-w-[380px] w-full rounded-lg ">
            <label htmlFor="" className="pl-1 font-semibold">
              Email:
            </label>
            <input
              required
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              type="text"
              className="border w-full p-2 rounded-lg "
            />
          </div>
          <div className="input-form flex flex-col  max-w-[380px] w-full rounded-lg ">
            <label htmlFor="" className="pl-1 font-semibold">
              Contraseña:
            </label>
            <input
              required
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              type="text"
              className="border w-full p-2 rounded-lg "
            />
          </div>
          <div className="input-form  flex flex-col max-w-[380px] w-full ">
            <label htmlFor="" className="pl-1 font-semibold">
              Confirmar Contraseña:
            </label>
            <input
              required
              name="confirmPassword"
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
              className=" max-w-[380px] w-full h-10 rounded-lg cursor-pointer bg-[#6AAA64] text-[#fff] font-semibold shadow-lg shadow-slate-500"
            >
              Enviar
            </button>
          </div>
          <div className="btn-form flex flex-col items-center justify-center w-full">
            <p className="text-sm">Ya tienes cuenta ..? Inicia sesion Aqui..</p>
            <Link
              to={RoutesDirectory.LOG_IN}
              className="max-w-[380px] w-full h-10 flex justify-center items-center rounded-lg cursor-pointer bg-[rgba(255,255,255,0.5)] text-[#000] dark:text-[#fff] shadow-lg shadow-slate-500 hover:bg-[#ceb02cb9] hover:text-[#fff]"
            >
              Iniciar Sesion
            </Link>
          </div>
          <div className="marginButton h-10"></div>
        </form>
      </div>
    </section>
  );
}

