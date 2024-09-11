import { createNewElement, formatPrice } from "./util.js";

const container = document.querySelector(".cart-container");
const empty = document.querySelector(".empty-cart");
let heading;
let cartItem;

export function renderCart() {
	heading = createNewElement("h2", "cart-heading");
	heading.innerHTML = `Your Cart (${0})`;
	container.appendChild(heading);

	if (!cartItem) {
		cartItem = createNewElement("div", "cart-item");
		container.appendChild(cartItem);
	}
}

export function addToCart(item) {
	const itemElement = createNewElement("div", "cart-item-element");
	const itemInCart = `
    <div class="item-in-cart-container">
      <div class="item-details-name">${item.name}</div>
      <div class="item-details">
        <span class="item-quantity">${1}x</span>
        <p class="item-details">${formatPrice(item.price)}</p>
        <button class="remove-from-cart">Remove</button>
      </div>
      
    </div>
  `;

	empty.classList.add("hidden");
	itemElement.innerHTML = itemInCart;
	cartItem.appendChild(itemElement);

	container.insertBefore(cartItem, heading);
	const itemCount = cartItem.querySelectorAll(".cart-item-element").length;
	heading.innerHTML = `Your Cart (${itemCount})`;

	itemElement
		.querySelector(".remove-from-cart")
		.addEventListener("click", () => {
			cartItem.removeChild(itemElement);
			empty.classList.remove("hidden");

			const remainingItems =
				cartItem.querySelectorAll(".cart-item-element").length;
			if (remainingItems === 0) empty.classList.remove("hidden");

			heading.innerHTML = `Your Cart (${remainingItems})`;
		});
}
