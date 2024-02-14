import { PasswordInput } from "@mantine/core";
import { FC, useState } from "react";
const Password: FC<AuthInputProps> = ({ field, save, title }) => {
	const [data, setData] = useState("");
	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setData(e.currentTarget.value);
		save(field, e.currentTarget.value);
	};

	return (
		<PasswordInput
			size="md"
			value={data}
			onChange={handleChange}
			placeholder={title}
			className=""
			styles={(theme) => ({
				root: {
					border: 0,
					height: 42,
					marginTop: 32,
					color: theme.colors.dayZerobrown[0],
					fontFamily: "pixelifySans",
					borderBlockColor: theme.colors.peach[0],
					font: "bold",
				},
				input: {
					backgroundColor: "transparent",
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

export default Password;
