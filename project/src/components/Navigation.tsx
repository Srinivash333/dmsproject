import React from 'react';
import { Brain, SunMoon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Navigation: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8 text-blue-700 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            DFS Puzzle Solver
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          <SunMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};