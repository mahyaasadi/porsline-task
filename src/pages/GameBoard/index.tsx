type GameBoardProps = {
  board: string[][];
  keyword: string;
  currentRow: number;
  correctRow: number | null;
};

const GameBoard = ({
  board,
  keyword,
  currentRow,
  correctRow,
}: GameBoardProps): JSX.Element => {
  const getLetterColor = (letter: string, index: number, hasWon: boolean) => {
    if (hasWon) {
      return "bg-green-500";
    } else {
      if (keyword[index] === letter) return "bg-green-600";
      if (keyword.includes(letter)) return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  return (
    <div className="grid grid-rows-6 gap-2">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              className={`w-16 h-16 border-2 flex items-center justify-center text-2xl text-white ${
                rowIndex == correctRow
                  ? getLetterColor(letter, colIndex, true)
                  : rowIndex < currentRow
                  ? getLetterColor(letter, colIndex, false)
                  : "border-gray-600"
              }`}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
