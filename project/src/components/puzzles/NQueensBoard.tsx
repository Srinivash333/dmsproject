import React from 'react';
import { usePuzzleContext } from '../../context/PuzzleContext';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

export const NQueensBoard: React.FC = () => {
  const { puzzleState, currentStep, isExploring } = usePuzzleContext();

  // For N-Queens, puzzleState is a 1D array where index is row and value is column position
  const queensPositions = puzzleState as number[];
  const boardSize = queensPositions.length;

  return (
    <div 
      className="grid gap-0.5 bg-gray-800 dark:bg-gray-600 p-1 rounded-lg"
      style={{ 
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))` 
      }}
    >
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isQueen = queensPositions[row] === col;
          const isCurrentCell = currentStep?.row === row && currentStep?.col === col;
          const isDarkSquare = (row + col) % 2 === 1;
          
          return (
            <motion.div
              key={`${row}-${col}`}
              initial={{ opacity: 0.8 }}
              animate={{ 
                opacity: 1,
                backgroundColor: isCurrentCell 
                  ? isExploring 
                    ? '#fcd34d' // amber-300
                    : '#93c5fd' // blue-300
                  : isDarkSquare 
                    ? '#1e293b' // slate-800
                    : '#f8fafc' // slate-50
              }}
              transition={{ duration: 0.3 }}
              className={`
                w-12 h-12 flex items-center justify-center
                ${isCurrentCell ? 'ring-2 ring-blue-500 z-10' : ''}
              `}
            >
              {isQueen && (
                <Crown 
                  className={`w-8 h-8 ${isDarkSquare ? 'text-yellow-400' : 'text-yellow-600'}`} 
                />
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
};