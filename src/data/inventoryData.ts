export type InventoryItem = {
    id: number;
    name: string;
    location: 'Refrigerator' | 'Freezer' | 'Dry Storage';
    stock: number;
    required: number;
    note?: string;
  };
  
  export const inventoryData: InventoryItem[] = [
    // Refrigerator
    { id: 1, name: 'Tender (Case)', stock: 0, required: 5, location: 'Refrigerator' },
    { id: 2, name: 'Boneless Skinless Thighs (Case)', stock: 0, required: 5, location: 'Refrigerator' },
    { id: 3, name: 'Buttermilk', stock: 0, required: 5, location: 'Refrigerator' },
    { id: 4, name: 'Green Cabbage', stock: 0, required: 5, location: 'Refrigerator' },
    { id: 5, name: 'Purple Cabbage', stock: 0, required: 5, location: 'Refrigerator' },
    { id: 6, name: 'Carrots', stock: 0, required: 5, location: 'Refrigerator' },
    { id: 7, name: 'Real Butter', stock: 0, required: 5, location: 'Refrigerator' },
    { id: 8, name: 'Margarine', stock: 0, required: 5, location: 'Refrigerator' },
  
    // Freezer
    { id: 9, name: 'Crinkle Fries', stock: 0, required: 5, location: 'Freezer' },
  
    // Dry Goods
    { id: 10, name: 'Green Apples', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 11, name: 'Red Apples', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 12, name: 'Brown Sugar', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 13, name: 'Cane Sugar', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 14, name: 'Mayo (Helman’s)', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 15, name: 'Hot Sauce (Louisiana)', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 16, name: 'Sliced Bread (Brioche)', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 17, name: 'Hamburger Buns (Brioche)', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 18, name: 'Cornstarch', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 19, name: 'Flour', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 20, name: 'Grits', stock: 0, required: 5, location: 'Dry Storage' },
    { id: 21, name: 'Truffle Oil', stock: 0, required: 5, location: 'Dry Storage' },
  ];
  