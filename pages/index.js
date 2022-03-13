import { useState } from 'react';
import Keyboard from '../components/Keyboard';
const guess = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

export default function Home() {
  const [point, setPoint] = useState({ row: 0, col: 0 });
  // const [guess, setGuess] = useState(initialGuess);

  const handleKey = (key) => {
    console.log('clicked', key);
    if (point.col < 5) {
      console.log(point);
      setPoint({ ...point, col: point.col + 1 });
      const { row, col } = point;
      guess[row][col] = key;
    }
  };
  return (
    <div
      style={{
        '--color-tone-1': '#ffffff;',
      }}
    >
      <header className="">
        <h1>Wordle</h1>
      </header>
      <div className="game w-100 mx-auto">
        <div className="message-container"></div>
        <div className="tile-container mx-auto w-[330px] mb-10">
          {guess.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="flex">
                {row.map((tile, colIndex) => {
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="text-white tile w-[62px] h-[62px] border-2 box-border flex m-[2px] justify-center items-center"
                    >
                      {tile}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Keyboard onClick={handleKey} />
      </div>
    </div>
  );
}
