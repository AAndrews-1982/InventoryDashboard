// src/components/Header.tsx
import React from 'react';

type HeaderProps = {
  timestamp: string;
  onteamleadClick: () => void;
  role: 'staff' | 'teamlead';
};

const Header: React.FC<HeaderProps> = ({
  timestamp,
  onteamleadClick,
  role,
}) => {
  return (
    <header className="w-full h-28 md:h-40 bg-white border-b border-gray-200 px-4 py-3 relative z-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between h-full relative">
        {/* Left: Logo */}
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="h-28 w-auto object-contain ml-10"
        />

        {/* Center: Title + Timestamp */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-5xl font-bold text-red-600">
            Inventory Dashboard
          </h1>

          {role === 'teamlead' && (
            <p className="text-base font-semibold text-gray-500 mt-1">
              Team Lead View
            </p>
          )}

          <p className="text-sm text-gray-500 mt-1">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>

        {/* Right: Team Lead Button */}
        <button
          onClick={onteamleadClick}
          className="text-lg font-semibold text-red-600 border-2 border-red-600 px-6 py-3 rounded hover:bg-red-600 hover:text-white transition-colors duration-200 mr-10"
        >
          {role === 'teamlead'
            ? 'Team Member'
            : 'Team Lead'}
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-between h-24 px-2 mb-4">
        {/* Left: Logo */}
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="h-20 w-auto object-contain"
        />

        {/* Center: Title + Timestamp */}
        <div className="flex flex-col justify-center items-center text-center h-full flex-grow px-2">
          <h1 className="text-xl font-bold text-red-600 leading-tight">
            Inventory Dashboard
          </h1>

          {role === 'teamlead' && (
            <p className="text-sm font-semibold text-gray-500">
              Team Lead View
            </p>
          )}

          <p className="text-xs text-gray-500">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>

        {/* Right: Team Lead Button */}
        <button
          onClick={onteamleadClick}
          className="text-xs font-semibold text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          {role === 'teamlead'
            ? 'Team Member'
            : 'Team Lead'}
        </button>
      </div>
    </header>
  );
};

export default Header;