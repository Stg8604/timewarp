import { Toast } from "@components/index";
import { resetPasswordUser } from "../../slices/index";
import { useAppDispatch } from "@stores/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from "@utils/index";
import bgcard from "/assets/bgcard.svg";
import timewarp from "/assets/timewarpbg.svg";
import earth from "/assets/icon.png";
import bgcardextended from "/assets/bgcardextended.svg";
import confirm from "/assets/confirm.svg";
import { Password } from "@components/index";
import { Button } from "@mantine/core";
import styles from "./styles.module.css";
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
			navigate("/login");
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

	return (
		<>
			<div className={styles.your_class}>
				<div className="h-full flex flex-col items-center">
					<img
						src={timewarp}
						className="absolute top-16 sm:top-0 xl:top-0 z-10"
					/>
					<img
						src={bgcardextended}
						className="absolute top-[14%] sm:invisible"
					/>
					<img
						src={bgcard}
						className="h-[60%] sm:h-[65%] absolute top-[20%] sm:top-[20%] xl:top-[30%] invisible sm:visible"
					/>
					<img
						src={earth}
						className="w-[45%] sm:w-[20%] absolute top-16 sm:top-8 xl:top-0"
					/>
					<div className="w-[60%] sm:w-[45%] xl:w-[30%] absolute top-[35%] sm:top-[35%] xl:top-[45%] flex flex-col justify-center">
						<Password
							field="password"
							save={updatePasswords}
							title="New Password"
						/>

						<Password
							field="confirm"
							save={updatePasswords}
							title="Confirm Password"
						/>

						<Button
							className="w-fit mx-auto h-12 sm:h-12  mt-16 object-cover transition-transform transform hover:scale-110 "
							onClick={resetPassword}
						>
							<img
								src={confirm}
								alt="Original Image"
								className="w-full h-full"
							/>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
