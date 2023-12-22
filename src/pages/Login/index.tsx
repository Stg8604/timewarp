import { useCookies } from "react-cookie";
import { useAppDispatch } from "@stores/hooks";

import {
  TOAST_ERROR,
  TOAST_INFO,
  TOAST_SUCCESS,
  isEmailValid,
  theme,
} from "@utils/index";
import { loginUser } from "../../slices";
import { Toast } from "@components/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mantine/core";

const Login = () => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginCredentials, setLoginCredentials] = useState<ILogin>({
    email: "",
    password: "",
    token: "",
  });

  const emailLoginHandler = async () => {
    if (!isEmailValid(loginCredentials.email)) {
      Toast(TOAST_ERROR, "Invalid Email");
    } else if (loginCredentials.password.length === 0) {
      Toast(TOAST_ERROR, "Password cannot be empty");
    } else {
      const res = await dispatch(
        loginUser({
          email: loginCredentials.email,
          password: loginCredentials.password,
          token: loginCredentials.token,
        }),
      );
      if (loginUser.fulfilled.match(res)) {
        const jwtToken = res.payload;
        setCookie("jwt", jwtToken, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        Toast(TOAST_SUCCESS, "Successfully Logged In!");
        navigate("/");
      } else {
        if (res.payload?.message) Toast(TOAST_ERROR, res.payload.message);
        else Toast(TOAST_ERROR, "Try again after sometime");
      }
    }
  };
  return (
    <>
      <p className="text-center font-pressStart2P text-paleBrown text-lg">
        Login
      </p>
      <p className="font-pixelifySans text-purple text-xl">Hey Dummy</p>
      <Button
        styles={(theme) => ({
          root: {
            fontSize: theme.fontSizes.lg,
            backgroundColor: theme.colors.paleBrown[0],
            fontFamily: "pixelifySans",
            color: theme.colors.paleYellow[0],
          },
        })}
        onClick={emailLoginHandler}
      >
        Click me to Login
      </Button>
    </>
  );
};

export default Login;
