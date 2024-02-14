import { createSlice } from "@reduxjs/toolkit";
import { status } from "./waterMorseActions";

interface WaterMorseState {
	audioID: number;
	isOpenPopUp: boolean;
	isPortalOpen: boolean;
	params: { [key: string]: string | number };
	infoBox: boolean[];
}

const initialState: WaterMorseState = {
	audioID: -1,
	isPortalOpen: false,
	isOpenPopUp: false,
	params: {
		forest: "",
		wind: "",
		river: "",
	},
	infoBox: [false, false, true],
};

export const waterMorseSlice = createSlice({
	name: "waterMorse",
	initialState,
	reducers: {
		updateWaterMorseParams: (state, action) => {
			state.params = action.payload;
		},
		toggleWaterMorsePortal: (state) => {
			state.isPortalOpen = !state.isPortalOpen;
		},
		toggleOpenBox: (state) => {
			state.isOpenPopUp = !state.isOpenPopUp;
		},
		toggleInfoBox: (state, action: { payload: number; type: string }) => {
			state.infoBox[action.payload] = !state.infoBox[action.payload];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(status.fulfilled, (state, action) => {
			state.audioID = action.payload.audioID;
		});
	},
});

export const {
	updateWaterMorseParams,
	toggleWaterMorsePortal,
	toggleInfoBox,
	toggleOpenBox,
} = waterMorseSlice.actions;
export default waterMorseSlice.reducer;
