import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tutorialPuzzleSolution } from "@config/config";
import { getStegImages, initStegPuzzle } from "..";

interface StegState {
	isLoading: boolean;
	isInfoOpen: boolean;
	isPortalKeyOpen: boolean;
	isOpenPopUp: boolean;
	text: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: { [key: string]: any };
}

const initialState: StegState = {
	isLoading: false,
	isInfoOpen: false,
	isOpenPopUp: false,
	isPortalKeyOpen: false,
	text: "",
	params: {
		leftImage: [],
		rightImage: [],
	},
};

export const stegSlice = createSlice({
	name: "steg",
	initialState,
	reducers: {
		toggleInfo: (state) => {
			state.isInfoOpen = !state.isInfoOpen;
		},
		togglePortalKey: (state) => {
			state.isPortalKeyOpen = !state.isPortalKeyOpen;
		},
		toggleOpenBox: (state) => {
			state.isOpenPopUp = !state.isOpenPopUp;
		},
		setText: (state, action: PayloadAction<string>) => {
			state.text = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initStegPuzzle.pending, (state) => {
			state.isLoading = true;
		}),
			builder.addCase(initStegPuzzle.rejected, (state) => {
				state.isLoading = false;
			}),
			builder.addCase(initStegPuzzle.fulfilled, (state) => {
				state.isLoading = false;
			}),
			builder.addCase(getStegImages.pending, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(getStegImages.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.params.leftImage = payload.leftPainting
					? payload.leftPainting
					: [];
				state.params.rightImage = payload.rightPainting
					? payload.rightPainting
					: [];
			}),
			builder.addCase(getStegImages.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { toggleInfo, togglePortalKey, setText, toggleOpenBox } =
	stegSlice.actions;
export default stegSlice.reducer;
