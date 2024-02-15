import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const getAllCollectables = createAsyncThunk<
	AllCollectablesResponse,
	void,
	{
		rejectValue: APIError;
	}
>("collectables/getAllCollectables", async (_payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get("/api/user/collectable/all");
		return response.data as AllCollectablesResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const getPuzzleCollectables = createAsyncThunk<
	PuzzleCollectablesResponse,
	{
		puzzleId: integer;
	},
	{
		rejectValue: APIError;
	}
>("collectables/getPuzzleCollectables", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post("/api/user/collectable/puzzle", {
			id: payload.puzzleId,
		});
		return response.data as PuzzleCollectablesResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const updatePuzzleCollectables = createAsyncThunk<
	PuzzleUpdateCollectableResponse,
	{
		puzzleId: integer;
		collectableIndex: integer;
	},
	{
		rejectValue: APIError;
	}
>("collectables/updatePuzzleCollectables", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post(
			"/api/user/collectable/update",
			payload
		);
		return response.data as PuzzleUpdateCollectableResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
