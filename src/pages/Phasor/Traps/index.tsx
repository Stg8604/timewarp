import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { BackBtn, InfoBox, TrapsPy } from "@components/index";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import Inventory from "../../../components/Inventory";
import { toggleInfoBox } from "@slices/Traps/traps";
import { status } from "@slices/Traps/trapsAction";
import { useNavigate } from "react-router-dom";
import { setScene } from "@slices/Scene/scene";
import CompletionPopUp from "../../../components/CompletionPopUp";

const TrapsPuzzle = () => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const config = useAppSelector((state) => state.editor);
	const player = useAppSelector((state) => state.player);
	const traps = useAppSelector((state) => state.traps);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const defaultInput = `# For stage 1, return should be of type {\n#   "tutorialTurret": number (Turret Angle)\n# }\n\n# For stage 2, return should be of type {\n#   "challengeTurret1": number (Turret 1 Angle),\n#   "challengeTurret2": number (Turret 2 Angle),\n# }\n\ndef engageTower(turretCoords, enemyCoords):\n\t# write your logic for turret angle here\n\t# using given turretCoords and enemyCoords\n\t# and return it`;

	useEffect(() => {
		dispatch(status());
		setInitialize(true);
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

	const switchScene2 = () => {
		navigate("/game");
		localStorage.setItem("scene", "Lobby");
		dispatch(setScene("Lobby" + "Scene"));
		window.location.reload();
	};

	return (
		<>
			<BackBtn />

			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}

			<TrapsPy defaultInput={defaultInput} />

			<div className=" absolute top-5 mx-auto w-full flex justify-center items-center">
				<div className=" flex flex-col justify-center flex-nowrap bg-tutorialUiBlue rounded-lg overflow-x-auto text-white font-pixelifySans w-1/2 max-h-20 px-5">
					{Object.keys(traps.pyOutput).map((key, index) => {
						return (
							<span key={index} className=" text-nowrap w-1/2">
								{key}: {traps.pyOutput[key as keyof typeof traps.pyOutput]}
							</span>
						);
					})}
				</div>
			</div>

			{player.inventoryOpen && <Inventory />}

			{traps.infoBox[0] && (
				<InfoBox
					text={"You have successfully completed tutorial level!"}
					onClose={() => dispatch(toggleInfoBox(0))}
				/>
			)}

			{traps.infoBox[1] && (
				<InfoBox
					text={"Level 2 has begun!!"}
					onClose={() => dispatch(toggleInfoBox(1))}
				/>
			)}

			{traps.infoBox[2] && (
				<InfoBox
					text={"Enemies have reached your base :( Level is restarted now!"}
					onClose={() => dispatch(toggleInfoBox(2))}
				/>
			)}

			{traps.infoBox[3] && (
				<InfoBox
					text={"Destroy all the enemies here to progress"}
					onClose={() => dispatch(toggleInfoBox(3))}
				/>
			)}

			{traps.infoBox[4] && (
				<CompletionPopUp
					title1={"Traps Puzzle"}
					title2={"Completed"}
					title3={":" + traps.totalScore.toString()}
					title4={"(+" + traps.score.toString() + ")"}
					onclick={switchScene2}
				/>
			)}

			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Traps Game"}
			/>
		</>
	);
};

export default TrapsPuzzle;
