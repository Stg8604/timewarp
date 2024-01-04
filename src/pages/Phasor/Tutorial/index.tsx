import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { InfoBox } from "@components/index";
import { toggleEditor } from "@slices/index";
import { updateTutorialParams } from "@slices/Tutorial/tutorial";
import { phaserConfig } from "@phaserGame/game";
import BackBtn from "../../../components/BackBtn";
import PasskeyBox from "../../../components/Tutorial/PasskeyBox";
import SecurModule from "@modules/SecurityModule.txt";
import { ReactPy } from "@components/index";

const text =
	"Hello Player! You are in the year 2049. Technology has went far and beyond making it possible to have portals to different time period. The world is run by machine now. So you have to utilize the machine tools to get things done. Press 'E' anytime to open or close your weapon - the code editor.";

const Tutorial = () => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const tutorial = useAppSelector((state) => state.tutorial);
	const config = useAppSelector((state) => state.editor);
	const dispatch = useAppDispatch();

	const seederParams = [
		{
			moduleName: "security",
			className: "Security",
			params: tutorial.params,
			file: SecurModule,
			dispatch: updateTutorialParams,
		},
	];

	const defaultInput = `#Objects available\n# - Security\nprint(Security)`;

	useEffect(() => {
		setInitialize(true);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "e") {
				if (!config.isOpen) {
					dispatch(toggleEditor());
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch, config.isOpen]);

	return (
		<>
			<BackBtn />

			{tutorial.isInfoOpen && <InfoBox text={text} />}

			{tutorial.isPortalKeyOpen && <PasskeyBox />}

			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}

			<ReactPy seederParams={seederParams} defaultInput={defaultInput} />

			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Tutorial Game"}
			/>
		</>
	);
};

export default Tutorial;
