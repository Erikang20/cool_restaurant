import { createNewElement, formatPrice } from "./util.js";
import { renderCart, addToCart } from "./cart.js";

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
	fetch("/desserts")
		.then((response) => response.json())
		.then((data) => {
			renderData(data);
		})
		.catch((error) => console.error("Uh-oh, something went wrong 🫤:", error));
});

function renderData(data) {
	const container = document.querySelector(".dessert-container");
	const newList = data
		.map((item, index) => {
			return `
			<div class="item" key="${index}">
        <img class="image" src="${item.image.thumbnail}" alt="${item.name}" />
        <div class="addToCart" data-id="${index}">
          <div class="add">
            <span class="icon add"></span>
            <span class="add">Add to Cart</span>
          </div>
          <div class="hideBtns">
            <button class="addButton hide">
              <img class="icon-btn" src="/images/icon-decrement-quantity.svg"/>
            </button>
            <span class="addButton hide">1</span>
            <button class="addButton hide">
              <img class="icon-btn" src="/images/icon-increment-quantity.svg"/>
            </button>
          </div>
        </div>
        <div class="innerContainer">
          <div class="category">${item.category}</div>
          <div class="name">${item.name}</div>
          <div class="price">${formatPrice(item.price)}</div>
        </div>
			</div>
		`;
		})
		.join("");

	container.innerHTML = newList;
	renderCart();
	addEventListeners(data);
}

function addEventListeners(data) {
	const buttons = document.querySelectorAll(".addToCart");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const itemId = button.dataset.id;
			const selectedItem = data[itemId];

			if (selectedItem) {
				addToCart(selectedItem);
			}

			const btnsToHide = button.querySelectorAll(".add");
			const selectedParent = button.closest(".addToCart");
			selectedParent.classList.add("multi-btns");

			btnsToHide.forEach((el) => {
				el.classList.add("hidden");
				el.classList.remove("hide");
			});

			const hideBtns = button.querySelector(".hideBtns");
			if (hideBtns) {
				const hiddenElements = hideBtns.querySelectorAll(".addButton");
				hiddenElements.forEach((el) => {
					el.classList.add("counterBtns");
					el.classList.remove("hide");
				});
			}
		});
	});

	const itemSelected = document.querySelectorAll(".item");
	itemSelected.forEach((item) => {
		item.addEventListener("click", (e) => {
			e.stopPropagation();
			const firstChild = item.firstElementChild;
			console.log(firstChild);
			firstChild.classList.add("selectedImg");
		});
	});
}

// function updateCartUI(data) {
// 	const cartContainer = document.querySelector(".cart-container");
// 	cartContainer.innerHTML = "";

// 	cart.forEach((item) => {
// 		const itemElement = document.createElement("div");
// 		itemElement.innerHTML = `
//             <div>${item.name} - ${item.quantity} x $${item.price}</div>
//             <button onclick="removeFromCart(${item.id})">Remove</button>
//         `;
// 		cartContainer.appendChild(itemElement);
// 	});
// }
