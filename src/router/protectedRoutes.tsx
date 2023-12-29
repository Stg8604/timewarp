import Dashboard from "@pages/Dashboard";

const protectedRoutes: Routes[] = [
	{
		title: "Dashboard",
		path: "/dashboard",
		description: "dashboard Page",
		element: <Dashboard />,
	},
];

export default protectedRoutes;
