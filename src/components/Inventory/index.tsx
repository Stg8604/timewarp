import { useEffect, useState } from "react";
import inventoryBg from "../../assets/Player/inventory.svg";
import itemdescbg from "../../assets/Player/inventoryDesc.png";
import item from "../../assets/Player/disc2.png";
import item2 from "../../assets/Player/painting.svg";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { coords } from "./data";
import ReactHtmlParser from "react-html-parser";
import { useAppSelector } from "@stores/hooks";

const Inventory = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const status = useAppSelector((state) => state.status);
	const [activeItem, setActiveItem] = useState(["ITEM NAME", "ITEM DESC"]);

	const itemMap: ItemMap = {
		audio_clip_1: item,
		audio_clip_2: item,
		audio_clip_3: item,
		audio_clip_4: item,
		audio_clip_5: item,
		audio_clip_6: item,
		left_painting: item2,
		right_painting: item2,
	};

	useEffect(() => {
		if (status?.inventory && status?.inventory.length > 0) {
			setActiveItem(status?.inventory[0]);
		}
	}, [status?.inventory]);

	//top difference = 15%
	return (
		<>
			<div className=" absolute top-0 left-0 flex flex-row gap-8 justify-center w-full h-screen bg-[#0000004b] items-center">
				<div className="w-[600px] h-[470px] relative">
					{/* <div className="md:w-[600px] md:h-[470px] w-[400px] h-[312px] relative"> */}
					<img
						src={inventoryBg}
						className="absolute top-0 tran left-0 w-[600px] "
					/>
					<div className="z-[1] absolute top-0 left-0 w-full h-full">
						<div className="text-[#795436] w-full font-[PressStart2P] flex items-center justify-center pt-12">
							INVENTORY
						</div>
						{(status.inventory || []).map(
							([itemName, description]: [string, string], index: number) => {
								const [x, y] = coords[index];

								return (
									<div
										className="absolute flex items-center justify-center w-[50px] h-[50px] hover:cursor-pointer"
										style={{ top: `${y}px`, left: `${x}px` }}
										onClick={() => {
											setActiveItem([itemName, description]);
										}}
										key={index}
									>
										<img
											src={itemMap[itemName]}
											className="w-[30px] h-[30px]"
										/>
									</div>
								);
							}
						)}
					</div>
					<div className="top-[100px] left-[100px] z-[1]"> H </div>
				</div>
				<div className="w-[338px] h-[470px]  relative">
					{/* <div className="md:w-[338px] md:h-[470px] w-[180px] h-[256px] relative"> */}

					<img
						src={itemdescbg}
						className="absolute top-0 tran left-0 w-[338px] "
					/>
					<div className="z-[1] absolute top-0 left-0 w-full h-full flex flex-col items-center">
						<div className="text-[#795436] w-full font-[PressStart2P] flex items-center justify-center pt-16">
							{activeItem[0]}
						</div>
						<img src={itemMap[activeItem[0]]} className="w-[100px] h-[100px]" />
						<div className="text-[#795436] text-center text-[12px] font-[PressStart2P] leading-5 pl-8 pr-8 font-bold">
							{ReactHtmlParser(activeItem[1])}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Inventory;
