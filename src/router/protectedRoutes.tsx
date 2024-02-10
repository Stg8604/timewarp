import { PhasorRouter, Dashboard } from "@pages/index";

const protectedRoutes: Routes[] = [
	{
		title: "Dashboard",
		path: "/dashboard",
		description: "dashboard Page",
		element: <Dashboard />,
	},
	{
		title: "Game",
		path: "/game",
		description: "Game",
		element: <PhasorRouter />,
	},
];

export default protectedRoutes;
