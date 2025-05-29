import React from 'react';
import { usePuzzleContext } from '../../context/PuzzleContext';
import { motion } from 'framer-motion';

export const SudokuBoard: React.FC = () => {
  const { puzzleState, currentStep, isExploring } = usePuzzleContext();

  // Ensure puzzleState is a 9x9 grid for Sudoku
  const grid = puzzleState as number[][];

  return (
    <div className="grid grid-cols-9 gap-0.5 bg-gray-800 dark:bg-gray-600 p-1 rounded-lg">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isCurrentCell = currentStep?.row === rowIndex && currentStep?.col === colIndex;
          const isInThirdRow = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
          const isInThirdCol = (colIndex + 1) % 3 === 0 && colIndex < 8;
          
          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: 1,
                backgroundColor: isCurrentCell 
                  ? isExploring 
                    ? '#fcd34d' // amber-300
                    : '#93c5fd' // blue-300
                  : cell ? '#ffffff' : '#f3f4f6' // white or gray-100
              }}
              transition={{ duration: 0.3 }}
              className={`
                w-12 h-12 flex items-center justify-center text-xl font-medium
                ${isInThirdRow ? 'border-b-2 border-gray-800 dark:border-gray-600' : ''}
                ${isInThirdCol ? 'border-r-2 border-gray-800 dark:border-gray-600' : ''}
                ${isCurrentCell ? 'ring-2 ring-blue-500 z-10' : ''}
                ${cell ? 'text-gray-900' : 'text-gray-400'}
                bg-white dark:bg-gray-200
              `}
            >
              {cell || ''}
            </motion.div>
          );
        })
      )}
    </div>
  );
};