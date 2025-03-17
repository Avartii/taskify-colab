
import { Board as BoardType, Column as ColumnType, Task as TaskType } from '@/lib/types';

export interface BoardProps {
  initialBoard: BoardType;
}

export interface DragState {
  draggingColumnId: string | null;
  draggingTaskId: string | null;
  draggingOverColumnId: string | null;
}

export interface BoardActions {
  handleAddColumn: (title: string) => void;
  handleUpdateColumn: (columnId: string, updatedColumn: Partial<ColumnType>) => void;
  handleDeleteColumn: (columnId: string) => void;
  handleAddTask: (columnId: string, task: TaskType) => void;
  handleDeleteTask: (columnId: string, taskId: string) => void;
  handleDragStart: (e: React.DragEvent, columnId: string, taskId?: string) => void;
  handleDragOver: (e: React.DragEvent, columnId: string) => void;
  handleDrop: (e: React.DragEvent, columnId: string) => void;
}
