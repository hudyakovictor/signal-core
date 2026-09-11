import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin CRM</h1>
      <p className="text-gray-400">Whale Radar, Live Balancer, Fraud — в разработке (Phase 1).</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
