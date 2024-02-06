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

export const addItemToInventory = createAsyncThunk<
	{ inventory: [string, string][] },
	[string, string],
	{ rejectValue: APIError }
>("user/addItemToInventory", async (item, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/api/user/action/inventory",
			{
				itemName: item[0],
				itemDesc: item[1],
			},
			{
				withCredentials: true,
			}
		);
		// response.data.inventory = []
		// response.data.inventory.push(item)
		// console.log(response.data)
		return {
			inventory: [[item[0], item[1]]],
		};
	} catch (error: any) {
		// console.log("Error", error)
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});
