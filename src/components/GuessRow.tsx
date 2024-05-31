import React from "react";

type Props = {
  guess: string;
  word: string;
  isGuessed: boolean;
};

export default function GuessRow({ guess, word, isGuessed }: Props) {

  return (
    <div className={`mb-4 grid grid-flow-col-dense gap-4 w-full`}>
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
            className={` size-20 rounded-md ${bgColor} font-bold uppercase text-white flex justify-center items-center text-4xl`}
          >
            {guess[i]}
          </div>
        );
      })}
    </div>
  );
}
