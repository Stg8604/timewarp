import { createSlice } from "@reduxjs/toolkit";
import {
	forgotPasswordUser,
	getUser,
	loginUser,
	logoutUser,
	registerUser,
} from "./UserActions";

const initialState = {
	loggedIn: false,
	isFetching: false,
	isUserFetching: false,
} as UserState;

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {},

	// extra reducers for handling each of the cases in asynchronous requests and updating the state accordingly
	extraReducers: (builder) => {
		builder.addCase(loginUser.rejected, (state) => {
			state.loggedIn = false;
			state.isFetching = false;
		});

		builder.addCase(loginUser.pending, (state) => {
			state.loggedIn = false;
			state.isFetching = true;
		});

		builder.addCase(loginUser.fulfilled, (state) => {
			state.loggedIn = true;
			state.isFetching = false;
		});
		builder.addCase(logoutUser.rejected, (state) => {
			state.loggedIn = true;
			state.isFetching = false;
		});

		builder.addCase(logoutUser.pending, (state) => {
			state.loggedIn = true;
			state.isFetching = true;
		});

		builder.addCase(logoutUser.fulfilled, (state) => {
			state.loggedIn = false;
			state.isFetching = false;
		});
		builder.addCase(registerUser.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(registerUser.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(registerUser.fulfilled, (state) => {
			state.isFetching = false;
		});
		builder.addCase(getUser.fulfilled, (state) => {
			state.loggedIn = true;
			state.isUserFetching = false;
		});
		builder.addCase(getUser.pending, (state) => {
			state.loggedIn = false;
			state.isUserFetching = true;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.loggedIn = false;
			state.isUserFetching = false;
		});
		builder.addCase(forgotPasswordUser.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(forgotPasswordUser.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(forgotPasswordUser.fulfilled, (state) => {
			state.isFetching = false;
		});
	},
});

export const userSelector = (state: { user: UserState }) => state.user;
export default user.reducer;
