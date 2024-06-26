import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "@components/index";
import { useAppDispatch } from "@stores/hooks";
import { TOAST_ERROR, TOAST_SUCCESS } from "@utils/ToastStatus";
import { activateUser } from "@slices/index";

const ActivateUser = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const userId = new URLSearchParams(location.search).get("userid");
		const token = new URLSearchParams(location.search).get("token");

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <p>Loading...</p>;
};

export default ActivateUser;
