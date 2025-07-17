// Import Modules
import React from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';

// Import Types
import type { GraphData } from '../types/graph';

// Import Styles
import '@xyflow/react/dist/style.css';

// Import Hooks
import { useGraphData } from '../hooks/useGraphData';

// Import Components
import CustomNode from './CustomNode';
import ConnectionLine from './ConnectionLine';

interface GraphProps {
  data: GraphData;
  onNodeClick?: (nodeId: string) => void;
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  // Use our custom hook to transform data
  const { nodes, edges, handleNodeClick } = useGraphData(data);

  // Define node types mapping
  const nodeTypes = {
    default: CustomNode,
  };

  return (
    <div className="w-full h-full">
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