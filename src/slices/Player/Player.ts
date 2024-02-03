import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { status } from "./PlayerActions";
const initialState = {
	playerMovementSpeed: 10,
	fireballPower: 10,
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
		changePlayerMovementSpeed: (state, action: PayloadAction<number>) => {
			state.playerMovementSpeed = action.payload;
		},
		changeFireballPower: (state, action: PayloadAction<number>) => {
			state.fireballPower = action.payload;
		},
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

export const {
	changePlayerMovementSpeed,
	changeFireballPower,
	toggleInventory,
} = playerSlice.actions;
export const playerSelector = (state: { player: PlayerState }) => state.player;
export default playerSlice.reducer;
