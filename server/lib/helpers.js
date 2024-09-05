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
const getData = (fileName, callback) => {
	const filePath = path.join(__dirname, fileName);

	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			callback(err, null);
			return;
		}
		try {
			const jsonData = JSON.parse(data);
			callback(null, jsonData);
		} catch (parseErr) {
			callback(parseErr, null);
		}
	});
};

module.exports = { getData };
