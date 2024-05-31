import React from 'react'


type Props={
    guess:string,
    word:string,
    isGuessed:boolean,
    test?:boolean
    className?:string
  }

export default function GuessRowSample({guess, word, isGuessed, test,className}:Props) {
  return (
    <div className={`${className?className:' '} mb-2 grid grid-cols-5 gap-2`}>
      {
        new Array(5).fill(0).map((char, i)=>{
          const bgColor = !isGuessed?'bg-[#939B9F]'
          :guess[i]===word[i]? 'bg-[#6AAA64]'
          :word.includes(guess[i])&&test? 'bg-[#939B9F]'
          :word.includes(guess[i])? 'bg-[#CEB02C]'
          :'bg-[#fff] border border-[#000000] dark:bg-[#262B3C] dark:border-[#939B9F] '


          return (<div key={'char'+guess[i]+i} className={` size-20 rounded-md ${bgColor} font-bold uppercase text-black dark:text-[#fff] flex justify-center items-center text-4xl`}>{guess[i]}</div>)
        })
      }
    </div>
  )
}
