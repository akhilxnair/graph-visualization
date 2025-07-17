// Import Types
import type { NodeData } from '../types/graph';

/**
 * Calculates the severity level based on the number of alerts and misconfigurations
 * @param alerts Number of alerts
 * @param misconfigurations Number of misconfigurations
 * @returns Severity level as 'low', 'medium', 'high', or 'critical'
 */
export const calculateSeverity = (alerts: number, misconfigurations: number): 'low' | 'medium' | 'high' | 'critical' => {
  const total = alerts + misconfigurations;

  if (total === 0) return 'low';
  if (total < 5) return 'low';
  if (total < 15) return 'medium';
  if (total < 30) return 'high';
  return 'critical';
};

/**
 * Gets the color for a node based on its severity
 * @param severity Severity level
 * @returns CSS color class
 */
export const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical'): string => {
  switch (severity) {
    case 'low':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-orange-500';
    case 'critical':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

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
