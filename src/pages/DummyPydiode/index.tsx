import { Editor } from "@components/index";
import { useAppSelector, useAppDispatch } from "@stores/hooks";
import { toggleEditor } from "@slices/index";
import { usePython } from "react-py";
import { useEffect } from "react";

const DummyPydiode = () => {
	const player = useAppSelector((state) => state.player);
	const editorConfig = useAppSelector((state) => state.editor);
	const dispatch = useAppDispatch();

	const modules: ICustomModule[] = [
		{
			fileCode: `def getPlayerMovementSpeed():\n\treturn ${player.playerMovementSpeed}\ndef getFireballPower():\n\treturn ${player.fireballPower}`,
			filename: "player.py",
		},
	];

	const {
		runPython,
		stdout,
		stderr,
		isLoading,
		isRunning,
		interruptExecution,
		writeFile,
		// watchModules,
		// unwatchModules
	} = usePython();

	function runCodeHandler(code: string) {
		runPython(code);
	}

	function stopCodeHandler() {
		interruptExecution();
	}

	function closeEditor() {
		dispatch(toggleEditor());
	}

	function write(modules: ICustomModule[]) {
		modules.forEach((module) => {
			writeFile(module.filename, module.fileCode);
		});
	}

	useEffect(() => {
		write(modules);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return (
		<>
			<button onClick={() => dispatch(toggleEditor())}>Editor</button>
			<Editor
				config={editorConfig}
				output={stdout}
				error={stderr}
				isLoading={isLoading}
				isRunning={isRunning}
				run={runCodeHandler}
				stop={stopCodeHandler}
				closeEditor={closeEditor}
				defaultInput={"#type"}
			/>
		</>
	);
};

export default DummyPydiode;
