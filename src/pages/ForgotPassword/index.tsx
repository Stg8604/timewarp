import { Toast } from "@components/index";
import { forgotPasswordUser } from "../../slices/index";
import { useAppDispatch } from "@stores/hooks";
import { isEmailValid } from "@utils/index";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string>("");

  const emailUpdate = (type: string, value: string) => {
    setEmail(value);
  };
  const forgotPassword = async () => {
    if (!isEmailValid(email)) {
      Toast(TOAST_ERROR, "Invalid email address");
      return;
    }

    const resultForgotPassword = await dispatch(
      forgotPasswordUser({
        email: email,
        token: token,
      }),
    );
    if (forgotPasswordUser.fulfilled.match(resultForgotPassword)) {
      navigate("/");
      Toast(TOAST_SUCCESS, "Please Check Your Mail to Reset Your Password!");
    } else {
      Toast(
        TOAST_ERROR,
        resultForgotPassword.payload?.message || "Something went wrong",
      );
    }
  };

  const onVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

  return (
    <>
      <button onClick={forgotPassword}>Forgot Password</button>
    </>
  );
};

export default ForgotPassword;
