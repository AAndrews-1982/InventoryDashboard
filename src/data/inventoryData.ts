export type InventoryItem = {
  id: number;
  name: string;
  location: 'Refrigerator' | 'Freezer' | 'Dry Storage';
  stock: number;
  required: number;
  note?: string;
  url?: string; // Optional vendor link
};

export const inventoryData: InventoryItem[] = [

  // Refrigerator

  {
    id: 1,
    name: 'Tender (Case)',
    stock: 0,
    required: 5,
    location: 'Refrigerator',
  },
  {
    id: 2,
    name: 'Boneless Skinless Thighs (Case)',
    stock: 0,
    required: 5,
    location: 'Refrigerator',
  },
  {
    id: 3,
    name: 'Buttermilk',
    stock: 0,
    required: 5,
    location: 'Refrigerator',
  },
  { id: 4, name: 'Green Cabbage Mix (Each)', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 5, name: 'Purple Cabbage (Each)', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 6, name: 'Carrots (Each)', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 7, name: 'Butter (Each)', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 8, name: 'Apple Pineapple Pico (Each)', stock: 0, required: 5, location: 'Refrigerator' },

  // Freezer

  { id: 9, name: 'Crinkle Fries (Case)', stock: 0, required: 5, location: 'Freezer' },
  { id: 10, name: 'Kings Hawaiian Bun (Case)', stock: 0, required: 5, location: 'Freezer' },
  { id: 11, name: 'GF Bun (Case)', stock: 0, required: 5, location: 'Freezer' },
  { id: 12, name: 'Kings Hawaiian Slider Bun (Case)', stock: 0, required: 5, location: 'Freezer' },
  { id: 13, name: 'GF Slider Bun (Case)', stock: 0, required: 5, location: 'Freezer' },
  { id: 14, name: 'Slice Bread (Case)', stock: 0, required: 5, location: 'Freezer' },
  { id: 15, name: 'GF Slice Bread (Case)', stock: 0, required: 5, location: 'Freezer' },

  // Dry Storage

  { id: 16, name: 'Kings Hawaiian Bun (Case)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 17, name: 'GF Bun (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 18, name: 'Kings Hawaiian Slider Bun (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 19, name: 'GF Slider Bun (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 20, name: 'Slice Bread (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 21, name: 'GF Slice Bread (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 22, name: 'Mayo (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 23, name: 'Ranch Powder (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 24, name: 'Cornstarch (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 25, name: 'Flour (Case)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 26, name: 'Salt (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 27, name: 'Pepper (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 28, name: 'Hot Sauce (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 29, name: 'Garlic Salt (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 30, name: 'White Pepper (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 31, name: 'Smoked Paprika (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 32, name: 'Garlic Powder (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 33, name: 'Onion Powder (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 34, name: 'Poultry Seasoing (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 35, name: 'Sage (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 36, name: 'Cumin (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 37, name: 'Thyme (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 38, name: 'Marjoram (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 39, name: 'Cayenne (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 40, name: 'Smoked Paprika (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 41, name: 'Korean Red Pepper Flake (Each)', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 42, name: 'Reaper Seasoning (Each)', stock: 0, required: 5, location: 'Dry Storage' },
];
