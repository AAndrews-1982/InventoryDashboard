export type InventoryItem = {
  id: number;
  name: string;
  location: 'Refrigerator' | 'Freezer' | 'Dry Storage' | 'Disposables' | 'Soda';
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


  // Disposables
{
  id: 1001,
  name: 'FOH Paper Towel',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1002,
  name: 'BOH Paper Towel',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1003,
  name: 'Straws',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1004,
  name: 'FOH Dispenser Napkin',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1005,
  name: 'Fork',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1006,
  name: 'Knife',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1007,
  name: '5x5 Takeout Box',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1008,
  name: '9x6 Takeout Box',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1009,
  name: '9x9 Takeout Box',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1010,
  name: 'Soufflé Cup',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1011,
  name: 'Small Glove',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1012,
  name: 'Medium Glove',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1013,
  name: 'Large Glove',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1014,
  name: 'XL Glove',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1015,
  name: 'Sandwich Glove',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1016,
  name: '9 oz. Cup',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1017,
  name: '16 oz. Cup',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1018,
  name: 'Red Food Liners',
  location: 'Disposables',
  required: 0,
  stock: 0,
},
{
  id: 1019,
  name: 'Black Food Liners',
  location: 'Disposables',
  required: 0,
  stock: 0,
},

// Soda
{
  id: 2001,
  name: 'Pepsi',
  location: 'Soda',
  required: 0,
  stock: 0,
},
{
  id: 2002,
  name: 'Pepsi Zero',
  location: 'Soda',
  required: 0,
  stock: 0,
},
{
  id: 2003,
  name: 'Dr. Pepper',
  location: 'Soda',
  required: 0,
  stock: 0,
},
{
  id: 2004,
  name: 'Diet Dr. Pepper',
  location: 'Soda',
  required: 0,
  stock: 0,
},
{
  id: 2005,
  name: 'Tropicana Lemonade',
  location: 'Soda',
  required: 0,
  stock: 0,
},
{
  id: 2006,
  name: 'Mt. Dew',
  location: 'Soda',
  required: 0,
  stock: 0,
},
{
  id: 2007,
  name: 'Mug Root Beer',
  location: 'Soda',
  required: 0,
  stock: 0,
},
{
  id: 2008,
  name: 'Starry',
  location: 'Soda',
  required: 0,
  stock: 0,
},

];
