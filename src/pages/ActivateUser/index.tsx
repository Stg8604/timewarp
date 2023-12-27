import { useAppDispatch } from "@stores/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Toast } from "@components/index";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";
import { activateUser } from "../../slices";

const ActivateUser = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const userId = new URLSearchParams(location.search).get("userid");
		const token = new URLSearchParams(location.search).get("token");

		console.log(userId, token);

		const activate = async ({ userId, token }: ActivateUserParams) => {
			if (userId == null || token == null) {
				Toast(TOAST_ERROR, "There seems to be an issue");
				navigate("/");
				return;
			}
			const resultActivate = await dispatch(
				activateUser({
					userId: userId,
					token: token,
				})
			);
			if (activateUser.fulfilled.match(resultActivate)) {
				Toast(TOAST_SUCCESS, "Email Successfully Verified!");
				navigate("/");
			} else {
				if (resultActivate.error) {
					navigate("/");
					Toast(TOAST_ERROR, resultActivate.error.message);
				} else {
					navigate("/");
					Toast(TOAST_ERROR, "There seems to be an issue.");
				}
			}
		};

		activate({ userId, token });
	}, []);

	return <p>Loading...</p>;
};

export default ActivateUser;
