import React from 'react';
import { PuzzleSelector } from './PuzzleSelector';
import { VisualizationControls } from './VisualizationControls';
import { PuzzleBoard } from './PuzzleBoard';
import { SolutionStats } from './SolutionStats';
import { DecisionTree } from './DecisionTree';
import { usePuzzleContext } from '../context/PuzzleContext';
import { Educational } from './Educational';

export const PuzzleVisualizer: React.FC = () => {
  const { selectedPuzzle } = usePuzzleContext();

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Puzzle Selection
        </h2>
        <PuzzleSelector />
      </div>

      {selectedPuzzle && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Puzzle Board
              </h2>
              <PuzzleBoard />
              <VisualizationControls />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Solution Statistics
              </h2>
              <SolutionStats />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Decision Tree Visualization
            </h2>
            <DecisionTree />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How DFS Solves This Puzzle
            </h2>
            <Educational />
          </div>
        </>
      )}
    </div>
  );
};