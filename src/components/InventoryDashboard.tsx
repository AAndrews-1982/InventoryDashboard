// src/components/InventoryDashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { inventoryData, InventoryItem } from '../data/inventoryData';
import { generateInventoryPdf } from '../utils/generatePdf';

type InventoryDashboardProps = {
  setTimestamp: (value: string) => void;
  role: 'staff' | 'manager';
};

type ItemWithNotes = InventoryItem & {
  staffNote?: string;
  managerNote?: string;
};

const LOCAL_STORAGE_KEY = 'ruths_inventory_data';
const TIMESTAMP_KEY = 'ruths_inventory_timestamp';
const EXPIRATION_MINUTES = 120; // 2 hours
const WARNING_THRESHOLD_MINUTES = 30;

const getStoredData = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);

  if (!stored || !timestamp) return null;

  const then = new Date(timestamp);
  const now = new Date();
  const diff = (now.getTime() - then.getTime()) / (1000 * 60);

  return diff <= EXPIRATION_MINUTES ? { data: JSON.parse(stored), age: diff } : null;
};

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({ setTimestamp, role }) => {
  const initial = getStoredData();
  const [items, setItems] = useState<ItemWithNotes[]>(
    initial?.data || inventoryData.map(item => ({
      ...item,
      stock: item.required,
      staffNote: '',
      managerNote: '',
    }))
  );
  const [filter, setFilter] = useState<'Refrigerator' | 'Freezer' | 'Dry Storage' | 'All'>('All');
  const [clickedItemIds, setClickedItemIds] = useState<number[]>([]);
  const [missedItemIds, setMissedItemIds] = useState<number[]>([]);
  const [managerReadyToSubmit, setManagerReadyToSubmit] = useState(false);
  const [staffReadyToSubmit, setStaffReadyToSubmit] = useState(false);
  const warningShown = useRef(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = localStorage.getItem(TIMESTAMP_KEY);
      if (!timestamp || warningShown.current) return;

      const then = new Date(timestamp);
      const now = new Date();
      const diff = (now.getTime() - then.getTime()) / (1000 * 60);
      const timeRemaining = EXPIRATION_MINUTES - diff;

      if (timeRemaining <= WARNING_THRESHOLD_MINUTES && timeRemaining > 0) {
        alert(`⚠️ Session will expire in ${Math.floor(timeRemaining)} minutes. Please finish your inventory soon.`);
        warningShown.current = true;
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleStockChange = (id: number, value: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, stock: value } : item
      )
    );
  };

  const handleNoteChange = (
    id: number,
    value: string,
    field: 'staffNote' | 'managerNote'
  ) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleItemClick = (id: number) => {
    if (!clickedItemIds.includes(id)) {
      setClickedItemIds(prev => [...prev, id]);
    }
  };

  const handleSend = () => {
    const now = new Date();
    const timestamp = now.toLocaleString();
    setTimestamp(timestamp);

    if (role === 'manager') {
      const missed = items
        .filter(item => item.stock < item.required && item.url)
        .filter(item => !clickedItemIds.includes(item.id))
        .map(item => item.id);

      if (missed.length > 0) {
        setMissedItemIds(missed);
        setManagerReadyToSubmit(false);
        alert('Some items are low or out of stock and were not reviewed. Please check highlighted rows.');
        return;
      }

      if (!managerReadyToSubmit) {
        setMissedItemIds([]);
        setManagerReadyToSubmit(true);
        alert('All items reviewed. Click Confirm again to generate report.');
        return;
      }

      setManagerReadyToSubmit(false);
      alert(`Inventory report sent.\nTimestamp: ${timestamp}`);
      generateInventoryPdf(
        items.map(item => ({
          name: item.name,
          stock: item.stock,
          required: item.required,
          order: Math.max(0, item.required - item.stock),
          note: [
            item.staffNote ? `Staff: ${item.staffNote}` : '',
            item.managerNote ? `Manager: ${item.managerNote}` : '',
          ].filter(Boolean).join(' | ')
        })),
        role,
        timestamp
      );
    } else {
      const unchanged = items
        .filter(item => item.stock === item.required)
        .map(item => item.id);

      if (unchanged.length > 0 && !staffReadyToSubmit) {
        setMissedItemIds(unchanged);
        setStaffReadyToSubmit(true);
        alert('Some items were not complete. Please verify.');
        return;
      }

      if (staffReadyToSubmit) {
        alert('I have confirmed all items are correct and ready to send to Manager.');
        setStaffReadyToSubmit(false);
      }

      setMissedItemIds([]);
      alert(`Inventory report sent.\nTimestamp: ${timestamp}`);
      generateInventoryPdf(
        items.map(item => ({
          name: item.name,
          stock: item.stock,
          required: item.required,
          order: Math.max(0, item.required - item.stock),
          note: item.staffNote ? `Staff: ${item.staffNote}` : ''
        })),
        role,
        timestamp
      );
    }
  };

  const locations: ('Refrigerator' | 'Freezer' | 'Dry Storage')[] = ['Refrigerator', 'Freezer', 'Dry Storage'];

  const renderSection = (location: typeof locations[number]) => {
    const filteredSection = items.filter(item => item.location === location);
    if (filter !== 'All' && filter !== location) return null;

    return (
      <div key={location} className="mb-6">
        <h2 className="text-base sm:text-lg font-bold text-red-600 mb-2">{location}</h2>
        <div className="w-full">
          <table className="w-full table-fixed border border-black text-center text-xs sm:text-sm">
            <thead>
              <tr className="bg-red-600 text-white text-xs sm:text-sm">
                <th className="w-3/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs">ITEM</th>
                <th className="w-2/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs">STOCK</th>
                <th className="w-2/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs">REQUIRED</th>
                <th className="w-2/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs">ORDER</th>
                <th className="w-3/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs">NOTE</th>
              </tr>
            </thead>
            <tbody>
              {filteredSection.map(item => {
                const order = Math.max(0, item.required - item.stock);
                const isMissed = missedItemIds.includes(item.id);
                return (
                  <tr key={item.id} className={isMissed ? 'bg-yellow-100 border-2 border-red-500' : ''}>
                    <td className="border border-black px-1 sm:px-2 py-1 text-left font-bold">
                      {role === 'manager' && item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleItemClick(item.id)}
                          className="font-bold text-black"
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="border border-black px-1 sm:px-2 py-1">
                      {role === 'staff' ? (
                        <select
                          value={item.stock}
                          onChange={e => handleStockChange(item.id, Number(e.target.value))}
                          className="border rounded px-1 sm:px-2 py-1"
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      ) : (
                        <span>{item.stock}</span>
                      )}
                    </td>
                    <td className="border border-black px-1 sm:px-2 py-1">{item.required}</td>
                    <td className="border border-black px-1 sm:px-2 py-1">{order}</td>
                    <td className="border border-black px-1 sm:px-2 py-1 text-left">
                      {role === 'manager' && item.staffNote && (
                        <div className="text-gray-600 mb-1">
                          <strong>Staff:</strong> {item.staffNote}
                        </div>
                      )}
                      {role === 'staff' ? (
                        <input
                          type="text"
                          value={item.staffNote}
                          onChange={(e) => handleNoteChange(item.id, e.target.value, 'staffNote')}
                          className="w-full px-1 border border-gray-300 rounded text-xs sm:text-sm"
                          placeholder="Note"
                        />
                      ) : (
                        <input
                          type="text"
                          value={item.managerNote}
                          onChange={(e) => handleNoteChange(item.id, e.target.value, 'managerNote')}
                          className="w-full px-1 border border-gray-300 rounded text-xs sm:text-sm"
                          placeholder="Manager Note"
                        />
                      )}
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
    <div className="p-4 w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', 'Refrigerator', 'Freezer', 'Dry Storage'].map(loc => (
          <button
            key={loc}
            onClick={() => setFilter(loc as any)}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${filter === loc ? 'ring-2 ring-red-800' : ''}`}
          >
            {loc}
          </button>
        ))}
      </div>
  
      {locations.map(loc => renderSection(loc))}
  
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
