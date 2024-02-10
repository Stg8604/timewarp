import { createSlice } from "@reduxjs/toolkit";

import { getLeaderBoard } from "./LeaderBoardActions";

const initialState: LeaderBoardInitalState = {
	isFetching: true,
	ranking: [],
	isError: false,
};

export const leaderboard = createSlice({
	name: "leaderboard",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getLeaderBoard.fulfilled, (state, { payload }) => {
			state.isFetching = false;
			state.isError = false;
			state.ranking = payload;
		});
		builder.addCase(getLeaderBoard.rejected, (state) => {
			state.isFetching = false;
			state.isError = true;
		});
		builder.addCase(getLeaderBoard.pending, (state) => {
			state.isFetching = true;
			state.isError = false;
		});
	},
});

export const LeaderBoardSelector = (state: {
	leaderboard: { ranking: LeaderBoardResponse[] };
}) => state.leaderboard.ranking;
export const isFetchingSelector = (state: {
	leaderboard: { isFetching: boolean };
}) => state.leaderboard.isFetching;
export default leaderboard.reducer;
