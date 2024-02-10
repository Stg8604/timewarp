import { createSlice } from "@reduxjs/toolkit";
import { addItemToInventory, status } from "./statusActions";

interface StatusState {
	day: number;
	tutorialComplete: boolean | undefined;
	score: number;
	userName: string;
	puzzleCompletionList: {
		[key: string]: boolean;
	};
	inventory: [string, string][];
}

const initialState: StatusState = {
	day: 1,
	tutorialComplete: false,
	score: 0,
	userName: "",
	puzzleCompletionList: {},
	inventory: [],
};

export const statusSlice = createSlice({
	name: "status",
	initialState,
	reducers: {
		setDay: (state, action) => {
			state.day = action.payload;
		},
		setTutorialComplete: (state, action) => {
			state.tutorialComplete = action.payload;
		},
		setScore: (state, action) => {
			state.score = action.payload;
		},
		setPuzzleCompletionList: (state, action) => {
			state.puzzleCompletionList = action.payload;
		},
		setInventory: (state, action) => {
			state.inventory = action.payload;
		},
		setUsername: (state, action) => {
			state.userName = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(status.fulfilled, (state, action) => {
			state.day = action.payload.day;
			state.tutorialComplete = action.payload.tutorialCompleted;
			state.score = action.payload.score;
			state.puzzleCompletionList = action.payload.puzzleCompletionList;
			state.inventory = action.payload.inventory;
			state.userName = action.payload.userName;
		});

		builder.addCase(addItemToInventory.fulfilled, (state, action) => {
			// console.log("Here", action.payload, JSON.stringify(state.inventory))
			state.inventory = [...state.inventory, ...action.payload.inventory];
		});

		builder.addDefaultCase((state) => {
			return state;
		});
	},
});

export const {
	setDay,
	setTutorialComplete,
	setScore,
	setPuzzleCompletionList,
	setInventory,
	setUsername,
} = statusSlice.actions;
export default statusSlice.reducer;
