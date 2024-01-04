import { CustomAxios, TOAST_ERROR } from "@utils/index";
import { useEffect, useState } from "react";
import { Loader, Toast } from "@components/index";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { status } from "@slices/Player/PlayerActions";
import { useNavigate } from "react-router-dom";
import { setScene } from "@slices/Scene/scene";
import Tutorial from "../Tutorial";
import Lobby from "../Lobby";

const PhasorRouter = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [map, setMap] = useState<"Lobby" | "Tutorial" | "Fetching">("Fetching");
	const playerDetails = useAppSelector((state) => state.player);

	useEffect(() => {
		(async () => {
			const getStatus = await dispatch(status());
			if (status.fulfilled.match(getStatus)) {
				setIsLoading(false);
				if (playerDetails.tutorialCompleted) {
					setMap("Lobby");
					// dispatch(setScene("Lobby"));
				} else {
					setMap("Tutorial");
					dispatch(setScene("TutorialScene"));
				}
			} else {
				navigate("/dashboard");
				Toast(TOAST_ERROR, "Try again later! There seems to be an issue.");
			}
		})();
	}, [dispatch, navigate, playerDetails.tutorialCompleted]);

	return (
		<> {isLoading ? <Loader /> : map === "Lobby" ? <Lobby /> : <Tutorial />} </>
	);
};

export default PhasorRouter;
