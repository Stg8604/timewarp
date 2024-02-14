import { Button, Text } from "@mantine/core";
import { FC, useState } from "react";
const CompletionProps = () => {
	return (
		<Text
			size="sm"
			className="text-center"
			styles={(theme) => ({
				root: {
					border: "2px solid " + theme.colors.dayZerobrown[0],
					height: 35,
					width: 320,
					marginTop: 36,
					borderRadius: theme.radius.lg,
					backgroundColor: "transparent",
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
			Items Picked Up
		</Text>
	);
};

export default CompletionProps;
