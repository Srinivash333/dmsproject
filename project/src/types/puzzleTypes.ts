import React from 'react';

export enum PuzzleType {
  SUDOKU = 'SUDOKU',
  N_QUEENS = 'N_QUEENS',
  KNIGHTS_TOUR = 'KNIGHTS_TOUR'
}

export enum DifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface PuzzleStep {
  row: number;
  col: number;
  value: number;
  isValid: boolean;
  isBacktracking: boolean;
}

export interface TreeNode {
  id: string;
  label: string;
  children: TreeNode[];
  isCurrentPath: boolean;
  isExplored: boolean;
  isBacktracked: boolean;
}

// Base algorithm interface
export interface Algorithm {
  initialize(difficulty: DifficultyLevel): any;
  solve(state: any): PuzzleStep[];
  isValid(state: any, row: number, col: number, value: number): boolean;
  getNextStep(currentStep: number): PuzzleStep | null;
  buildDecisionTree(): TreeNode;
}