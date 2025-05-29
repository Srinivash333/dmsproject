import { Algorithm, DifficultyLevel, PuzzleStep, TreeNode } from '../types/puzzleTypes';

export const knightsTourAlgorithm: Algorithm = {
  /**
   * Initializes a new board based on the specified difficulty level.
   * @param difficulty The desired difficulty level (EASY, MEDIUM, HARD).
   * @returns A 2D array representing the initialized board, filled with zeros.
   */
  initialize(difficulty: DifficultyLevel): number[][] {
    // Define board sizes for different difficulty levels
    const sizes = {
      [DifficultyLevel.EASY]: 5,
      [DifficultyLevel.MEDIUM]: 6,
      [DifficultyLevel.HARD]: 8
    };
    
    const size = sizes[difficulty];
    // Create a square board initialized with zeros
    return Array(size).fill(0).map(() => Array(size).fill(0));
  },
  
  /**
   * Solves the Knight's Tour problem for a given board using a backtracking algorithm.
   * Records each step of the solving process for visualization.
   * @param initialBoard The starting board configuration. This board will NOT be mutated.
   * @returns An array of PuzzleStep objects, detailing the algorithm's progress.
   */
  solve(initialBoard: number[][]): PuzzleStep[] {
    const steps: PuzzleStep[] = [];
    const size = initialBoard.length;
    
    // Create a deep copy of the initial board to work with.
    // This is crucial to ensure the original board (e.g., from React state) is not mutated.
    const board = initialBoard.map(row => [...row]);
    
    // Possible knight moves (dx, dy)
    // Corresponds to L-shaped moves on a chessboard
    const moveX = [2, 1, -1, -2, -2, -1, 1, 2];
    const moveY = [1, 2, 2, 1, -1, -2, -2, -1];
    
    /**
     * Recursive helper function to find the Knight's Tour.
     * It attempts to place the knight at (row, col) with moveNum, then explores further.
     * @param row The current row position of the knight.
     * @param col The current column position of the knight.
     * @param moveNum The current move number (1 to size*size).
     * @returns True if a solution is found from this path, false otherwise.
     */
    const solveRecursive = (row: number, col: number, moveNum: number): boolean => {
      // Mark the current position with the current move number
      board[row][col] = moveNum;
      
      // Record this step as a valid move that was taken
      steps.push({
        row: row,
        col: col,
        value: moveNum,
        isValid: true,
        isBacktracking: false
      });

      // Base case: If all squares have been visited, a solution is found
      if (moveNum === size * size) {
        return true;
      }
      
      // Try all 8 possible knight moves from the current position
      for (let i = 0; i < 8; i++) {
        const nextRow = row + moveY[i];
        const nextCol = col + moveX[i];
        
        // Check if the potential next move is valid (within board boundaries and not yet visited)
        const isValidNextMove = this.isValid(board, nextRow, nextCol, 0); 
        
        if (isValidNextMove) {
          // If the move is valid, recursively call solveRecursive for the next position
          if (solveRecursive(nextRow, nextCol, moveNum + 1)) {
            return true; // If a solution is found in the recursive call, propagate success
          }
          
          // If the recursive call did not lead to a solution (i.e., it hit a dead end),
          // backtrack: undo the move on the board and record the backtracking step.
          board[nextRow][nextCol] = 0; // Reset the cell to 0 (unvisited)
          steps.push({
            row: nextRow,
            col: nextCol,
            value: 0, // The value becomes 0 after backtracking
            isValid: false, // This specific path was not successful
            isBacktracking: true // Mark as a backtracking step
          });
        } else {
          // If the move is not valid (out of bounds or already visited),
          // record it as an invalid attempt for visualization purposes.
          steps.push({
            row: nextRow,
            col: nextCol,
            value: moveNum + 1, // The value it would have been if valid
            isValid: false, // Mark as an invalid attempt
            isBacktracking: false // Not backtracking, just a failed attempt
          });
        }
      }
      
      // If no valid path is found from the current position (and it's not the initial move),
      // backtrack from the current position itself.
      // The initial (0,0) position (moveNum 1) should only be "backtracked" if no solution exists from it at all.
      if (moveNum > 1) { 
          board[row][col] = 0; // Reset the current cell to 0
          steps.push({
              row: row,
              col: col,
              value: 0, // Value becomes 0 after backtracking
              isValid: false,
              isBacktracking: true
          });
      }
      return false; // No solution found from this path
    };
    
    // Start the Knight's Tour from the top-left corner (0,0) with the first move (move number 1).
    // The first move is handled by the initial call to solveRecursive.
    solveRecursive(0, 0, 1);
    
    return steps;
  },
  
  /**
   * Checks if a given position (row, col) is a valid move on the board.
   * A move is valid if it's within board boundaries and the cell has not been visited yet.
   * @param board The current state of the board.
   * @param row The row to check.
   * @param col The column to check.
   * @param _: Unused parameter (placeholder for consistency with Algorithm interface).
   * @returns True if the position is valid, false otherwise.
   */
  isValid(board: number[][], row: number, col: number, _: number): boolean {
    const size = board.length;
    return (
      row >= 0 && row < size && // Check if within row boundaries
      col >= 0 && col < size && // Check if within column boundaries
      board[row][col] === 0     // Check if the cell has not been visited (value is 0)
    );
  },
  
  /**
   * Placeholder function to get the next step in a sequence.
   * In a real implementation, this would return a specific step from a pre-calculated solution.
   * For this algorithm, the 'steps' array returned by 'solve' is typically iterated.
   * @param currentStep The index of the current step.
   * @returns Null, as this is not fully implemented for real-time step-by-step control.
   */
  getNextStep(currentStep: number): PuzzleStep | null {
    return null;
  },
  
  /**
   * Builds a simplified decision tree representation for demonstration purposes.
   * This is not a full, dynamic tree of all possible moves, but a basic example.
   * @returns A TreeNode representing the root of the decision tree.
   */
  buildDecisionTree(): TreeNode {
    return {
      id: 'root',
      label: 'Start',
      children: [
        {
          id: 'node1',
          label: '(0,0)=1', // Represents the first move at (0,0) with value 1
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
