import Phaser from "phaser";
import { TutorialScene } from "../scenes/tutorial";
import { LoadingScene } from "../scenes/loading";
import { ComputerScene } from "../scenes/computer";
import { WaterMorseScene } from "../scenes/waterMorse";
import { TrapsScene } from "../scenes/traps";
import { SoundPuzzle } from "../scenes/soundPuzzle";
import { LobbyScene } from "../scenes/lobby";
import { StegScene } from "../scenes/steg";
import { EmojiScene } from "../scenes/emoji";
import { InterceptorXScene } from "../scenes/InterceptorX";
import { CipherScene } from "../scenes/cipher";

export const phaserConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	backgroundColor: "black",
	scale: {
		mode: Phaser.Scale.ScaleModes.RESIZE,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	physics: {
		default: "arcade",
		arcade: {
			// debug: true,
			gravity: { y: 0 },
		},
	},
	input: {
		keyboard: true,
	},
	scene: [
		LoadingScene,
		TrapsScene,
		TutorialScene,
		ComputerScene,
		WaterMorseScene,
		LobbyScene,
		StegScene,
		EmojiScene,
		InterceptorXScene,
		CipherScene,
		SoundPuzzle,
	],
};
