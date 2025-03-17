
import React from 'react';
import { Task as TaskType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TaskProps {
  task: TaskType;
  index: number;
  isDragging: boolean;
  onDelete: (taskId: string) => void;
}

const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'medium':
      return 'bg-amber-500/10 text-amber-700 border-amber-200';
    case 'low':
      return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

const Task: React.FC<TaskProps> = ({ task, isDragging, onDelete }) => {
  return (
    <div
      className={cn(
        'glass-card p-4 rounded-lg mb-3 cursor-grab active:cursor-grabbing animate-scale-in',
        isDragging && 'task-dragging',
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm mb-2">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-muted-foreground/50 hover:text-destructive transition-colors -mt-1 -mr-1 p-1 rounded-full"
          aria-label="Delete task"
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
      
      {task.description && (
        <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mt-2">
        {task.priority && (
          <span className={cn('text-xs px-2 py-0.5 rounded-full border', getPriorityColor(task.priority))}>
            {task.priority}
          </span>
        )}
        
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
        
        {task.dueDate && (
          <span className="text-xs flex items-center gap-1 ml-auto text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            {new Date(task.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default Task;
