import { Paper, Text } from "@mantine/core";
import { FC } from "react";

export const UserBar: FC<IUserBar> = ({ userRankDetails }) => {
	const details = [
		"Your rank",
		userRankDetails.rank,
		userRankDetails.userName,
		userRankDetails.score,
	];

	return (
		<Paper className="mb-[1vh] border-2 border-solid font-pressStart2P bg-[#F5F5AC] items-center shadow-[4px_4px_3px_1px_rgb(0,0,0,0.5)] p-[7px] rounded-3xl">
			<div className="p-0">
				<Text className="text-[black] text-[16px] font-bold text-center">
					{details[0]}
				</Text>
			</div>

			<div className="flex items-center justify-between">
				{details.slice(1).map((params, index) => (
					<div
						key={index}
						className={`p-0 ${index === details.length - 2 || index === 0 ? "w-[60px]" : "w-auto"}`}
					>
						<Text className="text-[black] text-[16px] font-bold text-center">
							{details[index + 1]}
						</Text>
					</div>
				))}
			</div>
		</Paper>
	);
};

export default UserBar;
