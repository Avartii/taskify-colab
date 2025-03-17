
import React, { useState, useEffect } from 'react';
import { BoardProps } from './board/types';
import { useBoardActions } from './board/useBoardActions';
import BoardControls from './board/BoardControls';
import ColumnList from './board/ColumnList';

const Board: React.FC<BoardProps> = ({ initialBoard }) => {
  const [board, boardActions, dragDrop] = useBoardActions(initialBoard);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  
  // Persist board state to localStorage
  useEffect(() => {
    const storedBoard = localStorage.getItem('taskBoard');
    if (storedBoard) {
      try {
        const parsedBoard = JSON.parse(storedBoard);
        // Only update if the parsed board is different from the current board
        if (JSON.stringify(parsedBoard) !== JSON.stringify(board)) {
          // Instead of setting the board directly, we manually update it with the actions
          // This ensures the board update goes through the proper channels
          if (parsedBoard.columns) {
            parsedBoard.columns.forEach((column: any, index: number) => {
              if (index >= board.columns.length) {
                boardActions.handleAddColumn(column.title);
              }
            });
          }
        }
      } catch (e) {
        console.error('Failed to parse stored board');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskBoard', JSON.stringify(board));
  }, [board]);

  // Filter columns based on priority filter
  const filteredColumns = board.columns.map(column => {
    if (priorityFilter === 'all') {
      return column;
    }
    
    // Filter tasks based on priority
    return {
      ...column,
      tasks: column.tasks.filter(task => task.priority === priorityFilter)
    };
  });

  return (
    <div className="p-6">
      <BoardControls 
        onAddColumn={boardActions.handleAddColumn}
        onFilterChange={setPriorityFilter}
        currentFilter={priorityFilter}
      />
      
      <ColumnList 
        filteredColumns={filteredColumns}
        boardActions={boardActions}
        draggingTaskId={dragDrop.draggingTaskId}
        draggingOverColumnId={dragDrop.draggingOverColumnId}
      />
    </div>
  );
};

export default Board;
