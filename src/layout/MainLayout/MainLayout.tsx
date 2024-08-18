import { ReactNode } from "react";
import ReactGA from "react-ga4";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  // console.log('location' , location.pathname.slice(0,8))
  ReactGA.initialize("G-XCG3LZTS1B");
  ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });

  return <>{children}</>;
}
