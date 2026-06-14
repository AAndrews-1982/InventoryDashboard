// src/components/Header.tsx
import React from 'react';

type HeaderProps = {
  timestamp: string;
};

const Header: React.FC<HeaderProps> = ({ timestamp }) => {
  const teamLeadName = sessionStorage.getItem(
    'ruths_inventory_active_teamlead'
  );

  const handleLogout = () => {
    sessionStorage.removeItem('ruths_inventory_active_teamlead');
    window.location.reload();
  };

  return (
    <header className="w-full h-28 md:h-40 bg-white border-b border-gray-200 px-4 py-3 relative z-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center h-full relative">
        {/* Left: Logo */}
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="absolute left-10 h-28 w-auto object-contain"
        />

        {/* Center: Title + Timestamp */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600">
            Inventory Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>

        {/* Right: Logout */}
        {teamLeadName && (
          <div className="absolute right-10 flex items-center gap-3">
            <span className="font-semibold text-gray-700">
              {teamLeadName}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-center h-24 px-2 mb-4">
        {/* Left: Logo */}
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="h-20 w-auto object-contain mr-3"
        />

        {/* Center: Title + Timestamp */}
        <div className="flex flex-col justify-center items-center text-center h-full px-2">
          <h1 className="text-xl font-bold text-red-600 leading-tight">
            Inventory Dashboard
          </h1>

          <p className="text-xs text-gray-500">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>

          {teamLeadName && (
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;