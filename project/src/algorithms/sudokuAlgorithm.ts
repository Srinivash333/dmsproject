import { Algorithm, DifficultyLevel, PuzzleStep, TreeNode } from '../types/puzzleTypes';

// Sample Sudoku puzzles of different difficulties
const puzzles = {
  [DifficultyLevel.EASY]: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  [DifficultyLevel.MEDIUM]: [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ],
  [DifficultyLevel.HARD]: [
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0]
  ]
};

export const sudokuAlgorithm: Algorithm = {
  initialize(difficulty: DifficultyLevel): number[][] {
    // Deep copy the puzzle to avoid modifying the original
    return JSON.parse(JSON.stringify(puzzles[difficulty]));
  },
  
  solve(board: number[][]): PuzzleStep[] {
    const steps: PuzzleStep[] = [];
    
    const findEmptyCell = (board: number[][]): [number, number] | null => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            return [row, col];
          }
        }
      }
      return null;
    };
    
    const solveRecursive = (board: number[][]): boolean => {
      const emptyCell = findEmptyCell(board);
      
      // If no empty cell is found, the puzzle is solved
      if (!emptyCell) {
        return true;
      }
      
      const [row, col] = emptyCell;
      
      // Try digits 1-9
      for (let num = 1; num <= 9; num++) {
        const isValid = this.isValid(board, row, col, num);
        
        // Record this attempt
        steps.push({
          row,
          col,
          value: num,
          isValid,
          isBacktracking: false
        });
        
        if (isValid) {
          board[row][col] = num;
          
          if (solveRecursive(board)) {
            return true;
          }
          
          // Backtrack
          board[row][col] = 0;
          steps.push({
            row,
            col,
            value: num,
            isValid: false,
            isBacktracking: true
          });
        }
      }
      
      return false;
    };
    
    // Create a copy of the board for solving
    const boardCopy = JSON.parse(JSON.stringify(board));
    solveRecursive(boardCopy);
    
    return steps;
  },
  
  isValid(board: number[][], row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) {
        return false;
      }
    }
    
    // Check column
    for (let y = 0; y < 9; y++) {
      if (board[y][col] === num) {
        return false;
      }
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let y = boxRow; y < boxRow + 3; y++) {
      for (let x = boxCol; x < boxCol + 3; x++) {
        if (board[y][x] === num) {
          return false;
        }
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
          label: '(0,0)=5',
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