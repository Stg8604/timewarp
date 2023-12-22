import {
  ActivateUser,
  Dummy,
  DummyPydiode,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
} from "@pages/index";

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
  {
    title: "Login",
    path: "/login",
    description: "Login Page",
    element: <Login />,
  },
  {
    title: "Register",
    path: "/register",
    description: "Register Page",
    element: <Register />,
  },
  {
    title: "Forgot Password",
    path: "/forgot-password",
    description: "Forgot Password Page",
    element: <ForgotPassword />,
  },
  {
    title: "Reset Password",
    path: "/reset-password",
    description: "Reset Password Page",
    element: <ResetPassword />,
  },
  {
    title: "Activate User",
    path: "/activate",
    description: "Activate User Page",
    element: <ActivateUser />,
  },
];

export default routes;
