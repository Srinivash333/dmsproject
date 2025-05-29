import React from 'react';
import { usePuzzleContext } from '../context/PuzzleContext';
import { 
  Clock, Sigma, GitBranch, Layers, ArrowRight, SkipForward
} from 'lucide-react';

export const SolutionStats: React.FC = () => {
  const { 
    statesExplored, 
    recursionDepth,
    backtrackCount,
    executionTime,
    isComplete,
    stepsCount,
    currentStepNumber
  } = usePuzzleContext();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
          <Sigma className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">States Explored</span>
            <span className="font-semibold">{statesExplored}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">Recursion Depth</span>
            <span className="font-semibold">{recursionDepth}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
          <SkipForward className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">Backtrack Count</span>
            <span className="font-semibold">{backtrackCount}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">Execution Time</span>
            <span className="font-semibold">{executionTime}ms</span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Solving Progress</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {isComplete ? 'Complete' : 'In Progress'}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStepNumber / stepsCount) * 100}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">Step {currentStepNumber}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">of {stepsCount}</span>
        </div>
      </div>
    </div>
  );
};