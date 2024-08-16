// import {lazy} from 'react'
import { useRoutes } from "react-router-dom";
// import Inicio from "@/pages/Inicio/Inicio";
import Register from "@/pages/Register/Register";
import Wordle from "@/pages/Wordle/Wordle";
import Login from "@/pages/Login/Login";
import { RoutesDirectory } from "./RoutesDirectory";
import NotFound from "@/pages/NotFound/NotFound";
import TheRules from "@/pages/TheRules/TheRules";
import Score from "@/pages/Score/Score";
import Profile from "@/pages/Profile/Profile";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: RoutesDirectory.LOG_IN,
      element: <Login />,
    },
    {
      path: RoutesDirectory.SIGN_IN,
      element: <Register />,
    },
    // {
    //   path: RoutesDirectory.HOME,
    //   element: <Inicio />,
    // },
    {
      path: RoutesDirectory.HOME,
      element: <Wordle />,
    },
    {
      path: RoutesDirectory.THE_RULES,
      element: <TheRules />,
    },
    {
      path: RoutesDirectory.SCORE,
      element: <Score />,
    },{
      path: RoutesDirectory.PROFILE,
      element: <Profile />,
    },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

export default AppRoutes;
