import { Toast } from "@components/index";
import { forgotPasswordUser } from "@slices/index";
import { useAppDispatch } from "@stores/hooks";
import { isEmailValid } from "@utils/index";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgcard from "/assets/bgcard.svg";
import timewarp from "/assets/timewarpbg.svg";
import earth from "/assets/icon.png";
import regnext from "/assets/regnext.svg";
import { Text } from "@mantine/core";
import { Username, AuthWrapper } from "@components/index";
import { Button } from "@mantine/core";
import styles from "./styles.module.css";
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
			})
		);
		if (forgotPasswordUser.fulfilled.match(resultForgotPassword)) {
			navigate("/");
			Toast(TOAST_SUCCESS, "Please Check Your Mail to Reset Your Password!");
		} else {
			Toast(
				TOAST_ERROR,
				resultForgotPassword.payload?.message || "Something went wrong"
			);
		}
	};

	const onVerify = useCallback((token: string) => {
		setToken(token);
	}, []);

	return (
		<>
			<AuthWrapper title="Forgot Password">
				<div className={styles.your_class}>
					<div className="h-full flex flex-col items-center">
						<img
							src={timewarp}
							className="w-[80%] sm:w-[65%] absolute top-[20%] sm:top-[2%] xl:top-[0%] z-10"
						/>
						<img
							src={bgcard}
							className="w-[95%] sm:w-[75%] xl:w-[40%] absolute top-[30%] sm:top-[15%] xl:top-[30%] "
						/>
						<img
							src={earth}
							className="w-[40%] md:w-[20%] xl:w-[20%] absolute top-[14%] sm:top-[2%] xl:top-[0%] z-5"
						/>
						<div className="w-[75%] sm:w-[45%] xl:w-[20%] absolute top-[37%] sm:top-[40%] xl:top-[45%] flex flex-col justify-center">
							<Text
								styles={(theme) => ({
									root: {
										fontSize: theme.fontSizes.md,
										backgroundColor: "transparent",
										fontFamily: "pixelifySans",
										color: theme.colors.dayZerobrown[0],
									},
								})}
							>
								Enter email for verification
							</Text>
							<Username field="email" save={emailUpdate} title="EMAIL" />
							<Button
								className="w-fit mx-auto h-12 sm:h-12 mt-4 sm:mt-8 object-cover transition-transform transform hover:scale-110 "
								onClick={forgotPassword}
							>
								<img
									src={regnext}
									alt="Original Image"
									className="w-full h-full"
								/>
							</Button>
						</div>
					</div>
				</div>
			</AuthWrapper>
		</>
	);
};

export default ForgotPassword;
