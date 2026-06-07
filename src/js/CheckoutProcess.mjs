import {
  setLocalStorage,
  getLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

function cartItemTemplate(item) {
  return `<li class="cart-summary-item">
    <span>${item.Name}</span>
    <span>$${item.FinalPrice}</span>
  </li>`;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.renderCartItems();
    this.calculateItemSummary();
    this.calculateOrdertotal();
  }

  renderCartItems() {
    const itemsContainer = document.querySelector(
      this.outputSelector + " .cart-items-summary",
    );
    if (itemsContainer && this.list.length > 0) {
      const htmlItems = this.list.map((item) => cartItemTemplate(item));
      itemsContainer.innerHTML = htmlItems.join("");
    }
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal",
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items",
    );

    if (itemNumElement) itemNumElement.innerText = this.list.length;

    // calculate the total of all the items in the cart
    if (this.list.length > 0) {
      const amounts = this.list.map((item) => parseFloat(item.FinalPrice));
      this.itemTotal = parseFloat(
        amounts.reduce((sum, item) => sum + item, 0).toFixed(2),
      );
    } else {
      this.itemTotal = 0;
    }

    if (summaryElement)
      summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
  }

  calculateOrdertotal() {
    // Calcular shipping: $5 base + $3 por cada artículo adicional
    this.shipping = parseFloat(
      (5 + Math.max(0, this.list.length - 1) * 3).toFixed(2),
    );

    // Calcular tax: 8% del subtotal (realista para la mayoría de estados)
    this.tax = parseFloat((parseFloat(this.itemTotal) * 0.08).toFixed(2));

    // Calcular total: subtotal + shipping + tax
    this.orderTotal = parseFloat(
      (parseFloat(this.itemTotal) + this.shipping + this.tax).toFixed(2),
    );

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal",
    );

    if (shipping) shipping.innerText = "$" + this.shipping.toFixed(2);
    if (tax) tax.innerText = "$" + this.tax.toFixed(2);
    if (orderTotal) orderTotal.innerText = "$" + this.orderTotal.toFixed(2);
  }

  async checkout() {
    // Validar que el carrito no esté vacío
    if (!this.list || this.list.length === 0) {
      alertMessage(
        "El carrito está vacío. Agrega productos antes de proceder al checkout.",
      );
      return;
    }

    const formElement = document.forms["checkout"];

    if (!formElement) {
      alertMessage("Formulario no encontrado");
      console.error("Form element not found");
      return;
    }

    // Obtener datos del formulario
    const json = formDataToJSON(formElement);

    // Validar que todos los campos requeridos estén llenos
    if (
      !json.first ||
      !json.last ||
      !json.street ||
      !json.city ||
      !json.state ||
      !json.zip
    ) {
      alertMessage("Por favor completa toda la información de envío");
      return;
    }

    if (!json.cardNumber || !json.expiry || !json.cvv) {
      alertMessage("Por favor completa toda la información de pago");
      return;
    }

    // Agregar totales e información de items
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    console.log("Orden enviada:", json);

    try {
      const res = await services.checkout(json);
      console.log("Respuesta del servidor:", res);

      // Limpiar el carrito
      setLocalStorage("so-cart", []);

      // Redirigir a página de éxito
      setTimeout(() => {
        location.assign("/checkout/success.html");
      }, 500);
    } catch (err) {
      console.error("Error en checkout:", err);

      // Limpiar alertas previas
      removeAllAlerts();

      // Mostrar mensaje de error
      if (err.message && typeof err.message === "object") {
        for (let message in err.message) {
          alertMessage(err.message[message]);
        }
      } else {
        alertMessage(
          err.message || "Error al procesar la orden. Intenta de nuevo.",
        );
      }
    }
  }
}
