const express = require("express");
const path = require("path");
const dessertRoute = require("./server/routes/desserts.js");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(express.static(path.join(__dirname, "app")));
app.use(express.static(path.join(__dirname, "public")));

// Serve JSON data from the '/desserts' endpoint
app.get("/desserts", dessertRoute);

// Apply rate limiter to the root route
app.get("/", limiter, (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
	console.log(`Lets get some food 🥙 over port ${port}`);
});
