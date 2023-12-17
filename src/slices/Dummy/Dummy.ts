import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: 69,
} as DummyState;

export const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, incrementByAmount } = dummySlice.actions;
export const dummySelector = (state: { dummy: DummyState }) => state.dummy;
export default dummySlice.reducer;
