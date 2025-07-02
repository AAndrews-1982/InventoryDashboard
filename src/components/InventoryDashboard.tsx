// src/components/InventoryDashboard.tsx
import React, { useState } from 'react';
import { inventoryData, InventoryItem } from '../data/inventoryData';

type InventoryDashboardProps = {
  setTimestamp: (value: string) => void;
};

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({ setTimestamp }) => {
  const [items, setItems] = useState(inventoryData);
  const [filter, setFilter] = useState<'Refrigerator' | 'Freezer' | 'Dry Storage' | 'All'>('All');

  const handleStockChange = (id: number, value: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, stock: value } : item
      )
    );
  };

  const handleSend = () => {
    const now = new Date();
    const timestamp = now.toLocaleString();
    setTimestamp(timestamp);
    alert(`Inventory report sent.\nTimestamp: ${timestamp}`);
  };

  const locations: ('Refrigerator' | 'Freezer' | 'Dry Storage')[] = ['Refrigerator', 'Freezer', 'Dry Storage'];

  const renderSection = (location: typeof locations[number]) => {
    const filteredSection = items.filter(item => item.location === location);
    if (filter !== 'All' && filter !== location) return null;

    return (
      <div key={location} className="mb-6">
        <h2 className="text-lg font-bold text-red-600 mb-2">{location}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-black text-center">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="border border-black px-2 py-1">ITEM</th>
                <th className="border border-black px-2 py-1">STOCK</th>
                <th className="border border-black px-2 py-1">REQUIRED</th>
                <th className="border border-black px-2 py-1">ORDER</th>
                <th className="border border-black px-2 py-1">NOTE</th>
              </tr>
            </thead>
            <tbody>
              {filteredSection.map(item => {
                const order = Math.max(0, item.required - item.stock);
                return (
                  <tr key={item.id}>
                    <td className="border border-black px-2 py-1 text-left">{item.name}</td>
                    <td className="border border-black px-2 py-1">
                      <select
                        value={item.stock}
                        onChange={e => handleStockChange(item.id, Number(e.target.value))}
                        className="border rounded px-2 py-1"
                      >
                        {Array.from({ length: 11 }, (_, i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-black px-2 py-1">{item.required}</td>
                    <td className="border border-black px-2 py-1">{order}</td>
                    <td className="border border-black px-2 py-1">
                      <input
                        type="text"
                        className="w-full px-1 border border-gray-300 rounded"
                        placeholder="Note"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-4">
        {['All', 'Refrigerator', 'Freezer', 'Dry Storage'].map(loc => (
          <button
            key={loc}
            onClick={() => setFilter(loc as any)}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
              filter === loc ? 'ring-2 ring-red-800' : ''
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Grouped Sections */}
      {locations.map(loc => renderSection(loc))}

      {/* Send Button */}
      <div className="mt-6">
        <button
          onClick={handleSend}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default InventoryDashboard;
