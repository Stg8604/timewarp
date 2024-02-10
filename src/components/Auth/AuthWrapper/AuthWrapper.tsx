import { userSelector } from "@slices/index";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Loader, Toast } from "@components/index";
import { TOAST_SUCCESS } from "@utils/ToastStatus";

const AuthWrapper: FC<AuthProps> = ({ children }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const { loggedIn, isUserFetching } = useSelector(userSelector);
	useEffect(() => {
		if (!isUserFetching) {
			if (!loggedIn) {
				setIsLoading(false);
			} else {
				Toast(TOAST_SUCCESS, "Welcome Back!");
				navigate("/home");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isLoading ? <Loader /> : <>{children}</>;
};

export default AuthWrapper;
