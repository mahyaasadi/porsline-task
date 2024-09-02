type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const Keyboard = ({ onKeyPress }: KeyboardProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center mt-6 space-y-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap space-x-1 px-5 md:px-0">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className="mb-2 md:mb-0 px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 text-lg hover:hover:border-red-100"
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
