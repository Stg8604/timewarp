export { default as DummyReducer } from "./Dummy/Dummy";
export { default as UserReducer } from "./User/User";

export {
  loginUser,
  registerUser,
  activateUser,
  getUser,
  forgotPasswordUser,
  resetPasswordUser,
  logoutUser,
} from "./User/UserActions";

export { userSelector } from "./User/User";
