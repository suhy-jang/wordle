import { useState, useEffect } from 'react';
import Keyboard from '../components/Keyboard';
const board = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

let wordle = 'TRAIN';
console.log(wordle);

export default function Home() {
  const [point, setPoint] = useState({ row: 0, col: 0 });
  const [word, setWord] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const { row, col } = point;

  const flipTile = () => {
    const tiles = document.getElementById(`row-${row}`).childNodes;
    const guessResults = [];

    tiles.forEach((tile) => {
      guessResults.push({ letter: tile.getAttribute('data'), color: 'gray' });
    });

    for (let c = 0; c < 5; c++) {
      const tile = board[row][c];
      // const tile = document.getElementById(`row-${row}`).childNodes;
      if (tile === wordle[c]) {
        guessResults[c].color = 'lime';
      } else if (wordle.includes(tile)) {
        guessResults[c].color = 'yellow';
      }
    }
    tiles.forEach((tile, index) => {
      setTimeout(() => {
        const color = guessResults[index].color;
        tile.classList.add(`bg-${color}-500`);
      }, 500 * index);
    });
  };

  const checkRow = () => {
    if (col < 5) return;

    flipTile();
    if (wordle === word) {
      setMessage('Super!');
    } else if (row < 5) {
      setPoint({ row: row + 1, col: 0 });
    } else {
      setGameOver(true);
      setMessage('Game Over');
    }
  };

  const deleteLetter = () => {
    if (col > 0) {
      board[row][col - 1] = '';
      setWord(word.slice(0, col - 1));
      const tile = document.getElementById(`row-${row}-col-${col - 1}`);
      tile.setAttribute('data', '');
      setPoint({ ...point, col: col - 1 });
    }
  };

  const addLetter = (letter) => {
    if (col < 5) {
      board[row][col] = letter;
      setWord(`${word}${letter}`);
      const tile = document.getElementById(`row-${row}-col-${col}`);
      tile.setAttribute('data', letter);
      setPoint({ ...point, col: col + 1 });
    }
  };

  const handleKey = (key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      checkRow();
    } else if (key === '←') {
      deleteLetter();
    } else if (col < 5) {
      addLetter(key);
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, [message]);

  return (
    <div
      style={{
        '--color-tone-1': '#ffffff;',
      }}
    >
      <header className="">
        <h1>Wordle</h1>
      </header>
      <div className="game w-100 mx-auto text-white">
        <div className="message-container my-3 relative">
          {message && (
            <div className="rounded-[10px] bg-gray-500 w-fit mx-auto py-2 px-5 absolute left-0 right-0">
              {message}
            </div>
          )}
        </div>
        <div className="board-container mx-auto w-[330px] mb-10">
          {board.map((row, rowIndex) => {
            return (
              <div key={rowIndex} id={`row-${rowIndex}`} className="flex">
                {row.map((tile, colIndex) => {
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      id={`row-${rowIndex}-col-${colIndex}`}
                      className={`text-white tile w-[62px] h-[62px] border-2 box-border flex m-[2px] justify-center items-center`}
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
