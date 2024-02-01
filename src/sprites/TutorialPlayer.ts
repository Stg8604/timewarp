import { toggleInventory } from "../slices/Player/Player";
import { store } from "@stores/index";

export class TutorialPlayer extends Phaser.Physics.Arcade.Sprite {
	WKey;
	AKey;
	SKey;
	DKey;
	EKey;
	SPACEKey;
	activeWeapon: number;
	hasGun: boolean | undefined;
	playerMoving: boolean | undefined;
	shooting: boolean | undefined;
	isEditorOpened: boolean | undefined;
	bullets: Phaser.Physics.Arcade.Group | undefined;
	isEditorOpen = store.getState().editor.isOpen;
	pauseMovement = false;
	scale: number;
	declare flipX: boolean;
	weapons: {
		name: string;
		damage: number;
		animation: string;
		cooldown: number;
		yOffset: number;
		bullet: string;
		frames: {
			start: number;
			end: number;
		};
	}[];

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		key: string,
		scale: number = 2
	) {
		// Initialization, enabling physics, and adding sprite to scene
		super(scene, x, y, key);
		this.scene = scene;
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.scale = scale;
		this.weapons = [
			{
				name: "pistol",
				damage: 10,
				animation: "playerShoot1",
				cooldown: 0,
				yOffset: 5,
				bullet: "bullet",
				frames: {
					start: 0,
					end: 6,
				},
			},
			{
				name: "blaster",
				damage: 30,
				animation: "playerShoot2",
				cooldown: 0,
				yOffset: 9,
				bullet: "bullet",
				frames: {
					start: 0,
					end: 8,
				},
			},
		];

		this.scene.load.spritesheet("player", "assets/tutorial/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.scene.load.spritesheet("playerUI", "assets/tutorial/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.scene.load.spritesheet(
			"playerCloseUI",
			"assets/tutorial/playerCloseUI.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);

		// Sprite configuration
		this.setPosition(x, y);
		this.setScale(scale);
		this.setSize(15, 15);
		this.setOffset(25, 33);

		// Input states
		this.WKey = this.scene.input.keyboard?.addKey("W", false);
		this.AKey = this.scene.input.keyboard?.addKey("A", false);
		this.SKey = this.scene.input.keyboard?.addKey("S", false);
		this.DKey = this.scene.input.keyboard?.addKey("D", false);
		this.EKey = this.scene.input.keyboard?.addKey("E", false);
		this.SPACEKey = this.scene.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE,
			false
		);

		this.activeWeapon = 1;
		// Create animations
		this.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: "openUI",
			frames: this.anims.generateFrameNumbers("playerUI", {
				start: 0,
				end: 22,
			}),
			frameRate: 30,
			repeat: 0,
		});
		this.anims.create({
			key: "closeUI",
			frames: this.anims.generateFrameNumbers("playerCloseUI", {
				start: 0,
				end: 19,
			}),
			frameRate: 10,
			repeat: 0,
		});
		this.anims.create({
			key: "run",
			frames: this.anims.generateFrameNumbers("player", { start: 8, end: 15 }),
			frameRate: 10,
			repeat: -1,
		});

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

		this.scene.anims.create({
			key: "takeGun",
			frames: this.anims.generateFrameNumbers("playerTakeGun", {
				start: 0,
				end: 18,
			}),
			frameRate: 10,
			repeat: 0,
		});
		this.scene.anims.create({
			key: "shootGun1",
			frames: this.anims.generateFrameNumbers(
				this.weapons[0].animation,
				this.weapons[0].frames
			),
			frameRate: 20,
			repeat: 0,
		});
		this.scene.anims.create({
			key: "shootGun2",
			frames: this.anims.generateFrameNumbers(
				this.weapons[1].animation,
				this.weapons[1].frames
			),
			frameRate: 20,
			repeat: 0,
		});
		this.scene.anims.create({
			key: "keepGun",
			frames: this.anims.generateFrameNumbers("playerTakeGun", {
				frames: [
					18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
				],
			}),
			frameRate: 10,
			repeat: 0,
		});
		this.anims.play("idle", true);

		this.SPACEKey?.on("down", () => {
			if (store.getState().player.inventoryOpen) {
				this.pauseMovement = true;
				return;
			}
			if (this.isEditorOpen) {
				this.pauseMovement = true;
				return;
			}
			this.shoot();
		});

		this.SPACEKey?.on("up", () => {
			this.shooting = false;
		});

		const handleKeyDown = () => {
			if (store.getState().player.inventoryOpen) {
				this.pauseMovement = true;
				return;
			}
			if (store.getState().editor.isOpen) {
				this.pauseMovement = true;
				return;
			}
			this.stop();
			this.play("run", true);
		};

		const handleKeyUp = () => {
			if (store.getState().player.inventoryOpen) {
				this.pauseMovement = true;
				return;
			}
			if (store.getState().editor.isOpen) {
				this.pauseMovement = true;
				return;
			}
			this.stop();
			if (this.shooting) {
				if (this.activeWeapon === 1) {
					this.chain(["shootGun1", "idle"]);
				} else {
					this.chain(["shootGun2", "idle"]);
				}
			} else if (
				this.WKey?.isDown ||
				this.AKey?.isDown ||
				this.SKey?.isDown ||
				this.DKey?.isDown
			) {
				this.play("run", true);
			} else {
				this.play("idle", true);
			}
		};

		this.WKey?.on("down", handleKeyDown);
		this.AKey?.on("down", handleKeyDown);
		this.SKey?.on("down", handleKeyDown);
		this.DKey?.on("down", handleKeyDown);

		this.WKey?.on("up", handleKeyUp);
		this.AKey?.on("up", handleKeyUp);
		this.SKey?.on("up", handleKeyUp);
		this.DKey?.on("up", handleKeyUp);

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

		this.scene.input.keyboard?.on("keydown", (e: { key: string }) => {
			if (e.key === "1") {
				this.switchWeapon(1);
			} else if (e.key === "2") {
				this.switchWeapon(2);
			} else if (e.key == "q" && !this.isEditorOpen) {
				store.dispatch(toggleInventory());
			}
		});
	}

	switchWeapon(weapon: number) {
		this.activeWeapon = weapon;
	}

	shoot() {
		if (this.isEditorOpen) return;
		this.stop();
		this.setVelocity(0, 0);
		if (this.activeWeapon === 1) {
			this.play("shootGun1", true);
		} else {
			this.play("shootGun2", true);
		}
		// const sprite = this.scene.physics.add.sprite(this.x, this.y + 10, "bullet");
		// sprite.setRotation(!this.flipX ? 3.14 : 0);
		// sprite.setScale(0.12);
		// sprite.setVelocityX(this.flipX ? -250 : 250);
		// const bullet = new Bullet(
		// 	this.scene,
		// 	this.x + (this.flipX ? -10 : 10),
		// 	this.y + this.scale * this.weapons[this.activeWeapon - 1].yOffset,
		// 	this.flipX,
		// 	this.weapons[this.activeWeapon - 1].bullet,
		// 	900
		// );

		if (!this.bullets) return;
		const bullet = this.bullets.get(
			this.x + (this.flipX ? -10 : 10),
			this.y + this.scale * this.weapons[this.activeWeapon - 1].yOffset,
			this.weapons[this.activeWeapon - 1].bullet
		) as Phaser.Physics.Arcade.Sprite;
		bullet.setVelocityX(this.flipX ? -250 : 250);
		bullet.setScale(0.12);
		bullet.flipX = !this.flipX;
		// bullet.setVelocityX(this.flipX ? -900 : 900);

		if (this.playerMoving) {
			this.chain(["run"]);
		} else {
			this.chain(["idle"]);
		}
		this.shooting = true;
		return bullet;
	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);
		if (store.getState().player.inventoryOpen) {
			this.pauseMovement = true;
			return;
		}
		if (store.getState().editor.isOpen) {
			this.pauseMovement = true;
			return;
		}
		// Player movement
		this.setVelocity(0, 0);
		this.playerMoving = false;
		if (this.WKey?.isDown) {
			this.setVelocityY(-80);
			this.playerMoving = true;
		} else if (this.SKey?.isDown) {
			this.setVelocityY(80);
			this.playerMoving = true;
		} else if (this.AKey?.isDown) {
			this.setVelocityX(-80);
			this.playerMoving = true;
			if (!this.flipX) {
				this.flipX = true;
			}
		} else if (this.DKey?.isDown) {
			this.setVelocityX(80);
			this.playerMoving = true;
			if (this.flipX) {
				this.flipX = false;
			}
		} else {
			this.setVelocity(0, 0);
			this.playerMoving = false;
		}

		if (
			this.anims.currentAnim?.key === "closeUI" &&
			this.anims.getProgress() === 1
		) {
			this.pauseMovement = false;
		}

		// Player animation
		// if (
		// 	this.WKey?.isDown ||
		// 	this.AKey?.isDown ||
		// 	this.SKey?.isDown ||
		// 	this.DKey?.isDown
		// ) {
		// 	this.anims.play("run", true);
		// 	this.isEditorOpened = false;
		// } else {
		// 	//conditions to prevent idle.
		// 	if (this.isEditorOpened || this.shooting) {
		// 		return;
		// 	}

		// 	// this.on("animationcomplete", (e) => {
		// 	// 	this.shooting = false;
		// 	// });
		// }

		// if (this.EKey?.isDown) {
		// 	this.anims.play("openUI", true);
		// 	this.isEditorOpened = true;
		// }

		// if (this.SPACEKey?.isDown && !this.shooting) {

		// }
	}
}
