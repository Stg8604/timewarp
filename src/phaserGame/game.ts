import Phaser from "phaser";
import { TutorialScene } from "../scenes/tutorial";
import { GameScene } from "../scenes/hello";
import { LoadingScene } from "../scenes/loading";

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
			gravity: { y: 0 },
		},
	},
	scene: [LoadingScene, TutorialScene, GameScene],
};
