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
