import { createNewElement } from "./util.js";

export function renderCart() {
	const container = document.querySelector(".empty-cart");
	const heading = createNewElement("h2", "cart-heading");
	// const emptyState = createNewElement("p", "empty-cart");
	heading.innerHTML = `Your Cart (${0})`;
	// emptyState.innerHTML =
	container.appendChild(heading);
	// container.appendChild(emptyState);
}
