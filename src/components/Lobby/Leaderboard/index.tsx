import cx from "clsx";
import { useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import classes from "./leaderboard.module.css";
import { useAppDispatch } from "@stores/hooks";
import { toggleLeaderboard } from "@slices/Lobby/Lobby";
import { dummyPlayers } from "./dummyPlayers";

const Leaderboard = () => {
	const dispatch = useAppDispatch();
	const [scrolled, setScrolled] = useState(false);

	const sorted = dummyPlayers.sort((a, b) => {
		if (a.score === b.score) {
			return b.score - a.score;
		} else {
			return b.score - a.score;
		}
	});

	const rows = sorted.map((row, index) => (
		<Table.Tr key={row.name}>
			<Table.Td>{index + 1}</Table.Td>
			<Table.Td>{row.name}</Table.Td>
			<Table.Td>{row.score}</Table.Td>
		</Table.Tr>
	));

	return (
		<div className="absolute flex justify-center items-center h-screen w-screen z-50">
			<div className=" bg-tutorialUiBlue/80 border border-whites select-none animate-fadeIn font-pixelifySans leading-5 text-white text-center flex flex-col gap-5 w-screen rounded-lg px-10 py-5">
				<h1>
					<b>LEADERBOARD</b>
				</h1>

				<ScrollArea
					h={700}
					onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
				>
					<Table miw={400}>
						<Table.Thead
							className={cx(classes.header, { [classes.scrolled]: scrolled })}
						>
							<Table.Tr>
								<Table.Th>Ranking</Table.Th>
								<Table.Th>Name</Table.Th>
								<Table.Th>Score</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</ScrollArea>

				<button
					onClick={() => dispatch(toggleLeaderboard())}
					className="bg-red/70 px-2 py-1 mx-auto rounded-lg"
				>
					CLOSE
				</button>
			</div>
		</div>
	);
};

export default Leaderboard;
