import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "@slices/index";
import { Toast, Loader } from "@components/index";

const Landing = () => {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { loggedIn, isUserFetching } = useSelector(userSelector);

	useEffect(() => {
		if (!isUserFetching) {
			if (!loggedIn) {
				setIsLoading(false);
			} else {
				Toast("toastGreen", "Welcome Back!");
				navigate("/dashboard");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn, isUserFetching]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="flex flex-col text-center">
					<span>Welcome to Time Warp!</span>
					<button onClick={() => navigate("/login")}>Login</button>
					<button onClick={() => navigate("/register")}>Register</button>
				</div>
			)}
		</>
	);
};

export default Landing;
