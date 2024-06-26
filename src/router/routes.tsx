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
import LandingPage from "@pages/LandingPage/LandingPage";
import { Popup } from "../components";
import audiobox from "../assets/audiobox.svg";
import painting from "../assets/painting.svg";
import CompletionProps from "../components/CompletionPopUp/CompletionProps";
import CompletionPopUp from "../components/CompletionPopUp";

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
		element: <LandingPage />,
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
