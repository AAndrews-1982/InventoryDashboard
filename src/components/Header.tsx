// src/components/Header.tsx
import React from 'react';

type HeaderProps = {
  timestamp: string;
};

const Header: React.FC<HeaderProps> = ({ timestamp }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-3 md:ml-0">
      {/* Mobile: Logo | Title+Timestamp | Hamburger */}
      <div className="flex md:hidden items-center justify-between h-24 px-2">
        {/* Left: Logo */}
        <img
          src="/Ruths-Logo-red.png"
          alt="Ruth's Chicken Logo"
          className="h-28 w-auto object-contain"
        />

        {/* Center: Title + Timestamp */}
        <div className="flex flex-col justify-center items-center text-center h-full flex-grow px-2">
          <h1 className="text-3xl font-bold text-red-600 leading-tight">
            Inventory Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>

        {/* Right: Hamburger */}
        <button className="text-red-600 focus:outline-none text-2xl ml-2">
          ☰
        </button>
      </div>

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
