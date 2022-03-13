import { useState } from 'react';
import BackSlash from '../components/BackSlash';

export default function Home() {
  const clickKey = (key) => {
    console.log('clicked', key);
  };
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←'],
  ];
  const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  return (
    <div className="nightmode">
      <header className="">
        <h1>Wordle</h1>
      </header>
      <div className="game w-100 mx-auto">
        <div className="message-container"></div>
        <div className="tile-container">
          {guessRows.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((tile, colIndex) => {
                  return (
                    <div key={`${rowIndex}-${colIndex}`} className="tile"></div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="keyboard mx-2 flex flex-col items-center">
          {keys.map((keyRow, rowIndex) => (
            <div
              key={`keyboard-${rowIndex}`}
              className="flex flex-row w-100 mt-0 mx-auto mb-2 touch-manipulation"
            >
              {keyRow.map((key, colIndex) => (
                <button
                  key={colIndex}
                  data-key={key}
                  onClick={() => clickKey(key)}
                  className="m-1 text-white px-2 py-1 rounded flex justify-center items-center uppercase flex-1 bg-gray-500"
                >
                  {key === '←' ? <BackSlash /> : key}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
