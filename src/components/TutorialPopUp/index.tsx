import bg from "../../assets/completionpopup.svg";
import { Center, Text } from "@mantine/core";
import audiobox from "../../assets/audiobox.svg";
import painting from "../../assets/audiobox.svg";
import { Button } from "@mantine/core";
import stardust from "../../assets/stardust.svg";
const Popup = ({
	onclick,
}: {
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
						<div className="flex flex-row">
							<Text
								className="mt-2"
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
								Tutorial:
							</Text>
							<Text
								className="mt-2"
								styles={(theme) => ({
									root: {
										fontSize: theme.fontSizes.xl,
										backgroundColor: "transparent",
										fontFamily: "pixelifySans",
										color: theme.colors.green[0],
										zIndex: 100,
									},
								})}
							>
								Completed
							</Text>
						</div>
						<Text
							className="text-center pr-4 pl-4"
							styles={(theme) => ({
								root: {
									fontSize: theme.fontSizes.sm,
									backgroundColor: "transparent",
									fontFamily: "pixelifySans",
									color: theme.colors.dayZerobrown[0],
									zIndex: 100,
									width: 400,
								},
							})}
						>
							You have successfully completed the tutorial puzzle, now you are
							free to travel through space and time.
						</Text>
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
							Return to Lobby
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default Popup;
