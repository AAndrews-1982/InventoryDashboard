import React from 'react';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col bg-red-600 text-white w-48 h-screen fixed top-0 left-0 p-4">
      <div className="text-2xl font-bold mb-8">
        Ruth's Chicken
      </div>
      <nav className="space-y-4">
        <a href="https://orderlink1.com" target="_blank" rel="noreferrer">Order Link 1</a>
        <a href="https://orderlink2.com" target="_blank" rel="noreferrer">Order Link 2</a>
        <a href="https://orderlink3.com" target="_blank" rel="noreferrer">Order Link 3</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
