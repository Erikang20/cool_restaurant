export const createNewElement = (tag, className) => {
	const element = document.createElement(tag);
	element.className = className;
	return element;
};

const CURRENCY = new Intl.NumberFormat(undefined, {
	currency: "USD",
	style: "currency",
});

/**
 *
 * @param price
 * @returns a formatted number as USD currency.
 */
export const formatPrice = (price) => {
	return CURRENCY.format(price);
};
