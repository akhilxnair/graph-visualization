# Cloud Security Visualization

A modern, interactive visualization tool for cloud infrastructure security monitoring built with React, TypeScript, and React Flow.


## Overview

This application provides a hierarchical, graph-based visualization of cloud infrastructure security issues across multiple cloud providers (AWS, GCP) and SaaS applications. It enables security teams to quickly identify, prioritize, and address security alerts and misconfigurations in their cloud environments.

## Features

- **Interactive Graph Visualization**: Explore your cloud infrastructure as an interactive, hierarchical graph
- **Multi-Cloud Support**: Visualize AWS, GCP, and SaaS resources in a unified interface
- **Security Insights**: Quickly identify resources with alerts and misconfigurations
- **Collapsible Nodes**: Expand and collapse nodes to focus on specific areas of your infrastructure
- **Custom Styling**: Visually distinguish between different resource types and security states
- **Responsive Design**: Works on desktop and tablet devices

## Technology Stack

- **React**: UI library for building component-based interfaces
- **TypeScript**: Type safety and improved developer experience
- **React Flow**: Interactive node-based graph visualization library
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide Icons**: Beautiful, consistent icon set
- **Vite**: Fast, modern frontend build tool

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akhilxnair/graph-visualization.git
   cd graph-visualization
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
cloud-security-visualization/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── CustomNode.tsx   # Custom node renderer for graph
│   │   ├── Graph.tsx        # Main graph component
│   │   └── ConnectionLine.tsx # Custom connection line renderer
│   ├── data/                # Sample data and data loaders
│   │   └── sampleData.ts    # Sample cloud infrastructure data
│   ├── hooks/               # Custom React hooks
│   │   └── useGraphData.ts  # Hook for graph data transformation
│   ├── types/               # TypeScript type definitions
│   │   └── graph.ts         # Graph data type definitions
│   ├── utils/               # Utility functions
│   │   └── graphHelpers.ts  # Helper functions for graph operations
│   ├── App.css              # Global styles
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── .gitignore               # Git ignore file
├── index.html               # HTML entry point
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Usage

### Basic Navigation

- **Pan**: Click and drag on the background
- **Zoom**: Use mouse wheel or pinch gesture
- **Select Node**: Click on a node to select it
- **Expand/Collapse**: Click on a node with children to expand or collapse it

### Understanding the Visualization

- **Node Colors**: Different colors represent different cloud providers and service types
- **Node Size**: Larger nodes represent higher-level resources (cloud accounts), smaller nodes represent individual services
- **Alert Indicators**: Red triangles with numbers show the count of security alerts
- **Misconfiguration Indicators**: Orange sliders with numbers show the count of misconfigurations

## Customization

### Adding Your Own Data

Replace the sample data in `src/data/sampleData.ts` with your actual cloud infrastructure data. The data structure should follow the types defined in `src/types/graph.ts`.

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Updating the styles in `src/App.css`
3. Adjusting the component-specific styles in the respective component files


## Acknowledgments

- [React Flow](https://reactflow.dev/) for the excellent graph visualization library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) for the beautiful icon set