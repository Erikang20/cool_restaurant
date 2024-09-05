const path = require("path");
const fs = require("fs");

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
