/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";

export const checkStegPasskey = createAsyncThunk<
	InitResponse,
	PasskeyDetails,
	{ rejectValue: APIError }
>(
	"steg/checkPasskey",
	async (passkeyDetails: PasskeyDetails, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post(
				"/api/user/puzzle/present/steg/action/flag",
				{
					solution: passkeyDetails.solution,
				}
			);
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const initStegPuzzle = createAsyncThunk<
	InitResponse,
	void,
	{ rejectValue: APIError }
>("steg/initGame", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			"api/user/puzzle/present/steg/status/init",
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const getStegImages = createAsyncThunk<
	GetImageResponse,
	void,
	{ rejectValue: APIError }
>("steg/getImages", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			"api/user/puzzle/present/steg/status/images",
			{
				withCredentials: true,
			}
		);
		// console.log(response.data);
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});
