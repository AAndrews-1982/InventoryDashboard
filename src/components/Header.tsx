import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  // Simulate timestamp for now (can be passed in later)
  const fakeTimestamp = timestamp || 'Last updated: —';

  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 md:ml-48">
      {/* Left: Logo on mobile */}
      <div className="md:hidden text-red-600 text-xl font-bold">
        Ruth's Chicken
      </div>

      {/* Center: Title + Timestamp */}
      <div className="flex flex-col items-end md:items-start md:flex-row md:justify-between w-full md:ml-4">
        <h1 className="text-xl font-semibold text-red-600">Inventory Dashboard</h1>
        <p className="text-sm text-gray-500 md:ml-4">{fakeTimestamp}</p>
      </div>

      {/* Right: Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-red-600 focus:outline-none text-xl"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="absolute right-4 top-14 bg-white border border-gray-200 shadow-md rounded-md p-4 space-y-2 z-10">
            <a href="https://orderlink1.com" target="_blank" rel="noreferrer" className="block text-sm text-gray-700">Order Link 1</a>
            <a href="https://orderlink2.com" target="_blank" rel="noreferrer" className="block text-sm text-gray-700">Order Link 2</a>
            <a href="https://orderlink3.com" target="_blank" rel="noreferrer" className="block text-sm text-gray-700">Order Link 3</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
