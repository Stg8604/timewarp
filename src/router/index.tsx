import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import protectedRoutes from "./protectedRoutes";
import { Protected } from "@components/index";
import { BASEPATH } from "@config/config";
import { useAppDispatch } from "@stores/hooks";
import { useEffect } from "react";
import { getUser } from "../slices/index";

const Router = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		(async () => {
			await dispatch(getUser());
		})();
	}, [dispatch]);
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
					{/* <Route key={"404"} path={"*"} element={<NotFound />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
