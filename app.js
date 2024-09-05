const express = require("express");
const path = require("path");
const dessertRoute = require("./server/routes/desserts.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "app")));

// Serve JSON data from the '/desserts' endpoint
app.get("/desserts", dessertRoute);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
	console.log(`Lets get some food 🥙 over port ${port}`);
});
