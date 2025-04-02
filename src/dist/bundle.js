"use strict";
// # Author: Hasindu Chamath
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const addItemForm = document.getElementById("addItemForm");
    const inventoryList = document.getElementById("inventoryList");
    const updateItemForm = document.getElementById("updateItemForm");
    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("input", () => {
        updateInventoryUI(searchBox.value); // Call update function on input change
    });
    (_a = document.getElementById("filterFeatured")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
        updateInventoryUI(searchBox.value);
    });
    addItemForm.onsubmit = (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById("id").value.trim());
        if (!id) {
            alert("Please enter a unique ID.");
            return;
        }
        const existingItem = getItems().find(item => item.id === id);
        if (existingItem) {
            alert("ID already exists! Please enter a unique ID.");
            return;
        }
        const item = {
            id, // Use manually entered ID
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            quantity: parseInt(document.getElementById("quantity").value),
            price: parseFloat(document.getElementById("price").value),
            supplier: document.getElementById("supplier").value,
            stockStatus: document.getElementById("stockStatus").value,
            featured: document.getElementById("featured").checked,
            specialNote: document.getElementById("specialNote").value || "",
        };
        if (addItem(item)) {
            updateInventoryUI();
        }
        addItemForm.reset(); // Reset form after submission
    };
    // Update Item
    updateItemForm.onsubmit = (e) => {
        e.preventDefault();
        const itemName = document.getElementById("updateName").value;
        const newQuantity = parseInt(document.getElementById("updateQuantity").value);
        const newPrice = parseFloat(document.getElementById("updatePrice").value);
        const newSupplier = document.getElementById("updateSupplier").value;
        if (updateItem(itemName, { quantity: newQuantity, price: newPrice, supplier: newSupplier })) {
            alert("Item updated successfully!");
            document.getElementById("updateItemForm").reset();
            updateInventoryUI();
        }
        else {
            alert("Item not found!");
        }
    };
    function updateInventoryUI(searchTerm = "") {
        inventoryList.innerHTML = "";
        const filterFeatured = document.getElementById("filterFeatured").checked;
        let items = getItems().filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
        );
        if (filterFeatured) {
            items = items.filter(item => item.featured); // Filter only featured items
        }
        items.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            itemElement.innerHTML = `
          <div>
              <strong>${item.id}</strong>
              <strong>${item.name}</strong> (${item.category}) - ${item.stockStatus}
              <br> Price: $${item.price.toFixed(2)}, Quantity: ${item.quantity}
              <br> Supplier: ${item.supplier} ${item.featured ? "<span class='badge bg-warning text-dark'>Featured</span>" : ""}
              <br> ${item.specialNote ? `<em>Note: ${item.specialNote}</em>` : ""}
          </div>
          <button class="btn btn-danger btn-sm delete-btn" data-name="${item.name}">Delete</button>
          `;
            inventoryList.appendChild(itemElement);
        });
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const target = e.target;
                const itemName = target.getAttribute("data-name");
                if (itemName && deleteItem(itemName)) {
                    alert(`"${itemName}" has been deleted.`);
                    updateInventoryUI(searchBox.value);
                }
                else {
                    alert("Item not found!");
                }
            });
        });
    }
    // Ensure stored items are displayed when page loads
    updateInventoryUI();
});
// # Author: Hasindu Chamath
let inventory = [];
function addItem(item) {
    if (inventory.find((i) => i.id === item.id)) {
        console.error("Item ID must be unique!");
        return false;
    }
    inventory.push(item);
    return true;
}
function getItems() {
    return inventory;
}
function searchItem(name) {
    return inventory.find((item) => item.name.toLowerCase() === name.toLowerCase());
}
// Save items to local storage
function saveItems(items) {
    localStorage.setItem("inventory", JSON.stringify(items));
}
function updateItem(name, updatedData) {
    const items = getItems();
    const index = items.findIndex((item) => item.name === name);
    if (index === -1)
        return false; // Item not found
    items[index] = Object.assign(Object.assign({}, items[index]), updatedData); // Merge updates
    saveItems(items);
    return true;
}
function deleteItem(name) {
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
