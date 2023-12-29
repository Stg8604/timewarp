import { TextInput } from "@mantine/core";
import { FC, useState } from "react";

const Reguser: FC<AuthInputProps> = ({ field, save, title }) => {
	const [data, setData] = useState("");
	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setData(e.currentTarget.value);
		save(field, e.currentTarget.value);
	};
	return (
		<TextInput
			size="sm"
			value={data}
			onChange={handleChange}
			placeholder={title}
			styles={(theme) => ({
				root: {
					border: 0,
					height: 20,
					marginTop: 36,
					color: theme.colors.dayZerobrown[0],
					fontFamily: "pixelifySans",
					font: "bold",
				},
				input: {
					backgroundColor: theme.colors.regPink[0],
					color: theme.colors.dayZerobrown[0],
					fontFamily: "pixelifySans",
					borderBottomColor: "black",
					borderTop: 0,
					borderLeft: 0,
					borderRight: 0,
					borderBottomWidth: 2,
				},
			})}
		/>
	);
};

export default Reguser;
