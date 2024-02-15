import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import protectedRoutes from "./protectedRoutes";
import { Protected } from "@components/index";
import { BASEPATH } from "@config/config";
import { useAppDispatch } from "@stores/hooks";
import { getUser } from "@slices/index";
import NotFound from "@pages/NotFound/NotFound";

const Router = () => {
	const dispatch = useAppDispatch();
	dispatch(getUser());

	return (
		<>
			<BrowserRouter basename={BASEPATH}>
				<Routes>
					{routes.map((route) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={<>{route.element}</>}
							/>
						);
					})}
					{protectedRoutes.map((route) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={<Protected>{route.element}</Protected>}
							/>
						);
					})}
					<Route key={"404"} path={"*"} element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
