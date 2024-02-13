import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { BackBtn, ReactPy } from "@components/index";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import { InfoBox } from "@components/index";
import {
	toggleFireInfo,
	toggleGodInfo,
	toggleMessengerInfo,
	updateRevEngParams,
} from "@slices/cipher/cipher";
import RevEngModule from "@modules/RevEngModule.txt";
import { checkCipher, cipherStatus } from "@slices/cipher/cipherAction";
import { Toast } from "@components/index";
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from "@utils/ToastStatus";
import { togglePortalKey } from "@slices/cipher/cipher";
import { PasskeyBox } from "@components/index";

const text_1 = "Hello, traveler. Please, talk to me";
const text_2 =
	"It seems there is a pattern he follows; try communicating with him using letters";

const text_3 = "Clever Ants Eagerly Search Exotic Resources";

const Cipher = ({ switchScene }: { switchScene: (key: string) => void }) => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const [passkey, setPasskey] = useState("");
	const cipher = useAppSelector((state) => state.cipher);
	const config = useAppSelector((state) => state.editor);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setInitialize(true);
		dispatch(cipherStatus());
	}, []);

	const seederParams = [
		{
			moduleName: "ReverseEng",
			className: "ReverseEng",
			params: cipher.params,
			file: RevEngModule,
			dispatch: updateRevEngParams,
		},
	];

	const defaultInput = `# Useful Object - ReverseEng \n# print(ReverseEng)\n# use ReverseEng.talk("some text")`;

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

	const handleSubmit = async () => {
		const response = await dispatch(
			checkCipher({
				solution: passkey,
			})
		);

		if (response.type === "cipher/checkCipher/fulfilled") {
			dispatch(togglePortalKey());
			if (response.payload && response.payload.correct) {
				Toast(TOAST_SUCCESS, response.payload?.message);
				switchScene("Lobby");
			} else {
				Toast(TOAST_INFO, response.payload?.message);
			}
		} else if (response.type === "cipher/checkCipher/rejected") {
			dispatch(togglePortalKey());
			Toast(TOAST_ERROR, response.payload?.message);
		}

		setPasskey("");
	};

	const handleMessengerClose = () => {
		dispatch(toggleMessengerInfo());
	};

	const handleGodClose = () => {
		dispatch(toggleGodInfo());
	};

	const handlefireClose = () => {
		dispatch(toggleFireInfo());
	};

	return (
		<>
			<BackBtn />

			{cipher.isMessengerInfoo && (
				<InfoBox text={text_1} onClose={handleMessengerClose} />
			)}

			{cipher.isFire && <InfoBox text={text_3} onClose={handlefireClose} />}

			{cipher.isPortalKeyOpen && (
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

			{cipher.isGodInfo && <InfoBox text={text_2} onClose={handleGodClose} />}

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
				placeholder={"Cipher Game"}
			/>
		</>
	);
};

export default Cipher;
