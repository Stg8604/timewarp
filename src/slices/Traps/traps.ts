import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { completePuzzle, encodedFlag } from "./trapsAction";

interface TrapsState {
	enemyCoords: { x: number; y: number }[];
	turretCoords: { id: string; x: number; y: number }[];
	shoot: {
		tutorialTurret?: number;
		challengeTurret1?: number;
		challengeTurret2?: number;
	};
	pyOutput: {
		tutorialTurret?: string;
		challengeTurret1?: string;
		challengeTurret2?: string;
	};
	level: 1 | 2;
	infoBox: boolean[];
	score: number;
	totalScore: number;
	encodedFlag: string;
}

const initialState: TrapsState = {
	enemyCoords: [],
	turretCoords: [],
	shoot: {},
	pyOutput: {},
	level: 1,
	infoBox: [false, false, false, false, false, false],
	score: 0,
	totalScore: 0,
	encodedFlag: "",
};

export const trapsSlice = createSlice({
	name: "traps",
	initialState,
	reducers: {
		setEnemyCoords: (
			state,
			action: PayloadAction<TrapsState["enemyCoords"]>
		) => {
			state.enemyCoords = action.payload;
		},
		setTurretCoords: (
			state,
			action: PayloadAction<TrapsState["turretCoords"]>
		) => {
			state.turretCoords = action.payload;
		},
		setShoot: (state, action: PayloadAction<TrapsState["shoot"]>) => {
			state.shoot = action.payload;
		},
		setPyOutput: (state, action: PayloadAction<TrapsState["pyOutput"]>) => {
			state.pyOutput = action.payload;
		},
		setLevel: (state, action: PayloadAction<TrapsState["level"]>) => {
			state.level = action.payload;
		},
		toggleInfoBox: (state, action: PayloadAction<number>) => {
			state.infoBox[action.payload] = !state.infoBox[action.payload];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(completePuzzle.fulfilled, (state, action) => {
			state.totalScore = action.payload.totalScore;
			state.score = action.payload.score;
		});
		builder.addCase(encodedFlag.fulfilled, (state, action) => {
			state.encodedFlag = action.payload.encodedFlag;
			state.infoBox[6] = true;
		})
	},
});

export const {
	setEnemyCoords,
	setTurretCoords,
	setShoot,
	setPyOutput,
	setLevel,
	toggleInfoBox,
} = trapsSlice.actions;
export default trapsSlice.reducer;
