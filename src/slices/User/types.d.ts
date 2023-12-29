interface Credentials {
	email: string;
	password: string;
	token: string;
}

interface UserDetails {
	email: string;
	password: string;
	username: string;
	token: string;
	college: string;
	phonenumber: integer;
	degree: string;
	year: integer;
}

interface UserState {
	loggedIn: boolean;
	isFetching: boolean;
	isUserFetching: boolean;
}

interface AuthResponse {
	data: string;
}

interface APIError {
	message: string;
}

interface UserResponse {
	id: number;
	username: string;
	email: string;
}

interface ActivateParams {
	userId: string;
	token: string;
}

interface ForgotPasswordParams {
	email: string;
	token: string;
}

interface ResetPasswordParams {
	password: string;
	token: string;
}
