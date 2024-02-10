import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "@stores/hooks";
import { IonPhaser } from "@ion-phaser/react";
import { phaserConfig } from "@phaserGame/game";
import {
	LevelSelector,
	BackBtn,
	TextBox,
	Leaderboard,
} from "@components/index";

const loreText = "lore blah blah";

const Lobby = ({ switchScene }: { switchScene: (key: string) => void }) => {
	const lobby = useAppSelector((state) => state.lobby);
	const [initialize, setInitialize] = useState(false);
	const gameRef = useRef(null);

	useEffect(() => {
		setInitialize(true);
	}, []);

	return (
		<>
			<BackBtn />

			{lobby.isPastPortalOpen && (
				<LevelSelector
					title1="WaterMorse"
					title2="SoundPuzzle"
					title3="Past3"
					currentTime="past"
					switchScene={switchScene}
				/>
			)}
			{lobby.isPresentPortalOpen && (
				<LevelSelector
					title1="Cipher"
					title2="Steg"
					title3="Present3"
					currentTime="present"
					switchScene={switchScene}
				/>
			)}
			{lobby.isFuturePortalOpen && (
				<LevelSelector
					title1="Computer"
					title2="Emoji"
					title3="InterceptorX"
					currentTime="future"
					switchScene={switchScene}
				/>
			)}
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
