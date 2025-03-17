
import { Board, Column, Task } from './types';

export const initialData: Board = {
  id: 'board-1',
  title: 'My Tasks',
  columns: [
    {
      id: 'column-1',
      title: 'To Do',
      tasks: [
        {
          id: 'task-1',
          title: 'Brainstorm design ideas',
          description: 'Create wireframes and mockups for the new project',
          priority: 'medium',
          tags: ['design'],
        },
        {
          id: 'task-2',
          title: 'Research competitors',
          description: 'Analyze similar products in the market',
          priority: 'low',
          tags: ['research'],
        },
        {
          id: 'task-3',
          title: 'Team meeting',
          description: 'Weekly sync with the team',
          priority: 'high',
          dueDate: '2023-09-15',
          tags: ['meeting'],
        },
      ],
    },
    {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-4',
          title: 'Develop landing page',
          description: 'Implement the new landing page design',
          priority: 'high',
          tags: ['development', 'frontend'],
        },
        {
          id: 'task-5',
          title: 'Fix navbar responsiveness',
          description: 'Address mobile navigation issues',
          priority: 'medium',
          tags: ['bug', 'frontend'],
        },
      ],
    },
    {
      id: 'column-3',
      title: 'Done',
      tasks: [
        {
          id: 'task-6',
          title: 'Update documentation',
          description: 'Revise API documentation with new endpoints',
          priority: 'medium',
          tags: ['documentation'],
        },
      ],
    },
  ],
};

// Utility function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
