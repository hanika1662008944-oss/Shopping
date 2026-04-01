const products = [
  { id: 1, name: "Phone", category: "electronics", price: 10000 },
  { id: 2, name: "Laptop", category: "electronics", price: 50000 },
  { id: 3, name: "Shirt", category: "clothes", price: 500 },
  { id: 4, name: "Jeans", category: "clothes", price: 1200 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "all";

const productDiv = document.getElementById("products");
const cartCount = document.getElementById("cart-count");

function displayProducts() {
  productDiv.innerHTML = "";

  let search = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter(p =>
    (currentCategory === "all" || p.category === currentCategory) &&
    p.name.toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    productDiv.innerHTML = "<h3>No products found</h3>";
    return;
  }

  filtered.forEach(p => {
    productDiv.innerHTML += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}

function addToCart(id) {
  let item = cart.find(p => p.id === id);

  if (item) {
    item.quantity++;
  } else {
    let product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerText = cart.reduce((a, b) => a + b.quantity, 0);
}

function filterCategory(cat) {
  currentCategory = cat;
  displayProducts();
}

document.getElementById("search").addEventListener("input", displayProducts);

function goToCart() {
  document.getElementById("products").classList.add("hidden");
  document.getElementById("cart-page").classList.remove("hidden");

  let cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div>
        ${item.name} - ${item.quantity}
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
  goToCart();
}

function goHome() {
  document.getElementById("products").classList.remove("hidden");
  document.getElementById("cart-page").classList.add("hidden");
}

updateCart();
displayProducts();
