import { PhasorRouter, Dashboard, LeaderBoard } from "@pages/index";

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
		title: "Leaderboard",
		path: "/leaderboard",
		description: "Leaderboard Page",
		element: <LeaderBoard />,
	},
];

export default protectedRoutes;
