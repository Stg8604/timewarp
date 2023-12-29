import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { logoutUser, userSelector } from "../../slices";
import { useNavigate } from "react-router-dom";
import { Toast } from "@components/index";
import { useAppDispatch } from "@stores/hooks";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [cookie, setCookie, removeCookie] = useCookies();
	const handleLogOut = async () => {
		const logoutDispatch = await dispatch(logoutUser());
		if (logoutUser.fulfilled.match(logoutDispatch)) {
			removeCookie("jwt", { path: "/" });
			navigate("/login");
		} else {
			Toast("toastRed", "Oops! There seems to be an issue.");
		}
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<button onClick={handleLogOut}>Logout</button>
		</div>
	);
};

export default Dashboard;
