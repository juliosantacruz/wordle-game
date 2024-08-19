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


export  const getUserScore =async (jwtToken:string)=>{
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

type ScoreData={
    profile: number | string, //profileId
    word: number|string, // wordId
    time: number, // time
    score: number // score
}

export  const setUserScore =async (data:ScoreData, jwtToken:string)=>{
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwtToken}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body:JSON.stringify(data),
    redirect: "follow",
  };

  const response = await fetch(`${baseUrl}user/api/user/score`, requestOptions as any)
  .catch((error) => console.error(error));
  if((response as Response).status ===200)  {
    const data = await (response as Response).json()

    return data
  }
}



export  const getUserWords =async (jwtToken:string)=>{
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwtToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(`${baseUrl}user/api/user/words`, requestOptions as any)
  .catch((error) => console.error(error));
  if((response as Response).status ===200)  {
    const data = await (response as Response).json()

    return data
  }
}


