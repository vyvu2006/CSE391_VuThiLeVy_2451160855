const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung S25",
    price: 21990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 3,
    name: "MacBook Air M4",
    price: 32990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 4,
    name: "Dell XPS 15",
    price: 28990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 5,
    name: "Sony Headphone",
    price: 5990000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 6,
    name: "AirPods Pro",
    price: 6490000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 7,
    name: "iPad Pro",
    price: 24990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.7,
    inStock: false,
  },
  {
    id: 8,
    name: "Galaxy Tab S10",
    price: 18990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 9,
    name: "Asus ROG",
    price: 35990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 10,
    name: "Xiaomi 15",
    price: 15990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.3,
    inStock: true,
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    price: 2490000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.2,
    inStock: true,
  },
  {
    id: 12,
    name: "Lenovo Legion",
    price: 27990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.8,
    inStock: false,
  },
];

let filteredProducts = [...products];
let cartCount = 0;

/* APP */

function init() {
  createLayout();
  renderProducts(filteredProducts);
}

function createLayout() {
  const container = document.createElement("div");
  container.className = "container";

  container.innerHTML = `
        <div class="cart">
            🛒 <span class="badge">0</span>
        </div>

        <div class="header">
            <h1>Product Catalog</h1>

            <div class="controls">
                <input type="text" id="search" placeholder="Search product..." />

                <select id="sort">
                    <option value="">Sort By</option>
                    <option value="price-asc">Price Low → High</option>
                    <option value="price-desc">Price High → Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rating</option>
                </select>

                <button id="darkModeBtn">🌙 Dark Mode</button>
            </div>
        </div>

        <div class="categories">
            <button class="category-btn active" data-category="all">All</button>
            <button class="category-btn" data-category="phone">Phone</button>
            <button class="category-btn" data-category="laptop">Laptop</button>
            <button class="category-btn" data-category="tablet">Tablet</button>
            <button class="category-btn" data-category="accessory">Accessory</button>
        </div>

        <div class="products" id="productList"></div>
    `;

  document.body.appendChild(container);

  addEvents();
}

/* RENDER PRODUCTS */

function renderProducts(productArray) {
  const productList = document.getElementById("productList");

  productList.innerHTML = "";

  productArray.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString()}đ</p>
            <p class="rating">⭐ ${product.rating}</p>
            <p class="stock">
                ${product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
            </p>
            <button class="add-cart">Add To Cart</button>
        `;

    card.addEventListener("click", () => {
      showModal(product);
    });

    const addBtn = card.querySelector(".add-cart");

    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      cartCount++;

      document.querySelector(".badge").textContent = cartCount;
    });

    productList.appendChild(card);
  });
}

/* SEARCH */

function searchProducts(keyword) {
  filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  renderProducts(filteredProducts);
}

/* FILTER */

function filterByCategory(category) {
  if (category === "all") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(
      (product) => product.category === category,
    );
  }

  renderProducts(filteredProducts);
}

/* SORT */

function sortProducts(value) {
  const sorted = [...filteredProducts];

  switch (value) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  renderProducts(sorted);
}

/* MODAL */

function showModal(product) {
  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>

            <img src="${product.image}" alt="${product.name}">

            <h2>${product.name}</h2>

            <p><strong>Price:</strong>
            ${product.price.toLocaleString()}đ</p>

            <p><strong>Rating:</strong> ⭐ ${product.rating}</p>

            <p>
                <strong>Status:</strong>
                ${product.inStock ? "In Stock" : "Out of Stock"}
            </p>

            <p><strong>Category:</strong> ${product.category}</p>
        </div>
    `;

  document.body.appendChild(modal);

  modal.querySelector(".close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

/* EVENTS */

function addEvents() {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", (e) => {
    searchProducts(e.target.value);
  });

  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      filterByCategory(button.dataset.category);
    });
  });

  document.getElementById("sort").addEventListener("change", (e) => {
    sortProducts(e.target.value);
  });

  document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

init();
