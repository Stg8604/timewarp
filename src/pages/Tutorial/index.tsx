import { useRef, useState, Ref, useEffect } from "react";
import { phaserConfig } from "@phaserGame/game";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { InfoBox } from "@components/index";
import Interpretor from "../../components/Editor";
import { toggleEditor } from "../../slices";
import { togglePortalKey } from "../../slices/Tutorial/tutorial";
import CustomAxios from "@utils/CustomAxios";
import { toggleInfo } from "@slices/Tutorial/tutorial";

const text =
	"Hello Player! You are in the year 2049. Technology has went far and beyond making it possible to have portals to different time period. The world is in shambles. So you have to utilize the machine tools to get things done. Press 'E' anytime to open or close your weapon - the code editor.";

const Tutorial = () => {
	const [initialize, setInitialize] = useState(false);
	const [passkey, setPasskey] = useState<string>();
	const gameRef = useRef(null);
	const tutorial = useAppSelector((state) => state.tutorial);
	const config = useAppSelector((state) => state.editor);
	const dispatch = useAppDispatch();

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
			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}

			{tutorial.isInfoOpen && (
				<InfoBox
					text={text}
					onClose={() => {
						dispatch(toggleInfo());
					}}
				/>
			)}

			{tutorial.isPortalKeyOpen && (
				<div className="absolute h-full w-full flex flex-col justify-center items-center">
					<div className=" flex flex-col gap-5 justify-center items-center bg-black/50 border border-tutorialPortalGreen backdrop-blur-sm text-white rounded-md w-[40vh] aspect-square font-pixelifySans">
						<span className="text-xl">ENTER PASSKEY</span>
						<input
							type="number"
							value={passkey}
							onChange={(e) => {
								if (e.target.value.length <= 4) {
									setPasskey(e.target.value);
								}
							}}
							className=" text-xl text-center tracking-[0.3em] border border-white rounded-md w-[50%] bg-black/0 outline-none"
						/>
						<div className="flex flex-row gap-5">
							<button
								onClick={() => {
									CustomAxios.post("/api/user/action/check/0", {
										body: JSON.stringify({
											puzzleId: 0,
											solution: passkey,
										}),
									});
									// Handle response
								}}
								className=" bg-tutorialUiBlue px-2 py-1 mx-auto rounded-lg"
							>
								SUBMIT
							</button>
							<button
								onClick={() => {
									dispatch(togglePortalKey());
								}}
								className="bg-red/70 px-2 py-1 mx-auto rounded-lg"
							>
								CLOSE
							</button>
						</div>
					</div>
				</div>
			)}

			<Interpretor
				run={() => {}}
				stop={() => {}}
				output={"output"}
				error={""}
				isLoading={false}
				isRunning={false}
				closeEditor={() => dispatch(toggleEditor())}
				config={config}
				defaultInput={""}
			/>

			<IonPhaser
				ref={gameRef as Ref<HTMLIonPhaserElement> | undefined}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Tutorial Game"}
			/>
		</>
	);
};

export default Tutorial;
