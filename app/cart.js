import { createNewElement, formatPrice } from "./util.js";

const container = document.querySelector(".cart-container");
const empty = document.querySelector(".empty-cart");

export function renderCart() {
	const heading = createNewElement("h2", "cart-heading");

	heading.innerHTML = `Your Cart (${0})`;
	container.appendChild(heading);
}

export function addToCart(item) {
	const cartItem = createNewElement("div", "cart-item");
	const itemInCart = `
    <div class="item-details">
      <p class="item-details">${item.name}</p>
      <p class="item-details">${1}</p>
      <p class="item-details">${formatPrice(item.price)}</p>
      <button class="remove-from-cart">Remove</button>
    </div>
  `;

	empty.classList.add("hidden");
	cartItem.innerHTML = itemInCart;
	container.appendChild(cartItem);

	cartItem.querySelector(".remove-from-cart").addEventListener("click", () => {
		container.removeChild(cartItem);
		empty.classList.remove("hidden");
	});
}
