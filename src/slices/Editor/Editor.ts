import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
	isOpen: false,
	fontSize: 18,
	theme: "monokai",
	showLineNumbers: true,
	tabSize: 2,
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
		toggleEditor: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { setEditorOptions, toggleEditor } = editorSlice.actions;
export const editorSelector = (state: { editor: IEditorConfig }) =>
	state.editor;
export default editorSlice.reducer;
