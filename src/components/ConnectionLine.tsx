// Import Modules
import React from 'react';

// Import Types
import type { ConnectionLineComponentProps, XYPosition } from '@xyflow/react';

/**
 * Custom connection line component for React Flow
 * This component renders a custom line when users are dragging connections between nodes
 */
const ConnectionLine: React.FC<ConnectionLineComponentProps> = ({
  fromX,
  fromY,
  toX,
  toY,
}) => {
  // Calculate the path for the connection line
  const getPath = (source: XYPosition, target: XYPosition): string => {
    const x0 = source.x;
    const y0 = source.y;
    const x1 = target.x;
    const y1 = target.y;

    // Calculate control points for a curved line
    const dx = Math.abs(x1 - x0);
    const controlX1 = x0 + dx * 0.5;
    const controlY1 = y0;
    const controlX2 = x1 - dx * 0.5;
    const controlY2 = y1;

    // Return SVG path
    return `M${x0},${y0} C${controlX1},${controlY1} ${controlX2},${controlY2} ${x1},${y1}`;
  };

  // Create the path for the connection line
  const path = getPath(
    { x: fromX, y: fromY },
    { x: toX, y: toY }
  );

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#b1b1b7"
        strokeWidth={2}
        strokeDasharray="5,5"
        className="animated"
      />
      <path
        d={path}
        fill="none"
        stroke="#fff"
        strokeWidth={1}
        strokeDasharray="5,5"
        strokeDashoffset={10}
        className="animated"
      />
    </g>
  );
};

export default ConnectionLine;