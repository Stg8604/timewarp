import { TOAST_ERROR } from "@utils/index";
import { useEffect, useState } from "react";
import { Loader, Toast } from "@components/index";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { status } from "@slices/Status/statusActions";
import { useNavigate } from "react-router-dom";
import { setScene } from "@slices/Scene/scene";
import Tutorial from "../Tutorial";
import Lobby from "../Lobby";
import Computer from "../Computer";
import SoundPuzzle from "../SoundPuzzle";
import WaterMorse from "../WaterMorse";
import Steg from "../Steg";
import Emoji from "../Emoji";
import InterceptorX from "../InterceptorX";
import Cipher from "../Cipher";

const PhasorRouter = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	let storedScene = localStorage.getItem("scene");
	if (storedScene == null) {
		localStorage.setItem("scene", "Lobby");
		storedScene = "Lobby";
	}
	const [map, setMap] = useState(storedScene);

	const playerDetails = useAppSelector((state) => state.player);

	useEffect(() => {
		(async () => {
			const getStatus = await dispatch(status());
			if (status.fulfilled.match(getStatus)) {
				if (playerDetails.tutorialCompleted) {
					// setMap("Computer");
					// dispatch(setScene("ComputerScene"));
					// setMap(storedScene!);
					// dispatch(setScene(storedScene + "Scene"));
				} else {
					if (map != "Fetching") {
						dispatch(setScene(map + "Scene"));
						// window.location.reload();
					}
					// setMap("InterceptorX");
					// dispatch(setScene("InterceptorXScene"));
				}
			} else {
				navigate("/dashboard");
				Toast(TOAST_ERROR, "Try again later! There seems to be an issue.");
			}
			setIsLoading(false);
		})();
	}, [playerDetails.tutorialCompleted]);

	const switchScene = (scene: string) => {
		setIsLoading(true);
		setMap(scene);
		// console.log("Switchting map");
		localStorage.setItem("scene", scene);
		dispatch(setScene(scene + "Scene"));
		setIsLoading(false);
		window.location.reload();
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : map === "Lobby" ? (
				<Lobby switchScene={switchScene} />
			) : map === "Computer" ? (
				<Computer switchScene={switchScene} />
			) : map === "SoundPuzzle" ? (
				<SoundPuzzle switchScene={switchScene} />
			) : map === "WaterMorse" ? (
				<WaterMorse switchScene={switchScene} />
			) : map === "Steg" ? (
				<Steg switchScene={switchScene} />
			) : map === "InterceptorX" ? (
				<InterceptorX switchScene={switchScene} />
			) : map === "Emoji" ? (
				<Emoji switchScene={switchScene} />
			) : map === "Cipher" ? (
				<Cipher switchScene={switchScene} />
			) : (
				<Tutorial switchScene={switchScene} />
			)}{" "}
		</>
	);
};

export default PhasorRouter;
