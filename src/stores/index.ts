import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	DummyReducer,
	EditorReducer,
	PlayerReducer,
	UserReducer,
} from "../slices/index";

// add all the reducers here

const rootReducer = combineReducers({
	dummy: DummyReducer,
	user: UserReducer,
	player: PlayerReducer,
	editor: EditorReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
