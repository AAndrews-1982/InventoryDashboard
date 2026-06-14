// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import InventoryDashboard from './components/InventoryDashboard';

function App() {
  const [timestamp, setTimestamp] = useState('');
  const [teamLeadName, setTeamLeadName] = useState<string | null>(null);

  const handleLogout = () => {
    sessionStorage.removeItem('ruths_inventory_active_teamlead');
    setTeamLeadName(null);
    setTimestamp('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header
        timestamp={timestamp}
        teamLeadName={teamLeadName}
        onLogout={handleLogout}
      />

      <main className="px-4 py-6">
        <InventoryDashboard
          setTimestamp={setTimestamp}
          teamLeadName={teamLeadName}
          setTeamLeadName={setTeamLeadName}
        />
      </main>
    </div>
  );
}

export default App;