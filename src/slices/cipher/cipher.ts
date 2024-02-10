import { createSlice } from "@reduxjs/toolkit";
import { cipherStatus } from "./cipherAction";

interface CipherState {
	isMessengerInfoo: boolean;
	isGodInfo: boolean;
	correct: boolean;
	isPortalKeyOpen: boolean;
	params: { [key: string]: string | number | Edge[] };
}

const initialState: CipherState = {
	isMessengerInfoo: false,
	isGodInfo: false,
	correct: false,
	isPortalKeyOpen: false,
	params: { data: "none" },
};

export const cipherSlice = createSlice({
	name: "cipher",
	initialState,
	reducers: {
		toggleMessengerInfo: (state) => {
			state.isMessengerInfoo = !state.isMessengerInfoo;
		},
		toggleGodInfo: (state) => {
			state.isGodInfo = !state.isGodInfo;
		},
		updateRevEngParams: (state, { payload }) => {
			console.log("");
		},
		togglePortalKey: (state) => {
			state.isPortalKeyOpen = !state.isPortalKeyOpen;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(cipherStatus.fulfilled, (state, action) => {
			state.correct = action.payload.correct;
		});
	},
});

export const {
	toggleMessengerInfo,
	toggleGodInfo,
	updateRevEngParams,
	togglePortalKey,
} = cipherSlice.actions;
export default cipherSlice.reducer;