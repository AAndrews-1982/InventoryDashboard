// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import InventoryDashboard from './components/InventoryDashboard';

function App() {
  const [timestamp, setTimestamp] = useState('');
  const [showPinModal, setShowPinModal] = useState(false); // For PIN modal (to build next)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header now spans full width */}
      <Header
        timestamp={timestamp}
        onManagerClick={() => setShowPinModal(true)}
      />

      {/* Main dashboard content */}
      <main className="px-4 py-6">
        <InventoryDashboard setTimestamp={setTimestamp} />
      </main>

      {/* You’ll add the PIN modal here next */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Enter Manager PIN</h2>
            {/* PIN input and handling to be added here */}
            <button
              onClick={() => setShowPinModal(false)}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
