import { createNewElement, formatPrice } from "./util.js";

const container = document.querySelector(".cart-container");
const empty = document.querySelector(".empty-cart");
let heading;
let cartItem;
let totalEl;

export function renderCart() {
	// Create the cart heading
	heading = createNewElement("h2", "cart-heading");
	heading.innerHTML = `Your Cart (${0})`;
	container.appendChild(heading);
	container.insertBefore(heading, cartItem);

	// Create the cart item container if not already created
	if (!cartItem) {
		cartItem = createNewElement("div", "cart-item");
		container.appendChild(cartItem);
	}

	// Initialize the total element (but don't append it here yet)
	if (!totalEl) {
		totalEl = createNewElement("div", "cart-total");
		totalEl.style.display = "none";
	}
}

export function addToCart(item) {
	const itemElement = createNewElement("div", "cart-item-element");
	const itemInCart = `
		<div class="item-in-cart-container">
			<div class="item-details-name">${item.name}</div>
			<div class="item-details">
				<div class="item-quantity">${1}x</div>
				<div class="item-price">@ ${formatPrice(item.price)}</div>
        <div class="total-quantity">${formatPrice(item.price)}</div>
				<button class="remove-from-cart">
					<img class="icon-btn" src="/images/icon-remove-item.svg"/>
				</button>
			</div>
		</div>
	`;

	// Hide the empty cart message
	empty.classList.add("hidden");
	itemElement.innerHTML = itemInCart;

	// Append new item to cartItem
	cartItem.appendChild(itemElement);
	container.insertBefore(cartItem, heading);

	// Update cart heading count
	const itemCount = cartItem.querySelectorAll(".cart-item-element").length;
	heading.innerHTML = `Your Cart (${itemCount})`;

	// Show the total container only once, when there is at least one item
	if (itemCount > 0 && !totalEl.parentNode) {
		renderTotal();
		totalEl.style.display = "inline-block";
	}

	// Remove item event listener
	itemElement
		.querySelector(".remove-from-cart")
		.addEventListener("click", () => {
			cartItem.removeChild(itemElement);

			// Update cart heading count after removal
			const remainingItems =
				cartItem.querySelectorAll(".cart-item-element").length;
			heading.innerHTML = `Your Cart (${remainingItems})`;

			// Show empty message and hide total if no items are left
			if (remainingItems === 0) {
				empty.classList.remove("hidden");
				totalEl.style.display = "none";
			}
		});
}

function renderTotal() {
	const totalItems = `
		<div class="total-container">
			<div class="order-price">
				<p>Order Total</p>
				<h3>${formatPrice(200)}</h3>
			</div>
			<div class="eco-container">
				<img src="/images/icon-carbon-neutral.svg"/>
				<p>This is a <strong>carbon-neutral</strong> delivery</p>
			</div>
			<button class="confirm-btn">Confirm Order</button>
		</div>
	`;

	// Render the total container below the cart items
	totalEl.innerHTML = totalItems;
	cartItem.appendChild(totalEl);
	cartItem.insertBefore(totalEl, cartItem.nextSibiling);
}
