import { createNewElement, formatPrice } from "./util.js";

export function orderConfirmed(cartItems) {
	const modal = createNewElement("div", "confirmation-order-modal");

	let itemDetails = cartItems
		.map((item) => {
			return `
		<div class="item-confirmation-details">
			<div>${item.name}</div>
			<div class="quantity">
				<div class="item-quantity">${1}x</div>
				<div class="item-price">@ ${formatPrice(item.price)}</div>
				<div class="total-quantity">${formatPrice(item.price)}</div>
			</div>
		</div>
	`;
		})
		.join("");

	const confirmationModal = `
    <div class="modal" id="modal">
      <div class="check">
        <img src="/images/icon-order-confirmed.svg" />
        <h1>Order Confirmed</h1>
        <p>We hope you enjoy your food!</p>
      </div>
      <div class="modal-container">
        ${itemDetails}
        <div class="total-container">
          <p>Order total</p>
          <div class="total-quantity">${formatPrice(
						cartItems.reduce((total, item) => total + item.price, 0)
					)}</div>
        </div>
      </div>
      <button class="start-new-order">Start New Order</button>
    </div>
  `;

	modal.innerHTML = confirmationModal;
	document.body.appendChild(modal);

	modal.style.display = "block";

	// Handle new order button
	const startNewOrderBtn = modal.querySelector(".start-new-order");
	startNewOrderBtn.addEventListener("click", () => {
		modal.style.display = "none";
		document.body.removeChild(modal);
	});
}
