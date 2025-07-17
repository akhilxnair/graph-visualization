import React from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  Cloud,
  Server,
  Database,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';

import type { NodeData } from '../types/graph';
import { calculateSeverity, getSeverityColor } from '../utils/graphHelpers';

interface CustomNodeProps {
  data: NodeData;
  isConnectable: boolean;
  selected: boolean;
}

const ICON_MAP: Record<string, JSX.Element> = {
  cloud: <Cloud className="w-6 h-6 text-indigo-600" />,
  aws: <Cloud className="w-6 h-6 text-yellow-500" />,
  gcp: <Cloud className="w-6 h-6 text-green-500" />,
  saas: <Cloud className="w-6 h-6 text-blue-500" />,
  account: <Server className="w-6 h-6 text-purple-500" />,
  service: <Database className="w-6 h-6 text-orange-500" />,
};

const CustomNode: React.FC<CustomNodeProps> = ({ data, isConnectable, selected }) => {
  const { type, label, alerts, misconfigs, accountId } = data;
  const severity = calculateSeverity(alerts, misconfigs);
  const severityColor = getSeverityColor(severity);
  const Icon = ICON_MAP[type] ?? <Cloud className="w-6 h-6 text-gray-400" />;

  return (
    <div className="relative flex flex-col items-center justify-center w-[120px] h-[160px]">
      {/* Alert & Misconfig Badge Row */}
      <div className="absolute top-0 flex space-x-1">
        <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium shadow">
          <AlertTriangle size={12} /> {alerts}
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs font-medium shadow">
          <SlidersHorizontal size={12} /> {misconfigs}
        </div>
      </div>

      {/* Main Node Circle */}
      <div
        className={`
          mt-5 w-[70px] h-[70px] rounded-full border-4 shadow-md flex items-center justify-center
          ${severityColor} ${selected ? 'ring-2 ring-blue-400' : ''}
          bg-white
        `}
      >
        {Icon}
      </div>

      {/* Label */}
      <div className="text-sm font-semibold mt-2 text-center">{label}</div>

      {/* Optional: Account ID or sub-label */}
      {accountId && (
        <div className="text-[10px] text-gray-500 font-mono truncate max-w-[100px]">
          {accountId}
        </div>
      )}

      {/* Invisible handles for edges */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-transparent"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-transparent"
      />
    </div>
  );
};

export default CustomNode;
