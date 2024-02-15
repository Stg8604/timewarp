import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { Editor } from "@components/index";
import { toggleEditor } from "@slices/index";
import { usePython } from "react-py";
import { FC } from "react";

const ReactPy: FC<IReactPy> = ({ seederParams, defaultInput }) => {
	const config = useAppSelector((state) => state.editor);

	const dispatch = useAppDispatch();

	const {
		runPython,
		stdout,
		stderr,
		isLoading,
		isRunning,
		interruptExecution,
		writeFile,
	} = usePython();

	const [output, setOuput] = useState<string>("");
	const filterOutput = () => {
		try {
			const systemOutputIndex = stdout.indexOf("__SYSTEM__OUTPUT__");
			if (systemOutputIndex != -1) {
				setOuput(stdout.slice(0, systemOutputIndex));
				//use the systemOutput to update the state variables
				const sysOutput = stdout.slice(
					systemOutputIndex + "__SYSTEM__OUTPUT__".length,
					stdout.length
				);
				let curModule = 0;
				const sysOutputSplit = sysOutput.split("\n");
				sysOutputSplit.forEach((params) => {
					if (params && params != " ") {
						params = params.replace(/'/g, '"');
						const updatedParams = JSON.parse(params);
						dispatch(seederParams[curModule].dispatch?.(updatedParams[0]));
						curModule += 1;
					}
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		filterOutput();
	}, [stdout]);

	const generatePreCode = () => {
		let preCode = "";
		seederParams.forEach((module) => {
			preCode =
				preCode +
				`from ${module.moduleName} import ${module.className}\n${
					module.className
				} = ${module.className}(${JSON.stringify(module.params)})\n`;
		});
		return preCode;
	};

	const generatePostCode = () => {
		let postCode = `\nprint("__SYSTEM__OUTPUT__")\n`;
		seederParams.forEach((module) => {
			postCode = postCode + `print(str([vars(${module.className})]))\n`;
		});
		return postCode;
	};

	function runCodeHandler(code: string) {
		//seeding values
		const preCode = generatePreCode();
		//printing updated states
		const postCode = generatePostCode();
		runPython(preCode + code + postCode);
	}

	function stopCodeHandler() {
		interruptExecution();
	}

	const loadModules = () => {
		seederParams.forEach((module) => {
			fetch(module.file)
				.then((r) => r.text())
				.then((text) => {
					writeFile(`${module.moduleName}.py`, text);
				});
		});
	};

	useEffect(() => {
		loadModules();
	}, [isLoading]);

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

export default ReactPy;
