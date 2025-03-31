let inventory = [];
export function addItem(item) {
    if (inventory.find((i) => i.id === item.id)) {
        console.error("Item ID must be unique!");
        return false;
    }
    inventory.push(item);
    return true;
}
export function getItems() {
    return inventory;
}
export function searchItem(name) {
    return inventory.find((item) => item.name.toLowerCase() === name.toLowerCase());
}
// Save items to local storage
export function saveItems(items) {
    localStorage.setItem("inventory", JSON.stringify(items));
}
export function updateItem(name, updatedData) {
    const items = getItems();
    const index = items.findIndex((item) => item.name === name);
    if (index === -1)
        return false; // Item not found
    items[index] = Object.assign(Object.assign({}, items[index]), updatedData); // Merge updates
    saveItems(items);
    return true;
}
export function deleteItem(name) {
    const items = getItems();
    const index = items.findIndex((item) => item.name.toLowerCase() === name.toLowerCase());
    if (index === -1)
        return false; // Item not found
    const confirmDelete = confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete)
        return false;
    items.splice(index, 1); // Remove item
    saveItems(items);
    return true;
}
