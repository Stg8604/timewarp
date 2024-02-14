import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { interceptorStatus } from "./InterceptorXAction";

interface InterceptorX {
	isInfoOpen_1: boolean;
	isInfoOpen_2: boolean;
	isInfoOpen_3: boolean;
	isInfoOpen_4: boolean;
	isOpenPopUp: boolean;
	isPortalKeyOpen: boolean;
	isDude: boolean;
	isDummyOpen: boolean;
	noOfCollectedItem: number;
	isCompleted: boolean;
	params: { [key: string]: string | number };
}

const initialState: InterceptorX = {
	isInfoOpen_1: false,
	isInfoOpen_2: false,
	isInfoOpen_3: false,
	isInfoOpen_4: false,
	isOpenPopUp: false,
	isDummyOpen: false,
	isPortalKeyOpen: false,
	isDude: false,
	noOfCollectedItem: 0,
	isCompleted: false,
	params: { partsLocation: "", parts: 0 },
};

export const InterceptorXSlice = createSlice({
	name: "interceptor",
	initialState,
	reducers: {
		toggleInfo_1: (state) => {
			state.isInfoOpen_1 = !state.isInfoOpen_1;
			if (state.isInfoOpen_1) {
				state.noOfCollectedItem++;
				state.params.parts = state.noOfCollectedItem;
			}
		},
		toggleInfo_2: (state) => {
			state.isInfoOpen_2 = !state.isInfoOpen_2;
			if (state.isInfoOpen_2) {
				state.noOfCollectedItem++;
				state.params.parts = state.noOfCollectedItem;
			}
		},
		toggleInfo_3: (state) => {
			state.isInfoOpen_3 = !state.isInfoOpen_3;
			if (state.isInfoOpen_3) {
				state.noOfCollectedItem++;
				state.params.parts = state.noOfCollectedItem;
			}
		},
		toggleInfo_4: (state) => {
			state.isInfoOpen_4 = !state.isInfoOpen_4;
			if (state.isInfoOpen_4) {
				state.noOfCollectedItem++;
				state.params.parts = state.noOfCollectedItem;
			}
		},
		toggleDudeState: (state) => {
			state.isDude = !state.isDude;
		},
		toggleDummyState: (state) => {
			state.isDummyOpen = !state.isDummyOpen;
		},
		togglePortalKey: (state) => {
			state.isPortalKeyOpen = !state.isPortalKeyOpen;
		},
		toggleOpenBox: (state) => {
			state.isOpenPopUp = !state.isOpenPopUp;
		},
		updateInterceptParams: (state, action) => {
			state.params.partsLocation = action.payload.partsLocation;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(interceptorStatus.fulfilled, (state, action) => {
			state.isCompleted = action.payload.isCompleted;
		});
	},
});

export const {
	toggleInfo_1,
	toggleInfo_2,
	toggleInfo_3,
	toggleInfo_4,
	toggleOpenBox,
	togglePortalKey,
	toggleDummyState,
	toggleDudeState,
	updateInterceptParams,
} = InterceptorXSlice.actions;
export default InterceptorXSlice.reducer;
