import { addItem, getItems, searchItem } from "./storage.js";
import { InventoryItem } from "./models";

document.addEventListener("DOMContentLoaded", () => {
  const addItemForm = document.getElementById("addItemForm") as HTMLFormElement;
  const inventoryList = document.getElementById("inventoryList") as HTMLDivElement;

  addItemForm.onsubmit = (e) => {
    e.preventDefault();
    
    const item: InventoryItem = {
      id: Date.now(),
      name: (document.getElementById("name") as HTMLInputElement).value,
      category: (document.getElementById("category") as HTMLSelectElement).value as InventoryItem["category"],
      quantity: parseInt((document.getElementById("quantity") as HTMLInputElement).value),
      price: parseFloat((document.getElementById("price") as HTMLInputElement).value),
      supplier: (document.getElementById("supplier") as HTMLInputElement).value,
      stockStatus: (document.getElementById("stockStatus") as HTMLSelectElement).value as InventoryItem["stockStatus"],
      featured: (document.getElementById("featured") as HTMLInputElement).checked,
      specialNote: (document.getElementById("specialNote") as HTMLInputElement).value || "",
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
