export class Barrel extends Phaser.Physics.Arcade.Sprite {
	health: number;
	test!: string;
	contents: unknown;
	breaking!: boolean;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		key: string | Phaser.Textures.Texture
	) {
		super(scene, x, y, key);
		this.scene = scene;
		this.health = 100;
		this.contents = null;
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.setImmovable(true);
		this.setCollideWorldBounds(true);

		this.anims.create({
			key: "breakPot",
			frames: this.anims.generateFrameNumbers("smallPotBreak", {
				start: 0,
				end: 5,
			}),
			frameRate: 10,
			repeat: 0,
		});
		this.anims.create({
			key: "breakPotLarge",
			frames: this.anims.generateFrameNumbers("largePotBreak", {
				start: 0,
				end: 7,
			}),
			frameRate: 10,
			repeat: 0,
		});
	}

	break(type: string): void {
		this.breaking = true;
		if (type === "small") {
			this.anims.play("breakPot", true);
		} else if (type === "large") {
			this.anims.play("breakPotLarge", true);
		}
		this.scene.time.delayedCall(800, () => {
			this.destroy();
		});
	}
}
