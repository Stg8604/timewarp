import { createSlice } from "@reduxjs/toolkit";

interface SceneState {
	sceneName: string;
}

const initialState: SceneState = {
	sceneName: "LoadingScene",
};

export const sceneSlice = createSlice({
	name: "scene",
	initialState,
	reducers: {
		setScene: (state, action) => {
			state.sceneName = action.payload;
		},
	},
});

export const { setScene } = sceneSlice.actions;
export default sceneSlice.reducer;
