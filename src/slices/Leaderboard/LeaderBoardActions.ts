import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";

export const getLeaderBoard = createAsyncThunk<
	LeaderBoardResponse[],
	void,
	{ rejectValue: APIError }
>("leaderboard/getLeaderBoard", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get("api/user/getLeaderBoard", {
			withCredentials: true,
		});
		return response.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});
