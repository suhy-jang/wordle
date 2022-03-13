import BackSlash from './BackSlash';

export default function Keyboard({ onClick }) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←'],
  ];
  return (
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
              onClick={() => onClick(key)}
              className="m-1 text-white px-2 py-1 rounded flex justify-center items-center uppercase flex-1 bg-gray-500"
            >
              {key === '←' ? <BackSlash /> : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
