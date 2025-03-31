import { addItem, getItems, searchItem,updateItem,deleteItem } from "./storage.js";
import { InventoryItem } from "./models";

document.addEventListener("DOMContentLoaded", () => {
  const addItemForm = document.getElementById("addItemForm") as HTMLFormElement;
  const inventoryList = document.getElementById("inventoryList") as HTMLDivElement;
  const updateItemForm = document.getElementById("updateItemForm") as HTMLFormElement;

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


    // Update Item
    updateItemForm.onsubmit = (e) => {
      e.preventDefault();
      
      const itemName = (document.getElementById("updateName") as HTMLInputElement).value;
      const newQuantity = parseInt((document.getElementById("updateQuantity") as HTMLInputElement).value);
      const newPrice = parseFloat((document.getElementById("updatePrice") as HTMLInputElement).value);
      
      if (updateItem(itemName, { quantity: newQuantity, price: newPrice })) {
        alert("Item updated successfully!");
        (document.getElementById("updateItemForm") as HTMLFormElement).reset();
        updateInventoryUI();
      } else {
        alert("Item not found!");
      }
    };
  

  function updateInventoryUI() {
    inventoryList.innerHTML = "";
    getItems().forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

      itemElement.innerHTML = `
      <div>
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
        const target = e.target as HTMLButtonElement;
        console.log("Delete button clicked!", target); // Debugging log
    
        const itemName = target.getAttribute("data-name");
        console.log("Item to delete:", itemName); // Debugging log
    
        if (itemName && deleteItem(itemName)) {
          alert(`"${itemName}" has been deleted.`);
          updateInventoryUI();
        } else {
          alert("Item not found!");
        }
      });
    });
    
  }

  // Ensure stored items are displayed when page loads
  updateInventoryUI();

  


  
});

