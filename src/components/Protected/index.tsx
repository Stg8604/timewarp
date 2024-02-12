import { Loader, Toast } from "@components/index";
import { getUser, userSelector } from "@slices/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TOAST_ERROR, TOAST_INFO } from "@utils/ToastStatus";
import { useAppDispatch } from "@stores/hooks";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Protected = (props: any) => {
	const navigate = useNavigate();
	const { children } = props;
	const [isLoading, setIsLoading] = useState(true);
	const { loggedIn, isUserFetching } = useSelector(userSelector);

	const dispatch = useAppDispatch();
	useEffect(() => {
		(async () => {
			await dispatch(getUser())
				.then((res) => {
					if (res.type === "user/getUser/rejected") {
						// Toast(TOAST_INFO, "You are not logged in");
						navigate("/login");
					}
				})
				.catch((e) => {
					Toast(TOAST_ERROR, "You are not logged in");
				});
		})();
		setIsLoading(false);
	}, [dispatch]);

	// useEffect(() => {
	// 	if (!isUserFetching) {
	// 		if (loggedIn) {
	// 			setIsLoading(false);
	// 		} else {
	// 			Toast(TOAST_ERROR, "Oops! You are not signed in!");
	// 			setIsLoading(false);
	// 		}
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	return isLoading ? <Loader /> : children;
};

export default Protected;
