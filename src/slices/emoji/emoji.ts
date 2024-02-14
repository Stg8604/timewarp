import { createSlice } from "@reduxjs/toolkit";
import { emojiStatus } from "./emojiAction";

const initialState: EmojiPuzzleState = {
	isMainPortalOpen: false,
	isOpenPopUp: false,
	isProp1Open: false,
	isProp2Open: false,
	isProp3Open: false,
	correct: false,
	isProp4Open: false,
	isPortalKeyOpen: false,
	isHintBoxOpen: true,
	params: {
		inputKey: "",
	},
};

export const emojiPuzzleSlice = createSlice({
	name: "emojiPuzzle",
	initialState,
	reducers: {
		toggleMainPortalKey: (state) => {
			state.isMainPortalOpen = !state.isMainPortalOpen;
		},
		toggleProp1: (state) => {
			state.isProp1Open = !state.isProp1Open;
		},
		toggleProp2: (state) => {
			state.isProp2Open = !state.isProp2Open;
		},
		toggleProp3: (state) => {
			state.isProp3Open = !state.isProp3Open;
		},
		toggleProp4: (state) => {
			state.isProp4Open = !state.isProp4Open;
		},
		togglePortalKey: (state) => {
			state.isPortalKeyOpen = !state.isPortalKeyOpen;
		},
		toggleHintBox: (state) => {
			state.isHintBoxOpen = !state.isHintBoxOpen;
		},
		toggleOpenBox: (state) => {
			state.isOpenPopUp = !state.isOpenPopUp;
		},
		updateEmojiParams: (state, action) => {
			state.params = { ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(emojiStatus.fulfilled, (state, action) => {
			state.params.inputKey = action.payload.inputKey;
			state.correct = action.payload.correct;
		});
	},
});

export const {
	toggleMainPortalKey,
	toggleProp1,
	toggleProp2,
	toggleProp3,
	toggleProp4,
	togglePortalKey,
	toggleOpenBox,
	updateEmojiParams,
	toggleHintBox,
} = emojiPuzzleSlice.actions;
export default emojiPuzzleSlice.reducer;
