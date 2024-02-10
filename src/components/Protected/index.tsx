import { Loader, Toast } from "@components/index";
import { userSelector } from "@slices/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TOAST_ERROR } from "@utils/ToastStatus";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Protected = (props: any) => {
	const navigate = useNavigate();
	const { children } = props;
	const [isLoading, setIsLoading] = useState(true);
	const { loggedIn, isUserFetching } = useSelector(userSelector);
	useEffect(() => {
		if (!isUserFetching) {
			if (loggedIn) {
				setIsLoading(false);
			} else {
				Toast(TOAST_ERROR, "Oops! You are not signed in!");
				setIsLoading(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return isLoading ? <Loader /> : children;
};

export default Protected;
