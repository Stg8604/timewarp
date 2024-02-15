import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

import { Loader, Toast } from "@components/index";
import { TOAST_ERROR } from "@utils/ToastStatus";

const Oauth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [_, setCookie] = useCookies(["jwt"]);

	useEffect(() => {
		const jwt = new URLSearchParams(location.search).get("jwt");
		const error = new URLSearchParams(location.search).get("error");
		if (error) {
			Toast(TOAST_ERROR, error);
			navigate("/");
		} else if (jwt == null || jwt == "") {
			Toast(TOAST_ERROR, "There seems to be an issue.");
			navigate("/");
		} else {
			setCookie("jwt", jwt, {
				path: "/",
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
			});
			navigate("/");
		}
	}, []);

	return <Loader />;
};

export default Oauth;
