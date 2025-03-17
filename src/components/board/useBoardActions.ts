
import { useState } from 'react';
import { Board as BoardType, Column as ColumnType, Task as TaskType } from '@/lib/types';
import { generateId } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';
import { useBoardDragDrop } from './useBoardDragDrop';
import { BoardActions } from './types';

export function useBoardActions(initialBoard: BoardType): [BoardType, BoardActions, ReturnType<typeof useBoardDragDrop>] {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const dragDrop = useBoardDragDrop(board, setBoard);

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

  const boardActions: BoardActions = {
    handleAddColumn,
    handleUpdateColumn,
    handleDeleteColumn,
    handleAddTask,
    handleDeleteTask,
    handleDragStart: dragDrop.handleDragStart,
    handleDragOver: dragDrop.handleDragOver,
    handleDrop: dragDrop.handleDrop,
  };

  return [board, boardActions, dragDrop];
}
