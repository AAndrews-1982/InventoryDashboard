// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import InventoryDashboard from './components/InventoryDashboard';

function App() {
  const [timestamp, setTimestamp] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header timestamp={timestamp} />

      <main className="px-4 py-6">
        <InventoryDashboard setTimestamp={setTimestamp} />
      </main>
    </div>
  );
}

export default App;