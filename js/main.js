const productSearch = document.querySelector(".product-search");
const searchResults = document.querySelector(".search-results");

let activeIndex = -1;

productSearch.addEventListener("input", (event) => {
  const eventTarget = event.target.value.toLowerCase().trim();

  if (eventTarget === "") {
    renderProducts(products);
    searchResults.innerHTML = "";
    activeIndex = -1;
    return;
  }

  const filter = products.filter((product) =>
    product.name.toLowerCase().includes(eventTarget)
  );

  renderSearchResults(filter);
});

function renderProducts(items) {
  const mapItem = items
    .map((item) => {
      return `
        <li class="product-item">
          <img src="${item.image}" alt="${item.name}"/>
          <p>Name: ${item.name}</p>
          <p>Description: ${item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Stock: ${item.stock}</p>
          <button class="add-btn" type="button" data-id="${item.id}">
            Add to Cart
          </button>
        </li>
      `;
    })
    .join("");

  cerateElementItem.innerHTML = mapItem;
}

renderProducts(products);

function renderSearchResults(items) {
  activeIndex = -1;

  const mapItem = items
    .map((item) => {
      return `
        <li class="search-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}"/>
          <p>Name: ${item.name}</p>
          <p>Price: ${item.price}</p>
        </li>
      `;
    })
    .join("");

  searchResults.innerHTML = mapItem;
}

searchResults.addEventListener("click", (event) => {
  const searchItem = event.target.closest(".search-item");

  if (!searchItem) {
    return;
  }

  const id = Number(searchItem.dataset.id);
  const product = products.find((product) => product.id === id);

  if (!product) {
    return;
  }

  renderProducts([product]);
  searchResults.innerHTML = "";
  activeIndex = -1;
  productSearch.value = product.name;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".input-contain")) {
    searchResults.innerHTML = "";
    activeIndex = -1;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchResults.innerHTML = "";
    activeIndex = -1;
    return;
  }

  const suggestions = searchResults.querySelectorAll(".search-item");

  if (suggestions.length === 0) {
    return;
  } else if (event.key === "ArrowDown") {
    event.preventDefault();

    if (activeIndex < suggestions.length - 1) {
      activeIndex++;
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();

    if (activeIndex > 0) {
      activeIndex--;
    }
  } else if (event.key === "Enter" && suggestions[activeIndex]) {
    event.preventDefault();
    suggestions[activeIndex].click();
    return;
  } else {
    return;
  }

  suggestions.forEach((item) => {
    item.classList.remove("active");
  });

  if (suggestions[activeIndex]) {
    suggestions[activeIndex].classList.add("active");
  }
});


