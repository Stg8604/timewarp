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
