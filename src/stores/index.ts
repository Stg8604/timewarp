import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	DummyReducer,
	TutorialReducer,
	EditorReducer,
	PlayerReducer,
	UserReducer,
	SceneReducer,
	WaterMorseReducer,
} from "../slices/index";

// add all the reducers here

const rootReducer = combineReducers({
	dummy: DummyReducer,
	user: UserReducer,
	player: PlayerReducer,
	editor: EditorReducer,
	tutorial: TutorialReducer,
	scene: SceneReducer,
	waterMorse: WaterMorseReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
