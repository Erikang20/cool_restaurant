import { Roboto } from "next/font/google";
import "./global.css";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
	cart,
	home,
}: {
	children: React.ReactNode;
	cart: React.ReactNode;
	home: React.ReactNode;
}) {
	return (
		<html lang="en" className={roboto.className}>
			<body>
				<div>{children}</div>
				<div className="mainPage">{home}</div>
				<div>{cart}</div>
			</body>
		</html>
	);
}
