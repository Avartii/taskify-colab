
import React from 'react';
import NewItemForm from '../NewItemForm';
import TaskFilters from '../TaskFilters';

interface BoardControlsProps {
  onAddColumn: (title: string) => void;
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

const BoardControls: React.FC<BoardControlsProps> = ({
  onAddColumn,
  onFilterChange,
  currentFilter,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <NewItemForm
          onAdd={onAddColumn}
          placeholder="Add a new column..."
          buttonText="Add Column"
        />
        <TaskFilters 
          onFilterChange={onFilterChange} 
          currentFilter={currentFilter} 
        />
      </div>
    </div>
  );
};

export default BoardControls;
