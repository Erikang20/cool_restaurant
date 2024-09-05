"use client";
import { useState } from "react";
import Card from "../components/Card";
// import { getLocalData } from "../lib/data";
import { Desserts } from "./products";
import data from "../lib/data.json";

const Menu = () => {
	// const data = await getLocalData();
	const [food] = useState(data);

	return (
		<>
			<Desserts products={food} />
		</>
	);
};

export default Menu;
