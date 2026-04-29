const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// 1. Initialize cart from sessionStorage or empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// 2. Render the initial product list
function renderProducts() {
  productList.innerHTML = ""; 
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach event listeners to the newly created buttons
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// 3. Render the cart list
function renderCart() {
  cartList.innerHTML = ""; 
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// 4. Add product logic
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// 5. Clear cart logic
clearCartBtn.addEventListener("click", () => {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
});

// CRITICAL: Call these functions to display data on load!
renderProducts();
renderCart();