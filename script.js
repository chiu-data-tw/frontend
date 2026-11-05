const cartButton = document.querySelector("#cartButton");
const cartCount = document.querySelector("#cartCount");
const addButtons = document.querySelectorAll(".add-button");
const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");
const newsletterForm = document.querySelector("#newsletterForm");
const formMessage = document.querySelector("#formMessage");
const cartOverlay = document.querySelector("#cartOverlay");
const cartPanel = document.querySelector("#cartPanel");
const cartClose = document.querySelector("#cartClose");
const cartItemsContainer = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const checkoutButton = document.querySelector("#checkoutButton");

const cart = new Map();

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const name = productCard.querySelector("h3").textContent;
    const price = Number(productCard.querySelector("strong").textContent.replace(/[^\d]/g, ""));
    const image = productCard.querySelector("img").src;
    const item = cart.get(name);

    cart.set(name, { name, price, image, quantity: item ? item.quantity + 1 : 1 });
    renderCart();
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
  openCart();
});

function renderCart() {
  const items = [...cart.values()];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `NT$ ${total.toLocaleString("zh-TW")}`;
  checkoutButton.disabled = items.length === 0;

  if (items.length === 0) {
    cartItemsContainer.innerHTML = '<p class="cart-empty">您的購物袋目前是空的。</p>';
    return;
  }

  cartItemsContainer.innerHTML = items.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>NT$ ${item.price.toLocaleString("zh-TW")}</p>
        <div class="quantity-controls">
          <button type="button" data-action="decrease" data-name="${item.name}" aria-label="減少 ${item.name} 數量">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" data-name="${item.name}" aria-label="增加 ${item.name} 數量">＋</button>
          <button class="remove-item" type="button" data-action="remove" data-name="${item.name}">移除</button>
        </div>
      </div>
    </div>
  `).join("");
}

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const name = button.dataset.name;
  const item = cart.get(name);
  if (!item) return;

  if (button.dataset.action === "increase") item.quantity += 1;
  if (button.dataset.action === "decrease") item.quantity -= 1;
  if (button.dataset.action === "remove" || item.quantity <= 0) cart.delete(name);
  renderCart();
});

function openCart() {
  cartOverlay.hidden = false;
  cartPanel.setAttribute("aria-hidden", "false");
  cartPanel.classList.add("open");
  document.body.classList.add("cart-open");
  cartClose.focus();
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
  setTimeout(() => {
    cartOverlay.hidden = true;
  }, 300);
}

cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) return;
  alert("感謝您！結帳功能即將推出。");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartPanel.classList.contains("open")) closeCart();
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "訂閱成功，感謝您的加入！";
  newsletterForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderCart();