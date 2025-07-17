import { useMemo } from 'react';
import type { Node, Edge } from '@xyflow/react';
import type { GraphData } from '../types/graph';

const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 150;

export const useGraphData = (data: GraphData) => {
  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));

    const reactFlowNodes: Node[] = [];
    const visited = new Set<string>();

    let x = 0;

    const placeNode = (id: string, depth: number) => {
      if (visited.has(id)) return;
      visited.add(id);

      const originalNode = nodeMap.get(id);
      if (!originalNode) return;

      const reactNode: Node = {
        id: originalNode.id,
        type: 'default',
        position: {
          x: x * HORIZONTAL_SPACING,
          y: depth * VERTICAL_SPACING,
        },
        data: {
          label: originalNode.label,
          alerts: originalNode.alerts,
          misconfigs: originalNode.misconfigs,
          type: originalNode.type,
          children: originalNode.children || [],
        },
      };

      reactFlowNodes.push(reactNode);
      x++;

      if (originalNode.children) {
        for (const childId of originalNode.children) {
          placeNode(childId, depth + 1);
        }
      }
    };

    // Start from cloud as root
    placeNode('cloud', 0);

    const reactFlowEdges: Edge[] = data.edges.map((e, i) => ({
      id: `e-${e.source}-${e.target}`,
      source: e.source,
      target: e.target,
      type: 'smoothstep',
    }));

    return {
      nodes: reactFlowNodes,
      edges: reactFlowEdges,
    };
  }, [data]);

  return { nodes, edges };
};
