// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import InventoryDashboard from './components/InventoryDashboard';

function App() {
  const [timestamp, setTimestamp] = useState('');
  const [userRole, setUserRole] = useState<'staff' | 'manager'>(
    () => (localStorage.getItem('userRole') as 'staff' | 'manager') || 'staff'
  );
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const correctPin = '4321';

  const handlePinSubmit = () => {
    if (pinInput === correctPin) {
      setUserRole('manager');
      localStorage.setItem('userRole', 'manager');
      setShowPinModal(false);
      setPinInput('');
    } else {
      alert('Incorrect PIN. Please try again.');
    }
  };

  const handleToggleRole = () => {
    if (userRole === 'staff') {
      setShowPinModal(true);
    } else {
      setUserRole('staff');
      localStorage.setItem('userRole', 'staff');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header
        timestamp={timestamp}
        onManagerClick={handleToggleRole}
        role={userRole}
      />
      <main className="px-4 py-6">
        <InventoryDashboard setTimestamp={setTimestamp} role={userRole} />
      </main>

      {showPinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Enter Manager PIN</h2>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
              placeholder="PIN"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPinModal(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handlePinSubmit}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
