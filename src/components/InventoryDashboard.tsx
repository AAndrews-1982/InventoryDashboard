// src/components/InventoryDashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { inventoryData, InventoryItem } from '../data/inventoryData';
import { generateInventoryPdf } from '../utils/generatePdf';
import { sendInventoryEmail } from '../utils/sendInventoryEmail';

type InventoryDashboardProps = {
  setTimestamp: (value: string) => void;
  teamLeadName: string | null;
  setTeamLeadName: (value: string | null) => void;
};

type ItemWithNotes = InventoryItem & {
  staffNote?: string;
  teamleadNote?: string;
};

const ACTIVE_TEAM_LEAD_KEY = 'ruths_inventory_active_teamlead';
const EXPIRATION_MINUTES = 120;
const WARNING_THRESHOLD_MINUTES = 30;

const TEAM_LEAD_PINS: Record<string, string> = {
  Tevin: '1234',
  Austin: '5678',
};

const getStorageKeys = (teamLeadName: string) => ({
  dataKey: `ruths_inventory_data_v3_${teamLeadName}`,
  timestampKey: `ruths_inventory_timestamp_v3_${teamLeadName}`,
  clickedKey: `ruths_inventory_clicked_v3_${teamLeadName}`,
});

const getDefaultItems = (): ItemWithNotes[] => {
  return inventoryData.map(item => ({
    ...item,
    stock: 0,
    staffNote: '',
    teamleadNote: '',
  }));
};

const getStoredData = (teamLeadName: string | null) => {
  if (!teamLeadName) return null;

  const { dataKey, timestampKey } = getStorageKeys(teamLeadName);
  const stored = localStorage.getItem(dataKey);
  const timestamp = localStorage.getItem(timestampKey);

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

const getStoredClickedItems = (teamLeadName: string | null): number[] => {
  if (!teamLeadName) return [];

  const { clickedKey } = getStorageKeys(teamLeadName);
  const stored = localStorage.getItem(clickedKey);

  if (!stored) return [];

  try {
    return JSON.parse(stored) as number[];
  } catch {
    return [];
  }
};

const buildInitialItems = (
  teamLeadName: string | null
): ItemWithNotes[] => {
  const initial = getStoredData(teamLeadName);

  if (!initial?.data) {
    return getDefaultItems();
  }

  return inventoryData.map(item => {
    const savedItem = initial.data.find(saved => saved.id === item.id);

    if (!savedItem) {
      return {
        ...item,
        stock: 0,
        staffNote: '',
        teamleadNote: '',
      };
    }

    return {
      ...item,
      stock: savedItem.stock ?? 0,
      staffNote: savedItem.staffNote ?? '',
      teamleadNote: savedItem.teamleadNote ?? '',
    };
  });
};

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({
  setTimestamp,
  teamLeadName,
  setTeamLeadName,
}) => {
  const storedTeamLead = sessionStorage.getItem(ACTIVE_TEAM_LEAD_KEY);

  const [items, setItems] = useState<ItemWithNotes[]>(
    () => buildInitialItems(storedTeamLead)
  );
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [filter, setFilter] = useState<
    'Refrigerator' | 'Freezer' | 'Dry Storage' | 'All'
  >('All');
  const [clickedItemIds, setClickedItemIds] = useState<number[]>(
    () => getStoredClickedItems(storedTeamLead)
  );
  const [missedItemIds, setMissedItemIds] = useState<number[]>([]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const warningShown = useRef(false);

  useEffect(() => {
    if (!teamLeadName) return;

    const { dataKey, timestampKey } = getStorageKeys(teamLeadName);

    localStorage.setItem(dataKey, JSON.stringify(items));
    localStorage.setItem(timestampKey, new Date().toISOString());
  }, [items, teamLeadName]);

  useEffect(() => {
    if (!teamLeadName) return;

    const { clickedKey } = getStorageKeys(teamLeadName);

    localStorage.setItem(clickedKey, JSON.stringify(clickedItemIds));
  }, [clickedItemIds, teamLeadName]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!teamLeadName || warningShown.current) return;

      const { timestampKey } = getStorageKeys(teamLeadName);
      const timestamp = localStorage.getItem(timestampKey);

      if (!timestamp) return;

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
  }, [teamLeadName]);

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
    sessionStorage.setItem(ACTIVE_TEAM_LEAD_KEY, leadName);
    setItems(buildInitialItems(leadName));
    setClickedItemIds(getStoredClickedItems(leadName));
    setMissedItemIds([]);
    setReadyToSubmit(false);
    setPin('');
    setPinError('');
    warningShown.current = false;
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
        note: item.teamleadNote
          ? `Team Lead: ${item.teamleadNote}`
          : '',
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
      <section key={location} className="mb-6">
        <h2 className="mb-3 text-base sm:text-lg font-semibold text-gray-800">
          {location}
        </h2>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">
                <th className="w-5/12 px-3 py-3 font-semibold">
                  Item
                </th>

                <th className="w-2/12 px-3 py-3 text-center font-semibold">
                  Stock
                </th>

                <th className="w-5/12 px-3 py-3 font-semibold">
                  Team Lead Notes
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSection.map(item => {
                const isMissed = missedItemIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className={
                      isMissed
                        ? 'bg-red-50 ring-1 ring-red-200'
                        : 'bg-white hover:bg-gray-50'
                    }
                  >
                    <td className="px-3 py-3 font-semibold text-gray-900">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleItemClick(item.id)}
                          className="text-gray-900 underline-offset-2 hover:underline"
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </td>

                    <td className="px-3 py-3 text-center">
                      <select
                        value={item.stock}
                        onChange={e =>
                          handleStockChange(
                            item.id,
                            Number(e.target.value)
                          )
                        }
                        className="w-16 rounded-xl border border-gray-300 bg-white px-2 py-2 text-center font-semibold text-gray-800 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      >
                        {Array.from({ length: 11 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-3 py-3">
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
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        placeholder="Add note"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  if (!teamLeadName) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="mb-2 text-xl font-bold text-gray-900">
            Ruth&apos;s Chicken Inventory
          </h1>

          <p className="mb-5 text-sm text-gray-500">
            Enter Team Lead PIN to continue
          </p>

          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handlePinSubmit();
            }}
            className="mb-3 w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-lg font-semibold tracking-widest outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            placeholder="PIN"
          />

          {pinError && (
            <p className="mb-3 text-sm font-medium text-red-600">
              {pinError}
            </p>
          )}

          <button
            onClick={handlePinSubmit}
            className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
          >
            Unlock Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-1 sm:px-4">
      <div className="mb-4 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-semibold text-gray-800">
          Team Lead:{' '}
          <span className="text-gray-500">{teamLeadName}</span>
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {['All', 'Refrigerator', 'Freezer', 'Dry Storage'].map(loc => (
          <button
            key={loc}
            onClick={() => setFilter(loc as any)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition active:scale-[0.97] ${
              filter === loc
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {locations.map(loc => renderSection(loc))}

      <div className="sticky bottom-0 mt-6 border-t border-gray-200 bg-gray-50/90 py-4 backdrop-blur">
        <button
          onClick={handleSend}
          className="w-full sm:w-auto rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
        >
          {readyToSubmit ? 'Submit Report' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default InventoryDashboard;