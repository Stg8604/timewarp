import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// Dispatch any action via reducer using this hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Select any state variables from the redux store using this hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
