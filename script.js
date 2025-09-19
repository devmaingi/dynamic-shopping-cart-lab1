const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");

let totalPrice = 0;

// Button state starts as disabled to prevent adding empty items
addProductButton.disabled = true;

//edge case - prevent empty price and name inputs by disabling the button if either input is empty
productNameInput.addEventListener("input", function () {
  addProductButton.disabled =
    productNameInput.value.trim() === "" ||
    productPriceInput.value.trim() === "";
});

productPriceInput.addEventListener("input", function () {
  addProductButton.disabled =
    productNameInput.value.trim() === "" ||
    productPriceInput.value.trim() === "";
});

// Event listener for adding a product
addProductButton.addEventListener("click", function () {
  ///Get input value
  const inputText = productNameInput.value;
  const inputPrice = productPriceInput.value;

  ///Create new list item
  const newLI = document.createElement("li");
  newLI.textContent = inputText + " - $" + parseFloat(inputPrice).toFixed(2); // set the text of the list item
  newLI.classList.add("item"); //adds a class to the list item
  newLI.dataset.price = inputPrice; // store the price in a data attribute
  cart.appendChild(newLI); // add the new item to the cart
  updateTotalPrice(parseFloat(inputPrice)); // update the total price

  //create a delete button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove"; //set the text of the button
  removeBtn.classList.add("remove"); //adds a class to the button
  newLI.appendChild(removeBtn); // add the button to the list item

  // add event listener to the button
  removeBtn.addEventListener("click", removeItem);
});

// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
  const item = event.target.closest("li");
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}
