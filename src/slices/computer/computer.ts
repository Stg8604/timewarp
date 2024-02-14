import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { status } from "./computerAction";

const computerPuzzleSolution = [
	{ source: 1, target: 2, weight: 10 },
	{ source: 1, target: 5, weight: 8 },
	{ source: 2, target: 6, weight: 6 },
	{ source: 5, target: 6, weight: 20 },
	{ source: 5, target: 9, weight: 33 },
	{ source: 6, target: 3, weight: 17 },
	{ source: 3, target: 4, weight: 5 },
	{ source: 3, target: 8, weight: 18 },
	{ source: 4, target: 8, weight: 7 },
	{ source: 6, target: 10, weight: 16 },
	{ source: 10, target: 11, weight: 16 },
	{ source: 10, target: 7, weight: 11 },
	{ source: 8, target: 11, weight: 19 },
];

const PuzzleSolution = [
	{ source: 1, target: 2 },
	{ source: 1, target: 5 },
	{ source: 2, target: 6 },
	{ source: 5, target: 6 },
	{ source: 5, target: 9 },
	{ source: 6, target: 3 },
	{ source: 3, target: 4 },
	{ source: 3, target: 8 },
	{ source: 4, target: 8 },
	{ source: 6, target: 10 },
	{ source: 10, target: 11 },
	{ source: 10, target: 7 },
	{ source: 8, target: 11 },
];

interface Edge {
	source: number;
	target: number;
}

// interface EdgeWithWeight extends Edge {
// 	weight: number;
// }

interface ComputerState {
	isInfoOpen: boolean;
	isOpenPopUp: boolean;
	isLeverDown: boolean;
	isSwitchOn: boolean;
	correct: boolean;
	isCompleted: boolean;
	isPortalKeyOpen: boolean;
	params: { [key: string]: string | number | Edge[] };
}

const currentUserEdgeList: Edge[] = [];

const initialState: ComputerState = {
	isInfoOpen: false,
	isLeverDown: false,
	isOpenPopUp: false,
	isPortalKeyOpen: false,
	isSwitchOn: false,
	isCompleted: false,
	correct: false,
	params: {
		edgeLists: computerPuzzleSolution,
		userEdgeList: currentUserEdgeList,
		possibleEdges: PuzzleSolution,
	},
};

export const computerSlice = createSlice({
	name: "computer",
	initialState,
	reducers: {
		toggleInfo: (state) => {
			state.isInfoOpen = !state.isInfoOpen;
		},
		toggleLeverInfo: (state) => {
			state.isLeverDown = !state.isLeverDown;
		},
		toggleComputerPortalKey: (state) => {
			state.isPortalKeyOpen = !state.isPortalKeyOpen;
		},
		toggleSwitch: (state) => {
			state.isSwitchOn = !state.isSwitchOn;
		},
		toggleOpenBox: (state) => {
			state.isOpenPopUp = !state.isOpenPopUp;
		},
		updateComputerParams: (
			state,
			action: { payload: { [key: string]: string | number | Edge[] } }
		) => {
			state.params = action.payload;
		},
		updateUserParams: (state, action: PayloadAction<Edge[]>) => {
			state.params.userEdgeList = action.payload;

			action.payload.map((edge) => {
				const correspondingEdge = computerPuzzleSolution.find(
					(solEdge) =>
						solEdge.source === edge.source && solEdge.target === edge.target
				);
				return correspondingEdge
					? { ...edge, weight: correspondingEdge.weight }
					: { ...edge, weight: 0 };
			});
		},
	},

	extraReducers: (builder) => {
		builder.addCase(status.fulfilled, (state, action) => {
			state.correct = action.payload.correct;
		});
	},
});

export const {
	toggleInfo,
	toggleLeverInfo,
	toggleOpenBox,
	updateComputerParams,
	toggleComputerPortalKey,
	toggleSwitch,
	updateUserParams,
} = computerSlice.actions;
export default computerSlice.reducer;
