
import React from 'react';
import Header from '@/components/Header';
import Board from '@/components/Board';
import { initialData } from '@/lib/data';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Board initialBoard={initialData} />
      </main>
    </div>
  );
};

export default Index;
