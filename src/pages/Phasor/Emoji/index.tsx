import { useRef, useState, useEffect } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@stores/hooks";
import { toggleEditor } from "@slices/index";
import { phaserConfig } from "@phaserGame/game";
import {
	BackBtn,
	ReactPy,
	PasskeyBox,
	InfoBox,
	Inventory,
	Toast,
	ClueBox,
	MainPortal,
} from "@components/index";
import EmojiModule from "@modules/EmojiModule.txt";
import {
	toggleHintBox,
	toggleMainPortalKey,
	toggleProp1,
	toggleProp2,
	toggleProp3,
	toggleProp4,
	updateEmojiParams,
	togglePortalKey,
} from "@slices/emoji/emoji";
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from "@utils/index";
import { checkEmojiSolution, emojiStatus } from "@slices/emoji/emojiAction";

const Emoji = ({ switchScene }: { switchScene: (key: string) => void }) => {
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);
	const [passkey, setPasskey] = useState("");
	const emoji = useAppSelector((state) => state.emoji);
	const config = useAppSelector((state) => state.editor);
	const player = useAppSelector((state) => state.player);
	const computer = useAppSelector((state) => state.computer);
	const dispatch = useAppDispatch();

	const seederParams = [
		{
			moduleName: "emoji",
			className: "Emoji",
			params: emoji.params,
			file: EmojiModule,
			dispatch: updateEmojiParams,
		},
	];
	const defaultInput = `#Available Class - Emoji\n#Pass Emoji.inputKey as a parameter to the function to get the output`;

	useEffect(() => {
		setInitialize(true);
		dispatch(emojiStatus());
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

	//temporary, got this from mst
	const handleSubmit = async () => {
		const response = await dispatch(
			checkEmojiSolution({
				solution: passkey,
			})
		);

		if (response.type === "emoji/checkEmojiSolution/fulfilled") {
			dispatch(togglePortalKey());
			if (response.payload && response.payload.correct) {
				Toast(TOAST_SUCCESS, response.payload?.message);
				switchScene("Lobby");
			} else {
				Toast(TOAST_INFO, response.payload?.message);
			}
		} else if (response.type === "emoji/checkEmojiSolution/rejected") {
			dispatch(togglePortalKey());
			Toast(TOAST_ERROR, response.payload?.message);
		}
		setPasskey("");
	};

	const str1: string = `
	↪️ a ▶️ b 🍇
		😀 🔤a is greater than b🔤❗️
  	🍉
  	🙅 🍇
		😀 🔤a is not greater than b🔤❗️
  	🍉`;
	const str2: string = `
	🍡 iterable❗️ ➡️ iterator
	🔁 🔽 iterator❓️ 🍇
  		🔽 iterator❗️ ➡️ variable
  		💭 The provided block is executed here
	🍉
	`;
	const str3: string = `
0 ➡️ 🖍🆕i
i ⬅️➕ 1
i ⬅️➕ 5
i ⬅️➗ 3`;

	const str4: string = `
	🏁 ➡️ 🔢 🍇
   		💭 Get things up and running here...

  	↩️ 0  💭 Return a code here.
	🍉
	`;
	const handleClose = () => {
		dispatch(toggleMainPortalKey());
	};
	const handleClose2 = () => {
		dispatch(toggleProp1());
	};
	const handleClose3 = () => {
		dispatch(toggleProp2());
	};
	const handleClose4 = () => {
		dispatch(toggleProp3());
	};
	const handleClose5 = () => {
		dispatch(toggleProp4());
	};
	const handleClose6 = () => {
		dispatch(togglePortalKey());
	};

	return (
		<>
			<BackBtn />
			{player.inventoryOpen && <Inventory />}
			{emoji.isHintBoxOpen && (
				<InfoBox
					text="Strongly typed, the future has found a way to imitate the work of laces in a powerful manner. A future where our emo-tions handle the absence of values, generics, and closures. Open the editor to write down your own future."
					onClose={() => {
						dispatch(toggleHintBox());
					}}
				/>
			)}
			{!emoji.isHintBoxOpen && (
				<div
					onClick={() => {
						dispatch(toggleHintBox());
					}}
					className="absolute hover:scale-105 bg-tutorialUiBlue text-white cursor-pointer  flex justify-center items-center top-[65px] left-5 w-[130px] px-4 py-1 font-pixelifySans rounded-full"
				>
					Hint
				</div>
			)}
			{emoji.isMainPortalOpen && <MainPortal handleClose={handleClose} />}
			{emoji.isProp1Open && (
				<ClueBox
					ClueHeading="If-Else Statement"
					ClueText={str1}
					handleClose={handleClose2}
				/>
			)}
			{emoji.isProp2Open && (
				<ClueBox
					ClueHeading="Iteration"
					ClueText={str2}
					handleClose={handleClose3}
				/>
			)}
			{emoji.isProp3Open && (
				<ClueBox
					ClueHeading="Operation"
					ClueText={str3}
					handleClose={handleClose4}
				/>
			)}
			{emoji.isProp4Open && (
				<ClueBox
					ClueHeading="Getting Started"
					ClueText={str4}
					handleClose={handleClose5}
				/>
			)}
			{emoji.isPortalKeyOpen && (
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
				placeholder={"Emoji Game"}
			/>
		</>
	);
};

export default Emoji;
