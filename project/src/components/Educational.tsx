import React from 'react';
import { usePuzzleContext } from '../context/PuzzleContext';
import { PuzzleType } from '../types/puzzleTypes';

export const Educational: React.FC = () => {
  const { selectedPuzzle } = usePuzzleContext();

  const getExplanation = () => {
    switch (selectedPuzzle) {
      case PuzzleType.SUDOKU:
        return (
          <>
            <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">How DFS Solves Sudoku</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Depth-First Search (DFS) solves Sudoku by trying each possible number (1-9) in each empty cell, then recursively solving the resulting board.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Find an empty cell in the Sudoku grid</li>
              <li>Try placing digits 1-9 in this cell</li>
              <li>For each valid digit, recursively solve the rest of the board</li>
              <li>If a recursive call fails, backtrack and try a different digit</li>
              <li>If all digits fail, return to the previous cell (backtrack)</li>
            </ol>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Constraints at each step ensure that numbers don't repeat in rows, columns, or 3x3 subgrids.
            </p>
          </>
        );
      
      case PuzzleType.N_QUEENS:
        return (
          <>
            <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">How DFS Solves N-Queens</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The N-Queens puzzle involves placing N queens on an N×N chessboard so that no two queens threaten each other.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Start with an empty board</li>
              <li>Place a queen in the first row, in a valid column</li>
              <li>Recursively place queens in subsequent rows</li>
              <li>If a conflict is detected, backtrack and try a different column</li>
              <li>Continue until all N queens are placed or all possibilities are exhausted</li>
            </ol>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              The key constraint is that queens cannot share the same row, column, or diagonal.
            </p>
          </>
        );
      
      case PuzzleType.KNIGHTS_TOUR:
        return (
          <>
            <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">How DFS Solves Knight's Tour</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Knight's Tour problem involves finding a sequence of moves for a knight to visit every square on a chessboard exactly once.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Start at any initial position on the board</li>
              <li>Try each of the 8 possible knight moves from the current position</li>
              <li>For each valid move (on board and not visited), recursively solve from the new position</li>
              <li>If a path doesn't lead to a solution, backtrack and try a different move</li>
              <li>The solution is found when all squares have been visited</li>
            </ol>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Heuristics like Warnsdorff's rule (moving to the square with fewest onward moves first) can improve efficiency.
            </p>
          </>
        );
      
      default:
        return <p>Select a puzzle to see how DFS solves it.</p>;
    }
  };

  return (
    <div className="prose prose-blue dark:prose-invert max-w-none">
      {getExplanation()}
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Understanding Backtracking</h4>
        <p className="text-blue-700 dark:text-blue-300">
          Backtracking is a key component of DFS for solving constraint satisfaction problems. When the algorithm reaches a state where it cannot proceed (due to constraints), it "backtracks" to a previous state and tries a different path.
        </p>
      </div>
    </div>
  );
};