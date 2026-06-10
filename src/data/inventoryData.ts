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
  { id: 4, name: 'Green Cabbage', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 5, name: 'Purple Cabbage', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 6, name: 'Carrots', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 7, name: 'Butter', stock: 0, required: 5, location: 'Refrigerator' },
  { id: 8, name: 'Apple Pineapple Pico', stock: 0, required: 5, location: 'Refrigerator' },

  // Freezer

  { id: 9, name: 'Crinkle Fries', stock: 0, required: 5, location: 'Freezer' },
  { id: 10, name: 'Kings Hawaiian Bun', stock: 0, required: 5, location: 'Freezer' },
  { id: 11, name: 'GF Bun', stock: 0, required: 5, location: 'Freezer' },
  { id: 12, name: 'Kings Hawaiian Slider Bun', stock: 0, required: 5, location: 'Freezer' },
  { id: 13, name: 'GF Slider Bun', stock: 0, required: 5, location: 'Freezer' },
  { id: 14, name: 'Slice Bread', stock: 0, required: 5, location: 'Freezer' },
  { id: 15, name: 'GF Slice Bread', stock: 0, required: 5, location: 'Freezer' },

  // Dry Goods

  { id: 16, name: 'Kings Hawaiian Bun', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 17, name: 'GF Bun', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 18, name: 'Kings Hawaiian Slider Bun', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 19, name: 'GF Slider Bun', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 20, name: 'Slice Bread', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 21, name: 'GF Slice Bread', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 22, name: 'Mayo', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 23, name: 'Ranch Powder', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 24, name: 'Cornstarch', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 25, name: 'Flour', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 26, name: 'Salt', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 27, name: 'Pepper', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 28, name: 'Hot Sauce', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 29, name: 'Garlic Salt', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 30, name: 'White Pepper', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 31, name: 'Smoked Paprika', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 32, name: 'Garlic Powder', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 33, name: 'Onion Powder', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 34, name: 'Poultry Seasoing', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 35, name: 'Sage', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 36, name: 'Cumin', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 37, name: 'Thyme', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 38, name: 'Marjoram', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 39, name: 'Cayenne', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 40, name: 'Smoked Paprika', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 41, name: 'Korean Red Pepper Flake', stock: 0, required: 5, location: 'Dry Storage' },
  { id: 42, name: 'Reaper Seasoning', stock: 0, required: 5, location: 'Dry Storage' },
];
