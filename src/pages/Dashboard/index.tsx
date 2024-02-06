import { useCookies } from "react-cookie";
import {
	checkStegPasskey,
	getStegImages,
	initStegPuzzle,
	logoutUser,
} from "@slices/index";
import { useNavigate } from "react-router-dom";
import { Toast } from "@components/index";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { setScene } from "@slices/Scene/scene";
import { useEffect } from "react";
import { status } from "../../slices/Status/statusActions";
import { TOAST_ERROR } from "@utils/ToastStatus";

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
			Toast(TOAST_ERROR, "Oops! There seems to be an issue.");
		}
	};

	useEffect(() => {
		(async () => {
			dispatch(status());
		})();
	}, []);
	const switchScene = () => {
		navigate("/game");
		localStorage.setItem("scene", "Lobby");
		dispatch(setScene("Lobby" + "Scene"));
		window.location.reload();
	};

	return (
		<>
			<div className="absolute z-50 flex flex-col text-center">
				<h1>Dashboard</h1>
				<button onClick={switchScene}>Lobby</button>
				<button
					onClick={() => {
						navigate("/game");
						window.location.reload();
					}}
				>
					Play
				</button>
				{/* <button
					onClick={() => {
						dispatch(setScene("ComputerScene"));
						navigate("/comp-game");
					}}
				>
					Computer Game
				</button> */}
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
