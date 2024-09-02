import React from "react";
import { Toast } from "primereact/toast";
import GameBoard from "@/pages/GameBoard";
import Keyboard from "@/pages/GameBoard/components/Keyboard";
import { useWordleGame } from "@/pages/GameBoard/hooks/useWordleGame";

const App: React.FC = () => {
  const {
    board,
    currentRow,
    correctRow,
    attempts,
    toastRef,
    handleKeyPress,
    handleRestart,
    keyword,
  } = useWordleGame();

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <Toast ref={toastRef} />
        <p className="font-serif text-white text-3xl font-bold mb-6">Wordle</p>
        <GameBoard
          board={board}
          keyword={keyword}
          currentRow={currentRow}
          correctRow={correctRow}
        />
        <Keyboard onKeyPress={handleKeyPress} />
        {attempts > 0 && (
          <div className="text-white mt-7 cursor-pointer hover:bg-white hover:text-gray-800 hover:rounded">
            <div
              onClick={handleRestart}
              className="button border px-4 py-3 flex items-center rounded"
            >
              <i className="pi pi-refresh pe-2"></i>
              <span>start over</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
