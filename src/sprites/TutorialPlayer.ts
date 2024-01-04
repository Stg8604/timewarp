import { store } from "@stores/index";

export class TutorialPlayer extends Phaser.Physics.Arcade.Sprite {
	WKey;
	AKey;
	SKey;
	DKey;
	EKey;
	isEditorOpen = store.getState().editor.isOpen;
	pauseMovement = false;

	constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
		// Initialization, enabling physics, and adding sprite to scene
		super(scene, x, y, key);
		this.scene = scene;
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);

		// Sprite configuration
		this.setPosition(x, y);
		this.setScale(2);
		this.setSize(15, 15);
		this.setOffset(25, 33);

		// Input states
		this.WKey = this.scene.input.keyboard?.addKey("W", false);
		this.AKey = this.scene.input.keyboard?.addKey("A", false);
		this.SKey = this.scene.input.keyboard?.addKey("S", false);
		this.DKey = this.scene.input.keyboard?.addKey("D", false);
		this.EKey = this.scene.input.keyboard?.addKey("E", false);

		// Create animations
		this.scene.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.scene.anims.create({
			key: "openUI",
			frames: this.anims.generateFrameNumbers("playerUI", {
				start: 0,
				end: 23,
			}),
			frameRate: 10,
			repeat: 0,
		});
		this.scene.anims.create({
			key: "closeUI",
			frames: this.anims.generateFrameNumbers("playerCloseUI", {
				start: 0,
				end: 23,
			}),
			frameRate: 10,
			repeat: 0,
		});
		this.scene.anims.create({
			key: "run",
			frames: this.anims.generateFrameNumbers("player", { start: 8, end: 15 }),
			frameRate: 10,
			repeat: -1,
		});

		// Listen to updates on editor opening for UI animation
		store.subscribe(() => {
			const newIsEditorOpen = store.getState().editor.isOpen;
			if (!this.isEditorOpen && newIsEditorOpen) {
				this.anims.play("openUI", true);
				this.isEditorOpen = true;
				this.pauseMovement = true;
			} else if (this.isEditorOpen && !newIsEditorOpen) {
				this.anims.play("closeUI", true);
				this.isEditorOpen = false;
			}
		});
	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);

		// Player movement
		this.setVelocity(0, 0);
		if (!this.pauseMovement) {
			if (this.WKey?.isDown) {
				this.setVelocityY(-200);
				this.anims.play("run", true);
			} else if (this.SKey?.isDown) {
				this.setVelocityY(200);
				this.anims.play("run", true);
			} else if (this.AKey?.isDown) {
				this.setVelocityX(-200);
				if (!this.flipX) {
					this.flipX = true;
				}
				this.anims.play("run", true);
			} else if (this.DKey?.isDown) {
				this.setVelocityX(200);
				if (this.flipX) {
					this.flipX = false;
				}
				this.anims.play("run", true);
			} else {
				this.setVelocity(0, 0);
				if (
					!this.anims.isPlaying ||
					(this.anims.currentAnim?.key !== "openUI" &&
						this.anims.currentAnim?.key !== "closeUI")
				) {
					this.anims.play("idle", true);
				}
			}
		}

		// Unpauses movement after close UI animation is finished
		if (
			this.anims.currentAnim?.key === "closeUI" &&
			this.anims.getProgress() === 1
		) {
			this.pauseMovement = false;
		}
	}
}
