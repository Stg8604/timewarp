/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";

export const status = createAsyncThunk<Status, void, { rejectValue: APIError }>(
	"status/getStatus",
	async (_, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.get("/api/user/status", {
				withCredentials: true,
			});
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
