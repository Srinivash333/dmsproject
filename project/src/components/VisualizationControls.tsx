import React from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, RefreshCw, 
  FastForward, Zap
} from 'lucide-react';
import { usePuzzleContext } from '../context/PuzzleContext';

export const VisualizationControls: React.FC = () => {
  const { 
    isRunning, 
    toggleRunning, 
    stepForward, 
    stepBackward, 
    reset,
    completeSolve,
    speed,
    setSpeed
  } = usePuzzleContext();

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          onClick={reset}
          className="flex items-center space-x-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset</span>
        </button>
        
        <button 
          onClick={stepBackward}
          className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        
        <button 
          onClick={toggleRunning}
          className="flex items-center space-x-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Play</span>
            </>
          )}
        </button>
        
        <button 
          onClick={stepForward}
          className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>
        
        <button 
          onClick={completeSolve}
          className="flex items-center space-x-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          <Zap className="w-4 h-4" />
          <span>Complete</span>
        </button>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Slow</span>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={speed} 
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-48 accent-blue-600"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">Fast</span>
        <FastForward className="w-4 h-4 ml-1 text-gray-600 dark:text-gray-400" />
      </div>
    </div>
  );
};