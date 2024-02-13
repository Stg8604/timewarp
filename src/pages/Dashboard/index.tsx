import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "@components/index";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { status } from "@slices/Status/statusActions";
import { setScene } from "@slices/Scene/scene";
import { logoutUser } from "@slices/index";
import { TOAST_ERROR } from "@utils/ToastStatus";
import { Center, Flex } from "@mantine/core";
import { url } from "inspector";
import { relative } from "path";
import Base from "./base";
import Card from "./card";
import Gallery from "./gallery";
import CardButton from "./cardButton";
import { store } from "@stores/index";
import { Landing } from "..";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [_, setCookie, removeCookie] = useCookies();
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const switchScene = () => {
		navigate("/game");
		localStorage.setItem("scene", "Lobby");
		dispatch(setScene("Lobby" + "Scene"));
		window.location.reload();
	};

	const handleClick = () => {
		window.open("https://docs-timewarp.netlify.app", "_blank");
	};

	const handleClick1 = () => {
		window.open("https://discord.com/invite/GUzVRKUHgY");
	};

	const handleGame = () => {
		navigate("/game");
		window.location.reload();
	};

	const handleLanding = () => {
		navigate("/");
		window.location.reload();
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<>
			<style>
				{`
                    .grecaptcha-badge {
                        display:"none"
                    }
                `}
			</style>
			<div
				className="bg-[url('assets/Dashboard/background.svg')]"
				style={{
					display: "flex",
					alignItems: "center",
					width: "100vw",
					height: "100vh",
					maxWidth: "100vw",
					maxHeight: "100vh",
					backgroundImage: "assets/Dashboard/background.svg",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						height: "auto",
					}}
				>
					<CardButton text="Landing" onClick={handleLanding}></CardButton>
					<CardButton text="Discord" onClick={handleClick1}></CardButton>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						height: "auto",
						background: "#333C57",
						position: "relative",
					}}
				>
					<div
						style={{ display: "flex", justifyContent: "center", width: "100%" }}
					>
						<Base></Base>
					</div>
					<div
						style={{
							width: "100%",
							position: "absolute",
							top: "30%",
							left: "-25%",
							scale: "1.2",
						}}
					>
						<Card onClick={switchScene}></Card>
					</div>
					<div
						style={{
							width: "100%",
							position: "absolute",
							top: "33.5%",
							left: "29%",
							scale: "1.2",
						}}
					>
						<Gallery onClick={handleGame}></Gallery>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						height: "auto",
					}}
				>
					<CardButton text="LogOut" onClick={handleLogOut}></CardButton>
					<CardButton text="Docs" onClick={handleClick}></CardButton>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
