// Load cart from storage or create a new one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*  Add To Cart — Product Pages */
document.addEventListener("DOMContentLoaded", () => {

  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productSection = btn.closest(".product-info, .car-info");
      if (!productSection) return;

      const name = productSection.querySelector("h1, h2")?.innerText || "Automoblox Car";
      const priceText = productSection.querySelector(".price")?.innerText || "$0";
      const quantityInput = productSection.querySelector("input[type='number']");

      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      const qty = quantityInput ? parseInt(quantityInput.value) : 1;

      addToCart(name, price, qty);
      showMessage(productSection, `${qty} × ${name} added to cart!`);
    });
  });

/*  CART PAGE — IF cart.html EXISTS */

  if (document.getElementById("cart-items")) {
    renderCartPage();
  }

});

/* ADD TO CART LOGIC*/

function addToCart(name, price, quantity) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* CART PAGE DISPLAY */

function renderCartPage() {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    if (totalDisplay) totalDisplay.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = (item.price * item.quantity);
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-row");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Subtotal: $${itemTotal.toFixed(2)}</p>
      <hr>
    `;
    cartContainer.appendChild(div);
  });

  // Show total
  totalDisplay.textContent = total.toFixed(2);

  // Clear cart button
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    cart = [];
    renderCartPage();
  });
}
/*  CART MESSAGE (PRODUCT PAGE)*/

function showMessage(section, msg) {
  let messageBox = section.querySelector(".cart-message");

  if (!messageBox) {
    messageBox = document.createElement("p");
    messageBox.classList.add("cart-message");
    messageBox.style.transition = "opacity 0.5s ease";
    messageBox.style.opacity = "0";
    section.appendChild(messageBox);
  }

  messageBox.innerText = msg;
  messageBox.style.opacity = "1";

  setTimeout(() => {
    messageBox.style.opacity = "0";
  }, 2000);
}
