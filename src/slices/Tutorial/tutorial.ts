import { createSlice } from "@reduxjs/toolkit";
import { tutorialPuzzleSolution } from "@config/config";
import { StatusReducer } from "..";

interface TutorialState {
	isInfoOpen: boolean;
	isPopUpOpen: boolean;
	isPortalKeyOpen: boolean;
	params: { [key: string]: string | number };
}

const initialState: TutorialState = {
	isInfoOpen: false,
	isPopUpOpen: false,
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
		toggleCompletionPopUp: (state) => {
			state.isPopUpOpen = !state.isPopUpOpen;
		},
		updateTutorialParams: (state, action) => {
			state.params = action.payload;
		},
	},
});

export const {
	toggleInfo,
	togglePortalKey,
	toggleCompletionPopUp,
	updateTutorialParams,
} = tutorialSlice.actions;
export default tutorialSlice.reducer;
