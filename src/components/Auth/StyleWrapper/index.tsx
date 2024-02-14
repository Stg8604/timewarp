import React from "react";
import styles from "./styles.module.css";
import greenbg from "../../../assets/greenbg.svg";
import { BackgroundImage, Box, Group } from "@mantine/core";
const StyleWrapper: React.FC<StyleWrapperProps> = ({ children }) => {
	return (
		<Box>
			<BackgroundImage src={greenbg} radius="sm" className="h-[100vh]">
				{children}
			</BackgroundImage>
		</Box>
	);
};

export default StyleWrapper;
