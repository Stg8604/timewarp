import {
	ActivateUser,
	DummyPydiode,
	ForgotPassword,
	Login,
	Register,
	ResetPassword,
	Landing,
} from "@pages/index";
import LevelSelector from "../components/LevelSelector";

const routes: Routes[] = [
	{
		title: "DummyPy",
		path: "/py",
		description: "py",
		element: <DummyPydiode />,
	},
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
];

export default routes;
