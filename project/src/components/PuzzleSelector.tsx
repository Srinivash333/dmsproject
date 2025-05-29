import React from 'react';
import { Check as Chess, Grid3X3, Dices } from 'lucide-react';
import { usePuzzleContext } from '../context/PuzzleContext';
import { PuzzleType, DifficultyLevel } from '../types/puzzleTypes';

export const PuzzleSelector: React.FC = () => {
  const { 
    selectedPuzzle, 
    setSelectedPuzzle, 
    difficultyLevel, 
    setDifficultyLevel,
    initializePuzzle
  } = usePuzzleContext();

  const puzzleTypes = [
    { type: PuzzleType.SUDOKU, name: 'Sudoku', icon: <Grid3X3 className="w-6 h-6" /> },
    { type: PuzzleType.N_QUEENS, name: 'N-Queens', icon: <Chess className="w-6 h-6" /> },
    { type: PuzzleType.KNIGHTS_TOUR, name: "Knight's Tour", icon: <Dices className="w-6 h-6" /> }
  ];

  const difficultyLevels = [
    { level: DifficultyLevel.EASY, name: 'Easy' },
    { level: DifficultyLevel.MEDIUM, name: 'Medium' },
    { level: DifficultyLevel.HARD, name: 'Hard' }
  ];

  const handlePuzzleSelect = (puzzleType: PuzzleType) => {
    setSelectedPuzzle(puzzleType);
  };

  const handleDifficultySelect = (level: DifficultyLevel) => {
    setDifficultyLevel(level);
  };

  const handleInitialize = () => {
    if (selectedPuzzle) {
      initializePuzzle();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Puzzle Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {puzzleTypes.map((puzzle) => (
            <button
              key={puzzle.type}
              onClick={() => handlePuzzleSelect(puzzle.type)}
              className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedPuzzle === puzzle.type
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <span className={`${
                selectedPuzzle === puzzle.type
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {puzzle.icon}
              </span>
              <span className={`font-medium ${
                selectedPuzzle === puzzle.type
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {puzzle.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedPuzzle && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Difficulty</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {difficultyLevels.map((difficulty) => (
              <button
                key={difficulty.level}
                onClick={() => handleDifficultySelect(difficulty.level)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  difficultyLevel === difficulty.level
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {difficulty.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPuzzle && difficultyLevel && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleInitialize}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200"
          >
            Generate Puzzle
          </button>
        </div>
      )}
    </div>
  );
};