import Dashboard from "@pages/Dashboard";
import Dummy from "@pages/Dummy";
import Tutorial from "@pages/Tutorial";

const protectedRoutes: Routes[] = [
	{
		title: "Dashboard",
		path: "/dashboard",
		description: "dashboard Page",
		element: <Dashboard />,
	},
	{
		title: "Tutorial Game",
		path: "/tutorial",
		description: "Tutorial Game",
		element: <Tutorial />,
	},
	{
		title: "Dummy",
		path: "/redux",
		description: "redux",
		element: <Dummy />,
	},
];

export default protectedRoutes;
