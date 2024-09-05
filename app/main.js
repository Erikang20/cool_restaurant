document.addEventListener("DOMContentLoaded", () => {
	fetch("/desserts") // Fetch from the new /desserts endpoint
		.then((response) => response.json())
		.then((data) => {
			renderData(data);
			console.log(data);
		})
		.catch((error) => console.error("Uh-oh, something went wrong 🫤:", error));
});

function renderData(data) {
	const container = document.querySelector(".container");
	const newList = data
		.map((item, index) => {
			return `
			<div class="item-${index}" key="${index}">
				<img src="${item.image.thumbnail}" alt="${item.name}" />
				<div>Name: ${item.name}</div>
				<div>Category: ${item.category}</div>
				<div>Price: $${item.price}</div>
			</div>
		`;
		})
		.join(""); // Join all HTML strings into one string

	// Set the innerHTML of the container
	container.innerHTML = newList;
}
