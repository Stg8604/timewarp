import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { DummyReducer, UserReducer } from "../slices/index";

// add all the reducers here

const rootReducer = combineReducers({
  dummy: DummyReducer,
  user: UserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
