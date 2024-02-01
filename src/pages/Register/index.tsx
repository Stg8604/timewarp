import { useAppDispatch } from "@stores/hooks";
import {
	TOAST_ERROR,
	TOAST_INFO,
	TOAST_SUCCESS,
	isEmailValid,
} from "@utils/index";
import bgcard from "/assets/regcard.svg";
import timewarp from "/assets/timewarpbg.svg";
import earth from "/assets/icon.png";
import bgcardextended from "/assets/regcardextended.svg";
import { registerUser } from "@slices/index";
import { Toast } from "@components/";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./styles.module.css";
import { Regprops } from "@components/";

const Register = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const nav = () => {
		navigate("/login");
	};

	const [registerCredentials, setRegisterCredentials] = useState<IRegister>({
		username: "",
		email: "",
		password: "",
		confirm: "",
		token: "",
		college: "",
		phonenumber: "",
	});
	const updateregisterCredentials = (type: string, value: string) => {
		const updateregisterCredentials: IRegister = { ...registerCredentials };
		updateregisterCredentials[type] = value.trim();
		setRegisterCredentials(updateregisterCredentials);
	};

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
		} else if (registerCredentials.phonenumber.toString().length != 10) {
			Toast(TOAST_ERROR, "Phone Number inaccurate");
		} else {
			const res = await dispatch(
				registerUser({
					username: registerCredentials.username,
					email: registerCredentials.email,
					password: registerCredentials.password,
					token: "",
					college: registerCredentials.college,
					phonenumber: registerCredentials.phonenumber,
				})
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
			<div className={styles.your_class}>
				<div className="relative h-full flex flex-col items-center">
					<img
						src={timewarp}
						className="w-[80%] sm:w-[65%] absolute top-[6%] sm:top-[2%] xl:top-[0%] z-10"
					/>

					<img
						src={bgcardextended}
						className=" w-[100%] absolute top-[14%] sm:invisible"
					/>
					<img
						src={bgcard}
						className="h-[90%] xl:h-[90%] absolute top-[20%] sm:top-[8%] lg:top-[8%] invisible sm:visible"
					/>
					<img
						src={earth}
						className="w-[35%] md:w-[16%] xl:w-[16%] absolute top-[4%] sm:top-[2%] xl:top-[0%] z-5"
					/>
					<div className="w-[65%] pl-8 pr-8 sm:w-[50%] md:w-[45%] xl:w-[30%] absolute top-[22%] sm:top-[20%] xl:top-[30%] flex flex-col justify-center line-clamp-2">
						<Regprops
							input={updateregisterCredentials}
							onButtonClick={emailRegisterHandler}
							onButtonClick2={nav}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
