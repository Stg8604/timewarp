import { useCookies } from "react-cookie";
import { logoutUser } from "@slices/index";
import { useNavigate } from "react-router-dom";
import { Toast } from "@components/index";
import { useAppDispatch } from "@stores/hooks";
import { setScene } from "@slices/Scene/scene";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [cookie, setCookie, removeCookie] = useCookies();
	const handleLogOut = async () => {
		const logoutDispatch = await dispatch(logoutUser());
		if (logoutUser.fulfilled.match(logoutDispatch)) {
			removeCookie("jwt", { path: "/" });
			navigate("/");
		} else {
			Toast("toastRed", "Oops! There seems to be an issue.");
		}
	};

	return (
		<>
			<div className="absolute z-50 flex flex-col text-center">
				<h1>Dashboard</h1>
				<button
					onClick={() => {
						navigate("/game");
					}}
				>
					Play
				</button>
				<button
					onClick={() => {
						dispatch(setScene("GameScene"));
						navigate("/redux");
					}}
				>
					Redux Test
				</button>
				<button onClick={handleLogOut}>Logout</button>
			</div>
		</>
	);
};

export default Dashboard;
