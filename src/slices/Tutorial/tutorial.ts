import { createSlice } from "@reduxjs/toolkit";
import { tutorialPuzzleSolution } from "@config/config";

interface TutorialState {
	isInfoOpen: boolean;
	isPortalKeyOpen: boolean;
	params: { [key: string]: string | number };
}

const initialState: TutorialState = {
	isInfoOpen: false,
	isPortalKeyOpen: false,
	params: { passcode: tutorialPuzzleSolution },
};

export const tutorialSlice = createSlice({
	name: "tutorial",
	initialState,
	reducers: {
		toggleInfo: (state) => {
			state.isInfoOpen = !state.isInfoOpen;
		},
		togglePortalKey: (state) => {
			state.isPortalKeyOpen = !state.isPortalKeyOpen;
		},
		updateTutorialParams: (state, action) => {
			state.params = action.payload;
		},
	},
});

export const { toggleInfo, togglePortalKey, updateTutorialParams } =
	tutorialSlice.actions;
export default tutorialSlice.reducer;
