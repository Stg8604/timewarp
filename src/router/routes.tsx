import { Dummy, DummyPydiode } from "@pages/index";

const routes: Routes[] = [
  {
    title: "Dummy",
    path: "/",
    description: "home",
    element: <Dummy />,
  },
  {
    title: "DummyPy",
    path: "/py",
    description: "py",
    element: <DummyPydiode />,
  },
];

export default routes;
