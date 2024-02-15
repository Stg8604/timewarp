import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { HintBox, Toast, ReactPy, BackBtn, Inventory } from "@components/index";
import PasskeyBox from "../../../components/computers/PasskeyBox";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import MSTModule from "@modules/veirfyMST.txt";
import { toggleOpenBox, updateComputerParams } from "@slices/computer/computer";
import { checkMstWeight, status } from "@slices/computer/computerAction";
import { toggleComputerPortalKey } from "@slices/computer/computer";
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from "@utils/ToastStatus";
import CompletionPopUp from "../../../components/CompletionPopUp";
import { useNavigate } from "react-router-dom";
import { setScene } from "@slices/Scene/scene";

const text_1 =
	"Unravel the network's secrets: Bridge the gap from Computer 1 to Computer 11,navigating a labyrinth of echoes. The key lies in the serpentine route with digits that mirror reality. Decipher the shortest path and pass on the message.";

const Computer = ({ switchScene }: { switchScene: (key: string) => void }) => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const statu = useAppSelector((state) => state.status);
	const [score, setScore] = useState<number>(0);
	const [totalScore, setTotalScore] = useState<number>(0);
	const computer = useAppSelector((state) => state.computer);
	const config = useAppSelector((state) => state.editor);
	const player = useAppSelector((state) => state.player);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const seederParams = [
		{
			moduleName: "computer",
			className: "Computer",
			params: computer.params,
			file: MSTModule,
			dispatch: updateComputerParams,
		},
	];

	const defaultInput = `#Objects available\n# - Computer\nprint(Computer)`;

	useEffect(() => {
		setInitialize(true);
		dispatch(status()).then(res=>{
			if(res.type.includes("/status/rejected")){
				switchScene("Lobby");
			}
		})
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
	const handleSubmit = async () => {
		const response = await dispatch(
			checkMstWeight({
				edges: computer.params.userEdgeList as EdgeDTO[],
			})
		);

		if (response.type === "computer/checkMstWeight/fulfilled") {
			dispatch(toggleComputerPortalKey());
			if (response.payload && response.payload.correct) {
				setScore(response.payload.score);
				setTotalScore(response.payload.totalScore);
				dispatch(toggleOpenBox());
			} else {
				Toast(TOAST_INFO, response.payload?.message);
			}
		} else if (response.type === "computer/checkMstWeight/rejected") {
			dispatch(toggleComputerPortalKey());
			Toast(TOAST_ERROR, response.payload?.message);
		}
	};

	const handleClose = () => {
		dispatch(toggleComputerPortalKey());
	};

	return (
		<>
			<BackBtn />
			{player.inventoryOpen && <Inventory />}
			{computer.isInfoOpen && <HintBox text={text_1} />}

			{computer.isPortalKeyOpen && (
				<PasskeyBox handleSubmit={handleSubmit} handleClose={handleClose} />
			)}

			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}
			{computer.isOpenPopUp && (
				<CompletionPopUp
					title1={"Computer Puzzle"}
					title2={"Completed"}
					title3={":" + totalScore.toString()}
					title4={"(+" + score.toString() + ")"}
					onclick={switchScene2}
				/>
			)}

			<ReactPy seederParams={seederParams} defaultInput={defaultInput} />

			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Computer Game"}
			/>
		</>
	);
};

export default Computer;
