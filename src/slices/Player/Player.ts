import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState = {
	playerMovementSpeed: 10,
	fireballPower: 10,
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
	},
});

export const { changePlayerMovementSpeed, changeFireballPower } =
	playerSlice.actions;
export const playerSelector = (state: { player: PlayerState }) => state.player;
export default playerSlice.reducer;
