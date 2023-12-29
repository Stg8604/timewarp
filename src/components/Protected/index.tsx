import { Loader, Toast } from "@components/index";
import { userSelector } from "../../slices";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Protected = (props: any) => {
	const navigate = useNavigate();
	const { children } = props;
	const [isLoading, setIsLoading] = useState(true);
	const { loggedIn, isUserFetching } = useSelector(userSelector);
	useEffect(() => {
		console.log("here");
		if (!isUserFetching) {
			console.log("here1");
			if (loggedIn) {
				console.log("here2");
				setIsLoading(false);
			} else {
				console.log("here3");
				Toast("toastRed", "Oops! You are not signed in!");
				navigate("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn, isUserFetching]);

	// return <Loader />;
	return isLoading ? <Loader /> : children;
};

export default Protected;
