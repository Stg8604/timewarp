import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { DummyReducer } from "../slices/index";

const rootReducer = combineReducers({
  dummy: DummyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
