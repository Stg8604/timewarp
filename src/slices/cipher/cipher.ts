import { createSlice } from "@reduxjs/toolkit";
import { cipherStatus } from "./cipherAction";

interface CipherState {
	isMessengerInfoo: boolean;
	isGodInfo: boolean;
	correct: boolean;
	isPortalKeyOpen: boolean;
	isFire: boolean;
	isOpenPopUp: boolean;
	params: { [key: string]: string | number | Edge[] };
}

const initialState: CipherState = {
	isMessengerInfoo: false,
	isOpenPopUp: false,
	isGodInfo: false,
	correct: false,
	isFire: false,
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
		toggleFireInfo: (state) => {
			state.isFire = !state.isFire;
		},
		toggleOpenBox: (state) => {
			state.isOpenPopUp = !state.isOpenPopUp;
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
	toggleOpenBox,
	updateRevEngParams,
	togglePortalKey,
	toggleFireInfo,
} = cipherSlice.actions;
export default cipherSlice.reducer;
