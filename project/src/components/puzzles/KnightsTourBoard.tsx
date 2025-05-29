import React from 'react';
import { usePuzzleContext } from '../../context/PuzzleContext';
import { motion } from 'framer-motion';

export const KnightsTourBoard: React.FC = () => {
  const { puzzleState, currentStep, isExploring } = usePuzzleContext();

  // For Knight's Tour, puzzleState is a 2D array with the move number at each position
  const board = puzzleState as number[][];
  const boardSize = board.length;

  // Function to render the knight's path with arrows between consecutive moves
  const renderPath = () => {
    // This would need SVG path rendering between consecutive moves
    // Simplified version for now
    return null;
  };

  return (
    <div>
      <div 
        className="grid gap-0.5 bg-gray-800 dark:bg-gray-600 p-1 rounded-lg relative"
        style={{ 
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))` 
        }}
      >
        {Array.from({ length: boardSize }).map((_, row) =>
          Array.from({ length: boardSize }).map((_, col) => {
            const moveNumber = board[row][col];
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
                  ${moveNumber > 0 ? 'text-green-600 dark:text-green-400 font-bold' : ''}
                `}
              >
                {moveNumber > 0 ? moveNumber : ''}
              </motion.div>
            );
          })
        )}
        
        {renderPath()}
      </div>
    </div>
  );
};