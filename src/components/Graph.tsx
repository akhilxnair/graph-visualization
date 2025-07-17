// Import Modules
import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';

// Import Types
import type { GraphData } from '../types/graph';
import type { FilterType } from '../hooks/useGraphData';

// Import Styles
import '@xyflow/react/dist/style.css';

// Import Hooks
import { useGraphData } from '../hooks/useGraphData';

// Import Components
import CustomNode from './CustomNode';
import ConnectionLine from './ConnectionLine';

// Filter button component
interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${isActive
          ? 'bg-white text-blue-600'
          : 'bg-blue-700 text-white hover:bg-blue-800'
        }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// Filter buttons component
interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterButtonsComponent: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className="absolute top-4 right-4 flex space-x-2 z-10">
      <FilterButton
        label="All"
        isActive={activeFilter === 'all'}
        onClick={() => onFilterChange('all')}
      />
      <FilterButton
        label="Alerts"
        isActive={activeFilter === 'alerts'}
        onClick={() => onFilterChange('alerts')}
      />
      <FilterButton
        label="Misconfigs"
        isActive={activeFilter === 'misconfigs'}
        onClick={() => onFilterChange('misconfigs')}
      />
    </div>
  );
};

interface GraphProps {
  data: GraphData;
  onNodeClick?: (nodeId: string) => void;
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  // Use our custom hook to transform data
  const {
    nodes,
    edges,
    handleNodeClick,
    activeFilter,
    handleFilterChange
  } = useGraphData(data);

  // Define node types mapping
  const nodeTypes = {
    default: CustomNode,
  };

  return (
    <div className="w-full h-full relative">
      <FilterButtonsComponent
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        connectionLineComponent={ConnectionLine}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;