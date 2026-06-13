// import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// function cartItemTemplate(item) {
//   const qty = item.quantity || 1;
//   const newItem = `<li class="cart-card divider" data-id="${item.Id}">
//   <a href="#" class="cart-card__image">
//     <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <div class="cart-card__quantity">
//     <button class="qty-btn qty-decrease">-</button>
//     <input class="qty-input" type="number" value="${qty}" min="1" />
//     <button class="qty-btn qty-increase">+</button>
//   </div>
//   <p class="cart-card__price">$${(item.FinalPrice * qty).toFixed(2)}</p>
// </li>`;
//   return newItem;
// }

// export default class ShoppingCart {
//   constructor(key, parentSelector) {
//     this.key = key;
//     this.parentSelector = parentSelector;
//     this.total = 0;
//   }

//   async init() {
//     this.renderCartContents();
//     this.addQuantityListeners();
//   }

//   calculateListTotal(list) {
//     if (!list || list.length === 0) {
//       this.total = 0;
//       return;
//     }
//     this.total = list.reduce((sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0);
//   }

//   updateQuantity(id, newQty) {
//     const cartItems = getLocalStorage(this.key) || [];
//     const updated = cartItems.map((item) => {
//       if (item.Id === id) item.quantity = newQty;
//       return item;
//     });
//     setLocalStorage(this.key, updated);
//     this.calculateListTotal(updated);
//     // Re-render para reflejar cambios
//     this.renderCartContents();
//     this.addQuantityListeners();
//   }

//   addQuantityListeners() {
//     document.querySelectorAll(".cart-card").forEach((card) => {
//       const id = card.dataset.id;
//       const input = card.querySelector(".qty-input");
//       const decrease = card.querySelector(".qty-decrease");
//       const increase = card.querySelector(".qty-increase");

//       decrease.addEventListener("click", () => {
//         const newQty = Math.max(1, parseInt(input.value) - 1);
//         this.updateQuantity(id, newQty);
//       });

//       increase.addEventListener("click", () => {
//         const newQty = parseInt(input.value) + 1;
//         this.updateQuantity(id, newQty);
//       });

//       input.addEventListener("change", () => {
//         const newQty = parseInt(input.value) || 0;
//         if (newQty <= 0) {
//           this.removeItem(id);
//         } else {
//           this.updateQuantity(id, newQty);
//         }
//       });
//     });
//   }

//   renderCartContents() {
//     const cartItems = getLocalStorage(this.key) || [];
//     const parent = document.querySelector(this.parentSelector);

//     if (cartItems.length === 0) {
//       parent.innerHTML = "<p>Tu carrito está vacío</p>";
//       document.querySelector(".list-footer")?.classList.add("hide");
//       return;
//     }

//     this.calculateListTotal(cartItems);
//     parent.innerHTML = cartItems.map(cartItemTemplate).join("");
//     document.querySelector(".list-footer")?.classList.remove("hide");
//     document.querySelector(".list-total").innerText = `Total: $${this.total.toFixed(2)}`;
//   }
// }

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const qty = item.quantity || 1;
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button class="qty-btn qty-decrease">-</button>
    <input class="qty-input" type="number" value="${qty}" min="0" />
    <button class="qty-btn qty-increase">+</button>
  </div>
  <p class="cart-card__price">$${(item.FinalPrice * qty).toFixed(2)}</p>
</li>`;
  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    this.renderCartContents();
    this.addQuantityListeners();
  }

  calculateListTotal(list) {
    if (!list || list.length === 0) {
      this.total = 0;
      return;
    }
    this.total = list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0,
    );
  }

  removeItem(id) {
    const cartItems = getLocalStorage(this.key) || [];
    const item = cartItems.find((item) => item.Id === id);
    const confirmed = window.confirm(
      `Are you sure you want to remove "${item?.Name}" from your cart?`,
    );
    if (!confirmed) {
      this.renderCartContents();
      this.addQuantityListeners();
      return;
    }
    const updated = cartItems.filter((item) => item.Id !== id);
    setLocalStorage(this.key, updated);
    this.renderCartContents();
    this.addQuantityListeners();
  }

  updateQuantity(id, newQty) {
    const cartItems = getLocalStorage(this.key) || [];
    const updated = cartItems.map((item) => {
      if (item.Id === id) item.quantity = newQty;
      return item;
    });
    setLocalStorage(this.key, updated);
    this.calculateListTotal(updated);
    this.renderCartContents();
    this.addQuantityListeners();
  }

  addQuantityListeners() {
    document.querySelectorAll(".cart-card").forEach((card) => {
      const id = card.dataset.id;
      const input = card.querySelector(".qty-input");
      const decrease = card.querySelector(".qty-decrease");
      const increase = card.querySelector(".qty-increase");

      decrease.addEventListener("click", () => {
        const newQty = parseInt(input.value) - 1;
        if (newQty <= 0) {
          this.removeItem(id);
        } else {
          this.updateQuantity(id, newQty);
        }
      });

      increase.addEventListener("click", () => {
        const newQty = parseInt(input.value) + 1;
        this.updateQuantity(id, newQty);
      });

      input.addEventListener("change", () => {
        const newQty = parseInt(input.value) || 0;
        if (newQty <= 0) {
          this.removeItem(id);
        } else {
          this.updateQuantity(id, newQty);
        }
      });
    });
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    const parent = document.querySelector(this.parentSelector);

    if (cartItems.length === 0) {
      parent.innerHTML = "<p>Tu carrito está vacío</p>";
      document.querySelector(".list-footer")?.classList.add("hide");
      return;
    }

    this.calculateListTotal(cartItems);
    parent.innerHTML = cartItems.map(cartItemTemplate).join("");
    document.querySelector(".list-footer")?.classList.remove("hide");
    document.querySelector(".list-total").innerText =
      `Total: $${this.total.toFixed(2)}`;
  }
}
