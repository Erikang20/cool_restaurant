import Image from "next/image";
import addToCart from "@assets/icon-add-to-cart.svg";

export const Button = () => {
	return (
		<button>
			<Image src={addToCart} height={10} width={20} alt=""></Image>
			Add to cart
		</button>
	);
};
