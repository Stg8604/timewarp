import { Button, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
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
			<div
				className={`${styles.image} mb-[1vh] border-2 border-solid font-pressStart2P bg-[#F5F5AC] items-center shadow-[4px_4px_3px_1px_rgb(0,0,0,0.5)] p-[7px] rounded-3xl`}
			>
				<Button
					disabled={page === 1}
					onClick={() => setPage((prev: number) => prev - 1)}
					className="text-black cursor-pointer"
				>
					{isSmallScreen ? "<" : "PREVIOUS"}
				</Button>
			</div>
			<div className=" pl-[10px] pr-[10px]">
				<Text className="mt-3 font-bold text-black">
					{page}/{maxPage}
				</Text>
			</div>
			<div
				className={`${styles.image} text-right mb-[1vh] border-2 border-solid font-pressStart2P bg-[#F5F5AC] items-center shadow-[4px_4px_3px_1px_rgb(0,0,0,0.5)] p-[7px] rounded-3xl`}
			>
				<Button
					disabled={page === maxPage}
					onClick={() => setPage((prev: number) => prev + 1)}
					className="text-black cursor-pointer"
				>
					{isSmallScreen ? ">" : "NEXT PAGE"}
				</Button>
			</div>
		</div>
	);
};

export default NavigationButtons;
