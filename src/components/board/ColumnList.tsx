
import React from 'react';
import Column from '../Column';
import { Board as BoardType } from '@/lib/types';
import { BoardActions } from './types';

interface ColumnListProps {
  filteredColumns: BoardType['columns'];
  boardActions: BoardActions;
  draggingTaskId: string | null;
  draggingOverColumnId: string | null;
}

const ColumnList: React.FC<ColumnListProps> = ({
  filteredColumns,
  boardActions,
  draggingTaskId,
  draggingOverColumnId,
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
      {filteredColumns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onUpdateColumn={boardActions.handleUpdateColumn}
          onDeleteColumn={boardActions.handleDeleteColumn}
          onAddTask={boardActions.handleAddTask}
          onDeleteTask={boardActions.handleDeleteTask}
          onDragStart={boardActions.handleDragStart}
          onDragOver={boardActions.handleDragOver}
          onDrop={boardActions.handleDrop}
          isDraggingOver={draggingOverColumnId === column.id}
          draggingTaskId={draggingTaskId}
        />
      ))}
    </div>
  );
};

export default ColumnList;
