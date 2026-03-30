const products = [
  {
    id: 1,
    name: "Phone",
    price: "₹20,000",
    category: "Electronics",
    image: "https://via.placeholder.com/200",
    description: "Smartphone with good features"
  },
  {
    id: 2,
    name: "Laptop",
    price: "₹50,000",
    category: "Electronics",
    image: "https://via.placeholder.com/200",
    description: "High performance laptop"
  },
  {
    id: 3,
    name: "Shoes",
    price: "₹2,000",
    category: "Fashion",
    image: "https://via.placeholder.com/200",
    description: "Comfortable running shoes"
  },
  {
    id: 4,
    name: "Watch",
    price: "₹1,500",
    category: "Accessories",
    image: "https://via.placeholder.com/200",
    description: "Stylish wrist watch"
  }
];

const productList = document.getElementById("product-list");

products.map(product => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${product.image}" />
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="price">${product.price}</p>
    <small>${product.category}</small>
  `;

  productList.appendChild(card);
});