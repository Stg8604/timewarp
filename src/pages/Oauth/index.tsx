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
		console.log(jwt, error);
		if (error) {
			console.log("error");
			Toast(TOAST_ERROR, error);
			navigate("/");
		} else if (jwt == null || jwt == "") {
			console.log("errorjkbkj");

			Toast(TOAST_ERROR, "There seems to be an issue.");
			navigate("/");
		} else {
			console.log("erj");

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
