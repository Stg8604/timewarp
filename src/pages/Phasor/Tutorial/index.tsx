import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import {
	InfoBox,
	BackBtn,
	ReactPy,
	PasskeyBox,
	Toast,
} from "@components/index";
import { toggleEditor } from "@slices/index";
import {
	toggleInfo,
	togglePortalKey,
	updateTutorialParams,
} from "@slices/Tutorial/tutorial";
import { phaserConfig } from "@phaserGame/game";
import SecurModule from "@modules/SecurityModule.txt";
import { checkFlag } from "@slices/Tutorial/tutorialActions";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";

const text =
	"Hello Player! You are in the year 2049. Technology has went far and beyond making it possible to have portals to different time period. The world is run by machine now. So you have to utilize the machine tools to get things done. Press 'E' anytime to open or close your weapon - the code editor.";

const Tutorial = ({ switchScene }: { switchScene: (key: string) => void }) => {
	const [initialize, setInitialize] = useState(false);
	const [passkey, setPasskey] = useState("");
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

	const handleSubmit = async () => {
		const response = await dispatch(
			checkFlag({ puzzleId: 0, solution: passkey })
		);

		if (response.type === "tutorial/checkFlag/fulfilled") {
			if ((response.payload as TutorialFlagResponse).correct) {
				dispatch(togglePortalKey());
				Toast(TOAST_SUCCESS, "You have solved the puzzle!");
				switchScene("Lobby");
			} else {
				Toast(TOAST_ERROR, "Incorrect passkey!");
			}
		} else if (response.type === "tutorial/checkFlag/rejected") {
			Toast(TOAST_ERROR, (response.payload as APIError).message);
		}

		setPasskey("");
	};

	return (
		<>
			<BackBtn />

			{tutorial.isInfoOpen && (
				<InfoBox text={text} onClose={() => dispatch(toggleInfo())} />
			)}

			{tutorial.isPortalKeyOpen && (
				<PasskeyBox
					passkey={passkey}
					setPasskey={setPasskey}
					handleSubmit={handleSubmit}
					handleClose={() => {
						dispatch(togglePortalKey());
						setPasskey("");
					}}
				/>
			)}

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
