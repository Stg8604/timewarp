import { Button } from "@mantine/core";
import { FC, useState } from "react";
const LevelProps: FC<LevelProp> = ({
	title,
	switchScene,
}: {
	title: string;
	switchScene: (key: string) => void;
}) => {
	const [data] = useState("");
	const handleChange = () => {
		switchScene(title);
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
					width: 320,
					marginTop: 36,
					borderRadius: theme.radius.lg,
					backgroundColor: "#F5F5AC",
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
			{title}
		</Button>
	);
};

export default LevelProps;
