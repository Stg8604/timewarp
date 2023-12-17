import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import protectedRoutes from "./protectedRoutes";
import { Protected } from "@components/index";
import { BASEPATH } from "@config/config";

const Router = () => {
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
