import BackSlash from './BackSlash';

export default function Keyboard({ onClick, gameOver }) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←'],
  ];
  return (
    <div className="flex flex-col items-center keyboard">
      {keys.map((keyRow, rowIndex) => (
        <div
          key={`keyboard-${rowIndex}`}
          className="flex flex-row items-center justify-center mx-auto mt-0 mb-2 w-100 touch-manipulation"
        >
          {keyRow.map((key, colIndex) => (
            <button
              key={colIndex}
              data-key={key}
              onClick={() => onClick(key)}
              className="key m-[1px] sm:m-[1px] text-white text-sm sm:text-lg h-[42px] sm:h-[58px] px-2.5 sm:px-4 py-1 rounded flex justify-center items-center uppercase flex-1 bg-gray-500"
              disabled={!!gameOver}
            >
              {key === '←' ? <BackSlash /> : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
