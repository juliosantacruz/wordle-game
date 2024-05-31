/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";

type AsideProps = {
  children: ReactNode;
  openModal: boolean;
};

export default function AsideModal(Props: AsideProps) {
  const {
    children,


    openModal,
  } = Props;

  const classModal = () => {
    return openModal ? "transform translate-x-0" : "transform translate-x-full";
  };

  return (
    <aside
      className={`fixed top-0 right-0 w-full max-w-full h-full backdrop-blur-sm transition-transform duration-300 ease-in-out shadow-lg z-20 ${classModal()} bg-[#f3f3f3e3] dark:bg-[#262B3CE3]`}

    >


        <div className="flex flex-col items-center justify-center w-full h-full">
          {children}
        </div>

    </aside>
  );
}
