import bg from "../../assets/completionpopup.svg";
import CompletionProps from "./CompletionProps";
import { Text } from "@mantine/core";
import audiobox from "../../assets/audiobox.svg";
import painting from "../../assets/audiobox.svg";
import { Button } from "@mantine/core";
import stardust from "../../assets/stardust.svg";
const Popup = ({
	title1,
	title2,
	title3,
	title4,
	onclick,
}: {
	title1: string;
	title2: string;
	title3: string;
	title4: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onclick: (key: any) => void;
}) => {
	return (
		<>
			<div className="absolute top-0 left-0 flex flex-row  justify-center w-full h-screen bg-[#0000004b] items-center animate-fadeIn">
				<div className="w-[470px] h-[450px] relative">
					<img
						src={bg}
						className="absolute h-[87%] sm:h-full w-[100%] top-0 left-2 flex justify-center"
					/>
					<div className="w-[450px] flex flex-col mt-24 items-center">
						<Text
							styles={(theme) => ({
								root: {
									fontSize: theme.fontSizes.xl,
									backgroundColor: "transparent",
									fontFamily: "pixelifySans",
									color: theme.colors.dayZerobrown[0],
									zIndex: 100,
								},
							})}
						>
							{title1}
						</Text>
						<div className="flex flex-row">
							<Text
								className="mt-2"
								styles={(theme) => ({
									root: {
										fontSize: theme.fontSizes.sm,
										backgroundColor: "transparent",
										fontFamily: "pixelifySans",
										color: theme.colors.dayZerobrown[0],
										zIndex: 100,
									},
								})}
							>
								Status:
							</Text>
							<Text
								className="mt-2"
								styles={(theme) => ({
									root: {
										fontSize: theme.fontSizes.sm,
										backgroundColor: "transparent",
										fontFamily: "pixelifySans",
										color: theme.colors.green[0],
										zIndex: 100,
									},
								})}
							>
								{title2}
							</Text>
						</div>

						<div className="flex flex-row mt-4">
							<img src={stardust} className="z-100 w-[48%] relative" />
							<Text
								className="mt-2"
								styles={(theme) => ({
									root: {
										fontSize: theme.fontSizes.sm,
										backgroundColor: "transparent",
										fontFamily: "pixelifySans",
										color: theme.colors.dayZerobrown[0],
										zIndex: 100,
									},
								})}
							>
								{title3}
							</Text>
							<Text
								className="mt-2"
								styles={(theme) => ({
									root: {
										fontSize: theme.fontSizes.sm,
										backgroundColor: "transparent",
										fontFamily: "pixelifySans",
										color: theme.colors.green[0],
										zIndex: 100,
									},
								})}
							>
								{title4}
							</Text>
						</div>
						<Button
							className="z-100 flex justify-center w-[72%]"
							size="sm"
							onClick={onclick}
							styles={(theme) => ({
								root: {
									border: "2px solid " + theme.colors.dayZerobrown[0],
									height: 35,
									width: 320,
									marginTop: 36,
									borderRadius: theme.radius.lg,
									backgroundColor: "#DCC7AF",
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
							Lobby
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default Popup;
