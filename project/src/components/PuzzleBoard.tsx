import React from 'react';
import { usePuzzleContext } from '../context/PuzzleContext';
import { SudokuBoard } from './puzzles/SudokuBoard';
import { NQueensBoard } from './puzzles/NQueensBoard';
import { KnightsTourBoard } from './puzzles/KnightsTourBoard';
import { PuzzleType } from '../types/puzzleTypes';

export const PuzzleBoard: React.FC = () => {
  const { selectedPuzzle, puzzleState, isInitialized } = usePuzzleContext();

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">
          Initialize the puzzle to start visualization
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {selectedPuzzle === PuzzleType.SUDOKU && <SudokuBoard />}
      {selectedPuzzle === PuzzleType.N_QUEENS && <NQueensBoard />}
      {selectedPuzzle === PuzzleType.KNIGHTS_TOUR && <KnightsTourBoard />}
    </div>
  );
};