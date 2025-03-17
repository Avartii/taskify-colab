
import { useState } from 'react';
import { Board as BoardType } from '@/lib/types';
import { DragState } from './types';
import { toast } from '@/components/ui/use-toast';

export function useBoardDragDrop(board: BoardType, setBoard: React.Dispatch<React.SetStateAction<BoardType>>) {
  const [dragState, setDragState] = useState<DragState>({
    draggingColumnId: null,
    draggingTaskId: null,
    draggingOverColumnId: null,
  });

  const handleDragStart = (e: React.DragEvent, columnId: string, taskId?: string) => {
    if (taskId) {
      e.dataTransfer.setData('taskId', taskId);
      setDragState(prev => ({ ...prev, draggingTaskId: taskId }));
    } else {
      e.dataTransfer.setData('columnId', columnId);
      setDragState(prev => ({ ...prev, draggingColumnId: columnId }));
    }
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragState(prev => ({ ...prev, draggingOverColumnId: columnId }));
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const draggedTaskId = e.dataTransfer.getData('taskId');
    const draggedColumnId = e.dataTransfer.getData('columnId');
    
    // Reset drag state
    setDragState({
      draggingTaskId: null,
      draggingColumnId: null,
      draggingOverColumnId: null,
    });
    
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
        variant: 'default',
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

  return {
    ...dragState,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}
