// src/components/Header.tsx
import React from 'react';

type HeaderProps = {
  timestamp: string;
  onManagerClick: () => void;
  role: 'staff' | 'manager';
};

const Header: React.FC<HeaderProps> = ({ timestamp, onManagerClick, role }) => {
  return (
    <header className="w-full h-28 md:h-40 bg-white border-b border-gray-200 px-4 py-3 relative z-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between h-full relative">
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="h-28 w-auto object-contain ml-10"
        />
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-5xl font-bold text-red-600">Inventory Dashboard</h1>
          {role === 'manager' && (
            <p className="text-base font-semibold text-gray-500 mt-1">Manager View</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>
        <button
          onClick={onManagerClick}
          className="text-sm font-semibold text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition-colors duration-200 mr-10"
        >
          {role === 'manager' ? 'Team Member' : 'Manager Dashboard'}
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-between h-24 px-2 mb-4">
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="h-20 w-auto object-contain"
        />
        <div className="flex flex-col justify-center items-center text-center h-full flex-grow px-2">
          <h1 className="text-xl font-bold text-red-600 leading-tight">
            Inventory Dashboard
          </h1>
          {role === 'manager' && (
            <p className="text-sm font-semibold text-gray-500">Manager View</p>
          )}
          <p className="text-xs text-gray-500">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>
        <button
          onClick={onManagerClick}
          className="text-xs font-semibold text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          {role === 'manager' ? 'Team Member' : 'Manager'}
        </button>
      </div>
    </header>
  );
};

export default Header;
