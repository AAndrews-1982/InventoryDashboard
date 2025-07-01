// src/App.tsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import InventoryDashboard from './components/InventoryDashboard';

function App() {
  const [timestamp, setTimestamp] = useState('');

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      <main className="flex-1 md:ml-48">
        <Header timestamp={timestamp} />
        <InventoryDashboard setTimestamp={setTimestamp} />
      </main>
    </div>
  );
}

export default App;
