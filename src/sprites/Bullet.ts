export class Bullet extends Phaser.Physics.Arcade.Sprite {
	velocity: number;
	sprite: Phaser.Physics.Arcade.Sprite;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		dir: boolean,
		key: string,
		velocity: number
	) {
		super(scene, x, y, key);
		this.scene = scene;
		this.scene.physics.world.enable(this);
		this.velocity = -velocity;
		this.sprite = this.scene.physics.add.sprite(x, y, key);
		this.sprite.flipX = !dir;
		// this.sprite.setRotation(!dir ? 0 : Math.PI);
		this.sprite.setScale(0.12);
		this.sprite.setVelocityX(dir ? -5 : 5);
		this.setScale(0.12);
		this.setVelocityX(dir ? -5 : 5);
		// this.destroy();
		// this.sprite.destroy();
	}
	destroyBullet(): void {
		this.body?.reset(0, 0);
	}
}
