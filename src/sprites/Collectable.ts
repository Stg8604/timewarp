export class Collectable extends Phaser.Physics.Arcade.Sprite {
	maxScale: number;
	dir: number;
	scaleSet: boolean;
	audioFile: string | null;
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		key: string | Phaser.Textures.Texture
	) {
		super(scene, x, y, key);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scaleSet = false;
		this.scene.physics.world.enable(this);
		this.angle = 0;
		this.scale = 0.2;
		this.audioFile = null;
		this.maxScale = 0.2;
		this.dir = -1;
	}
	contents: [string, string] | undefined;
	update(..._args: number[]): void {
		this.scaleSet = true;
		if (this.scaleX < 0) {
			this.body?.setOffset(this.width, 0);
		} else {
			this.body?.setOffset(0, 0);
		}
		this.scaleX += Number((0.001 * this.dir).toFixed(3));
		if (this.scaleX >= this.maxScale) {
			this.dir = -1;
		} else if (this.scaleX <= -this.maxScale) {
			this.dir = 1;
		}
	}
}
