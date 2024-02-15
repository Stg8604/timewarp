import {
	getPuzzleCollectables,
	updatePuzzleCollectables,
} from "@slices/Collectables/collectablesAction";
import { store } from "@stores/index";
import { Toast } from "../components";
import { TOAST_SUCCESS } from "@utils/ToastStatus";

export class CommonCollectables extends Phaser.GameObjects.Group {
	constructor(
		scene: Phaser.Scene,
		locations: { x: number; y: number }[],
		scale: number,
		puzzleId: integer,
		player: Phaser.GameObjects.Sprite
	) {
		super(scene);

		store
			.dispatch(getPuzzleCollectables({ puzzleId: puzzleId }))
			.then((res) => {
				if (res.type === "collectables/getPuzzleCollectables/fulfilled") {
					const collectables = (res.payload as PuzzleCollectablesResponse)
						.collectables;
					collectables.forEach((collectable, index) => {
						const collectableSprite = this.scene.physics.add.sprite(
							locations[index].x,
							locations[index].y,
							collectable.id.toString()
						);
						collectableSprite.setScale(scale);
						collectableSprite.setDepth(150);
						this.add(collectableSprite);
						if (collectable.collected) {
							collectableSprite.destroy();
						}
						this.scene.physics.add.overlap(player, collectableSprite, () => {
							collectableSprite.destroy();
							store
								.dispatch(
									updatePuzzleCollectables({
										puzzleId: puzzleId,
										collectableIndex: index,
									})
								)
								.then((res) => {
									if (
										res.type ===
										"collectables/updatePuzzleCollectables/fulfilled"
									) {
										const details =
											res.payload as PuzzleUpdateCollectableResponse;
										if (details.score > 0) {
											Toast(
												TOAST_SUCCESS,
												`You have earned ${details.score} points!`
											);
										}
										if (details.bonusScore > 0) {
											Toast(
												TOAST_SUCCESS,
												`You have earned ${details.bonusScore} bonus points!`
											);
										}
									}
								});
						});
					});
				}
			});
	}
}
