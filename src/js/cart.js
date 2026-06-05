import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// --- 1. RENDER LOGIC ---

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Fallback to empty array if empty
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Use item.Quantity dynamically, and ensure the remove button exists with data-id
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${(item.FinalPrice * (item.Quantity || 1)).toFixed(2)}</p>
  <button class="cart-card__remove" data-id="${item.Id}">X</button>
</li>`;
}

// Initial render when the script loads
renderCartContents();

// --- 2. ADD TO CART LOGIC ---
// (You can call this function from your product detail page listeners)
export function addToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Check if the item already exists in the cart by its ID
  const existingItem = cartItems.find((item) => item.Id === product.Id);

  if (existingItem) {
    // If it exists, track it by adding/incrementing a Quantity property
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    // If it's new, give it an initial Quantity of 1 and push it
    product.Quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // Refresh the UI visually
}

// --- 3. REMOVE FROM CART LOGIC ---

export function removeFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Filter out the item completely, or decrement it if quantity > 1
  const existingItem = cartItems.find((item) => item.Id === productId);

  if (existingItem) {
    if (existingItem.Quantity > 1) {
      existingItem.Quantity -= 1;
    } else {
      cartItems = cartItems.filter((item) => item.Id !== productId);
    }
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // Refresh the UI visually without reloading the whole browser tab
}

// --- 4. EVENT LISTENERS ---

// Event delegation on the cart container
document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-card__remove")) {
    const productId = e.target.dataset.id;

    // Call the logic function to update localStorage and re-render
    removeFromCart(productId);
  }
});
