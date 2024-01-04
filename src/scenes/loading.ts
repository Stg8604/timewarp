import { store } from "@stores/index";

export class LoadingScene extends Phaser.Scene {
	constructor() {
		super({ key: "LoadingScene" });
	}

	sceneName = store.getState().scene.sceneName;

	create() {
		if (this.sceneName !== "LoadingScene") {
			this.scene.start(this.sceneName);
		}
	}
}
