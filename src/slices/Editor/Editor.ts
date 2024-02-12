import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
	isOpen: false,
	fontSize: 20,
	theme: "monokai",
	showLineNumbers: true,
	tabSize: 2,
	value: "",
} as IEditorConfig;

export const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		setEditorOptions: (state, action: PayloadAction<IEditorConfig>) => {
			state.fontSize = action.payload.fontSize;
			state.tabSize = action.payload.tabSize;
			state.showLineNumbers = action.payload.showLineNumbers;
			state.theme = action.payload.theme;
		},
		setEditorValue: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
		toggleEditor: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { setEditorOptions, toggleEditor, setEditorValue } =
	editorSlice.actions;
export const editorSelector = (state: { editor: IEditorConfig }) =>
	state.editor;
export default editorSlice.reducer;
