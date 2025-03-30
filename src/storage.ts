import { InventoryItem } from "./models";

let inventory: InventoryItem[] = [];

export function addItem(item: InventoryItem): boolean {
  if (inventory.find((i) => i.id === item.id)) {
    console.error("Item ID must be unique!");
    return false;
  }
  inventory.push(item);
  return true;
}

export function getItems(): InventoryItem[] {
  return inventory;
}

export function searchItem(name: string): InventoryItem | undefined {
  return inventory.find((item) => item.name.toLowerCase() === name.toLowerCase());
}
