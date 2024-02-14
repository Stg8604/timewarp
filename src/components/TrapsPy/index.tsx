import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { Editor, Toast } from "@components/index";
import { toggleEditor } from "@slices/index";
import { usePython } from "react-py";
import { FC } from "react";
import { TOAST_SUCCESS } from "@utils/ToastStatus";
import { setPyOutput, setShoot } from "@slices/Traps/traps";

const TrapsPy: FC<{ defaultInput: string }> = ({ defaultInput }) => {
	const dispatch = useAppDispatch();
	const config = useAppSelector((state) => state.editor);
	const traps = useAppSelector((state) => state.traps);
	const [isSent, setIsSent] = useState<boolean>(false);
	const [loop, setLoop] = useState(setInterval(() => {}));
	const [output, setOutput] = useState<string>("");
	const [counter, setCounter] = useState<number>(0);
	const [code, setCode] = useState<string>(defaultInput);
	const [running, setRunning] = useState<boolean>(false);
	const {
		runPython,
		stdout,
		stderr,
		isLoading,
		isRunning,
		interruptExecution,
		writeFile,
	} = usePython();

	function incCounter() {
		if (counter + 1 > 1000) {
			setCounter(0);
		} else {
			setCounter(counter + 1);
		}
	}

	useEffect(() => {
		let postCode = "";
		if (traps.level === 1) {
			postCode = `\nprint("<--OUTPUT-->")`;
			postCode += `\nprint(engageTower(list(${JSON.stringify(traps.turretCoords)}), list(${JSON.stringify(traps.enemyCoords)}))["tutorialTurret"])`;
		} else if (traps.level === 2) {
			postCode = `\nprint("<--OUTPUT-->")`;
			postCode += `\nprint(engageTower(list(${JSON.stringify(traps.turretCoords)}), list(${JSON.stringify(traps.enemyCoords)}))["challengeTurret1"])`;
			postCode += `\nprint(engageTower(list(${JSON.stringify(traps.turretCoords)}), list(${JSON.stringify(traps.enemyCoords)}))["challengeTurret2"])`;
		}
		if (!isLoading && running) {
			runPython(code + postCode);
		}
	}, [
		counter,
		traps.enemyCoords,
		traps.turretCoords,
		isLoading,
		runPython,
		code,
		running,
		traps.level,
	]);

	function runCodeHandler(code: string) {
		setCode(code);
		setRunning(true);
		const postCode = `\nprint("<--LOADED-->")`;
		runPython(code + postCode);
		clearInterval(loop);
		setLoop(
			setInterval(() => {
				incCounter();
			})
		);
	}

	function stopCodeHandler() {
		setRunning(false);
		clearInterval(loop);
		dispatch(setShoot({}));
		dispatch(setPyOutput({}));
		interruptExecution();
		Toast(TOAST_SUCCESS, "Function stopped successfully");
	}

	useEffect(() => {
		if (stderr !== "") {
			setRunning(false);
			clearInterval(loop);
			dispatch(setShoot({}));
			dispatch(setPyOutput({}));
		}
	}, [stderr, loop, dispatch]);

	useEffect(() => {
		const pyOutput = stdout.split("\n");

		const funOutput = pyOutput.slice(
			pyOutput.indexOf("<--OUTPUT-->"),
			pyOutput.length
		);
		if (traps.level === 1 && funOutput.length === 2 && funOutput[1] !== "") {
			dispatch(setPyOutput({ tutorialTurret: funOutput[1] }));
			dispatch(setShoot({ tutorialTurret: Number(funOutput[1]) }));
		}
		if (
			traps.level === 2 &&
			funOutput.length === 3 &&
			funOutput[1] !== "" &&
			funOutput[2] !== ""
		) {
			dispatch(
				setPyOutput({
					challengeTurret1: funOutput[1],
					challengeTurret2: funOutput[2],
				})
			);
			dispatch(
				setShoot({
					challengeTurret1: Number(funOutput[1]),
					challengeTurret2: Number(funOutput[2]),
				})
			);
		}

		if (pyOutput.includes("<--LOADED-->")) {
			if (!isSent) {
				Toast(TOAST_SUCCESS, "Function loaded successfully");
				setIsSent(true);
				runPython("print('')");
				setTimeout(() => {
					setIsSent(false);
				}, 3000);
			}
		}
	}, [stdout, isSent, runPython, dispatch, traps.level]);

	return (
		<Editor
			run={runCodeHandler}
			stop={stopCodeHandler}
			output={output}
			error={stderr}
			isLoading={isLoading}
			isRunning={isRunning}
			closeEditor={() => dispatch(toggleEditor())}
			config={config}
			defaultInput={defaultInput}
		/>
	);
};

export default TrapsPy;
