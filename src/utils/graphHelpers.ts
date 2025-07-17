// Import Types
import type { NodeData } from '../types/graph';


/**
 * Gets all descendant node IDs for a given node
 * @param nodeId ID of the node to get descendants for
 * @param nodes List of all nodes
 * @returns Array of descendant node IDs
 */

export const getDescendantNodeIds = (nodeId: string, nodes: NodeData[]): string[] => {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node || !node.children || node.children.length === 0) {
    return [];
  }

  const childrenIds = node.children;
  const descendantIds: string[] = [...childrenIds];

  childrenIds.forEach((childId: string) => {
    const childDescendants = getDescendantNodeIds(childId, nodes);
    descendantIds.push(...childDescendants);
  });

  return descendantIds;
};
