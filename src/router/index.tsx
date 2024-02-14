import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import protectedRoutes from "./protectedRoutes";
import { Protected } from "@components/index";
import { BASEPATH } from "@config/config";
import { useAppDispatch } from "@stores/hooks";
import { getUser } from "@slices/index";
import { isMobile, isTablet } from "react-device-detect";
import Glow from "/assets/glow4.png";
import NotFound from "@pages/NotFound/NotFound";

const Router = () => {
	const dispatch = useAppDispatch();
	dispatch(getUser());

	if (isMobile || isTablet) {
		return (
			<div className=" h-screen w-full  text-white relative flex justify-center items-center overflow-clip">
				<h1 className="orbitron text-[2rem] w-[80%] text-center">
					Your Device Can't travel through the Time Space Continuum. Try a
					laptop or a desktop.
				</h1>
				<img
					src={Glow}
					className="scale-[2] absolute top-0 left-0 w-full h-full"
				/>
			</div>
		);
	}

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
