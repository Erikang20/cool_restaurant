import { createNewElement, formatPrice } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
	fetch("/desserts")
		.then((response) => response.json())
		.then((data) => {
			renderData(data);
		})
		.catch((error) => console.error("Uh-oh, something went wrong 🫤:", error));
});

function renderData(data) {
	const container = document.querySelector(".container");
	const newList = data
		.map((item, index) => {
			return `
			<div class="item" key="${index}">
        <img class="image" src="${item.image.thumbnail}" alt="${item.name}" />
        <div class="addToCart">
          <a class="addLink" href="#">
            <span class="icon"></span>
            <button class="addButton">-</button>
            Add to Cart
            <button class="addButton">+</button>
          </a>
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
	addEventListeners();
}

function addEventListeners() {
	const buttons = document.querySelectorAll(".addToCart");
	buttons.forEach((button, index) => {
		button.addEventListener("click", () => {
			console.log(`Added item ${index + 1} to cart`);
		});
	});
}
