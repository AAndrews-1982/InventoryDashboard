// src/components/Header.tsx
import React from 'react';

type HeaderProps = {
  timestamp: string;
  teamLeadName: string | null;
  onLogout: () => void;
};

const Header: React.FC<HeaderProps> = ({
  timestamp,
  teamLeadName,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white px-4 py-3 shadow-md">
      {/* Desktop Layout */}
      <div className="hidden h-28 md:flex items-center justify-center relative">
        {/* Left: Logo */}
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="absolute left-8 h-24 w-auto object-contain"
        />

        {/* Center: Title + Timestamp */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Inventory Dashboard
          </h1>

          <p className="mt-1 text-[4px] font-medium text-gray-500">
            {timestamp ? `Last updated: ${timestamp}` : 'Last updated: —'}
          </p>
        </div>

        {/* Right: Logout */}
        {teamLeadName && (
          <div className="absolute right-8 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 shadow-sm">
            <span className="text-sm font-semibold text-gray-700">
              {teamLeadName}
            </span>

            <button
              onClick={onLogout}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative h-24">
        {/* Logo */}
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo-red.png`}
          alt="Ruth's Chicken Logo"
          className="absolute left-0 top-6 h-12 w-auto object-contain"
        />

        {/* Centered Title */}
        <div className="flex h-full flex-col items-center justify-center text-center px-16">
          <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900">
            Inventory Dashboard
          </h1>

          <p className="mt-0.5 text-xs font-xs text-gray-500">
            {timestamp ? `Updated: ${timestamp}` : 'Updated: —'}
          </p>
        </div>

        {/* Logout Button */}
        {teamLeadName && (
          <button
            onClick={onLogout}
            className="absolute right-0 top-8 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;