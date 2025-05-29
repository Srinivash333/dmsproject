import React, { useRef, useEffect } from 'react';
import { usePuzzleContext } from '../context/PuzzleContext';

export const DecisionTree: React.FC = () => {
  const { 
    decisionTree, 
    currentStepNumber 
  } = usePuzzleContext();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !decisionTree) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the decision tree - simplified for now
    // In a real implementation, this would be more complex with proper tree layout algorithms
    const drawTree = () => {
      if (!decisionTree) return;
      
      // This is a placeholder - the actual implementation would draw the tree structure
      ctx.font = '14px Arial';
      ctx.fillStyle = '#4b5563'; // text-gray-600
      ctx.textAlign = 'center';
      ctx.fillText('Decision tree visualization will appear here', canvas.width / 2, canvas.height / 2);
      
      // Example line drawing
      ctx.strokeStyle = '#3b82f6'; // blue-500
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 50);
      ctx.lineTo(150, 100);
      ctx.stroke();
    };
    
    drawTree();
  }, [decisionTree, currentStepNumber]);

  if (!decisionTree) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">
          The decision tree will appear as the algorithm runs
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <canvas 
        ref={canvasRef} 
        className="min-w-full h-64 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700"
        width={800}
        height={256}
      />
    </div>
  );
};