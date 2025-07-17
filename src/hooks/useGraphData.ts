// Import Modules
import { useMemo, useState, useCallback } from 'react';

// Import Types
import type { Node, Edge, NodeMouseHandler } from '@xyflow/react';
import type { GraphData } from '../types/graph';

const HORIZONTAL_SPACING = 250;
const VERTICAL_SPACING = 200;

// Define filter types
export type FilterType = 'all' | 'alerts' | 'misconfigs';

export const useGraphData = (data: GraphData) => {
  // State for collapsed nodes
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    data.nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        initial[node.id] = true; // collapsed by default
      }
    });
    return initial;
  });

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Handle node click for expand/collapse
  const handleNodeClick: NodeMouseHandler = useCallback((_, node) => {
    const hasChildren = node.data?.children?.length > 0;
    if (!hasChildren) return;

    setCollapsedNodes((prev) => ({
      ...prev,
      [node.id]: !prev[node.id],
    }));
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
  }, []);

  // Build a map of parent-child relationships
  const parentChildMap = useMemo(() => {
    const nodeParents: Record<string, string> = {};
    
    // Build parent-child relationships
    data.nodes.forEach(node => {
      if (node.children) {
        node.children.forEach(childId => {
          nodeParents[childId] = node.id;
        });
      }
    });
    
    return nodeParents;
  }, [data.nodes]);

  // Filter the data based on the active filter
  const filteredData = useMemo(() => {
    if (activeFilter === 'all') {
      return data;
    }

    // Create a filtered copy of the data
    const filtered: GraphData = {
      nodes: [],
      edges: [...data.edges]
    };

    // First pass: identify nodes that match the filter criteria
    const matchingNodes = new Set<string>();
    data.nodes.forEach(node => {
      if (
        (activeFilter === 'alerts' && node.alerts > 0) ||
        (activeFilter === 'misconfigs' && node.misconfigs > 0)
      ) {
        matchingNodes.add(node.id);
        
        // Also add all parent nodes to ensure the hierarchy is preserved
        let currentId = node.id;
        while (parentChildMap[currentId]) {
          matchingNodes.add(parentChildMap[currentId]);
          currentId = parentChildMap[currentId];
        }
      }
    });

    // Second pass: filter nodes based on the matching set
    filtered.nodes = data.nodes.filter(node => matchingNodes.has(node.id));

    // Filter edges to only include connections between visible nodes
    const visibleNodeIds = new Set(filtered.nodes.map(node => node.id));
    filtered.edges = filtered.edges.filter(
      edge => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );

    return filtered;
  }, [data, activeFilter, parentChildMap]);

  // Generate React Flow nodes and edges
  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map(filteredData.nodes.map((n) => [n.id, n]));
    const reactFlowNodes: Node[] = [];
    const visited = new Set<string>();

    // Keep track of current y offset
    let yCursor = 0;

    // Check if a node should be visible based on parent's collapsed state
    const isNodeVisible = (nodeId: string): boolean => {
      // If node doesn't exist in the filtered data, it's not visible
      if (!nodeMap.has(nodeId)) return false;
      
      // If node has no parent, it's always visible
      const parentId = parentChildMap[nodeId];
      if (!parentId) return true;
      
      // If parent is collapsed, node is not visible
      const isParentCollapsed = collapsedNodes[parentId] ?? false;
      if (isParentCollapsed) return false;
      
      // Recursively check if any ancestor is collapsed
      return isNodeVisible(parentId);
    };

    const buildTree = (id: string, depth: number): number => {
      const node = nodeMap.get(id);
      if (!node) return 0;
      if (visited.has(id)) return 0;
      visited.add(id);

      const isCollapsed = collapsedNodes[id] ?? false;
      let childPositions: number[] = [];

      if (!isCollapsed && node.children?.length) {
        for (const childId of node.children) {
          // Only process children that are in the filtered data and should be visible
          if (nodeMap.has(childId) && isNodeVisible(childId)) {
            const childY = buildTree(childId, depth + 1);
            childPositions.push(childY);
          }
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
        style: { 
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        data: {
          ...node,
          isCollapsed,
        },
      });

      return currentY;
    };

    // Find all root nodes (nodes that are not children of any other node)
    const rootNodes = filteredData.nodes.filter(node => !parentChildMap[node.id]);
    
    // Build tree from each root node
    rootNodes.forEach((node) => {
      buildTree(node.id, 0);
    });

    const visibleNodeIds = new Set(reactFlowNodes.map((n) => n.id));

    const reactFlowEdges: Edge[] = filteredData.edges
      .filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      .map((e) => ({
        id: `e-${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated: true,
        style: { 
          strokeWidth: 2,
          stroke: '#b1b1b7',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        },
      }));

    return { nodes: reactFlowNodes, edges: reactFlowEdges };
  }, [filteredData, collapsedNodes, parentChildMap]);

  return { 
    nodes, 
    edges, 
    handleNodeClick,
    activeFilter,
    handleFilterChange
  };
};