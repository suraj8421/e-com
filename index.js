let allCategoriesData;

function fetchAndRenderAllCategories() {
  fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
    .then((response) => response.json())
    .then((data) => {
      allCategoriesData = data.categories;
      renderProducts(allCategoriesData.flatMap(category => category.category_products));
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function renderProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productElement = createProductElement(product);
    productList.appendChild(productElement);
  });
}

function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  productElement.style.marginLeft = "10px"
  const title = createElementWithText("h3", product.title);
  const price = createElementWithText("p", "Price: $" + product.price);
  const comparePrice = createElementWithText("p", "Compare at Price: $" + product.compare_at_price);
  const vendor = createElementWithText("p", "Vendor: " + product.vendor);
  const badge = createElementWithText("p", "Badge: " + (product.badge_text ? product.badge_text : "None"));

  const primaryImage = createImageElement(product.image, product.title);
  const secondaryImage = createImageElement(product.second_image, product.title);

  productElement.appendChild(primaryImage);
  productElement.appendChild(secondaryImage);
  productElement.appendChild(title);
  productElement.appendChild(price);
  productElement.appendChild(comparePrice);
  productElement.appendChild(vendor);
  productElement.appendChild(badge);

  return productElement;
}

function createElementWithText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function createImageElement(src, alt) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.style.width = "300px";
  image.style.height = "450px";
  image.style.padding ="0px 30px"
  return image;
}

window.onload = fetchAndRenderAllCategories;

document.querySelectorAll(".categoryBtn").forEach(button => {
  button.addEventListener("click", (event) => {
    const category = event.target.dataset.category;
    const categoryProducts = allCategoriesData.find(cat => cat.category_name === category).category_products;
    renderProducts(categoryProducts);
  });
});

// Event listener for the reset button
document.getElementById("resetBtn").addEventListener("click", () => {
  renderProducts(allCategoriesData.flatMap(category => category.category_products));
});
