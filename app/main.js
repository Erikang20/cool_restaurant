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
            <button class="addButton hide decreaseCount">
              <img class="icon-btn" src="/images/icon-decrement-quantity.svg"/>
            </button>
            <span class="addButton hide quantity">1</span>
            <button class="addButton hide addCount">
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
	const itemSelected = document.querySelectorAll(".item");

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

			/**
			 * Handles the increment of the quantity when adding it to the cart
			 */
			const addCount = button.querySelector(".addCount");
			addCount.addEventListener("click", (e) => {
				e.stopPropagation();
				const quantity = button.querySelector(".quantity");
				quantity.textContent = Number(quantity.textContent) + 1;
			});

			/**
			 * Handles the decrease of the quantity when adding it to the cart
			 */
			const decreaseCount = button.querySelector(".decreaseCount");
			decreaseCount.addEventListener("click", (e) => {
				e.stopPropagation();
				const quantity = button.querySelector(".quantity");
				const currentQuantity = Number(quantity.textContent);

				if (currentQuantity > 1) {
					quantity.textContent = currentQuantity - 1;
				} else {
					quantity.textContent = 0;
					const multiBtns = button.closest(".addToCart");

					multiBtns.classList.remove("multi-btns");

					/**
					 * Reverts buttons to the initial state
					 */
					btnsToHide.forEach((el) => {
						el.classList.remove("hidden");
						el.classList.remove("hide");
						el.classList.remove("hideBtns");
					});

					/**
					 * Removes the classes for the counter
					 */
					const hiddenElements = hideBtns.querySelectorAll(".addButton");
					hiddenElements.forEach((el) => {
						el.classList.remove("counterBtns");
						el.classList.add("hide");
					});

					itemSelected.forEach((item) => {
						const firstChild = item.firstElementChild;
						firstChild.classList.remove("selectedImg");
					});
				}
			});
		});
	});

	itemSelected.forEach((item) => {
		item.addEventListener("click", (e) => {
			e.stopPropagation();
			const firstChild = item.firstElementChild;
			firstChild.classList.add("selectedImg");
		});
	});
}
