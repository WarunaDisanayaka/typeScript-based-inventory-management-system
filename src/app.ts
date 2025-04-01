// # Author: Hasindu Chamath
import { addItem, getItems, searchItem,updateItem,deleteItem } from "./storage.js";
import { InventoryItem } from "./models";

document.addEventListener("DOMContentLoaded", () => {
  const addItemForm = document.getElementById("addItemForm") as HTMLFormElement;
  const inventoryList = document.getElementById("inventoryList") as HTMLDivElement;
  const updateItemForm = document.getElementById("updateItemForm") as HTMLFormElement;
  const searchBox = document.getElementById("searchBox") as HTMLInputElement;

  searchBox.addEventListener("input", () => {
      updateInventoryUI(searchBox.value); // Call update function on input change
  });
  
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
      const newSupplier = (document.getElementById("updateSupplier") as HTMLInputElement).value;
      
      if (updateItem(itemName, { quantity: newQuantity, price: newPrice, supplier:newSupplier })) {
        alert("Item updated successfully!");
        (document.getElementById("updateItemForm") as HTMLFormElement).reset();
        updateInventoryUI();
      } else {
        alert("Item not found!");
      }
    };
  

    function updateInventoryUI(searchTerm = "") {
      inventoryList.innerHTML = "";
      const items = getItems().filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter items based on search
      );
  
      items.forEach((item) => {
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
              const itemName = target.getAttribute("data-name");
              if (itemName && deleteItem(itemName)) {
                  alert(`"${itemName}" has been deleted.`);
                  updateInventoryUI(searchBox.value);
              } else {
                  alert("Item not found!");
              }
          });
      });
  }
  

  // Ensure stored items are displayed when page loads
  updateInventoryUI();

});

