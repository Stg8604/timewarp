import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const interceptorStatus = createAsyncThunk<
	InterceptStatusResponseDTO,
	void,
	{
		rejectValue: APIError;
	}
>("interceptor/status", async (_payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get(
			"/api/user/puzzle/future/intercept/status/init"
		);
		return response.data as InterceptStatusResponseDTO;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const checkInterceptorFlag = createAsyncThunk<
	InterceptCheckResponseDTO,
	InterceptFlagDTO,
	{
		rejectValue: APIError;
	}
>("interceptor/checkInterceptorFlag", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post(
			"api/user/puzzle/future/intercept/action/flag",
			payload
		);
		return response.data as InterceptCheckResponseDTO;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
