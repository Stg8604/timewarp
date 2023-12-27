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
import { Button, Drawer, Group } from "@mantine/core";

import {
	IconPlayerPlay,
	IconPlayerStop,
	IconSettings,
} from "@tabler/icons-react";

const Interpretor: FC<IInterpretorProps> = ({
	run,
	stop,
	config,
	output,
	error,
	isLoading,
	closeEditor,
}) => {
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
	const [input, setInput] = useState<string>(
		`def function(): \n\t# write your code here`
	);

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

	useEffect(() => {
		if (output === "") return;
		try {
			console.log(JSON.parse(output));
		} catch (e) {
			console.log(e);
		}
	}, [output]);

	return (
		<Drawer opened={config.isOpen} size="lg" onClose={() => closeEditor()}>
			<Group
				styles={() => ({
					root: {
						width: "100%",
						alignItems: "center",
						padding: "1%",
						margin: 0,
						gap: "1%",
					},
				})}
			>
				<Button
					onClick={() => run(input)}
					styles={(theme) => ({
						root: {
							background: theme.colors.lightGrey[0],
						},
					})}
				>
					<IconPlayerPlay size={20} />
				</Button>
				<Button
					onClick={() => stop()}
					styles={(theme) => ({
						root: {
							background: theme.colors.lightGrey[0],
						},
					})}
				>
					<IconPlayerStop size={20} />
				</Button>
				<Button
					onClick={() => {
						return;
					}}
					styles={(theme) => ({
						root: {
							background: theme.colors.lightGrey[0],
						},
					})}
				>
					<IconSettings size={20} />
				</Button>
			</Group>
			<AceEditor
				placeholder="Timewarp Editor"
				mode="python"
				theme={config.theme}
				tabSize={config.tabSize}
				fontSize={config.fontSize}
				width="100%"
				minLines={20}
				maxLines={100}
				editorProps={{ $blockScrolling: true }}
				value={input}
				onChange={(value) => setInput(value)}
				onLoad={editorOnLoad}
			/>
			{isLoading ? <p>Loading...</p> : <p>Ready!</p>}
			<code>{error}</code>
			<code>{output}</code>
		</Drawer>
	);
};

export default Interpretor;
