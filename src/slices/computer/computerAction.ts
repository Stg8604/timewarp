/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";
import { AxiosError } from "axios";

export const status = createAsyncThunk<
	MstWeightResponse,
	void,
	{
		rejectValue: APIError;
	}
>("computer/status", async (_payload, thunkAPI) => {
	try {
		const response = await CustomAxios.get(
			"/api/user/puzzle/future/mst/status/init"
		);
		return response.data as MstWeightResponse;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as AxiosError).response?.data as APIError
		);
	}
});

export const checkMstWeight = createAsyncThunk<
	MstWeightResponse,
	MSTFlagDTO,
	{ rejectValue: APIError }
>(
	"computer/checkMstWeight",
	async (MSTFlagDTO: MSTFlagDTO, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post(
				"/api/user/puzzle/future/mst/action/flag",
				{
					edges: MSTFlagDTO.edges,
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
