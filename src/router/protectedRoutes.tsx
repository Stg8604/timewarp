import { PhasorRouter, Dummy, Dashboard } from "@pages/index";

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
	{
		title: "Dummy",
		path: "/redux",
		description: "redux",
		element: <Dummy />,
	},
];

export default protectedRoutes;
