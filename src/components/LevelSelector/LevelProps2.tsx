import { Button } from "@mantine/core";
import { FC, useState } from "react";
import {
	togglePastPortal,
	togglePresentPortal,
	toggleFuturePortal,
	toggleTutorial,
} from "@slices/Lobby/Lobby";
import { useAppDispatch } from "@stores/hooks";
//(props: { text: string; type: string })
const LevelProps2 = (props: { type: string }) => {
	const [data] = useState("");
	const dispatch = useAppDispatch();
	const handleChange = () => {
		if (props.type === "past") dispatch(togglePastPortal());
		else if (props.type === "present") dispatch(togglePresentPortal());
		else if (props.type === "future") dispatch(toggleFuturePortal());
		else if (props.type === "tutorial") dispatch(toggleTutorial());
	};
	return (
		<Button
			size="sm"
			value={data}
			onClick={handleChange}
			styles={(theme) => ({
				root: {
					border: "2px solid " + theme.colors.dayZerobrown[0],
					height: 35,
					width: 240,
					borderRadius: theme.radius.xl,
					marginTop: 36,
					backgroundColor: "#F0D7BA",
					color: theme.colors.dayZerobrown[0],
					fontFamily: "pixelifySans",
					font: "bold",
				},
				input: {
					backgroundColor: theme.colors.black,
					color: theme.colors.black,
					fontFamily: "pixelifySans",
					borderBottomColor: "black",
					borderBottomWidth: 2,
				},
			})}
		>
			close
		</Button>
	);
};

export default LevelProps2;
