export interface InventoryItem {
    id: number;
    name: string;
    category: "Electronics" | "Furniture" | "Clothing" | "Tools" | "Miscellaneous";
    quantity: number;
    price: number;
    supplier: string;
    stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
    featured: boolean;
    specialNote?: string;
  }
  