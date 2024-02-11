import {
	ActivateUser,
	ForgotPassword,
	Login,
	Register,
	ResetPassword,
	Landing,
	Steg,
	LeaderBoard,
	Oauth,
} from "@pages/index";
import LevelSelector from "../components/LevelSelector";

const routes: Routes[] = [
	{
		title: "Login",
		path: "/login",
		description: "Login Page",
		element: <Login />,
	},
	{
		title: "Register",
		path: "/register",
		description: "Register Page",
		element: <Register />,
	},
	{
		title: "Forgot Password",
		path: "/forgot-password",
		description: "Forgot Password Page",
		element: <ForgotPassword />,
	},
	{
		title: "Reset Password",
		path: "/reset-password",
		description: "Reset Password Page",
		element: <ResetPassword />,
	},
	{
		title: "Activate User",
		path: "/activate",
		description: "Activate User Page",
		element: <ActivateUser />,
	},
	{
		title: "Landing Page",
		path: "/",
		description: "Landing Page",
		element: <Landing />,
	},
	{
		title: "Steganography Game",
		path: "/steg",
		description: "Steganography Game",
		element: <Steg />,
	},
	{
		title: "Leaderboard",
		path: "/leaderboard",
		description: "Leaderboard Page",
		element: <LeaderBoard />,
	},
	{
		title: "Oauth Redirect",
		path: "/oauth",
		description: "Oauth Redirect Page",
		element: <Oauth />,
	},
];

export default routes;
