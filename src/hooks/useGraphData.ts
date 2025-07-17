// Import Modules
import { useMemo, useState, useCallback } from 'react';

// Import Types
import type { Node, Edge, NodeMouseHandler } from '@xyflow/react';
import type { GraphData } from '../types/graph';

const HORIZONTAL_SPACING = 250;
const VERTICAL_SPACING = 200;

export const useGraphData = (data: GraphData) => {
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    data.nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        initial[node.id] = true; // collapsed by default
      }
    });
    return initial;
  });

  const handleNodeClick: NodeMouseHandler = useCallback((_, node) => {
    const hasChildren = node.data?.children?.length > 0;
    if (!hasChildren) return;

    setCollapsedNodes((prev) => ({
      ...prev,
      [node.id]: !prev[node.id],
    }));
  }, []);

  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));
    const reactFlowNodes: Node[] = [];
    const visited = new Set<string>();

    // Keep track of current y offset
    let yCursor = 0;

    const buildTree = (id: string, depth: number): number => {
      const node = nodeMap.get(id);
      if (!node) return 0;
      if (visited.has(id)) return 0;
      visited.add(id);

      const isCollapsed = collapsedNodes[id] ?? false;
      let childPositions: number[] = [];

      if (!isCollapsed && node.children?.length) {
        for (const childId of node.children) {
          const childY = buildTree(childId, depth + 1);
          childPositions.push(childY);
        }
      }

      let currentY: number;

      if (childPositions.length > 0) {
        // Place parent in the vertical center of children
        const minY = Math.min(...childPositions);
        const maxY = Math.max(...childPositions);
        currentY = (minY + maxY) / 2;
      } else {
        // Place leaf node at next available row
        currentY = yCursor++;
      }

      reactFlowNodes.push({
        id,
        type: 'default',
        position: {
          x: depth * HORIZONTAL_SPACING,
          y: currentY * VERTICAL_SPACING,
        },
        data: {
          ...node,
          isCollapsed,
        },
      });

      return currentY;
    };

    // Start from root node — fallback to 'cloud' if no 'root'
    const root = data.nodes.find((n) => n.id === 'root') ?? data.nodes.find((n) => n.id === 'cloud');
    if (root) buildTree(root.id, 0);

    const visibleNodeIds = new Set(reactFlowNodes.map((n) => n.id));

    const reactFlowEdges: Edge[] = data.edges
      .filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      .map((e, i) => ({
        id: `e-${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated: false,
      }));

    return { nodes: reactFlowNodes, edges: reactFlowEdges };
  }, [data, collapsedNodes]);

  return { nodes, edges, handleNodeClick };
};
