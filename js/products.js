const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 799,
    image: "./img/iphone-16.jpg",
    description:
      "Powerful smartphone with an advanced camera and OLED display.",
    category: "Apple",
    stock: 10,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    price: 899,
    image: "./img/samsung-s25.jpg",
    description:
      "Flagship smartphone with a vibrant display and excellent performance.",
    category: "Samsung",
    stock: 8,
  },
  {
    id: 3,
    name: "Xiaomi 15",
    price: 599,
    image: "./img/xiaomi-15.jpg",
    description: "High-performance smartphone with fast charging.",
    category: "Xiaomi",
    stock: 15,
  },
  {
    id: 4,
    name: "Google Pixel 9",
    price: 699,
    image: "./img/pixel-9.jpg",
    description:
      "Smartphone with an intelligent camera and a clean Android experience.",
    category: "Google",
    stock: 5,
  },
  {
    id: 5,
    name: "OnePlus 13",
    price: 749,
    image: "./img/oneplus-13.jpg",
    description:
      "Premium smartphone with smooth performance and fast charging.",
    category: "OnePlus",
    stock: 3,
  },
  {
    id: 6,
    name: "iPhone 15",
    price: 649,
    image: "./img/iphone-15.jpg",
    description:
      "Reliable smartphone with a premium design and powerful camera.",
    category: "Apple",
    stock: 0,
  },
];

const cerateElementItem = document.querySelector(".products");
const totalPrice = document.querySelector(".total-price");
const cartNew = document.querySelector(".cart");

const mapElement = products
  .map((product) => {
    return `
      <li class="product-item">
        <img src="${product.image}" alt="${product.name}"/>
        <p>Name: ${product.name}</p>
        <p>Description: ${product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <button class="add-btn" type="button" data-id="${product.id}">
          Add to Cart
        </button>
      </li>
    `;
  })
  .join("");

cerateElementItem.insertAdjacentHTML("beforeend", mapElement);

let cart = [];

cerateElementItem.addEventListener("click", (event) => {
  if (!event.target.classList.contains("add-btn")) {
    return;
  }

  const id = Number(event.target.dataset.id);
  const product = products.find((product) => product.id === id);

  if (!product || product.stock === 0) {
    return;
  }

  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    if (existingProduct.quantity < product.stock) {
      existingProduct.quantity++;
    }
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  updateTotalPrice();
});

function renderCart() {
  const newAitems = cart
    .map((cartItem) => {
      const subTotal = cartItem.price * cartItem.quantity;

      return `
        <li class="cart-item">
          <img src="${cartItem.image}" alt="${cartItem.name}"/>
          <p>Name: ${cartItem.name}</p>
          <p>Description: ${cartItem.description}</p>
          <p>Price: ${cartItem.price}</p>
          <p>Quantity: ${cartItem.quantity}</p>

          <button type="button" class="decrease-btn" data-id="${cartItem.id}">-</button>

          <button type="button" class="increase-btn" data-id="${cartItem.id}">+</button>

          <p>Subtotal: ${subTotal}</p>

          <button type="button" class="remove-btn" data-id="${cartItem.id}">Remove</button>
        </li>
      `;
    })
    .join("");

  cartNew.innerHTML = newAitems;
}

function updateTotalPrice() {
  const totalreduce = cart.reduce((total, cartItem) => {
    const totalreduceItem = cartItem.price * cartItem.quantity;

    return total + totalreduceItem;
  }, 0);

  totalPrice.textContent = totalreduce;
}

cartNew.addEventListener("click", (event) => {
  const idTarget = Number(event.target.dataset.id);
  const cartItem = cart.find((product) => product.id === idTarget);

  if (!cartItem) {
    return;
  }

  if (event.target.classList.contains("remove-btn")) {
    cart = cart.filter((item) => item.id !== idTarget);
  } else if (
    event.target.classList.contains("decrease-btn") &&
    cartItem.quantity > 1
  ) {
    cartItem.quantity--;
  } else if (
    event.target.classList.contains("increase-btn") &&
    cartItem.quantity < cartItem.stock
  ) {
    cartItem.quantity++;
  }

  renderCart();
  updateTotalPrice();
});
