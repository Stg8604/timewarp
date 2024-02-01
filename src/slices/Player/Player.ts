import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlayerState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tutorialCompleted: any;
	playerMovementSpeed: number;
	fireballPower: number;
	inventoryOpen: boolean;
}

const initialState: PlayerState = {
	playerMovementSpeed: 10,
	fireballPower: 10,
	inventoryOpen: false,
	tutorialCompleted: undefined,
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		toggleInventory: (state) => {
			state.inventoryOpen = !state.inventoryOpen;
		},
		changePlayerMovementSpeed: (state, action: PayloadAction<number>) => {
			state.playerMovementSpeed = action.payload;
		},
		changeFireballPower: (state, action: PayloadAction<number>) => {
			state.fireballPower = action.payload;
		},
	},
});

export const {
	changePlayerMovementSpeed,
	changeFireballPower,
	toggleInventory,
} = playerSlice.actions;
export const playerSelector = (state: { player: PlayerState }) => state.player;
export default playerSlice.reducer;
