

export function processWords(text: string) {
  const words = text.split('\n');
  const fiveLetterWords = words.filter((word: string) => word.length === 5);
  return fiveLetterWords;
}
