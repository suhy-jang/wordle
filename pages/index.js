import { useState } from 'react';
import Keyboard from '../components/Keyboard';

export default function Home() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentTile, setCurrentTile] = useState(0);

  const handleKey = (key) => {
    console.log('clicked', key);
  };
  const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
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
        <Keyboard onClick={handleKey} />
      </div>
    </div>
  );
}
