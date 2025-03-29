import { useState, useEffect } from "react";
// import winSound from "./mixkit-conference-audience-clapping-strongly-476.wav"; // Import win sound
import winSound from "../assets/mixkit-conference-audience-clapping-strongly-476.wav"

const initialBoard = (size) => Array(size * size).fill(null);

const useTicTacToe = (boardSize) => {
  const [board, setBoard] = useState(initialBoard(boardSize));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const WINNING_PATTERNS = generateWinningPatterns();

  function generateWinningPatterns() {
    const patterns = [];
    for (let i = 0; i < boardSize; i++) {
      const horizontalPattern = [];
      const verticalPattern = [];
      for (let j = 0; j < boardSize; j++) {
        horizontalPattern.push(i * boardSize + j);
        verticalPattern.push(j * boardSize + i);
      }
      patterns.push(horizontalPattern, verticalPattern);
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * (boardSize + 1));
      diagonal2.push((i + 1) * (boardSize - 1));
    }
    patterns.push(diagonal1, diagonal2);
    return patterns;
  }

  const currentPlayer = isXTurn ? "X" : "O";

  const calculateWinner = (currentBoard) => {
    for (let pattern of WINNING_PATTERNS) {
      if (pattern.every((p) => currentBoard[p] === "X")) return "X";
      if (pattern.every((p) => currentBoard[p] === "O")) return "O";
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index] !== null) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const winnerName = calculateWinner(updatedBoard);
    if (winnerName) {
      setWinner(winnerName);
      return;
    }

    board.includes(null) && setIsXTurn(!isXTurn);
  };

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw`;
    return `Player ${currentPlayer} Turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard(boardSize));
    setIsXTurn(true);
    setWinner(null);
  };

  // Play sound when there's a winner
  useEffect(() => {
    if (winner) {
      const audio = new Audio(winSound);
      audio.play();
    }
  }, [winner]);

  return { board, handleClick, getStatusMessage, resetGame, winner };
};

export default useTicTacToe;
