/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const cipherStatus = createAsyncThunk<
	RevEngCheckResponseDTO,
	void,
	{
		rejectValue: APIError;
	}
>("cipher/status", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get(
			"/api/user/puzzle/present/revEng/status/init"
		);
		return response.data as RevEngCheckResponseDTO;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const checkCipher = createAsyncThunk<
	RevEngCheckResponseDTO,
	RevEngFlagDTO,
	{
		rejectValue: APIError;
	}
>("cipher/checkCipher", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post(
			"/api/user/puzzle/present/revEng/action/flag",
			payload
		);
		return response.data as WaterMorseFlagResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
