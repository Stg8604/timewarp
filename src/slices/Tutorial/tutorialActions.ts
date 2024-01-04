/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";

// Not sure how to type this
interface CheckPasskeyResponse {
	correct: number;
}

interface PasskeyDetails {
	puzzleId: number;
	solution: string;
}

interface APIError {
	message: string;
}

export const checkPasskey = createAsyncThunk<
	CheckPasskeyResponse,
	PasskeyDetails,
	{ rejectValue: APIError }
>(
	"tutorial/checkPasskey",
	async (passkeyDetails: PasskeyDetails, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post(
				"/api/user/tutorial/action/flag",
				{
					puzzleId: passkeyDetails.puzzleId,
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
