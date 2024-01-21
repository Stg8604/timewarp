import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const checkFlag = createAsyncThunk<
	TutorialFlagResponse,
	TutorialFlagBody,
	{
		rejectValue: APIError;
	}
>("tutorial/checkFlag", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post(
			"/api/user/tutorial/action/flag",
			payload
		);
		return response.data as TutorialFlagResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
