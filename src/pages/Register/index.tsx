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
import { registerUser } from "../../slices";
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
	const [isFirstDivVisible, setFirstDivVisibility] = useState(true);

	const [registerCredentials, setRegisterCredentials] = useState<IRegister>({
		username: "",
		email: "",
		password: "",
		confirm: "",
		token: "",
		college: "",
		phonenumber: 0,
		degree: "",
		year: 0,
	});
	const updateregisterCredentials = (type: string, value: string) => {
		const updateregisterCredentials: IRegister = { ...registerCredentials };
		updateregisterCredentials[type] = value.trim();
		setRegisterCredentials(updateregisterCredentials);
	};

	const toggleVisibility = async () => {
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
			setFirstDivVisibility(!isFirstDivVisible);
		}
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
					degree: registerCredentials.degree,
					year: registerCredentials.year,
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
				<div className="h-full flex flex-col items-center">
					<img
						src={timewarp}
						className="absolute top-8 sm:top-8 xl:top-4 z-10"
					/>
					<img
						src={bgcardextended}
						className=" absolute top-[14%] sm:invisible"
					/>
					<img
						src={bgcard}
						className="h-[75%] xl:h[85%] absolute top-[20%] sm:top-[23%] lg:top-[20%] invisible sm:visible"
					/>
					<img
						src={earth}
						className="w-[45%] sm:w-[20%] absolute top-0 sm:top-16 xl:top-4"
					/>
					<div className="w-[80%] pl-8 pr-8 sm:w-[50%] xl:w-[37%] absolute top-[22%] sm:top-[35%] xl:top-[40%] flex flex-col justify-center">
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
