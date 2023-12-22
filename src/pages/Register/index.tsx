import { useAppDispatch } from "@stores/hooks";
import {
  TOAST_ERROR,
  TOAST_INFO,
  TOAST_SUCCESS,
  isEmailValid,
} from "@utils/index";
import { registerUser } from "../../slices";
import { Toast } from "@components/";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [registerCredentials, setRegisterCredentials] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
    confirm: "",
    token: "",
  });

  const emailRegisterHandler = async () => {
    if (!isEmailValid(registerCredentials.email)) {
      Toast(TOAST_ERROR, "Invalid Email");
    } else if (
      registerCredentials.password.length === 0 ||
      registerCredentials.username.length === 0 ||
      registerCredentials.confirm.length === 0
    ) {
      Toast(TOAST_INFO, "Fields cannot be empty");
    } else if (registerCredentials.password !== registerCredentials.confirm) {
      Toast(TOAST_ERROR, "Passwords do not match");
    } else if (
      registerCredentials.password.length < 3 ||
      registerCredentials.password.length > 15
    ) {
      Toast(TOAST_INFO, "Password length should be between 3-15 characters");
    } else {
      const res = await dispatch(
        registerUser({
          username: registerCredentials.username,
          email: registerCredentials.email,
          password: registerCredentials.password,
          token: "",
        }),
      );
      if (registerUser.fulfilled.match(res)) {
        Toast(TOAST_SUCCESS, "Please Verify your email to Login");
        navigate("/login");
      } else {
        if (res.payload?.message) Toast(TOAST_ERROR, res.payload.message);
        else Toast(TOAST_ERROR, "Try again after sometime");
      }
    }
  };
  return (
    <>
      <p>Register</p>
      <button onClick={emailRegisterHandler}>Click to Register</button>
    </>
  );
};

export default Register;
