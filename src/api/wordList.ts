/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = "https://mini-wordle-server.vercel.app/";


export function processWords(text: string) {
  const words = text.split('\n');
  const fiveLetterWords = words.filter((word: string) => word.length === 5);
  return fiveLetterWords;
}

export async  function  getWordList(){
  const response = await fetch(`${baseUrl}word/api/words`)
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data  = await response.json();
  return data;
}

export const getImageUrl =(image:string)=>{
  const urlBase='https://res.cloudinary.com/dqhvp0atv/'
  const imageUrl = urlBase + image
  return imageUrl
}


export  const setUserScore =async (jwtToken:string)=>{
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwtToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(`${baseUrl}user/api/user/score`, requestOptions as any)
  .catch((error) => console.error(error));
  if((response as Response).status ===200)  {
    const data = await (response as Response).json()

    return data
  }
}



