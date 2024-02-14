import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import { ReactPy } from "@components/index";
import HintBox from "../../../components/InterceptorX/HintBox";
import PasskeyBox from "../../../components/InterceptorX/PasskeyBox";
import { BackBtn, Inventory } from "@components/index";
import {
	toggleOpenBox,
	updateInterceptParams,
} from "@slices/InterceptorX/InterceptorX";
import {
	toggleDudeState,
	toggleInfo_1,
	toggleInfo_2,
	toggleInfo_3,
	toggleInfo_4,
	togglePortalKey,
} from "@slices/InterceptorX/InterceptorX";
import device from "@public/assets/interceptorX/device.jpg";
import device_1 from "@public/assets/interceptorX/device_1.jpg";
import device_2 from "@public/assets/interceptorX/device_2.jpg";
import device_3 from "@public/assets/interceptorX/device_3.jpg";
import device_4 from "@public/assets/interceptorX/device_4.jpg";
import InterceptModule from "@modules/InterceptModule.txt";
import {
	checkInterceptorFlag,
	interceptorStatus,
} from "@slices/InterceptorX/InterceptorXAction";
import { Toast } from "@components/index";
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from "@utils/ToastStatus";
import { useNavigate } from "react-router-dom";
import CompletionPopUp from "../../../components/CompletionPopUp";
import { setScene } from "@slices/Scene/scene";

const text_1 = "You collected 1st part";
const text_2 = "You collected 2nd part";
const text_3 = "You collected 3rd part";
const text_4 = "You collected 4th part";
const text_5 =
	"Hey Traveller, There are lot of signals flowing through this room. Maybe you can intercept using this tool.";

const InterceptorX = ({
	switchScene,
}: {
	switchScene: (key: string) => void;
}) => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const status = useAppSelector((state) => state.status);
	const [passkey, setPasskey] = useState("");
	const interceptorX = useAppSelector((state) => state.interceptor);
	const [score, setScore] = useState<number>(0);
	const [totalScore, setTotalScore] = useState<number>(0);
	const config = useAppSelector((state) => state.editor);
	const player = useAppSelector((state) => state.player);
	const dispatch = useAppDispatch();

	const defaultInput = `#Objects available\n# - Interceptor\nprint(Interceptor)\n#Interceptor.intercept(<optional ip string>)\nimport base64`;
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(interceptorStatus());
		setInitialize(true);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "e") {
				if (!config.isOpen) {
					dispatch(toggleEditor());
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch, config.isOpen]);
	const switchScene2 = () => {
		navigate("/game");
		localStorage.setItem("scene", "Lobby");
		dispatch(setScene("Lobby" + "Scene"));
		window.location.reload();
	};
	const handleSubmit = async () => {
		const response = await dispatch(
			checkInterceptorFlag({
				solution: passkey,
			})
		);

		if (response.type === "interceptor/checkInterceptorFlag/fulfilled") {
			dispatch(togglePortalKey());
			if (response.payload && response.payload.correct) {
				setScore(response.payload.score);
				setTotalScore(response.payload.totalScore);
				dispatch(toggleOpenBox());
			} else {
				Toast(TOAST_INFO, response.payload?.message);
			}
		} else if (response.type === "interceptor/checkInterceptorFlag/rejected") {
			dispatch(togglePortalKey());
			Toast(TOAST_ERROR, response.payload?.message);
		}

		setPasskey("");
	};

	const handleinfoClose_1 = () => {
		dispatch(toggleInfo_1());
	};

	const handleinfoClose_2 = () => {
		dispatch(toggleInfo_2());
	};

	const handleinfoClose_3 = () => {
		dispatch(toggleInfo_3());
	};

	const handleinfoClose_4 = () => {
		dispatch(toggleInfo_4());
	};

	const handleDudeClose = () => {
		dispatch(toggleDudeState());
	};

	const seederParams = [
		{
			moduleName: "interceptor",
			className: "Interceptor",
			params: interceptorX.params,
			file: InterceptModule,
			dispatch: updateInterceptParams,
		},
	];

	return (
		<>
			<BackBtn />
			{player.inventoryOpen && <Inventory />}
			<div
				style={{
					position: "absolute",
					left: "2rem",
					top: "4rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<img src={device} style={{ width: "2rem" }}></img>
				<p style={{ color: "white", fontFamily: "PixelifySans" }}>
					{interceptorX.noOfCollectedItem}/4
				</p>
			</div>
			<a
				onClick={() => navigate("/dashboard")}
				className="absolute hover:scale-105 bg-tutorialUiBlue text-white cursor-pointer top-5 right-5 px-4 py-1 font-pixelifySans rounded-full"
			>
				Main Menu
			</a>
			{interceptorX.isInfoOpen_1 && (
				<HintBox text={text_1} onClose={handleinfoClose_1} image={device_1} />
			)}
			{interceptorX.isInfoOpen_2 && (
				<HintBox text={text_2} onClose={handleinfoClose_2} image={device_2} />
			)}

			{interceptorX.isInfoOpen_3 && (
				<HintBox text={text_3} onClose={handleinfoClose_3} image={device_3} />
			)}

			{interceptorX.isInfoOpen_4 && (
				<HintBox text={text_4} onClose={handleinfoClose_4} image={device_4} />
			)}

			{interceptorX.isDude && (
				<HintBox text={text_5} onClose={handleDudeClose} image={device} />
			)}

			{interceptorX.isPortalKeyOpen && (
				<PasskeyBox
					passkey={passkey}
					setPasskey={setPasskey}
					handleSubmit={handleSubmit}
					handleClose={() => {
						dispatch(togglePortalKey());
						setPasskey("");
					}}
				/>
			)}
			{interceptorX.isOpenPopUp && (
				<CompletionPopUp
					title1={"Interceptor Puzzle"}
					title2={"Completed"}
					title3={":" + totalScore.toString()}
					title4={"(+" + score.toString() + ")"}
					onclick={switchScene2}
				/>
			)}

			{!initialize && (
				<div className="flex justify-center items-center h-[100vh]">
					<Loader size={100} />
				</div>
			)}

			<ReactPy seederParams={seederParams} defaultInput={defaultInput} />

			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"InterceptorX Game"}
			/>
		</>
	);
};

export default InterceptorX;
