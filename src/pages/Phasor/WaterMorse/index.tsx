import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import {
	BackBtn,
	InfoBox,
	PasskeyBox,
	Toast,
	ReactPy,
} from "@components/index";
import WaterMorseModule from "@modules/WaterMorseModule.txt";
import {
	toggleInfoBox,
	toggleWaterMorsePortal,
	updateWaterMorseParams,
} from "@slices/WaterMorse/waterMorse";
import { checkFlag, status } from "@slices/WaterMorse/waterMorseActions";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";

const hint =
	"This is a silent country side of the past. A pristine place to relax and to listen to the sounds of nature. A place to meditate and block out external interferences and focus on what is important.";

const clue =
	"Seek the hidden symphony within the sounds of nature. Silence the cacophony around, and let the whispers guide you to the key.";

const clue2 =
	"A gentle chime marks a beginning, the water speaks, its code draws near. Drops land, tapping short or long like a telegraph and unlock the way. Follow the rhythm, where secrets play.";

const WaterMorse = ({
	switchScene,
}: {
	switchScene: (key: string) => void;
}) => {
	const [initialize, setInitialize] = useState(false);
	const [passkey, setPasskey] = useState("");
	const gameRef = useRef(null);
	const waterMorse = useAppSelector((state) => state.waterMorse);
	const config = useAppSelector((state) => state.editor);
	const dispatch = useAppDispatch();

	const seederParams = [
		{
			moduleName: "waterMorse",
			className: "Background",
			params: waterMorse.params,
			file: WaterMorseModule,
			dispatch: updateWaterMorseParams,
		},
	];

	const defaultInput = `# Useful Object - Background`;

	useEffect(() => {
		setInitialize(true);
		dispatch(status());
	}, [dispatch]);

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
			checkFlag({
				solution: passkey,
			})
		);

		if (response.type === "watermorse/checkFlag/fulfilled") {
			dispatch(toggleWaterMorsePortal());
			Toast(TOAST_SUCCESS, response.payload?.message);
			switchScene("Lobby");
		} else if (response.type === "watermorse/checkFlag/rejected") {
			Toast(TOAST_ERROR, response.payload?.message);
		}
	};

	const handleClose = () => {
		dispatch(toggleWaterMorsePortal());
		setPasskey("");
	};

	return (
		<>
			<BackBtn />

			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}

			<ReactPy seederParams={seederParams} defaultInput={defaultInput} />

			{waterMorse.isPortalOpen && (
				<PasskeyBox
					passkey={passkey}
					setPasskey={setPasskey}
					handleSubmit={handleSubmit}
					handleClose={handleClose}
				/>
			)}

			{waterMorse.infoBox[0] && (
				<InfoBox text={clue} onClose={() => dispatch(toggleInfoBox(0))} />
			)}

			{waterMorse.infoBox[1] && (
				<InfoBox text={clue2} onClose={() => dispatch(toggleInfoBox(1))} />
			)}

			{waterMorse.infoBox[2] && (
				<InfoBox text={hint} onClose={() => dispatch(toggleInfoBox(2))} />
			)}

			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Water Morse Game"}
			/>
		</>
	);
};

export default WaterMorse;
