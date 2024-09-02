import { useState, useEffect } from "react";
import { useToast } from "@/pages/GameBoard/hooks/useToast";
import { getRandomWord } from "@/pages/GameBoard/utils/getRandomWord";

type UseWordleGameProps = {
  initialKeyword?: string;
};

export const useWordleGame = ({ initialKeyword }: UseWordleGameProps) => {
  const { toastRef, showSuccess, showError } = useToast();

  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [correctRow, setCorrectRow] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>("CLAIM");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleKeyPress = (key: string) => {
    if (gameOver) return; // Prevent further key presses if the game is over

    if (key === "Enter") {
      if (currentCol === 5) {
        if (board[currentRow].join("") === keyword) {
          setCorrectRow(currentRow);
          setTimeout(() => {
            showSuccess(
              "Congrats!",
              `You guessed the word in ${currentRow + 1} attempt${
                currentRow !== 0 ? "s" : ""
              }!`
            );
          }, 500);
          setGameOver(true);
          setAttempts(currentRow + 1);
        } else if (currentRow === 5) {
          showError("Game Over", `The correct word was ${keyword}.`);
          setGameOver(true);
          setAttempts(5);
        } else {
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
        }
      }
    } else if (key === "Backspace") {
      if (currentCol > 0) {
        const newBoard = board.map((row, index) =>
          index === currentRow ? row.slice() : row
        );
        newBoard[currentRow][currentCol - 1] = "";
        setBoard(newBoard);
        setCurrentCol(currentCol - 1);
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (currentCol < 5) {
        const newBoard = board.map((row, index) =>
          index === currentRow ? row.slice() : row
        );
        newBoard[currentRow][currentCol] = key.toUpperCase();
        setBoard(newBoard);
        setCurrentCol(currentCol + 1);
      }
    }
  };

  const handleRestart = () => {
    setBoard(Array.from({ length: 6 }, () => Array(5).fill("")));
    setCurrentRow(0);
    setCurrentCol(0);
    setAttempts(0);
    setGameOver(false);
    setCorrectRow(null);
    setKeyword(getRandomWord());
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameOver) handleKeyPress(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCol, currentRow, board, gameOver]);

  useEffect(() => setKeyword(getRandomWord()), []);

  return {
    board,
    currentRow,
    correctRow,
    attempts,
    toastRef,
    handleKeyPress,
    handleRestart,
    keyword,
  };
};
