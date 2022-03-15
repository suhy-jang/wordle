import { useState, useEffect } from 'react';
import Keyboard from '../components/Keyboard';
import Board from '../components/Board';
import { getWordle, checkWordle } from '../lib/word';
import BoardClass from '../utils/board';
import Message from '../components/Message';
import Header from '../components/Header';

const boardInstance = new BoardClass();
const { board, updateBoard } = boardInstance;

export default function Home() {
  const [point, setPoint] = useState({ row: 0, col: 0 });
  const [typedWord, setTypedWord] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [wordle, setWordle] = useState('');
  const [win, setWin] = useState(false);

  const { row, col } = point;

  const init = async () => {
    const word = await getWordle();
    console.log(`answer: ${word}`);
    if (word) setWordle(word);
  };

  useEffect(() => {
    init();
  }, []);

  const flipTile = () => {
    const tiles = document.getElementById(`row-${row}`).childNodes;
    const guessResults = [];

    tiles.forEach((tile) => {
      guessResults.push({ letter: tile.getAttribute('data'), state: 'absent' });
    });

    for (let c = 0; c < 5; c++) {
      const letter = board[row][c];
      guessResults[c].letter = letter;
      if (letter === wordle[c]) {
        guessResults[c].state = 'correct';
      } else if (wordle.includes(letter)) {
        guessResults[c].state = 'present';
      } else {
        guessResults[c].state = 'absent';
      }
    }
    tiles.forEach((tile, index) => {
      setTimeout(() => {
        const { letter, state } = guessResults[index];
        tile.classList.add(state);
        tile.setAttribute('data-animation', 'flip-in');
        const key = document.querySelector(`button[data-key=${letter}]`);
        if (key.classList.contains('correct')) return;
        key.classList.remove('present');
        key.classList.remove('absent');
        key.classList.add(state);
      }, 500 * index);
    });
  };

  const resetRow = () => {
    setTypedWord('');
    [0, 1, 2, 3, 4].forEach((col) => {
      updateBoard({ point: { row, col }, value: '' });
      const tile = document.getElementById(`row-${row}-col-${col}`);
      tile.setAttribute('data', '');
    });
    setPoint({ row, col: 0 });
  };

  const showTimeoutMessage = (message) => {
    setMessage(message);
    const timeout = setTimeout(() => {
      setMessage('');
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  };

  const showAnimation = ({ target, type }) => {
    switch (type) {
      case 'notInList':
        const tiles = document.getElementById(`row-${row}`).childNodes;
        tiles.forEach((tile) => tile.setAttribute('data-animation', 'bounce'));
        return;
      case 'addLetter':
        target.setAttribute('data-animation', 'pop');
        return;
      default:
        return;
    }
  };

  const checkRow = async () => {
    if (col < 5) return;

    const check = await checkWordle(typedWord);
    if (!check) {
      showTimeoutMessage('Not in word list');
      showAnimation({ type: 'notInList' });
      resetRow();
      return;
    }
    flipTile();
    if (wordle === typedWord) {
      setMessage('Super!');
      setGameOver(true);
      setWin(true);
    } else if (row < 5) {
      setPoint({ row: row + 1, col: 0 });
    } else {
      setMessage(`Game Over ( Answer: ${wordle} )`);
      setGameOver(true);
    }
    setTypedWord('');
  };

  const deleteLetter = () => {
    if (col > 0) {
      updateBoard({ point: { row, col: col - 1 }, value: '' });
      setTypedWord(typedWord.slice(0, col - 1));
      const tile = document.getElementById(`row-${row}-col-${col - 1}`);
      tile.setAttribute('data', '');
      setPoint({ ...point, col: col - 1 });
    }
  };

  const addLetter = (letter) => {
    if (col < 5) {
      updateBoard({ point: { row, col }, value: letter });
      setTypedWord(`${typedWord}${letter}`);
      const tile = document.getElementById(`row-${row}-col-${col}`);
      tile.setAttribute('data', letter);
      showAnimation({ target: tile, type: 'addLetter' });
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

  return (
    <div
      className="text-white"
      style={{
        '--color-tone-1': '#ffffff;',
      }}
    >
      <Header />
      <div className="game w-100 mx-auto">
        <Message message={message} win={win} />
        <Board board={board} />
        <Keyboard onClick={handleKey} gameOver={gameOver} />
      </div>
    </div>
  );
}
