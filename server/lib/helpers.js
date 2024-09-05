const path = require("path");
const fs = require("fs");

// const CURRENCY = new Intl.NumberFormat(undefined, {
// 	currency: "USD",
// 	style: "currency",
// });

// /**
//  *
//  * @param price
//  * @returns a formatted number as USD currency.
//  */
// const formatPrice = (price) => {
// 	return CURRENCY.format(price);
// };

/**
 *
 * @param {*} fileName
 * @param {*} callback
 * gets Data
 */
function getData() {
	const filePath = path.resolve(__dirname, "data.json");
	return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

module.exports = { getData };
