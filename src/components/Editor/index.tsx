import { FC, useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";

// editor themes
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-tomorrow";

import "ace-builds/src-noconflict/ext-language_tools";
import { Button, Modal, Group, Image } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@stores/hooks";
import "./styles.css";
import playImg from "../../assets/Editor/Play.svg";
import stopImg from "../../assets/Editor/Stop.svg";

import { setEditorValue } from "@slices/Editor/Editor";

const Interpretor: FC<IInterpretorProps> = ({
	run,
	stop,
	config,
	output,
	error,
	isLoading,
	closeEditor,
	defaultInput,
}) => {
	const editor = useAppSelector((state) => state.editor);
	const dispatch = useAppDispatch();
	const editorOnLoad = (editor: {
		setOptions: (arg0: {
			enableBasicAutocompletion: boolean;
			enableLiveAutocompletion: boolean;
			highlightActiveLine: boolean;
			showPrintMargin: boolean;
			fontSize: number;
			showLineNumbers: boolean;
		}) => void;
		renderer: {
			setScrollMargin: (
				arg0: number,
				arg1: number,
				arg2: number,
				arg3: number
			) => void;
		};
		moveCursorTo: (arg0: number, arg1: number) => void;
	}) => {
		editor.setOptions({
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
			highlightActiveLine: false,
			showPrintMargin: false,
			fontSize: config.fontSize,
			showLineNumbers: config.showLineNumbers,
		});
		editor.renderer.setScrollMargin(10, 10, 0, 0);
		editor.moveCursorTo(0, 0);
	};
	const [delayedOpen, setDelayedOpen] = useState<boolean>(false);

	// const editorConfigHandler = () => {
	//   dispatch(
	//     setEditorOptions({
	//       fontSize: 25,
	//       tabSize: 4,
	//       showLineNumbers: false,
	//       theme: "terminal",
	//       isOpen: config.isOpen
	//     }),
	//   );
	// };

	// useEffect(() => {
	// 	if (output === "") return;
	// 	try {
	// 		console.log(JSON.parse(output));
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }, [output]);

	useEffect(() => {
		if (!config.isOpen) {
			setDelayedOpen(false);
			return;
		}

		const timeOut = setTimeout(() => {
			setDelayedOpen(config.isOpen);
		}, 650);

		return () => clearTimeout(timeOut);
	}, [config.isOpen]);

	return (
		<Modal
			opened={delayedOpen}
			size="lg"
			onClose={() => {
				closeEditor();
			}}
			withCloseButton={false}
			styles={{
				content: {
					backgroundImage: 'url("assets/editorbg.png")',
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% 100%",
					backgroundColor: "transparent",
				},
			}}
		>
			<Group
				styles={() => ({
					root: {
						width: "100%",
						alignItems: "center",
						padding: "1%",
						margin: 0,
					},
				})}
			>
				<Group
					onClick={() => run(editor.value)}
					className="cursor-pointer w-12"
				>
					<Image src={playImg} />
				</Group>
				<Group onClick={() => stop()} className="cursor-pointer w-12">
					<Image src={stopImg} />
				</Group>
			</Group>
			<AceEditor
				placeholder="Timewarp Editor"
				mode="python"
				theme={config.theme}
				tabSize={config.tabSize}
				fontSize={config.fontSize}
				width="100%"
				minLines={20}
				maxLines={20}
				editorProps={{ $blockScrolling: true }}
				value={editor.value === "" ? defaultInput : editor.value}
				onChange={(value) => {
					dispatch(setEditorValue(value));
				}}
				onLoad={editorOnLoad}
				defaultValue={editor.value === "" ? defaultInput : editor.value}
			/>
			<code>{error}</code>
			<code>{output}</code>
		</Modal>
	);
};

export default Interpretor;
