
import React from 'react';
import { Task as TaskType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Calendar, Clock, X, AlertTriangle, CheckCircle, Circle } from 'lucide-react';

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

const getPriorityIcon = (priority?: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return <AlertTriangle className="h-3 w-3" />;
    case 'medium':
      return <Clock className="h-3 w-3" />;
    case 'low':
      return <CheckCircle className="h-3 w-3" />;
    default:
      return <Circle className="h-3 w-3" />;
  }
};

const Task: React.FC<TaskProps> = ({ task, isDragging, onDelete }) => {
  return (
    <div
      className={cn(
        'glass-card p-4 rounded-lg mb-3 cursor-grab active:cursor-grabbing animate-scale-in transition-all',
        `border-l-4 ${task.priority === 'high' ? 'border-l-destructive' : 
                      task.priority === 'medium' ? 'border-l-amber-500' : 
                      task.priority === 'low' ? 'border-l-emerald-500' : 
                      'border-l-gray-300'}`,
        isDragging && 'task-dragging shadow-lg'
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm mb-2">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-muted-foreground/50 hover:text-destructive transition-colors -mt-1 -mr-1 p-1 rounded-full hover:bg-destructive/10"
          aria-label="Delete task"
        >
          <X size={16} />
        </button>
      </div>
      
      {task.description && (
        <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mt-2">
        {task.priority && (
          <span className={cn('text-xs px-2 py-0.5 rounded-full border flex items-center gap-1', getPriorityColor(task.priority))}>
            {getPriorityIcon(task.priority)}
            {task.priority}
          </span>
        )}
        
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-primary/10 text-primary/80 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
        
        {task.dueDate && (
          <span className="text-xs flex items-center gap-1 ml-auto text-muted-foreground">
            <Calendar size={12} />
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
