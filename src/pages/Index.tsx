
import React from 'react';
import Header from '@/components/Header';
import Board from '@/components/Board';
import { initialData } from '@/lib/data';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10" />
      
      <Header />
      <main className="flex-1 overflow-hidden">
        <Board initialBoard={initialData} />
      </main>
    </div>
  );
};

export default Index;
