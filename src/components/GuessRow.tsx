import React from "react";

type Props = {
  guess: string;
  word: string;
  isGuessed: boolean;
};

export default function GuessRow({ guess, word, isGuessed }: Props) {

  return (
    // <div className={`mb-2 grid grid-flow-col-dense gap-2 w-full`}>
    <div className={`mb-2 flex flex-row gap-2 w-full`}>

      {new Array(word.length).fill(0).map((char, i) => {
        const bgColor = !isGuessed
          ? "bg-[#939B9F33]"
          : guess[i] === word[i]
          ? "bg-[#6AAA64]"
          : word.includes(guess[i])
          ? "bg-[#CEB02C]"
          : "bg-[#939B9F]";

        return (
          <div
          key={"char" + guess[i] + i}
          className={`relative w-full before:block before:pt-[100%] rounded-md ${bgColor} font-bold uppercase text-white flex justify-center items-center text-3xl`}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            {guess[i]}
          </div>
        </div>
        );
      })}
    </div>
  );
}
