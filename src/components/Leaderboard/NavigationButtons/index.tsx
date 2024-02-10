import { Button, Text, Paper } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import styles from "./styles.module.css";

export const NavigationButtons: FC<INavigationButtons> = ({
	page,
	setPage,
	maxPage,
}) => {
	const [isSmallScreen, setIsSmallScreen] = useState(
		window.innerWidth <= 750 || window.innerHeight <= 650
	);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 750 || window.innerHeight <= 650);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="w-[100%] flex justify-evenly font-pressStart2P">
			<div className={styles.image}>
				<Button
					disabled={page === 1}
					onClick={() => setPage((prev: number) => prev - 1)}
					className="text-black"
				>
					{isSmallScreen ? "<" : "PREVIOUS"}
				</Button>
			</div>
			<div className="bg-paleYellow pl-[10px] pr-[10px]">
				<Text className="mt-3 font-bold text-black">
					{page}/{maxPage}
				</Text>
			</div>
			<div className={`${styles.image} text-right`}>
				<Button
					disabled={page === maxPage}
					onClick={() => setPage((prev: number) => prev + 1)}
					className="text-black"
				>
					{isSmallScreen ? ">" : "NEXT PAGE"}
				</Button>
			</div>
		</div>
	);
};

export default NavigationButtons;
