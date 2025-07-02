// src/components/Sidebar.tsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col bg-red-600 text-white w-60 h-screen fixed top-0 left-0 p-4">
      {/* Logo: large, left-aligned, not stretched */}
      <div className="mb-10 mt-0 pl-1">
        <img
          src={`${import.meta.env.BASE_URL}Ruths-Logo.png`}
          alt="Ruth's Chicken Logo"
          className="h-100 w-64 object-contain"
        />
      </div>

      {/* Order Links Section (aligned left) */}
      <div className="text-left">
        <h2 className="text-lg font-bold mb-2">Order Links</h2>
        <nav className="space-y-2 pl-1">
          <a href="https://www.webstaurantstore.com" target="_blank" rel="noreferrer" className="block text-sm hover:underline">
            WebstaurantStore
          </a>
          <a href="https://www.benekeith.com" target="_blank" rel="noreferrer" className="block text-sm hover:underline">
            Ben E. Keiths
          </a>
          <a href="https://www.usfoods.com" target="_blank" rel="noreferrer" className="block text-sm hover:underline">
            U.S. Foods
          </a>
          <a href="https://www.restaurantdepot.com" target="_blank" rel="noreferrer" className="block text-sm hover:underline">
            Restaurant Depot
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
