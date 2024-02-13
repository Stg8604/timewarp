import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "../stores/index";
import { toggleInfo, togglePortalKey } from "../slices/Tutorial/tutorial";
// import BulletSprite from "@assets/tutorial/trail.png";

export class TutorialScene extends Phaser.Scene {
	constructor() {
		super({ key: "TutorialScene" });
	}

	player: TutorialPlayer | undefined;
	chest: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	isInfoOpen = store.getState().tutorial.isInfoOpen;
	isInfoOpened: boolean | undefined;
	preload() {
		// Loading all necessary assets
		this.load.image("tileset", "assets/tutorial/tileset.png");
		this.load.image("bullet", "assets/tutorial/trail.png");
		this.load.tilemapTiledJSON("tilemap", "assets/tutorial/tutorialMap.json");
		this.load.spritesheet("player", "assets/tutorial/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.image("bullet", "assets/tutorial/trail.png");

		this.load.spritesheet("playerUI", "assets/tutorial/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"playerCloseUI",
			"assets/tutorial/playerCloseUI.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet("chest", "assets/tutorial/chest.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 56,
		});
		this.load.spritesheet(
			"playerTakeGun",
			"assets/Player/TakeGun01/spritesheet.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			"playerShoot1",
			"assets/Player/ShootGun02/spritesheet.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			"playerShoot2",
			"assets/Player/Shoot01Gun01/spritesheet.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		// Info Component Variables.
		this.isInfoOpened = false;
	}

	create() {
		// Creating i.e. adding the map
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("tileset", "tileset");
		const layer2 = map.createLayer("Layer2", tileset!);
		const layer1 = map.createLayer("Layer1", tileset!);

		//Info Component Variables.
		this.isInfoOpened = false;

		// Adding and configuring the chest
		this.chest = this.physics.add.sprite(32 * 10 - 16, 32 * 15 - 16, "chest");
		this.chest.setScale(1);
		this.chest.setImmovable(true);

		this.portal = this.physics.add.sprite(32 * 26 - 16, 32 * 7 - 16, "portal");
		this.portal.setImmovable(true);
		this.portal.setSize(32, 32);

		// Portal animations
		this.portal.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.portal.anims.play("idle", true);

		// Pop-up configurations
		const popupWidth = 300;
		const popupHeight = 150;
		const popupPadding = 10;

		// Creating pop-up rectangle
		const popupRectangle = this.add.graphics({
			x: 32 * 10 - 16,
			y: 32 * 15 - 16,
		});
		popupRectangle.fillStyle(0x2ba097, 0.8);
		popupRectangle.fillRoundedRect(
			-popupWidth / 2,
			-popupHeight,
			popupWidth,
			popupHeight,
			5
		);

		// Creating pop-up text
		const popupText = this.add.text(
			0,
			0,
			"This is a sample popup message giving a hint to our player about what to do next",
			{
				fontFamily: "Arial",
				fontSize: 20,
				color: "#FFFFFF",
				align: "center",
				wordWrap: { width: popupWidth - popupPadding * 2 },
			}
		);
		const popupTextRectangle = popupText.getBounds();
		popupText.setPosition(
			popupRectangle.x - popupTextRectangle.width / 2,
			popupRectangle.y - popupHeight / 2 - popupTextRectangle.height / 2
		);

		// Creating pop-up group
		const popup = this.add.group();
		popup.add(popupRectangle);
		popup.add(popupText);
		popup.setAlpha(0);

		// Fade in tween for pop-up
		// const popupFadeIn = this.tweens.addCounter({
		// 	from: 0,
		// 	to: 1,
		// 	duration: 500,
		// 	paused: true,
		// 	onUpdate: (tween) => {
		// 		popup.setAlpha(tween.getValue());
		// 	},
		// });

		// Chest animations
		this.chest.anims.create({
			key: "chest-open",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [0, 12, 24, 36],
			}),
			frameRate: 10,
			repeat: 0,
		});

		this.chest.anims.create({
			key: "chest-close",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [36, 24, 12, 0],
			}),
			frameRate: 10,
			repeat: 0,
		});

		// Ading the player
		this.player = new TutorialPlayer(
			this,
			32 * 10 - 16,
			32 * 10 - 16,
			"player",
			2
		);

		// Collision callback between player and chest
		this.physics.add.collider(this.player, this.chest, () => {
			if (!store.getState().tutorial.isInfoOpen) {
				store.dispatch(toggleInfo());
			}
		});

		this.physics.add.collider(this.player, this.portal, () => {
			if (!store.getState().tutorial.isPortalKeyOpen) {
				store.dispatch(togglePortalKey());
			}
		});

		// Listen to updates on info box opening
		store.subscribe(() => {
			const newIsInfoOpen = store.getState().tutorial.isInfoOpen;
			if (!this.isInfoOpen && newIsInfoOpen) {
				this.chest!.anims.play("chest-open", true);
				this.isInfoOpen = true;
			} else if (this.isInfoOpen && !newIsInfoOpen) {
				this.chest!.anims.play("chest-close", true);
				this.isInfoOpen = false;
			}
		});

		// Adding collision between player and map
		this.physics.add.collider(this.player!, layer1!);
		this.physics.add.collider(this.player!, layer2!);
		map.setCollisionFromCollisionGroup(true, true, layer1!);
		map.setCollisionFromCollisionGroup(true, true, layer2!);

		// Configuring camera
		const camera = this.cameras.main.setZoom(1.5, 1.5);
		camera.startFollow(this.player, false, 0.5, 0.5);

		// Debug graphics for collision (DO NOT DELETE)
		// map.renderDebug(this.add.graphics())

		// Other ways to add collision (DO NOT DELETE)
		// map.setCollisionBetween(0,999,true,true,layer1!);
		// layer1?.setCollisionByProperty({ collides: true });
		// layer2?.setCollisionByProperty({ collides: true });
		// layer1?.setCollisionByExclusion([-1]);
		// layer2?.setCollisionByExclusion([-1]);
	}
}
