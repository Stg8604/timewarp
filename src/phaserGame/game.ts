import Phaser from "phaser";
import { TutorialScene } from "../scenes/tutorial";
import { LoadingScene } from "../scenes/loading";
import { ComputerScene } from "../scenes/computer";
import { WaterMorseScene } from "../scenes/waterMorse";
import { SoundPuzzle } from "../scenes/soundPuzzle";

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
		SoundPuzzle,
		TutorialScene,
		ComputerScene,
		WaterMorseScene,
	],
};
