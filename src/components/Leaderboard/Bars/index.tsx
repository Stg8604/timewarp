import { Paper, Text } from "@mantine/core";
import { FC } from "react";

export const Bars: FC<IBars> = ({ data }) => {
	const details = [data.rank, data.userName, data.score];

	return (
		<Paper className="items-center mb-[2vh] border-2 border-solid  font-pressStart2P flex justify-between bg-[#F5F5AC] shadow-[4px_4px_3px_1px_rgb(0,0,0,0.5)] p-2 rounded-[0.8rem]">
			{details.map((params, index) => (
				<div
					key={index}
					className={`p-0 text-center ${index === details.length - 1 || index === 0 ? "w-[60px]" : "w-auto"}`}
				>
					<div>
						<Text className="text-[16px] font-bold text-black">
							{details[index]}
						</Text>
					</div>
				</div>
			))}
		</Paper>
	);
};

export default Bars;
