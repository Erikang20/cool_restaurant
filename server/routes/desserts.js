const express = require("express");
const router = express.Router();
const { getData } = require("../lib/helpers.js");

router.get("/desserts", (req, res) => {
	const data = getData();
	res.json(data);
});

module.exports = router;
