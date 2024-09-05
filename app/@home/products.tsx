import Image from "next/image";
import { formatPrice } from "../helpers";
import WaffleImg from "/assets/images/image-waffle-thumbnail.jpg";
import styles from "./styles.module.css";
import { Button } from "../components/Button";

type Desserts = {
	image: {
		thumbnail: string;
		mobile: string;
		tablet: string;
		desktop: string;
	};
	name: string;
	category: string;
	price: number;
};

type DessertsProps = {
	products: Desserts[];
};

export const Desserts = ({ products }: DessertsProps) => {
	return (
		<div className={styles.productContainer}>
			{products.map((product, index) => {
				return (
					<div className={styles.itemContainer} key={index}>
						<div>Space for pic</div>
						<Image
							src={"/public/favicon-32x32.png"}
							width={20}
							height={20}
							alt=""
						/>
						{/* <picture key={product.name}>
							<source
								srcSet={product.image.mobile}
								media="(max-width: 600px)"
							/>
							<img src={product.image.desktop} alt="MDN" />
							<source
								srcSet={product.image.tablet}
								media="(max-width: 900px)"
							/>
							<source
								srcSet={product.image.desktop}
								media="(min-width: 901px)"
							/>
						</picture> */}
						<Button />
						<div className={styles.category}>{product.category}</div>
						<div className={styles.name}>{product.name}</div>
						<div className={styles.price}>{formatPrice(product.price)}</div>
					</div>
				);
			})}
		</div>
	);
};
