import { addItem, getItems } from "./storage.js";
document.addEventListener("DOMContentLoaded", () => {
    const addItemForm = document.getElementById("addItemForm");
    const inventoryList = document.getElementById("inventoryList");
    addItemForm.onsubmit = (e) => {
        e.preventDefault();
        const item = {
            id: Date.now(),
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
    function updateInventoryUI() {
        inventoryList.innerHTML = "";
        getItems().forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("list-group-item");
            itemElement.innerHTML = `
        <strong>${item.name}</strong> (${item.category}) - ${item.stockStatus}
        <br> Price: $${item.price.toFixed(2)}, Quantity: ${item.quantity}
        <br> Supplier: ${item.supplier} ${item.featured ? "<span class='badge bg-warning text-dark'>Featured</span>" : ""}
        <br> ${item.specialNote ? `<em>Note: ${item.specialNote}</em>` : ""}
      `;
            inventoryList.appendChild(itemElement);
        });
    }
    // Ensure stored items are displayed when page loads
    updateInventoryUI();
});
