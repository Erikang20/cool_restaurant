const CURRENCY = new Intl.NumberFormat(undefined, {
	currency: "USD",
	style: "currency",
});

/**
 *
 * @param price
 * @returns a formatted number as USD currency.
 */
export const formatPrice = (price: number) => {
	return CURRENCY.format(price);
};
