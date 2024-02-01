type EditorThemes =
	| "monokai"
	| "github"
	| "tomorrow"
	| "xcode"
	| "terminal"
	| "textmate";

interface IEditorConfig {
	isOpen: boolean;
	fontSize: number;
	theme: EditorThemes;
	showLineNumbers: boolean;
	tabSize: number;
}

interface IInterpretorProps {
	config: IEditorConfig;
	run: (value: string) => void;
	stop: () => void;
	output: string;
	error: string | undefined;
	isLoading: boolean;
	isRunning: boolean;
	closeEditor: () => void;
	defaultInput?: string;
}
