import { createSlice } from "@reduxjs/toolkit";
import { getAllCollectables } from "./collectablesAction";

interface CollectablesState {
	collectables: {
		id: integer;
		count: integer;
	}[];
}

const initialState: CollectablesState = {
	collectables: [],
};

export const collectablesSlice = createSlice({
	name: "collectables",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllCollectables.fulfilled, (state, action) => {
			state.collectables = action.payload.userCollection;
		});
	},
});

// export const { } = collectablesSlice.actions;
export default collectablesSlice.reducer;
