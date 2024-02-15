import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "@stores/hooks";
import { IonPhaser } from "@ion-phaser/react";
import { phaserConfig } from "@phaserGame/game";
import {
	LevelSelector,
	BackBtn,
	TextBox,
	Leaderboard,
	Inventory,
	RedoTutorial,
} from "@components/index";

const loreText = `You are now standing at the feet of an ancient coder from a distant era. Legends whisper that he crafted a Code Editor so powerful that it allows him to manipulate the very fabric of reality. It taps into the fundamental coding principles that exist in every era, making it the key to unlocking the mysteries of each puzzle. Now, the weapon has been passed on to you, and with it comes the heavy responsibility. 

Press E to open your mighty weapon and solve every puzzle to save Time itself. Godspeed, young traveller, and welcome to Timewarp.`;

const Lobby = ({ switchScene }: { switchScene: (key: string) => void }) => {
	const lobby = useAppSelector((state) => state.lobby);
	const [initialize, setInitialize] = useState(false);
	const player = useAppSelector((state) => state.player);
	const gameRef = useRef(null);

	useEffect(() => {
		setInitialize(true);
	}, []);

	return (
		<>
			<BackBtn />
			{player.inventoryOpen && <Inventory />}
			{lobby.isPastPortalOpen && (
				<LevelSelector
					title1="Nature's Sound"
					title2="Mysterious Music"
					currentTime="past"
					switchScene={switchScene}
				/>
			)}
			{lobby.isPresentPortalOpen && (
				<LevelSelector
					title1="Cipher"
					title2="Cryptic Paintings"
					title3="Turret Defence"
					currentTime="present"
					switchScene={switchScene}
				/>
			)}
			{lobby.isFuturePortalOpen && (
				<LevelSelector
					title1="Email"
					title2="He Who Emotes"
					title3="InterceptorX"
					currentTime="future"
					switchScene={switchScene}
				/>
			)}
			{lobby.isTutorialOpen && <RedoTutorial switchScene={switchScene} />}
			{lobby.isLoreOpen && <TextBox text={loreText} type="lore" />}
			{lobby.isLeaderboardOpen && <Leaderboard />}

			<IonPhaser
				ref={gameRef}
				game={phaserConfig}
				initialize={initialize}
				placeholder={"Lobby"}
			/>
		</>
	);
};

export default Lobby;
