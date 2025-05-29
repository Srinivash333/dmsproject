import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  PuzzleType, 
  DifficultyLevel, 
  PuzzleStep,
  TreeNode
} from '../types/puzzleTypes';
import { sudokuAlgorithm } from '../algorithms/sudokuAlgorithm';
import { nQueensAlgorithm } from '../algorithms/nQueensAlgorithm';
import { knightsTourAlgorithm } from '../algorithms/knightsTourAlgorithm';

interface PuzzleContextType {
  selectedPuzzle: PuzzleType | null;
  setSelectedPuzzle: (type: PuzzleType) => void;
  difficultyLevel: DifficultyLevel | null;
  setDifficultyLevel: (level: DifficultyLevel) => void;
  puzzleState: any; // Consider making this more specific like number[][] | number[] based on puzzle
  isInitialized: boolean;
  isRunning: boolean;
  toggleRunning: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  completeSolve: () => void;
  speed: number;
  setSpeed: (speed: number) => void;
  statesExplored: number;
  recursionDepth: number;
  backtrackCount: number;
  executionTime: number;
  isComplete: boolean;
  stepsCount: number;
  currentStepNumber: number;
  currentStep: PuzzleStep | null;
  isExploring: boolean;
  decisionTree: TreeNode | null;
  initializePuzzle: () => void;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleType | null>(null);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel | null>(null);
  const [puzzleState, setPuzzleState] = useState<any>(null); // Initial state set to null
  const [steps, setSteps] = useState<PuzzleStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [statesExplored, setStatesExplored] = useState<number>(0);
  const [recursionDepth, setRecursionDepth] = useState<number>(0);
  const [backtrackCount, setBacktrackCount] = useState<number>(0);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [decisionTree, setDecisionTree] = useState<TreeNode | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Select the appropriate algorithm based on puzzle type, memoized with useCallback
  const getAlgorithm = useCallback(() => {
    switch (selectedPuzzle) {
      case PuzzleType.SUDOKU:
        return sudokuAlgorithm;
      case PuzzleType.N_QUEENS:
        return nQueensAlgorithm;
      case PuzzleType.KNIGHTS_TOUR:
        return knightsTourAlgorithm;
      default:
        return null;
    }
  }, [selectedPuzzle]); // Recreate only if selectedPuzzle changes

  // Initialize the puzzle with the selected type and difficulty, memoized with useCallback
  const initializePuzzle = useCallback(() => {
    if (!selectedPuzzle || !difficultyLevel) {
      console.log("Cannot initialize: Puzzle type or difficulty not set.");
      return;
    }
    
    const algorithm = getAlgorithm();
    if (!algorithm) {
      console.log("No algorithm selected.");
      return;
    }
    
    console.log(`Initializing ${selectedPuzzle} with difficulty ${difficultyLevel}`);
    
    // Initialize puzzle state from the algorithm
    const initialState = algorithm.initialize(difficultyLevel);
    setPuzzleState(initialState);
    
    // Get all solution steps by running the algorithm once
    // knightsTourAlgorithm.solve correctly makes its own internal copy, so passing initialState is safe.
    const solutionSteps = algorithm.solve(initialState); 
    setSteps(solutionSteps);
    
    // Reset visualization and statistics
    setCurrentStepIndex(-1); // Start before the first step
    setStatesExplored(0);
    setRecursionDepth(0);
    setBacktrackCount(0);
    setExecutionTime(0);
    setIsComplete(false);
    setIsRunning(false); // Ensure visualization is stopped on initialization
    
    // Build decision tree if the algorithm provides one
    setDecisionTree(algorithm.buildDecisionTree ? algorithm.buildDecisionTree() : null);
    setIsInitialized(true); // Mark as initialized
  }, [selectedPuzzle, difficultyLevel, getAlgorithm]); // Recreate only if these dependencies change

  // Effect to trigger initialization when puzzle type or difficulty changes
  useEffect(() => {
    // This effect should trigger initialization whenever selectedPuzzle or difficultyLevel changes.
    // The `initializePuzzle` function itself contains the logic to set `isInitialized` and reset other states.
    if (selectedPuzzle && difficultyLevel) {
      initializePuzzle();
    }
  }, [selectedPuzzle, difficultyLevel, initializePuzzle]); // Dependencies are just the selection and the memoized init function


