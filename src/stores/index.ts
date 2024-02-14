import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	DummyReducer,
	TutorialReducer,
	EditorReducer,
	PlayerReducer,
	UserReducer,
	StatusReducer,
	SceneReducer,
	ComputerReducer,
	WaterMorseReducer,
	SoundPuzzleReducer,
	LobbyReducer,
	StegReducer,
	emojiPuzzleReducer,
	Interceptor,
	cipherReducer,
	LeaderBoardReducer,
	TrapsReducer,
} from "../slices/index";
import { PROD } from "@config/config";

// add all the reducers here

const rootReducer = combineReducers({
	dummy: DummyReducer,
	user: UserReducer,
	player: PlayerReducer,
	editor: EditorReducer,
	tutorial: TutorialReducer,
	scene: SceneReducer,
	computer: ComputerReducer,
	waterMorse: WaterMorseReducer,
	status: StatusReducer,
	soundPuzzle: SoundPuzzleReducer,
	lobby: LobbyReducer,
	steg: StegReducer,
	emoji: emojiPuzzleReducer,
	interceptor: Interceptor,
	cipher: cipherReducer,
	leaderboard: LeaderBoardReducer,
	traps: TrapsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: !PROD,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
