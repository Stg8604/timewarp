import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const status = createAsyncThunk<
	WaterMorseStatusResponse | undefined,
	void,
	{
		rejectValue: APIError;
	}
>("watermorse/status", async (_payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get(
			"/api/user/puzzle/past/morse/status/init"
		);
		return response.data as WaterMorseStatusResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const checkFlag = createAsyncThunk<
	WaterMorseFlagResponse,
	WaterMorseFlagBody,
	{
		rejectValue: APIError;
	}
>("watermorse/checkFlag", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post(
			"/api/user/puzzle/past/morse/action/flag",
			payload
		);
		return response.data as WaterMorseFlagResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
