// Import Modules
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud, Server, Database, AlertTriangle, SlidersVertical } from 'lucide-react';

// Import Types
import type { NodeData } from '../types/graph';

interface CustomNodeProps {
  data: NodeData;
  isConnectable: boolean;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, isConnectable }) => {
  const { type, label, alerts, misconfigs, children = [] } = data;

  // Determine icon and background color based on node type
  const getNodeStyle = () => {
    switch (type) {
      case 'cloud':
        return {
          icon: <Cloud className="w-8 h-8 text-white" />,
          bgColor: 'bg-blue-600',
          size: 'w-16 h-16',
          ringColor: 'ring-blue-500',
        };
      case 'account':
        return {
          icon: <Server className="w-8 h-8 text-white" />,
          bgColor: 'bg-purple-600',
          size: 'w-16 h-16',
          ringColor: 'ring-purple-500',
        };
      case 'service':
        switch (label.toLowerCase()) {
          case 's3':
            return {
              icon: <Database className="w-8 h-8 text-white" />,
              bgColor: 'bg-yellow-600',
              size: 'w-14 h-14',
              ringColor: 'ring-yellow-500',
            };
          case 'rds':
            return {
              icon: <Database className="w-8 h-8 text-white" />,
              bgColor: 'bg-blue-500',
              size: 'w-14 h-14',
              ringColor: 'ring-blue-500',
            };
          default:
            return {
              icon: <Database className="w-8 h-8 text-white" />,
              bgColor: 'bg-green-600',
              size: 'w-14 h-14',
              ringColor: 'ring-green-500',
            };
        }
      case 'aws':
        return {
          icon: <Cloud className="w-8 h-8 text-white" />,
          bgColor: 'bg-orange-500',
          size: 'w-16 h-16',
          ringColor: 'ring-orange-500',
        };
      case 'gcp':
        return {
          icon: <Cloud className="w-8 h-8 text-white" />,
          bgColor: 'bg-green-600',
          size: 'w-16 h-16',
          ringColor: 'ring-green-500',
        };
      case 'saas':
        return {
          icon: <Server className="w-8 h-8 text-white" />,
          bgColor: 'bg-blue-500',
          size: 'w-16 h-16',
          ringColor: 'ring-blue-500',
        };
      default:
        return {
          icon: <Cloud className="w-8 h-8 text-white" />,
          bgColor: 'bg-gray-500',
          size: 'w-16 h-16',
          ringColor: 'ring-gray-500',
        };
    }
  };

  const { icon, bgColor, size, ringColor } = getNodeStyle();

  return (
    <div className="relative flex flex-col items-center ">
      {/* Alerts and Misconfigs at the top */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 whitespace-nowrap">
        {alerts > 0 && (
          <div className="flex items-center space-x-1 bg-white rounded-md px-2 py-1 shadow-sm border border-gray-200">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-xs font-medium text-red-500">{alerts}</span>
          </div>
        )}
        {misconfigs > 0 && (
          <div className="flex items-center space-x-1 bg-white rounded-md px-2 py-1 shadow-sm border border-gray-200">
            <SlidersVertical className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-xs font-medium text-orange-500">{misconfigs}</span>
          </div>
        )}
      </div>

      {/* Node Circle */}
      <div
        className={
          `rounded-full shadow-lg flex items-center justify-center relative ${size} ${bgColor} ${data.children ? `ring-4 border-4 border-white-200 ${ringColor}` : ''} `}
      >
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gray-400"
        />

        {icon}

        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gray-400"
        />
      </div>

      {/* Label below the node */}
      <div className="mt-2 text-center">
        <div className="text-sm font-medium text-black">{label}</div>
        {children && children.length > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            {children.length} {children.length === 1 ? 'child' : 'children'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNode;