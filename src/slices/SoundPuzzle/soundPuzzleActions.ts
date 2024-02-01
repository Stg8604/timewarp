import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";

const getClipsOrder = createAsyncThunk(
	"soundPuzzle/getClipsOrder",
	async (_, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.get(
				"/api/user/past/sound/status/init",
				{
					withCredentials: true,
				}
			);
			return response.data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

const checkSolution = async (solution: string) => {
	const response = await CustomAxios.post(
		"/api/user/past/sound/action/flag",
		{ solution: Number(solution) },
		{
			withCredentials: true,
		}
	);
	return response.data;
};

export { getClipsOrder, checkSolution };
