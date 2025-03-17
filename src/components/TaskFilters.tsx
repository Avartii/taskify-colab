
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskFiltersProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilterChange, currentFilter }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center mb-4 animate-fade-in">
      <div className="flex items-center gap-1 text-muted-foreground text-sm mr-1">
        <Filter size={16} />
        <span>Filter by:</span>
      </div>
      
      <Select value={currentFilter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm border-border/50">
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="high">High Priority</SelectItem>
          <SelectItem value="medium">Medium Priority</SelectItem>
          <SelectItem value="low">Low Priority</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onFilterChange('all')}
        className={`flex items-center gap-1 ${currentFilter === 'all' ? 'bg-primary/10' : 'bg-white/80'}`}
      >
        <Tag size={14} />
        Clear
      </Button>
    </div>
  );
};

export default TaskFilters;
