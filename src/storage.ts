// # Author: Hasindu Chamath

let inventory: InventoryItem[] = [];

 function addItem(item: InventoryItem): boolean {
  if (inventory.find((i) => i.id === item.id)) {
    console.error("Item ID must be unique!");
    return false;
  }
  inventory.push(item);
  return true;
}

 function getItems(): InventoryItem[] {
  return inventory;
}

 function searchItem(name: string): InventoryItem | undefined {
  return inventory.find((item) => item.name.toLowerCase() === name.toLowerCase());
}

// Save items to local storage
 function saveItems(items: InventoryItem[]) {
  localStorage.setItem("inventory", JSON.stringify(items));
}


 function updateItem(name: string, updatedData: Partial<InventoryItem>): boolean {
  const items = getItems();
  const index = items.findIndex((item) => item.name === name);
  if (index === -1) return false; // Item not found

  items[index] = { ...items[index], ...updatedData }; // Merge updates
  saveItems(items);
  return true;
}

 function deleteItem(name: string): boolean {
  const items = getItems();
  const index = items.findIndex((item) => item.name.toLowerCase() === name.toLowerCase());
  
  if (index === -1) return false; // Item not found

  const confirmDelete = confirm(`Are you sure you want to delete "${name}"?`);
  if (!confirmDelete) return false;

  items.splice(index, 1); // Remove item
  saveItems(items);
  return true;
}
