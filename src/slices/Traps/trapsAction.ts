import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const status = createAsyncThunk<
	TrapsStatusResponse,
	void,
	{
		rejectValue: APIError;
	}
>("traps/status", async (_payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get(
			"/api/user/puzzle/future/traps/status/init"
		);
		return response.data as TrapsStatusResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const completePuzzle = createAsyncThunk<
	TrapsCompleteResponse,
	{
		flag: string;
	},
	{
		rejectValue: APIError;
	}
>("traps/complete", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post(
			"/api/user/puzzle/future/traps/action/flag",
			payload
		);
		return response.data as TrapsCompleteResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const encodedFlag = createAsyncThunk<
	TrapsEncodedFlagResponse,
	void,
	{
		rejectValue: APIError;
	}
>("traps/encodedFlag", async (_payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get(
			"/api/user/puzzle/future/traps/action/encodedFlag"
		);
		return response.data as TrapsEncodedFlagResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
