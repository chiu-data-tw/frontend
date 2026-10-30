const cartButton = document.querySelector("#cartButton");
const cartCount = document.querySelector("#cartCount");
const addButtons = document.querySelectorAll(".add-button");
const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");
const newsletterForm = document.querySelector("#newsletterForm");
const formMessage = document.querySelector("#formMessage");

let cartItems = 0;

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = cartItems;

    button.textContent = "已加入購物袋";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "加入購物袋";
      button.disabled = false;
    }, 1400);
  });
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");

    const selectedCategory = filter.dataset.filter;

    products.forEach((product) => {
      const shouldShow =
        selectedCategory === "all" ||
        product.dataset.category === selectedCategory;

      product.style.display = shouldShow ? "block" : "none";
    });
  });
});

cartButton.addEventListener("click", () => {
  if (cartItems === 0) {
    alert("您的購物袋目前是空的。");
  } else {
    alert(`購物袋中有 ${cartItems} 件商品。`);
  }
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "訂閱成功，感謝您的加入！";
  newsletterForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();