import {
	toggleMainPortalKey,
	togglePortalKey,
	toggleProp1,
	toggleProp2,
	toggleProp3,
	toggleProp4,
} from "@slices/emoji/emoji";
import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "../stores/index";

export class EmojiScene extends Phaser.Scene {
	inventory: [string, string][] | undefined;
	constructor() {
		super({ key: "EmojiScene" });
	}

	player: TutorialPlayer | undefined;
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	bullets: Phaser.Physics.Arcade.Group | undefined;
	preload() {
		// Loading all necessary assets
		this.load.image("tileset", "assets/Emoji/tilesetscifi.png");
		this.inventory = store.getState().status.inventory;
		this.load.tilemapTiledJSON("tilemap", "assets/Emoji/emoji.json");
		this.load.spritesheet("player", "assets/Emoji/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.spritesheet("playerUI", "assets/Emoji/playerUI.png", {
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
		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.image("bullet", "assets/tutorial/trail.png");
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

		// Info Component Variables.
	}

	create() {
		// Creating i.e. adding the map
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("tilesetscifi", "tileset");
		const layer1 = map.createLayer("base", tileset!);
		const layer2 = map.createLayer("Gate", tileset!);
		const layer3 = map.createLayer("Wall", tileset!);
		const layer4 = map.createLayer("MainProp", tileset!);
		const layer5 = map.createLayer("Prop1", tileset!);
		const layer6 = map.createLayer("Prop2", tileset!);
		const layer7 = map.createLayer("Prop3", tileset!);
		const layer8 = map.createLayer("Prop4", tileset!);

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
		// Ading the player
		this.player = new TutorialPlayer(
			this,
			32 * 10 - 16,
			32 * 10 - 16,
			"player",
			2
		);

		this.physics.add.collider(this.player, this.portal, () => {
			if (!store.getState().emoji.isPortalKeyOpen) {
				store.dispatch(togglePortalKey());
			}
		});

		layer2!.setCollisionBetween(0, 1500);
		layer3!.setCollisionBetween(0, 1500);
		layer4!.setCollisionBetween(0, 1500);
		layer5!.setCollisionBetween(0, 1500);
		layer6!.setCollisionBetween(0, 1500);
		layer7!.setCollisionBetween(0, 1500);
		layer8!.setCollisionBetween(0, 1500);
		// Adding collision between player and map
		this.physics.add.collider(this.player!, layer2!);
		this.physics.add.collider(this.player!, layer3!);
		this.physics.add.collider(this.player!, layer4!, () => {
			if (!store.getState().emoji.isMainPortalOpen) {
				store.dispatch(toggleMainPortalKey());
			}
		});
		this.physics.add.collider(this.player!, layer5!, () => {
			if (!store.getState().emoji.isProp1Open) {
				store.dispatch(toggleProp1());
			}
		});
		this.physics.add.collider(this.player!, layer6!, () => {
			if (!store.getState().emoji.isProp2Open) {
				store.dispatch(toggleProp2());
			}
		});
		this.physics.add.collider(this.player!, layer7!, () => {
			if (!store.getState().emoji.isProp3Open) {
				store.dispatch(toggleProp3());
			}
		});
		this.physics.add.collider(this.player!, layer8!, () => {
			if (!store.getState().emoji.isProp4Open) {
				store.dispatch(toggleProp4());
			}
		});

		map.setCollisionFromCollisionGroup(true, true, layer2!);
		map.setCollisionFromCollisionGroup(true, true, layer3!);
		map.setCollisionFromCollisionGroup(true, true, layer4!);
		map.setCollisionFromCollisionGroup(true, true, layer5!);
		map.setCollisionFromCollisionGroup(true, true, layer6!);
		map.setCollisionFromCollisionGroup(true, true, layer7!);
		map.setCollisionFromCollisionGroup(true, true, layer8!);

		this.bullets = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});

		this.input.keyboard!.on("keydown-SPACE", () => {
			if (!this.player) return;
			this.player.shoot();
		});

		this.bullets = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});

		this.physics.add.collider(this.bullets, layer3!, (obj1) => {
			obj1.destroy();
		});

		this.player.bullets = this.bullets;

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
