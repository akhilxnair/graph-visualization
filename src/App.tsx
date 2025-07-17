// Import Styles
import './App.css';

// Import Components
import Graph from './components/Graph';

// Import Data
import { sampleData } from './data/sampleData';

const App = () => (
  <div className="w-screen h-screen bg-gray-100">
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">Cloud Security Visualization</h1>
    </header>
    <main className="w-full h-[calc(100vh-64px)]">
      <Graph data={sampleData} />
    </main>
  </div>
);

export default App;