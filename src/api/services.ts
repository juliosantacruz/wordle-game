/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = "https://mini-wordle-server.vercel.app/";
import { jwtDecode } from "jwt-decode";

type LoginData = {
  username: string;
  password: string;
};

export const LogInServer = async (userData: LoginData) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    username: userData.username,
    password: userData.password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch( `${baseUrl}user/api/login/`, requestOptions as any)
  .catch((error) => console.log("error", error));
  if ((response as Response).status === 200) {
    const rawData = await (response as Response).json();
    const jwtData: any = jwtDecode(rawData.access);
    const userData = {
      userId: jwtData.user_id,
      email: jwtData.username,
      username: jwtData.username,
      jwtTokens: { access: rawData.access, refresh: rawData.refresh },
    };
    return userData;
  }

  // return rawData;
};

type RegisterData = {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  is_admin: boolean;
};

type RegisterResponse =
  | void
  | Response
  | {
      response: void | Response;
      login: { userId: any; email: any; username: any };
    };

export const RegisterServer = async (
  userData: RegisterData
): Promise<RegisterResponse> => {
  const loginData = {
    username: userData.username,
    password: userData.password,
  };
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    username: userData.username,
    password: userData.password,
    first_name: userData.name,
    last_name: userData.lastname,
    email: userData.email,
    user_profile: {
      phone: userData.phone || "234234234234",
      is_admin: userData.is_admin || false,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${baseUrl}user/api/register/`,
    requestOptions as any
  )
    .then((response) => response)
    .catch((error) => console.log("error", error));

  if ((response as Response).ok) {
    const login = await LogInServer(loginData);
    return { response, login };
  }

  return response;
};
