import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { getStegImages, initStegPuzzle, toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import painting from "../../../assets/painting.svg";
import StegnoModule from "@modules/StegnoModule.txt";
import {
	ReactPy,
	Inventory,
	StegPasskeyBox,
	StegInfo,
	BackBtn,
} from "@components/index";
import CompletionPopUp from "../../../components/CompletionPopUp";
import { useNavigate } from "react-router-dom";
import { setScene } from "@slices/Scene/scene";

const Steg = ({ switchScene }: { switchScene: (key: string) => void }) => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const steg = useAppSelector((state) => state.steg);
	const [score, setScore] = useState<number>(0);
	const [totalScore, setTotalScore] = useState<number>(0);
	const status = useAppSelector((state) => state.status);
	const config = useAppSelector((state) => state.editor);
	const player = useAppSelector((state) => state.player);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const seederParams = [
		{
			moduleName: "stegno",
			className: "Stegno",
			params: steg.params,
			file: StegnoModule,
			dispatch: null,
		},
	];

	const defaultInput = `#Objects available\n# - Stegno\nprint(Stegno)`;

	window.addEventListener("getImage", () => {
		dispatch(getStegImages());
	});

	useEffect(() => {
		setInitialize(true);
		dispatch(initStegPuzzle()).then(() => {
			dispatch(getStegImages());
		});
	}, [dispatch]);
	const switchScene2 = () => {
		navigate("/game");
		localStorage.setItem("scene", "Lobby");
		dispatch(setScene("Lobby" + "Scene"));
		window.location.reload();
	};
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
			{player.inventoryOpen && <Inventory />}
			{steg.isInfoOpen && <StegInfo text={steg.text} />}
			{steg.isPortalKeyOpen && (
				<StegPasskeyBox
					switchScene={switchScene}
					score={score}
					setScore={setScore}
					totalScore={totalScore}
					setTotalScore={setTotalScore}
				/>
			)}
			{steg.isOpenPopUp && (
				<CompletionPopUp
					title1={"Steg Puzzle"}
					title2={"Completed"}
					title3={":" + totalScore.toString()}
					title4={"(+" + score.toString() + ")"}
					onclick={switchScene2}
				/>
			)}

			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}

			{<ReactPy seederParams={seederParams} defaultInput={defaultInput} />}

			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Steganography Game"}
			/>
		</>
	);
};

export default Steg;
