export default function Board({ board }) {
  return (
    <div className="board-container mx-auto w-[210px] sm:w-[330px] my-5">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} id={`row-${rowIndex}`} className="flex">
            {row.map((tile, colIndex) => {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  id={`row-${rowIndex}-col-${colIndex}`}
                  className={`tile rounded text-white tile w-[42px] h-[42px] sm:w-[62px] sm:h-[62px] border-2 box-border flex m-[2px] justify-center items-center`}
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
