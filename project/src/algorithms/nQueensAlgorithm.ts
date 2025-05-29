import { Algorithm, DifficultyLevel, PuzzleStep, TreeNode } from '../types/puzzleTypes';

export const nQueensAlgorithm: Algorithm = {
  initialize(difficulty: DifficultyLevel): number[] {
    // N-Queens board size based on difficulty
    const sizes = {
      [DifficultyLevel.EASY]: 4,
      [DifficultyLevel.MEDIUM]: 6,
      [DifficultyLevel.HARD]: 8
    };
    
    const size = sizes[difficulty];
    // Initialize with -1 to indicate no queen in any column for each row
    return Array(size).fill(-1);
  },
  
  solve(board: number[]): PuzzleStep[] {
    const steps: PuzzleStep[] = [];
    const size = board.length;
    
    const solveRecursive = (row: number): boolean => {
      // All queens have been placed
      if (row === size) {
        return true;
      }
      
      // Try placing a queen in each column of the current row
      for (let col = 0; col < size; col++) {
        const isValid = this.isValid(board, row, col, 0);
        
        // Record this attempt
        steps.push({
          row,
          col,
          value: 1, // 1 indicates a queen
          isValid,
          isBacktracking: false
        });
        
        if (isValid) {
          board[row] = col;
          
          if (solveRecursive(row + 1)) {
            return true;
          }
          
          // Backtrack
          board[row] = -1;
          steps.push({
            row,
            col,
            value: 0,
            isValid: false,
            isBacktracking: true
          });
        }
      }
      
      return false;
    };
    
    const boardCopy = [...board];
    solveRecursive(0);
    
    return steps;
  },
  
  isValid(board: number[], row: number, col: number, _: number): boolean {
    // Check if the position is valid for a new queen
    for (let prevRow = 0; prevRow < row; prevRow++) {
      const prevCol = board[prevRow];
      
      // Check if there's a queen in the same column
      if (prevCol === col) {
        return false;
      }
      
      // Check diagonals
      if (Math.abs(prevRow - row) === Math.abs(prevCol - col)) {
        return false;
      }
    }
    
    return true;
  },
  
  getNextStep(currentStep: number): PuzzleStep | null {
    // This would be implemented to return the next step in a real implementation
    return null;
  },
  
  buildDecisionTree(): TreeNode {
    // Build a simplified tree for demonstration
    return {
      id: 'root',
      label: 'Start',
      children: [
        {
          id: 'node1',
          label: 'Row 0, Col 0',
          isCurrentPath: true,
          isExplored: true,
          isBacktracked: false,
          children: []
        }
      ],
      isCurrentPath: false,
      isExplored: true,
      isBacktracked: false
    };
  }
};