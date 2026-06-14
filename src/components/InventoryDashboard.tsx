// src/components/InventoryDashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { inventoryData, InventoryItem } from '../data/inventoryData';
import { generateInventoryPdf } from '../utils/generatePdf';
import { sendInventoryEmail } from '../utils/sendInventoryEmail';

type InventoryDashboardProps = {
  setTimestamp: (value: string) => void;
};

type ItemWithNotes = InventoryItem & {
  staffNote?: string;
  teamleadNote?: string;
};

const LOCAL_STORAGE_KEY = 'ruths_inventory_data';
const TIMESTAMP_KEY = 'ruths_inventory_timestamp';
const TEAM_LEAD_KEY = 'ruths_inventory_teamlead';
const EXPIRATION_MINUTES = 120;
const WARNING_THRESHOLD_MINUTES = 30;

const TEAM_LEAD_PINS: Record<string, string> = {
  Tevin: '1234',
  Austin: '5678',
};

const getDefaultItems = (): ItemWithNotes[] => {
  return inventoryData.map(item => ({
    ...item,
    stock: item.required,
    staffNote: '',
    teamleadNote: '',
  }));
};

const getStoredData = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);

  if (!stored || !timestamp) return null;

  const then = new Date(timestamp);
  const now = new Date();
  const diff = (now.getTime() - then.getTime()) / (1000 * 60);

  if (diff > EXPIRATION_MINUTES) return null;

  try {
    return {
      data: JSON.parse(stored) as ItemWithNotes[],
      age: diff,
    };
  } catch {
    return null;
  }
};

