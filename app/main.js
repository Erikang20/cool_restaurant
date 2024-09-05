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
	const container = document.querySelector(".container"); // Make sure this selector matches your HTML structure

	const newList = data
		.map((item, index) => {
			// Create HTML for each item
			return `
			<div class="item" key="${index}">
				<div>Name: ${item.name}</div>
				<div>Category: ${item.category}</div>
				<div>Price: $${item.price}</div>
				<img src="${item.image.desktop}" alt="${item.name}" />
			</div>
		`;
		})
		.join(""); // Join all HTML strings into one string

	// Set the innerHTML of the container
	container.innerHTML = newList;
}
