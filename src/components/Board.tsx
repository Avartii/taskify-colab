
import React, { useState, useEffect } from 'react';
import Column from './Column';
import NewItemForm from './NewItemForm';
import { Board as BoardType, Column as ColumnType, Task as TaskType } from '@/lib/types';
import { generateId } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';

interface BoardProps {
  initialBoard: BoardType;
}

const Board: React.FC<BoardProps> = ({ initialBoard }) => {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [draggingColumnId, setDraggingColumnId] = useState<string | null>(null);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [draggingOverColumnId, setDraggingOverColumnId] = useState<string | null>(null);

  // Persist board state to localStorage
  useEffect(() => {
    const storedBoard = localStorage.getItem('taskBoard');
    if (storedBoard) {
      try {
        setBoard(JSON.parse(storedBoard));
      } catch (e) {
        console.error('Failed to parse stored board');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskBoard', JSON.stringify(board));
  }, [board]);

  const handleAddColumn = (title: string) => {
    const newColumn: ColumnType = {
      id: generateId(),
      title,
      tasks: [],
    };
    
    setBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, newColumn],
    }));
    
    toast({
      title: 'Column added',
      description: `Column "${title}" has been created.`,
    });
  };

  const handleUpdateColumn = (columnId: string, updatedColumn: Partial<ColumnType>) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === columnId ? { ...column, ...updatedColumn } : column
      ),
    }));
  };

  const handleDeleteColumn = (columnId: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.filter((column) => column.id !== columnId),
    }));
    
    toast({
      title: 'Column deleted',
      description: 'The column has been removed.',
    });
  };

  const handleAddTask = (columnId: string, task: TaskType) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, task] }
          : column
      ),
    }));
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      ),
    }));
  };

  const handleDragStart = (e: React.DragEvent, columnId: string, taskId?: string) => {
    if (taskId) {
      e.dataTransfer.setData('taskId', taskId);
      setDraggingTaskId(taskId);
    } else {
      e.dataTransfer.setData('columnId', columnId);
      setDraggingColumnId(columnId);
    }
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDraggingOverColumnId(columnId);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const draggedTaskId = e.dataTransfer.getData('taskId');
    const draggedColumnId = e.dataTransfer.getData('columnId');
    
    // Reset drag state
    setDraggingTaskId(null);
    setDraggingColumnId(null);
    setDraggingOverColumnId(null);
    
    // Handle task drop
    if (draggedTaskId) {
      // Find the source column containing the task
      const sourceColumn = board.columns.find((column) =>
        column.tasks.some((task) => task.id === draggedTaskId)
      );
      
      if (!sourceColumn) return;
      
      // Skip if dropping in the same column
      if (sourceColumn.id === targetColumnId) return;
      
      // Find the task being moved
      const taskToMove = sourceColumn.tasks.find(
        (task) => task.id === draggedTaskId
      );
      
      if (!taskToMove) return;
      
      // Remove task from source column and add to target column
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((column) => {
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== draggedTaskId),
            };
          }
          if (column.id === targetColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, taskToMove],
            };
          }
          return column;
        }),
      }));
      
      toast({
        title: 'Task moved',
        description: `Task moved to "${board.columns.find(col => col.id === targetColumnId)?.title}".`,
      });
    }
    
    // Handle column drop
    else if (draggedColumnId) {
      // Skip if dropping the column onto itself
      if (draggedColumnId === targetColumnId) return;
      
      // Reorder columns
      const columnOrder = board.columns.map((column) => column.id);
      const draggedIndex = columnOrder.indexOf(draggedColumnId);
      const targetIndex = columnOrder.indexOf(targetColumnId);
      
      if (draggedIndex === -1 || targetIndex === -1) return;
      
      // Create new column order
      const newColumnOrder = [...columnOrder];
      newColumnOrder.splice(draggedIndex, 1);
      newColumnOrder.splice(targetIndex, 0, draggedColumnId);
      
      // Update board with new column order
      setBoard((prev) => ({
        ...prev,
        columns: newColumnOrder.map(
          (id) => prev.columns.find((column) => column.id === id)!
        ),
      }));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <NewItemForm
          onAdd={handleAddColumn}
          placeholder="Add a new column..."
          buttonText="Add Column"
        />
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onUpdateColumn={handleUpdateColumn}
            onDeleteColumn={handleDeleteColumn}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isDraggingOver={draggingOverColumnId === column.id}
            draggingTaskId={draggingTaskId}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
