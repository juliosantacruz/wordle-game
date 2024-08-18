import { getImageUrl, setUserWords } from "@/api/wordList";
import CardWordProfile from "@/components/CardWordProfile";
import Header from "@/components/Header";
import { useUserStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchWords = async (token) => {
      setLoading(true);
      const wordsArr = [];

      try {
        const response = await setUserWords(token);
        response.map((element) => {
          const newObject = {
            title: element.word,
            img: getImageUrl(element.image),
            id: element.id,
          };
          wordsArr.push(newObject);
        });
      } catch {
        throw new Error();
      } finally {
        setLoading(false);
        setWords(wordsArr);
      }
    };

    fetchWords(user.jwtTokens.access);

    console.log("setwords");
  }, []);

  console.log(words);

  return (
    <section className="flex flex-col justify-start items-center h-screen border-2 bg-[#F3F3F3]  dark:bg-[#262B3C] dark:text-[#ffffff]">
      <Header />
      <div className="flex flex-col justify-start items-center w-[95%] h-[90%] max-w-[520px] max-h-[1018px] border border-black bg-[#F3F3F3] text-[#000000] dark:text-[#FFFFFF] dark:bg-[#262B3C] dark:border-[#939B9F] rounded-2xl">
        <h1 className="py-6 text-[35px] font-bold">Perfil</h1>

        <div className="w-full px-2">
          <h3>Palabras encontradas</h3>

          <div className="">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <div className="flex flex-row flex-wrap gap-2 ">
                {words.length === 0 && <p>No hay palabras</p>}
                {words.map((word) => {
                  return <CardWordProfile key={word.id} data={word} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
