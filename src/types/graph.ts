/**
 * Node types in the cloud security visualization
 * - cloud: Generic cloud provider
 * - account: Cloud account/subscription
 * - service: Cloud service (like S3, EC2, etc.)
 * - aws: AWS specific cloud provider
 * - gcp: GCP specific cloud provider
 * - saas: Software as a Service
 */
export type NodeType = 'cloud' | 'account' | 'service' | 'aws' | 'gcp' | 'saas';

/**
 * Base interface for all node data
 * This represents the common properties that all nodes in the graph will have
 */
export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  alerts: number;
  misconfigs: number; // Using misconfigs instead of misconfigurations to match sample data
  children?: string[];
  [key: string]: unknown; // Add index signature to make it compatible with Record<string, unknown>
}

/**
 * Define GraphNode to match the structure in sampleData.ts
 */
export type GraphNode = NodeData;

/**
 * Define GraphEdge to match the structure in sampleData.ts
 */
export interface GraphEdge {
  source: string;
  target: string;
  id?: string; // Making id optional since it's not used in all edges in sampleData
}

/**
 * Main graph data structure containing nodes and edges
 */
export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
