// 1. MUST HAVE: The product data array
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// 2. Initialize cart from sessionStorage (crucial for persistence)
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// 3. Render the product list
function renderProducts() {
  productList.innerHTML = ""; // Clear list
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach event listeners to all "Add to Cart" buttons
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(parseInt(btn.getAttribute("data-id")));
    });
  });
}

// 4. Render the cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear current UI
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// 5. Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    // Save stringified array to sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// 6. Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart"); // Clear storage
  renderCart();
}

// Event listener for Clear button
clearCartBtn.addEventListener("click", clearCart);

// Initial renders when page loads
renderProducts();
renderCart();