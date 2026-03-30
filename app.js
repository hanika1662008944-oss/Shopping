const products = [
  { id: 1, name: "Phone", price: 20000 },
  { id: 2, name: "Laptop", price: 50000 },
  { id: 3, name: "Shoes", price: 2000 },
  { id: 4, name: "Watch", price: 1500 }
];

let cart = [];

// Display products
const productList = document.getElementById("product-list");

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

// Add to cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  const totalEl = document.getElementById("total");

  cartItems.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    itemCount += item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>₹${item.price} x ${item.qty}</p>
      <button onclick="changeQty(${item.id}, 1)">+</button>
      <button onclick="changeQty(${item.id}, -1)">-</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  count.textContent = itemCount;
  totalEl.textContent = total;
}

// Change quantity
function changeQty(id, val) {
  const item = cart.find(p => p.id === id);
  item.qty += val;

  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

// Remove item
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

// Clear cart
function clearCart() {
  cart = [];
  updateCart();
}

// Toggle cart
function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("open");
}
