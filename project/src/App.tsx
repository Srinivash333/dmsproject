import React from 'react';
import { Layout } from './components/Layout';
import { PuzzleVisualizer } from './components/PuzzleVisualizer';
import { PuzzleProvider } from './context/PuzzleContext';

function App() {
  return (
    <PuzzleProvider>
      <Layout>
        <PuzzleVisualizer />
      </Layout>
    </PuzzleProvider>
  );
}

export default App;