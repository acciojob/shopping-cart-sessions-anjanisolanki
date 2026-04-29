// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// 1. Load existing cart from sessionStorage or start with an empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach event listeners to the buttons after they are created
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(parseInt(btn.getAttribute("data-id")));
    });
  });
}

// 2. Render cart list
function renderCart() {
  // Clear the UI before re-rendering
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// 3. Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    // Update Session Storage
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // Update UI
    renderCart();
  }
}

// 4. Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listener for Clear button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();