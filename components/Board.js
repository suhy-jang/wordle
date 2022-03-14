export default function Board({ board }) {
  return (
    <div className="board-container mx-auto w-[330px] my-5">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} id={`row-${rowIndex}`} className="flex">
            {row.map((tile, colIndex) => {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  id={`row-${rowIndex}-col-${colIndex}`}
                  // data-animation={colIndex === 0 ? 'pop' : ''}
                  className={`tile rounded text-white tile w-[62px] h-[62px] border-2 box-border flex m-[2px] justify-center items-center`}
                >
                  {tile}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
