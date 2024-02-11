import { useCookies } from "react-cookie";
import { useAppDispatch } from "@stores/hooks";
import cta from "/assets/login.svg";
import bgcard from "/assets/bgcard.svg";
import timewarp from "/assets/timewarpbg.svg";
import earth from "/assets/icon.png";
import authsignin from "/assets/authsignin.svg";
import bgcardextended from "/assets/bgcardextended.svg";
import { BACKEND_URL } from "@config/config";
import {
	Username,
	Password,
	// AuthWrapper,
	Toast,
	Loader,
} from "@components/index";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import {
	TOAST_ERROR,
	// TOAST_INFO,
	TOAST_SUCCESS,
	isEmailValid,
	// theme,
} from "@utils/index";
import { loginUser, userSelector } from "@slices/index";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { Text } from "@mantine/core";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
const Login = () => {
	const [_cookies, setCookie] = useCookies(["jwt"]);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loginCredentials, setLoginCredentials] = useState<ILogin>({
		email: "",
		password: "",
		token: "",
		type: "",
	});
	const [_token, setToken] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const { loggedIn, isUserFetching } = useSelector(userSelector);

	useEffect(() => {
		if (!isUserFetching) {
			if (!loggedIn) {
				setIsLoading(false);
			} else {
				Toast(TOAST_SUCCESS, "Welcome Back!");
				navigate("/dashboard");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn, isUserFetching]);

	const updateCredentials = (type: string, value: string) => {
		const updateCredentials: ILogin = { ...loginCredentials };
		updateCredentials[type] = value.trim();
		setLoginCredentials(updateCredentials);
	};

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
				})
			);
			if (loginUser.fulfilled.match(res)) {
				const jwtToken = res.payload;
				setCookie("jwt", jwtToken, {
					path: "/",
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
				});
				Toast(TOAST_SUCCESS, "Successfully Logged In!");
				navigate("/dashboard");
			} else {
				if (res.payload?.message) Toast(TOAST_ERROR, res.payload.message);
				else Toast(TOAST_ERROR, "Try again after sometime");
			}
		}
	};
	const onVerify = useCallback((token: string) => {
		setToken(token);
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<>
			<>
				<div className={styles.your_class}>
					<div className="relative h-full flex flex-col items-center">
						<img
							src={timewarp}
							className="w-[80%] sm:w-[65%] absolute top-[4%] sm:top-[2%] xl:top-[0%] z-10"
						/>
						<img
							src={bgcardextended}
							className="w-[100%] absolute top-[10%] sm:invisible"
						/>
						<img
							src={bgcard}
							className="h-[90%] xl:h-[90%] absolute top-[20%] sm:top-[8%] lg:top-[8%] invisible sm:visible"
						/>
						<img
							src={earth}
							className="w-[40%] md:w-[16%] xl:w-[16%] absolute top-[2%] sm:top-[2%] xl:top-[0%] z-5"
						/>
						<div className="w-[55%] sm:w-[50%] xl:w-[30%] absolute top-[22%] sm:top-[22%] xl:top-[30%] flex flex-col justify-center">
							<Username field="email" save={updateCredentials} title="EMAIL" />

							<Password
								field="password"
								save={updateCredentials}
								title="PASSWORD"
							/>
							<Button
								className="w-fit ml-auto"
								styles={(theme) => ({
									root: {
										fontSize: theme.fontSizes.md,
										backgroundColor: theme.colors.paleYellow[0],
										fontFamily: "pixelifySans",
										color: theme.colors.dayZerobrown[0],
										textAlign: "right",
									},
								})}
								onClick={() => navigate("/forgot-password")}
							>
								forgot password?
							</Button>

							<Button
								className="w-fit mx-auto h-10  sm:h-14 mt-2 object-cover transition-transform transform hover:scale-110 "
								onClick={emailLoginHandler}
							>
								<img src={cta} alt="Original Image" className="w-full h-full" />
							</Button>
							<div className="w-[100%] flex flex-row justify-start mt-4">
								<hr className="w-[50%] mt-8"></hr>
								<Text
									className="pl-4 pr-4"
									styles={(theme) => ({
										root: {
											fontSize: theme.fontSizes.xl,
											backgroundColor: theme.colors.paleYellow[0],
											fontFamily: "pixelifySans",
											color: theme.colors.dayZerobrown[0],
										},
									})}
								>
									or
								</Text>
								<hr className="w-[50%] mt-8"></hr>
							</div>
							<GoogleReCaptcha onVerify={onVerify} />
							<a
								className="w-fit mx-auto h-12 sm:h-14 xl:h-14  object-cover transition-transform transform hover:scale-110"
								rel="noopener noreferrer"
								href={BACKEND_URL + "oauth2/authorization/google"}
							>
								<img src={authsignin} className="w-full h-full" />
							</a>
							<Button
								className="flex justify-center sm:mx-auto  mt-2"
								onClick={() => navigate("/register")}
							>
								<Text
									className=""
									styles={(theme) => ({
										root: {
											fontSize: theme.fontSizes.md,
											backgroundColor: theme.colors.paleYellow[0],
											fontFamily: "pixelifySans",
											color: theme.colors.blue[0],
										},
									})}
								>
									Register here!
								</Text>
							</Button>
						</div>
					</div>
				</div>
			</>
		</>
	);
};

export default Login;
