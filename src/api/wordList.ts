

export function processWords(text: string) {
  const words = text.split('\n');
  const fiveLetterWords = words.filter((word: string) => word.length === 5);
  return fiveLetterWords;
}



export async  function  getWordList(){
  const response = await fetch('https://mini-wordle-server.vercel.app/word/api/words')
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data  = await response.json();
  return data;

}

