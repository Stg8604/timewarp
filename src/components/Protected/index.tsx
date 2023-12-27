/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props: any) => {
	const { children } = props;
	const navigate = useNavigate();

	const isLoggedIn = false;

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn, navigate]);

	if (isLoggedIn) {
		return children;
	}
};
export default Protected;
