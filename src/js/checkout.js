import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

console.log("checkout.js cargado");

// Cargar header y footer
loadHeaderFooter()
  .then(() => {
    console.log("Header y footer cargados");
  })
  .catch((err) => {
    console.error("Error cargando header/footer:", err);
  });

// Esperar a que el DOM esté completamente listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCheckout);
} else {
  // DOM ya está listo
  initCheckout();
}

function initCheckout() {

  try {
    const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");

    const checkoutForm = document.querySelector("form[name='checkout']");


    if (checkoutForm) {
      // Listener para cambios en el ZIP (recalcular totales)
      const zipInput = document.querySelector("#zip");
      if (zipInput) {
        zipInput.addEventListener("blur", () => {
          myCheckout.calculateOrdertotal();
        });
      }

      checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await myCheckout.checkout();
      });
    } else {
      console.error("Form element not found");
    }
  } catch (err) {
    console.error("Error en initCheckout:", err);
  }
}
