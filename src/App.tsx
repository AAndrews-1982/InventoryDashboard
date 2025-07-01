import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      <main className="flex-1">
        <Header />
        {/* More content will go here */}
        <div className="p-4">
          <p className="text-gray-600">Main inventory dashboard content coming next...</p>
        </div>
      </main>
    </div>
  );
}

export default App;
