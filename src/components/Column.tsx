
import React, { useState } from 'react';
import Task from './Task';
import NewItemForm from './NewItemForm';
import { Column as ColumnType, Task as TaskType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { generateId } from '@/lib/data';
import { Grip, X, Plus } from 'lucide-react';

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
  const [isAddingTask, setIsAddingTask] = useState(false);

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
      priority: 'medium', // Default priority
    };
    onAddTask(column.id, newTask);
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(column.id, taskId);
  };

  const taskCount = column.tasks.length;

  return (
    <div
      className={cn(
        'w-[300px] shrink-0 p-3 rounded-lg bg-secondary/70 backdrop-blur-sm border border-border/30 transition-all',
        isDraggingOver && 'column-drop-preview'
      )}
      draggable
      onDragStart={(e) => onDragStart(e, column.id)}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex items-center justify-between mb-3 group">
        <div className="flex items-center gap-2">
          <div className="cursor-grab opacity-40 group-hover:opacity-100 transition-opacity">
            <Grip size={14} />
          </div>
          
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
            <div className="flex items-center gap-2">
              <h2
                className="font-semibold text-sm cursor-pointer hover:text-primary/80 transition-colors px-2 py-1"
                onClick={() => setIsEditingTitle(true)}
              >
                {column.title}
              </h2>
              <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
                {taskCount}
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => onDeleteColumn(column.id)}
          className="text-muted-foreground/50 hover:text-destructive transition-colors p-1 rounded-full hover:bg-destructive/10"
          aria-label="Delete column"
        >
          <X size={16} />
        </button>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-1 space-y-2">
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
        
        {isDraggingOver && column.tasks.length === 0 && (
          <div className="h-20 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Drop task here</p>
          </div>
        )}
      </div>

      <div className="mt-3">
        {isAddingTask ? (
          <NewItemForm
            onAdd={handleAddTask}
            placeholder="Enter task title..."
            buttonText="Add"
            onCancel={() => setIsAddingTask(false)}
          />
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full py-2 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary border border-dashed border-muted-foreground/30 hover:border-primary/30 rounded-md transition-colors hover:bg-primary/5"
          >
            <Plus size={14} />
            Add task
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;
