// src/components/Header.tsx
import React, { useState } from 'react';

type HeaderProps = {
  timestamp: string;
};

const Header: React.FC<HeaderProps> = ({ timestamp }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-3 md:ml-0 relative z-10">
      {/* Mobile: Logo | Title+Timestamp | Hamburger */}
      <div className="flex md:hidden items-center justify-between h-24 px-2 mb-4">
        <img
          src="./Ruths-Logo-red.png"
          alt="Ruth's Chicken Logo"
          className="h-20 w-auto object-contain"
        />

        <div className="flex flex-col justify-center items-center text-center h-full flex-grow px-2">
          <h1 className="text-xl font-bold text-red-600 leading-tight">
            Inventory Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-red-600 focus:outline-none text-2xl ml-2"
        >
          ☰
        </button>
      </div>

      {/* Hamburger Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute right-4 top-[6.5rem] bg-white border border-gray-200 shadow-md rounded-md w-60 p-4 z-50">
          <h2 className="text-lg font-bold text-red-600 mb-2">Order Links</h2>
          <nav className="space-y-2 pl-1 text-sm text-gray-700">
            <a href="https://www.webstaurantstore.com" target="_blank" rel="noreferrer" className="block hover:underline">
              WebstaurantStore
            </a>
            <a href="https://www.benekeith.com" target="_blank" rel="noreferrer" className="block hover:underline">
              Ben E. Keiths
            </a>
            <a href="https://www.usfoods.com" target="_blank" rel="noreferrer" className="block hover:underline">
              U.S. Foods
            </a>
            <a href="https://www.restaurantdepot.com" target="_blank" rel="noreferrer" className="block hover:underline">
              Restaurant Depot
            </a>
          </nav>
        </div>
      )}

      {/* Desktop: Title + Timestamp */}
      <div className="hidden md:block text-left">
        <h1 className="text-3xl font-bold text-red-600">Inventory Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
        </p>
      </div>
    </header>
  );
};

export default Header;
