import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const checkEmojiSolution = createAsyncThunk<
	EmojiResponseDTO,
	EmojiFlagDTO,
	{ rejectValue: APIError }
>("emoji/checkEmojiSolution", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.post(
			"/api/user/puzzle/present/emoji/action/flag",
			payload
		);
		return response.data as EmojiResponseDTO;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
export const emojiStatus = createAsyncThunk<
	EmojiResponseDTO,
	void,
	{
		rejectValue: APIError;
	}
>("emoji/status", async (payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get(
			"/api/user/puzzle/present/emoji/status/init"
		);
		return response.data as EmojiResponseDTO;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});
