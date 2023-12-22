import Phaser from "phaser";
import { GameScene } from "../scenes/hello";

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  // parent: 'phaser-container',
  backgroundColor: "black",
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [GameScene],
};

// export default new Phaser.Game(config)
