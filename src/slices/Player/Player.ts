import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { status } from "./PlayerActions";
const initialState = {
	day: 0,
	inventoryOpen: false,
	tutorialCompleted: false,
	score: 0,
	isFetching: false,
} as PlayerState;

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		toggleInventory: (state) => {
			state.inventoryOpen = !state.inventoryOpen;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(status.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(status.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(status.fulfilled, (state, { payload }) => {
			state.isFetching = false;
			state.day = payload.day;
			state.tutorialCompleted = payload.tutorialCompleted;
			state.score = payload.score;
		});
	},
});

export const { toggleInventory } = playerSlice.actions;
export const playerSelector = (state: { player: PlayerState }) => state.player;
export default playerSlice.reducer;
