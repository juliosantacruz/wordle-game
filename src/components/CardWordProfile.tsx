import React from "react";
import ImageDefault from "@/assets/Image_Placeholder_view.svg";
import StarButton from '@/assets/icon/StarButtonLight.svg'
export default function CardWordProfile({
  data,
}: {
  data?: { title: string; img: string };
}) {
  const { title, img } = data || {};
  return (
    <article className="w-36 h-40 bg-white border border-gray-400 rounded-lg shadow dark:bg-transparent dark:border-gray-700 overflow-hidden relative">
      <img src={StarButton} alt="star" className="absolute top-2 right-2" />
      <div className="h-32 w-full ">
        <img
          className="rounded-t-sm h-full w-full object-cover"
          src={img ? img : ImageDefault}
          alt="cardImage"
        />
      </div>
      <div className="">
        <h5 className="mb-2 text-lg text-center font-bold tracking-tight text-gray-900 dark:text-white">
        {title ? title : ""}
        </h5>
      </div>
    </article>
  );
}
