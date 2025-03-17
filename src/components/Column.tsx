
import React, { useState } from 'react';
import Task from './Task';
import NewItemForm from './NewItemForm';
import { Column as ColumnType, Task as TaskType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { generateId } from '@/lib/data';

interface ColumnProps {
  column: ColumnType;
  onUpdateColumn: (columnId: string, updatedColumn: Partial<ColumnType>) => void;
  onDeleteColumn: (columnId: string) => void;
  onAddTask: (columnId: string, task: TaskType) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onDragStart: (e: React.DragEvent, columnId: string, taskId?: string) => void;
  onDragOver: (e: React.DragEvent, columnId: string) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  isDraggingOver: boolean;
  draggingTaskId: string | null;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onUpdateColumn,
  onDeleteColumn,
  onAddTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
  isDraggingOver,
  draggingTaskId,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(column.title);

  const handleTitleChange = () => {
    if (title.trim() && title !== column.title) {
      onUpdateColumn(column.id, { title });
    } else {
      setTitle(column.title);
    }
    setIsEditingTitle(false);
  };

  const handleAddTask = (taskTitle: string) => {
    const newTask: TaskType = {
      id: generateId(),
      title: taskTitle,
    };
    onAddTask(column.id, newTask);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(column.id, taskId);
  };

  return (
    <div
      className={cn(
        'w-[300px] shrink-0 p-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-border/30',
        isDraggingOver && 'column-drop-preview',
      )}
      draggable
      onDragStart={(e) => onDragStart(e, column.id)}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex items-center justify-between mb-3">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleChange();
              if (e.key === 'Escape') {
                setTitle(column.title);
                setIsEditingTitle(false);
              }
            }}
            className="font-semibold text-sm px-2 py-1 w-full rounded bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            autoFocus
          />
        ) : (
          <h2
            className="font-semibold text-sm cursor-pointer hover:text-primary/80 transition-colors px-2 py-1"
            onClick={() => setIsEditingTitle(true)}
          >
            {column.title}
          </h2>
        )}
        <button
          onClick={() => onDeleteColumn(column.id)}
          className="text-muted-foreground/50 hover:text-destructive transition-colors p-1 rounded-full"
          aria-label="Delete column"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {column.tasks.map((task, index) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, column.id, task.id)}
          >
            <Task
              task={task}
              index={index}
              isDragging={draggingTaskId === task.id}
              onDelete={handleDeleteTask}
            />
          </div>
        ))}
      </div>

      <div className="mt-3">
        <NewItemForm
          onAdd={handleAddTask}
          placeholder="Add a task..."
          buttonText="Add"
        />
      </div>
    </div>
  );
};

export default Column;
