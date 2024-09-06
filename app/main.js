import { createNewElement, formatPrice } from "./util.js";
import { renderCart } from "./cart.js";

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
        <div class="addToCart addLink">
          <span class="add">
            <span class="icon add"></span>
            Add to Cart
          </span>
          <span class="hideBtns">
            <button class="addButton hide">-</button>
            <button class="addButton hide">+</button>
          </span>
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
	addEventListeners();
}

function addEventListeners() {
	const buttons = document.querySelectorAll(".addToCart");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const toRemove = button.querySelectorAll(".add");
			toRemove.forEach((el) => {
				el.classList.add("hidden");
				el.classList.remove("hide");
			});

			const hideBtns = button.querySelector(".hideBtns");
			if (hideBtns) {
				const hiddenElements = hideBtns.querySelectorAll(".addButton");
				hiddenElements.forEach((el) => {
					el.classList.remove("hide");
				});
			}
		});
	});
}