const buildInitialItems = (): ItemWithNotes[] => {
  const initial = getStoredData();

  if (!initial?.data) {
    return getDefaultItems();
  }

  return inventoryData.map(item => {
    const savedItem = initial.data.find(saved => saved.id === item.id);

    if (!savedItem) {
      return {
        ...item,
        stock: item.required,
        staffNote: '',
        teamleadNote: '',
      };
    }

    return {
      ...item,
      stock: savedItem.stock ?? item.required,
      staffNote: savedItem.staffNote ?? '',
      teamleadNote: savedItem.teamleadNote ?? '',
    };
  });
};

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({
  setTimestamp,
}) => {
  const storedTeamLead = localStorage.getItem(TEAM_LEAD_KEY);

  const [items, setItems] = useState<ItemWithNotes[]>(buildInitialItems);
  const [teamLeadName, setTeamLeadName] = useState<string | null>(
    storedTeamLead
  );
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [filter, setFilter] = useState<
    'Refrigerator' | 'Freezer' | 'Dry Storage' | 'All'
  >('All');
  const [clickedItemIds, setClickedItemIds] = useState<number[]>([]);
  const [missedItemIds, setMissedItemIds] = useState<number[]>([]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
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

      if (
        timeRemaining <= WARNING_THRESHOLD_MINUTES &&
        timeRemaining > 0
      ) {
        alert(
          `Session will expire in ${Math.floor(
            timeRemaining
          )} minutes. Please finish your inventory soon.`
        );
        warningShown.current = true;
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handlePinSubmit = () => {
    const matchedLead = Object.entries(TEAM_LEAD_PINS).find(
      ([, savedPin]) => savedPin === pin
    );

    if (!matchedLead) {
      setPinError('Invalid PIN. Please try again.');
      return;
    }

    const leadName = matchedLead[0];

    setTeamLeadName(leadName);
    localStorage.setItem(TEAM_LEAD_KEY, leadName);
    setPin('');
    setPinError('');
  };

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
    field: 'staffNote' | 'teamleadNote'
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

  const handleSend = async () => {
    if (!teamLeadName) return;

    const now = new Date();
    const timestamp = now.toLocaleString();

    setTimestamp(timestamp);

    const missed = items
      .filter(item => item.stock < item.required && item.url)
      .filter(item => !clickedItemIds.includes(item.id))
      .map(item => item.id);

    if (missed.length > 0) {
      setMissedItemIds(missed);
      setReadyToSubmit(false);
      alert(
        'Some items are low or out of stock and were not reviewed. Please check highlighted rows.'
      );
      return;
    }

    if (!readyToSubmit) {
      setMissedItemIds([]);
      setReadyToSubmit(true);
      alert('Inventory confirmed. Click Submit Report to generate the report.');
      return;
    }

    setReadyToSubmit(false);

    const pdfBase64 = generateInventoryPdf(
      items.map(item => ({
        name: item.name,
        stock: item.stock,
        required: item.required,
        order: Math.max(0, item.required - item.stock),
        note: [
          item.staffNote ? `Staff: ${item.staffNote}` : '',
          item.teamleadNote ? `Team Lead: ${item.teamleadNote}` : '',
        ]
          .filter(Boolean)
          .join(' | '),
      })),
      'teamlead',
      timestamp,
      teamLeadName
    );

    try {
      const result = await sendInventoryEmail(
        pdfBase64,
        timestamp,
        teamLeadName
      );

      if (result.success) {
        alert(
          `Inventory report submitted by ${teamLeadName}.\nTimestamp: ${timestamp}`
        );
      } else {
        alert(result.message || 'Email failed to send.');
      }
    } catch (error) {
      console.error(error);

      alert(
        'The PDF was generated but the email failed to send. Please check the Google Apps Script configuration.'
      );
    }
  };

  const locations: ('Refrigerator' | 'Freezer' | 'Dry Storage')[] = [
    'Refrigerator',
    'Freezer',
    'Dry Storage',
  ];

  const renderSection = (location: typeof locations[number]) => {
    const filteredSection = items.filter(item => item.location === location);

    if (filter !== 'All' && filter !== location) return null;

    return (
      <div key={location} className="mb-6">
        <h2 className="text-base sm:text-lg font-bold text-red-600 mb-2">
          {location}
        </h2>

        <div className="w-full">
          <table className="w-full table-auto border border-black text-center text-xs sm:text-sm">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="w-3/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs text-center">
                  ITEM
                </th>
                <th className="w-2/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs text-center">
                  STOCK
                </th>
                <th className="w-2/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs text-center">
                  REQUIRED
                </th>
                <th className="w-2/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs text-center">
                  ORDER
                </th>
                <th className="w-3/12 border border-black px-1 sm:px-2 py-1 text-[10px] sm:text-xs text-center">
                  NOTE
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSection.map(item => {
                const order = Math.max(0, item.required - item.stock);
                const isMissed = missedItemIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className={
                      isMissed
                        ? 'bg-yellow-100 border-2 border-red-500'
                        : ''
                    }
                  >
                    <td className="border border-black px-1 sm:px-2 py-1 text-left font-bold">
                      {item.url ? (
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
                      <select
                        value={item.stock}
                        onChange={e =>
                          handleStockChange(
                            item.id,
                            Number(e.target.value)
                          )
                        }
                        className="border rounded px-1 sm:px-2 py-1"
                      >
                        {Array.from({ length: 11 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="border border-black px-1 sm:px-2 py-1">
                      {item.required}
                    </td>

                    <td className="border border-black px-1 sm:px-2 py-1">
                      {order}
                    </td>

                    <td className="border border-black px-1 sm:px-2 py-1 text-left">
                      {item.staffNote && (
                        <div className="text-gray-600 mb-1">
                          <strong>Staff:</strong> {item.staffNote}
                        </div>
                      )}

                      <input
                        type="text"
                        value={item.teamleadNote}
                        onChange={e =>
                          handleNoteChange(
                            item.id,
                            e.target.value,
                            'teamleadNote'
                          )
                        }
                        className="w-full px-1 border border-gray-300 rounded text-xs sm:text-sm"
                        placeholder="Team Lead Note"
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

  if (!teamLeadName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white border border-black rounded-lg p-6 w-full max-w-sm text-center">
          <h1 className="text-xl font-bold mb-2">
            Ruth&apos;s Chicken Inventory
          </h1>

          <p className="text-sm mb-4">
            Enter Team Lead PIN to continue
          </p>

          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handlePinSubmit();
            }}
            className="w-full border border-black rounded px-3 py-2 text-center mb-3"
            placeholder="Enter PIN"
          />

          {pinError && (
            <p className="text-red-600 text-sm mb-3">{pinError}</p>
          )}

          <button
            onClick={handlePinSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
          >
            Unlock Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen px-1 sm:px-4">
     <div className="mb-4">
  <p className="text-sm font-bold">
    Team Lead: {teamLeadName}
  </p>
</div>

      <div className="flex flex-wrap gap-2 mb-4">
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

      {locations.map(loc => renderSection(loc))}

      <div className="mt-6">
        <button
          onClick={handleSend}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
        >
          {readyToSubmit ? 'Submit Report' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default InventoryDashboard;