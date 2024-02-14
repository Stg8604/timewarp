import { createSlice } from "@reduxjs/toolkit";
import { getClipsOrder } from "./soundPuzzleActions";
const soundPuzzleSolution: string[] = [];
const sta = 0;

const initialState: SoundPuzzleState = {
	isPortalKeyOpen: false,
	isOpenPopUp: false,
	isHintBoxOpen: true,
	clipsOrder: "",
	params: {
		inventory: [],
		audioFiles: soundPuzzleSolution,
		play: sta,
	},
};

export const soundPuzzleSlice = createSlice({
	name: "soundPuzzle",
	initialState,
	reducers: {
		togglePortalKey: (state) => {
			state.isPortalKeyOpen = !state.isPortalKeyOpen;
		},
		toggleHintBox: (state) => {
			state.isHintBoxOpen = !state.isHintBoxOpen;
		},
		toggleOpenBox: (state) => {
			state.isOpenPopUp = !state.isOpenPopUp;
		},
		updateClipsOrder: (state, action) => {
			state.clipsOrder = action.payload;
		},
		updateSoundParams: (state, action) => {
			state.params = { ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getClipsOrder.fulfilled, (state, action) => {
			state.clipsOrder = action.payload;
		});
	},
});

export const {
	togglePortalKey,
	toggleHintBox,
	toggleOpenBox,
	updateClipsOrder,
	updateSoundParams,
} = soundPuzzleSlice.actions;
export { soundPuzzleSolution, sta };
export default soundPuzzleSlice.reducer;
