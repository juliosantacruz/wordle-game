import Header from '@/components/Header'
import React from 'react'
import ImageDefault from  '@/assets/Image_Placeholder_view.svg'

export default function Profile() {
  return (
    <section className="flex flex-col  h-screen border-2 bg-[#F3F3F3] p-4 dark:bg-[#262B3C] dark:text-[#ffffff]">

      <Header/>
      <h1>Perfil</h1>

      <div className="flex flex-row flex-wrap">
        <article className="w-36 h-36 border flex flex-col justify-center items-center grow ">
          <img src={ImageDefault} alt="cardImage" className=''/>
          <h3>Card Title</h3>
        </article>
        <div className="w-36 h-36 border flex justify-center items-center grow ">1</div>
        <div className="w-36 h-36 border flex justify-center items-center grow ">1</div>
        <div className="w-36 h-36 border flex justify-center items-center grow ">1</div>
        <div className="w-36 h-36 border flex justify-center items-center grow ">1</div>
        <div className="w-36 h-36 border flex justify-center items-center grow ">1</div>
        <div className="w-36 h-36 border flex justify-center items-center grow ">1</div>

      </div>
    </section>
  )
}
