import darkDelIcon from "@/assets/icon/dark_Union.png";
import lightDelIcon from "@/assets/icon/light_Union.png";
import { useGameStore } from "@/store/gameStore";

type Props = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Delete"],
];

export default function Keyboard({ darkMode }: Props) {
  // const handleKeypad = useGameStore(state=>state.handleKeypad)
  const { keypadGuess } = useGameStore();
  const inexactos = keypadGuess.inexactGuesses;
  const todos = keypadGuess.allGuesses;
  const exactos = keypadGuess.exactGuesses;

  const dispatchKeyboardEvent = (key: string) => {
    const event = new KeyboardEvent("keydown", { key });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[638px] w-full bg-[#dadce04d] dark:bg-[#dadce008] p-5 rounded-lg">
      {keys &&
        keys.map((row, index) => {
          return (
            <div key={index} className="flex flex-row justify-center gap-1">
              {row.map((key) => {
                const bgColor = exactos.includes(key)
                  ? "bg-[#6AAA64] text-white"
                  : inexactos.includes(key)
                  ? "bg-[#CEB02C] text-white"
                  : todos.includes(key)
                  ? "bg-[#818181] text-white"
                  : "bg-[#D3D6DA] text-[#56575E] dark:bg-[#565F7E] dark:text-white";

                if (key === "Delete") {
                  return (
                    <button
                      onClick={() => dispatchKeyboardEvent(key)}
                      key={key}
                      className="flex justify-center items-center gap-1 w-[72px] h-[45px] rounded-md uppercase bg-[#D3D6DA] text-[#56575E] dark:bg-[#565F7E] dark:text-white text-lg"
                    >
                      <img src={darkMode ? darkDelIcon : lightDelIcon} alt="" />
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={() => dispatchKeyboardEvent(key)}
                      className={`flex justify-center items-center gap-2 ${
                        key === "Enter" ? "w-[72px] text-[12px]" : "w-[34px]"
                      } h-[45px] rounded-md uppercase text-lg  ${bgColor}`}
                      key={key}
                    >
                      {" "}
                      {key}
                    </button>
                  );
                }
              })}
            </div>
          );
        })}
    </div>
  );
}
