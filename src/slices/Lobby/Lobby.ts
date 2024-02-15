import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isInfoOpen: false,
	isLeaderboardOpen: false,
	isLoreOpen: false,
	isPastPortalOpen: false,
	isPresentPortalOpen: false,
	isFuturePortalOpen: false,
} as ILobbyState;

export const lobbySlice = createSlice({
	name: "lobby",
	initialState,
	reducers: {
		toggleInfo: (state) => {
			state.isInfoOpen = !state.isInfoOpen;
		},
		toggleLeaderboard: (state) => {
			state.isLeaderboardOpen = !state.isLeaderboardOpen;
		},
		toggleLore: (state) => {
			state.isLoreOpen = !state.isLoreOpen;
		},
		togglePastPortal: (state) => {
			state.isPastPortalOpen = !state.isPastPortalOpen;
		},
		togglePresentPortal: (state) => {
			state.isPresentPortalOpen = !state.isPresentPortalOpen;
		},
		toggleFuturePortal: (state) => {
			state.isFuturePortalOpen = !state.isFuturePortalOpen;
		},
		toggleTutorial: (state) => {
			state.isTutorialOpen = !state.isTutorialOpen;
		},
	},
});
export const {
	toggleLeaderboard,
	toggleLore,
	toggleFuturePortal,
	togglePastPortal,
	togglePresentPortal,
	toggleInfo,
	toggleTutorial,
} = lobbySlice.actions;
export const lobbySelector = (state: { dummy: DummyState }) => state.dummy;
export default lobbySlice.reducer;
