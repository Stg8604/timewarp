/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "@utils/CustomAxios";

export const loginUser = createAsyncThunk<
	UserResponse,
	Credentials,
	{ rejectValue: APIError }
>("user/loginUser", async (credentials: Credentials, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post("/api/login", {
			email: credentials.email,
			password: credentials.password,
			token: credentials.token,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const registerUser = createAsyncThunk<
	AuthResponse,
	UserDetails,
	{ rejectValue: APIError }
>(
	"user/registerUser",
	async (userDetails: UserDetails, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post("/api/register", {
				email: userDetails.email,
				password: userDetails.password,
				username: userDetails.username,
				token: userDetails.token,
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

export const getUser = createAsyncThunk<
	UserResponse,
	void,
	{ rejectValue: APIError }
>("user/getUser", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get("api/user", {
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
});

export const activateUser = createAsyncThunk<
	AuthResponse,
	ActivateParams,
	{ rejectValue: APIError }
>(
	"user/activateUser",
	async (activateParams: ActivateParams, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post("/api/activate-user", {
				userId: activateParams["userId"],
				token: activateParams["token"],
			});
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			}
			return rejectWithValue(error.message);
		}
	}
);

export const forgotPasswordUser = createAsyncThunk<
	AuthResponse,
	ForgotPasswordParams,
	{ rejectValue: APIError }
>(
	"user/forgotPasswordUser",
	async (forgotPasswordUser: ForgotPasswordParams, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post("/api/forgot-password", {
				email: forgotPasswordUser["email"],
				token: forgotPasswordUser["token"],
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

export const resetPasswordUser = createAsyncThunk<
	AuthResponse,
	ResetPasswordParams,
	{ rejectValue: APIError }
>(
	"user/resetPasswordUser",
	async (resetPasswordParams: ResetPasswordParams, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post("/api/reset-password", {
				password: resetPasswordParams["password"],
				token: resetPasswordParams["token"],
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

export const logoutUser = createAsyncThunk<
	AuthResponse,
	void,
	{ rejectValue: APIError }
>("user/logoutUser", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get("api/logout", {
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
});
