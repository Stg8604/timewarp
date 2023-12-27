import { Toast } from "@components/index";
import { resetPasswordUser } from "../../slices/index";
import { useAppDispatch } from "@stores/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from "@utils/index";

const ResetPassword = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [passwords, setPasswords] = useState<IReset>({
		password: "",
		confirm: "",
	});
	const token = new URLSearchParams(location.search).get("token");
	const updatePasswords = (type: string, value: string) => {
		setPasswords({ ...passwords, [type]: value });
	};

	const resetPassword = async () => {
		if (passwords.password.length < 6) {
			Toast(TOAST_INFO, "Password must be at least 6 characters long");
			return;
		}
		if (passwords.password != passwords.confirm) {
			Toast(TOAST_ERROR, "Passwords don't match!");
			return;
		}

		if (token == null) {
			Toast(TOAST_ERROR, "Something went wrong!");
			navigate("/");
			return;
		}
		const resultResetPassword = await dispatch(
			resetPasswordUser({
				password: passwords["password"],
				token: token,
			})
		);
		if (resetPasswordUser.fulfilled.match(resultResetPassword)) {
			Toast(TOAST_SUCCESS, "Password Reset!");
			navigate("/");
		} else {
			Toast(
				TOAST_ERROR,
				resultResetPassword.payload?.message || "Something went wrong!"
			);
		}
	};

	return <>Reset Password</>;
};

export default ResetPassword;