  // Memoized stepForward for use in useEffect's dependencies
  const stepForward = useCallback(() => {
    setCurrentStepIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      if (newIndex < steps.length) {
        return newIndex;
      } else {
        setIsRunning(false); // Stop if at the end of steps
        setIsComplete(true); // Mark as complete
        return prevIndex; // Stay at the last index
      }
    });
  }, [steps.length]); // Depends on the total number of steps

  // Effect for auto-advancing visualization steps
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    // Auto-advance if visualization is running and there are more steps
    if (isRunning && currentStepIndex < steps.length - 1) {
      const delay = 1000 / speed; // Calculate delay based on speed slider
      timer = setTimeout(() => {
        stepForward(); // Advance to the next step
      }, delay);
    } else if (isRunning && currentStepIndex === steps.length - 1) {
      // If we reached the end while still playing, stop playing and mark complete
      setIsRunning(false);
      setIsComplete(true);
    }
    
    // Cleanup function: clear timeout if component unmounts or dependencies change
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRunning, currentStepIndex, speed, steps.length, stepForward]); // stepForward is a dependency

  // Effect to update puzzle state and statistics for the current step
  useEffect(() => {
    // This effect's job is to update the *visual* state based on `currentStepIndex`.
    // It should NOT have `puzzleState` in its dependency array, as it *updates* `puzzleState`.
    if (currentStepIndex >= 0 && steps.length > 0) {
      const currentStep = steps[currentStepIndex];
      
      // Ensure currentStep is valid and puzzleState has been initialized
      if (currentStep && puzzleState !== null) { 
        let newState: any;

        // Deep copy of puzzleState based on its current structure
        // The structure is determined by selectedPuzzle, which is a stable dependency.
        if (selectedPuzzle === PuzzleType.SUDOKU || selectedPuzzle === PuzzleType.KNIGHTS_TOUR) {
          newState = (puzzleState as number[][]).map((row: any) => [...row]);
        } else if (selectedPuzzle === PuzzleType.N_QUEENS) {
          newState = [...(puzzleState as number[])];
        } else {
          // Fallback or error if puzzleState is null or unexpected
          console.error("puzzleState is null or unexpected type when applying step.");
          return;
        }

        // Apply the current step's value to the new state
        if (selectedPuzzle === PuzzleType.SUDOKU || selectedPuzzle === PuzzleType.KNIGHTS_TOUR) {
          // For 2D arrays (SUDOKU, KNIGHTS_TOUR)
          if (currentStep.row >= 0 && currentStep.row < newState.length &&
              Array.isArray(newState[currentStep.row]) && // Ensure the row itself is an array
              currentStep.col >= 0 && currentStep.col < newState[currentStep.row].length) {
            if (!currentStep.isBacktracking) {
              newState[currentStep.row][currentStep.col] = currentStep.value;
            } else {
              newState[currentStep.row][currentStep.col] = 0; // Clear cell on backtrack
            }
          } else {
            console.warn("Attempted to update out-of-bounds for SUDOKU/KNIGHTS_TOUR:", currentStep);
          }
        } else if (selectedPuzzle === PuzzleType.N_QUEENS) {
          // For 1D array (N_QUEENS)
          if (currentStep.row >= 0 && currentStep.row < newState.length) {
            if (!currentStep.isBacktracking) {
              newState[currentStep.row] = currentStep.col;
            } else {
              newState[currentStep.row] = -1; // Remove queen on backtrack
            }
          } else {
            console.warn("Attempted to update out-of-bounds for N_QUEENS:", currentStep);
          }
        }
        
        setPuzzleState(newState); // Update the state immutably
      }

      // Update statistics based on the current step
      setStatesExplored(currentStepIndex + 1);
      
      // Calculate current recursion depth by counting valid forward steps
      const currentTheoreticalDepth = steps.slice(0, currentStepIndex + 1)
                                          .filter(step => step.isValid && !step.isBacktracking)
                                          .length;
      setRecursionDepth(currentTheoreticalDepth);

      // Calculate cumulative backtrack count
      const backtracksSoFar = steps.slice(0, currentStepIndex + 1)
                                   .filter(step => step.isBacktracking).length;
      setBacktrackCount(backtracksSoFar);
      
      // Simulate execution time (adjust as needed for realistic simulation)
      setExecutionTime(prevTime => prevTime + (Math.random() * 5) + 1);
    }
  }, [currentStepIndex, steps, selectedPuzzle]); // Removed puzzleState from dependencies

  // --- Control Functions (memoized with useCallback) ---

  // Order of these functions matters if they depend on each other in useCallback dependencies.
  // `reset` needs to be defined before `toggleRunning` if `toggleRunning` uses `reset` in its dependencies.

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setCurrentStepIndex(-1); // Reset index to before the first step
    // Re-initialize the puzzle state and steps based on current selection
    initializePuzzle(); 
  }, [initializePuzzle]); // Depends on initializePuzzle

  const toggleRunning = useCallback(() => {
    // If already complete and user wants to run, reset the puzzle first
    if (isComplete && !isRunning) { 
      reset(); 
    }
    setIsRunning(prev => !prev);
  }, [isComplete, isRunning, reset]); // Depends on reset

  const stepBackward = useCallback(() => {
    setCurrentStepIndex(prevIndex => {
      const newIndex = Math.max(-1, prevIndex - 1);
      setIsComplete(false); // If going backward, it's no longer 'complete'
      setIsRunning(false); // Stop auto-running if manually stepping
      return newIndex;
    });
  }, []);

  const completeSolve = useCallback(() => {
    setIsRunning(false); // Stop animation
    setIsComplete(true); // Mark as complete
    setCurrentStepIndex(steps.length - 1); // Jump to the last step

    // Create the final solved state by applying only non-backtracking steps
    if (steps.length > 0 && difficultyLevel && selectedPuzzle) { // Ensure necessary data is available
      const algorithm = getAlgorithm();
      if (algorithm) {
        // Start from a fresh initialized state to avoid previous visual artifacts
        const finalSolvedState = algorithm.initialize(difficultyLevel);
        
        for (const step of steps) {
          // Only apply forward moves that contributed to the solution
          if (!step.isBacktracking && step.isValid) { 
            if (selectedPuzzle === PuzzleType.SUDOKU || selectedPuzzle === PuzzleType.KNIGHTS_TOUR) {
              if (step.row >= 0 && step.row < finalSolvedState.length &&
                  Array.isArray(finalSolvedState[step.row]) && step.col >= 0 && step.col < finalSolvedState[step.row].length) {
                  finalSolvedState[step.row][step.col] = step.value;
              }
            } else if (selectedPuzzle === PuzzleType.N_QUEENS) {
              if (step.row >= 0 && step.row < finalSolvedState.length) {
                finalSolvedState[step.row] = step.col;
              }
            }
          }
        }
        setPuzzleState(finalSolvedState); // Update the state to the final solution
      }
    }
  }, [steps, getAlgorithm, selectedPuzzle, difficultyLevel]); // Dependencies for useCallback

  // Memoized context value to prevent unnecessary re-renders of consumers
  const value = React.useMemo(() => ({
    selectedPuzzle,
    setSelectedPuzzle,
    difficultyLevel,
    setDifficultyLevel,
    puzzleState,
    isInitialized,
    isRunning,
    toggleRunning,
    stepForward,
    stepBackward,
    reset,
    completeSolve,
    speed,
    setSpeed,
    statesExplored,
    recursionDepth,
    backtrackCount,
    executionTime,
    isComplete,
    stepsCount: steps.length,
    currentStepNumber: currentStepIndex + 1,
    currentStep: currentStepIndex >= 0 && steps[currentStepIndex] ? steps[currentStepIndex] : null,
    isExploring: currentStepIndex >= 0 && steps[currentStepIndex] ? !steps[currentStepIndex].isBacktracking : false,
    decisionTree,
    initializePuzzle // Expose for external controls that might trigger initial setup
  }), [
    selectedPuzzle, setSelectedPuzzle, difficultyLevel, setDifficultyLevel, puzzleState,
    isInitialized, isRunning, toggleRunning, stepForward, stepBackward, reset,
    completeSolve, speed, setSpeed, statesExplored, recursionDepth, backtrackCount,
    executionTime, isComplete, steps.length, currentStepIndex, steps, decisionTree,
    initializePuzzle
  ]);

  return (
    <PuzzleContext.Provider value={value}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
};
