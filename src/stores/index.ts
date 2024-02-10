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
} from "../slices/index";

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
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
